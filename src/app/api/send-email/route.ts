import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const STUDIO_EMAIL = 'connect@off32.it'

const TYPES: Record<string, string> = {
  progetto: 'Progetto',
  workshop: 'Workshop',
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

export async function POST(req: Request) {
  const body = await req.json()
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const subject = String(body.subject ?? '').trim()
  const message = String(body.message ?? '').trim()
  const contactType = TYPES[String(body.contactType ?? '')] ?? 'Messaggio'
  const when = String(body.when ?? '').trim()
  const company = String(body.company ?? '').trim()

  if (!name || !email || !message || !email.includes('@')) {
    return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
  }

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeSubject = escapeHtml(subject || 'Senza oggetto')
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>')
  const safeWhen = escapeHtml(when)
  const safeCompany = escapeHtml(company)
  const reply = safeWhen
    ? `Abbiamo ricevuto la richiesta per la call gratuita di 20 minuti: <strong>${safeWhen}</strong>. Ti confermiamo l'orario a breve.`
    : 'Abbiamo ricevuto il tuo messaggio. Ti rispondiamo entro <strong>24 ore lavorative</strong>.'

  try {
    const studio = await resend.emails.send({
      from: 'OFF32 <noreply@off32.it>',
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
            <p style="margin: 0 0 24px;"><strong>Email:</strong> ${safeEmail}</p>
            ${safeWhen ? `<p style="margin: 0 0 24px;"><strong>Quando:</strong> ${safeWhen}</p>` : ''}
            <p style="color: #555; line-height: 1.7; margin: 0;">${safeMessage}</p>
          </div>
        </div>
      `,
    })

    if (studio.error) {
      console.error(studio.error.message)
      return NextResponse.json({ error: 'Errore invio email' }, { status: 500 })
    }

    const confirmation = await resend.emails.send({
      from: 'OFF32 <noreply@off32.it>',
      to: email,
      subject: 'Messaggio ricevuto — OFF32',
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
            <p style="color: #444; font-size: 11px; margin: 0; letter-spacing: 1px;">© 2025 OFF32 · OFFICINA DIGITALE · off32.it</p>
          </div>
        </div>
      `,
    })

    if (confirmation.error) console.error(confirmation.error.message)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Errore invio email' }, { status: 500 })
  }
}
