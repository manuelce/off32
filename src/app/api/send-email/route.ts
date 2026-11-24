import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import { allowRequest, clientKey } from '@/lib/rate-limit'

const STUDIO_EMAIL = 'connect@off32.it'
const FROM = `OFF32 <${STUDIO_EMAIL}>`

const TYPES: Record<string, string> = {
  progetto: 'Progetto',
  workshop: 'Workshop',
  candidatura: 'Candidatura corso',
  altro: 'Altro',
  call: 'Call gratuita',
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function mailer() {
  const pass = process.env.SMTP_PASSWORD
  if (!pass) throw new Error('SMTP_PASSWORD mancante')
  return nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER || STUDIO_EMAIL,
      pass,
    },
  })
}

const TOO_MANY = { error: 'Troppe richieste. Riprova tra qualche minuto.' }

export async function POST(req: Request) {
  // Ogni invio fa partire anche una risposta automatica all'indirizzo indicato:
  // senza limite, il modulo si potrebbe usare per inondare di email chiunque.
  if (!allowRequest(`send-email:${clientKey(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(TOO_MANY, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    const parsed = await req.json()
    if (!parsed || typeof parsed !== 'object') throw new Error('body')
    body = parsed
  } catch {
    return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
  }
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const subject = String(body.subject ?? '').trim()
  const message = String(body.message ?? '').trim()
  const contactType = TYPES[String(body.contactType ?? '')] ?? 'Messaggio'
  const when = String(body.when ?? '').trim()
  const company = String(body.company ?? '').trim()
  const courseSlug = String(body.courseSlug ?? '').trim()
  const level = String(body.level ?? '').trim()
  const goal = String(body.goal ?? '').trim()
  const schedulePreference = String(body.schedulePreference ?? '').trim()
  const utmEntries = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .map(key => {
      const value = String(body[key] ?? '').trim()
      return value ? `${key}=${escapeHtml(value)}` : ''
    })
    .filter(Boolean)

  if (!name || !email || !message || !email.includes('@')) {
    return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
  }

  // Stesso destinatario da IP diversi: massimo 3 risposte automatiche all'ora.
  if (!allowRequest(`send-email-to:${email.toLowerCase()}`, 3, 60 * 60 * 1000)) {
    return NextResponse.json(TOO_MANY, { status: 429 })
  }

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeSubject = escapeHtml(subject || 'Senza oggetto')
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>')
  const safeWhen = escapeHtml(when)
  const safeCompany = escapeHtml(company)
  const safeCourseSlug = escapeHtml(courseSlug)
  const safeLevel = escapeHtml(level)
  const safeGoal = escapeHtml(goal)
  const safeSchedule = escapeHtml(schedulePreference)
  const reply = safeWhen
    ? `Abbiamo ricevuto la richiesta per la call gratuita di 20 minuti: <strong>${safeWhen}</strong>. Ti confermiamo l'orario a breve.`
    : courseSlug
      ? 'Abbiamo ricevuto la tua candidatura al corso. Ti rispondiamo entro <strong>24 ore lavorative</strong>.'
      : 'Abbiamo ricevuto il tuo messaggio. Ti rispondiamo entro <strong>24 ore lavorative</strong>.'

  try {
    const transport = mailer()
    await transport.sendMail({
      from: FROM,
      to: STUDIO_EMAIL,
      replyTo: email,
      subject: `[${contactType}] ${subject || name}`,
      html: `
        <div style="font-family: helvetica, sans-serif; max-width: 520px; margin: 0 auto; color: #0D0D0D;">
          <div style="background: #0D0D0D; padding: 24px 32px;">
            <h1 style="color: #fff; font-size: 20px; margin: 0; letter-spacing: 3px;">OFF32</h1>
          </div>
          <div style="padding: 40px 32px;">
            <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 1px; color: #fe3812;">${escapeHtml(contactType)}</p>
            <h2 style="font-size: 20px; font-weight: 800; margin: 0 0 16px;">${safeSubject}</h2>
            <p style="margin: 0 0 8px;"><strong>Nome:</strong> ${safeName}</p>
            ${safeCompany ? `<p style="margin: 0 0 8px;"><strong>Azienda:</strong> ${safeCompany}</p>` : ''}
            <p style="margin: 0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
            ${safeCourseSlug ? `<p style="margin: 0 0 8px;"><strong>Corso:</strong> ${safeCourseSlug}</p>` : ''}
            ${safeLevel ? `<p style="margin: 0 0 8px;"><strong>Livello:</strong> ${safeLevel}</p>` : ''}
            ${safeSchedule ? `<p style="margin: 0 0 8px;"><strong>Preferenza oraria:</strong> ${safeSchedule}</p>` : ''}
            ${safeGoal ? `<p style="margin: 0 0 8px;"><strong>Obiettivo:</strong> ${safeGoal}</p>` : ''}
            ${utmEntries.length ? `<p style="margin: 0 0 8px;"><strong>UTM:</strong> ${utmEntries.join(' · ')}</p>` : ''}
            ${safeWhen ? `<p style="margin: 0 0 24px;"><strong>Quando:</strong> ${safeWhen}</p>` : '<div style="height:16px"></div>'}
            <p style="color: #555; line-height: 1.7; margin: 0;">${safeMessage}</p>
          </div>
        </div>
      `,
    })

    try {
      await transport.sendMail({
        from: FROM,
        to: email,
        subject: 'Messaggio ricevuto, OFF32',
        html: `
          <div style="font-family: helvetica, sans-serif; max-width: 520px; margin: 0 auto; color: #0D0D0D;">
            <div style="background: #fe3812; padding: 24px 32px;">
              <h1 style="color: #fff; font-size: 20px; margin: 0; letter-spacing: 3px;">OFF32</h1>
            </div>
            <div style="padding: 40px 32px;">
              <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 16px;">Ciao ${safeName},</h2>
              <p style="color: #555; line-height: 1.7; margin-bottom: 16px;">${reply}</p>
              <p style="color: #555; line-height: 1.7;">A presto,<br/><strong>Il team OFF32</strong></p>
            </div>
            <div style="background: #0D0D0D; padding: 20px 32px; text-align: center;">
              <p style="color: #444; font-size: 11px; margin: 0; letter-spacing: 1px;">© 2026 OFF32 · OFFICINA DIGITALE · off32.it</p>
            </div>
          </div>
        `,
      })
    } catch (error) {
      console.error(error instanceof Error ? error.message : error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Errore invio email' }, { status: 500 })
  }
}
