import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { allowRequest, clientKey } from '@/lib/rate-limit'
import { analyzeSite } from '@/lib/site-check'

export const runtime = 'nodejs'
export const maxDuration = 10

const TO = 'connect@off32.it'
const FROM = `OFF32 <${TO}>`

export async function POST(request: Request) {
  if (!allowRequest(`report:${clientKey(request)}`, 4, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Troppe richieste. Riprova tra qualche minuto.' }, { status: 429 })
  }

  const input = await readReport(request)
  if (!input) return NextResponse.json({ error: 'Controlla indirizzo e email.' }, { status: 400 })

  try {
    const result = await analyzeSite(input.url)
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status })

    const transport = mailer()
    await transport.sendMail({
      from: FROM,
      to: TO,
      replyTo: input.email,
      subject: 'Richiesta report analisi sito',
      html: officeHtml(input, result.report),
    })

    let copia: 'inviata' | 'non_inviata' = 'inviata'
    try {
      await transport.sendMail({
        from: FROM,
        to: input.email,
        subject: 'Il report del tuo sito, OFF32',
        html: userHtml(result.report),
      })
    } catch (error) {
      copia = 'non_inviata'
      console.error(error instanceof Error ? error.message : 'copia report')
    }

    return NextResponse.json({
      score: result.report.score,
      checks: result.report.checks.map(({ id, label, status, detail }) => ({ id, label, status, detail })),
      notifica: 'inviata',
      copia,
    })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'report')
    return NextResponse.json({ error: 'Non siamo riusciti a inviare il report. Riprova.' }, { status: 500 })
  }
}

function mailer() {
  const pass = process.env.SMTP_PASSWORD
  if (!pass) throw new Error('SMTP non configurato')
  return nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER || TO,
      pass,
    },
  })
}

function officeHtml(
  input: { url: string; email: string; marketing: boolean },
  report: { score: number; finalUrl: string; checks: Array<{ label: string; status: string; detail: string }> },
): string {
  const rows = report.checks
    .map(check => `<li><strong>${escapeHtml(check.label)}</strong>: ${escapeHtml(statusLabel(check.status))}. ${escapeHtml(check.detail)}</li>`)
    .join('')
  return `
    <div style="font-family: helvetica, sans-serif; color: #0D0D0D;">
      <p>Nuova richiesta di report.</p>
      <p>Sito: ${escapeHtml(input.url)}</p>
      <p>Indirizzo finale: ${escapeHtml(report.finalUrl || 'non raggiunto')}</p>
      <p>Email: ${escapeHtml(input.email)}</p>
      <p>Consenso marketing: ${input.marketing ? 'sì' : 'no'}</p>
      <p>Punteggio: ${report.score}/100 sui controlli eseguiti.</p>
      <ul>${rows}</ul>
    </div>
  `
}

function userHtml(report: { score: number; checks: Array<{ label: string; status: string; detail: string }> }): string {
  const rows = report.checks
    .map(check => `<li><strong>${escapeHtml(check.label)}</strong>: ${escapeHtml(statusLabel(check.status))}. ${escapeHtml(check.detail)}</li>`)
    .join('')
  return `
    <div style="font-family: helvetica, sans-serif; max-width: 560px; margin: 0 auto; color: #0D0D0D;">
      <div style="background: #fe3812; padding: 24px 32px;">
        <h1 style="color: #fff; font-size: 20px; margin: 0; letter-spacing: 3px;">OFF32</h1>
      </div>
      <div style="padding: 32px;">
        <h2 style="font-size: 22px; font-weight: 800; margin: 0 0 12px;">Il report della tua homepage</h2>
        <p style="line-height: 1.7;">Punteggio: ${report.score}/100, calcolato solo sui controlli che siamo riusciti a eseguire.</p>
        <ul style="line-height: 1.7; padding-left: 18px;">${rows}</ul>
        <p style="line-height: 1.7;">Se vuoi sistemare i punti aperti, scrivici o prenota una call su off32.it.</p>
      </div>
    </div>
  `
}

function statusLabel(status: string): string {
  if (status === 'pass') return 'Ok'
  if (status === 'fail') return 'Da sistemare'
  return 'Non verificato'
}

async function readReport(request: Request): Promise<{ url: string; email: string; marketing: boolean } | null> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return null
  }
  if (!body || typeof body !== 'object') return null
  const record = body as Record<string, unknown>
  if (typeof record.url !== 'string' || typeof record.email !== 'string') return null
  if (record.marketingConsent !== undefined && typeof record.marketingConsent !== 'boolean') return null
  const url = record.url.trim()
  const email = record.email.trim()
  if (!url || url.length > 2000) return null
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return null
  return { url, email, marketing: record.marketingConsent === true }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
