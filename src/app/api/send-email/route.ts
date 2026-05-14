import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = 'connect@off32.it'

export async function POST(req: Request) {
  const { type, name, email } = await req.json()

  try {

    // ── CANDIDATURA PROFESSIONISTA ──────────────────────────────────────────
    if (type === 'application') {
      await resend.emails.send({
        from: 'OFF32 <noreply@off32.it>',
        to: email,
        subject: 'Candidatura ricevuta — OFF32',
        html: `
          <div style="font-family: helvetica, sans-serif; max-width: 520px; margin: 0 auto; color: #0D0D0D;">
            <div style="background: #fe3812; padding: 24px 32px;">
              <h1 style="color: #fff; font-size: 20px; margin: 0; letter-spacing: 3px;">OFF32</h1>
            </div>
            <div style="padding: 40px 32px;">
              <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 16px;">Ciao ${name}! 👋</h2>
              <p style="color: #555; line-height: 1.7; margin-bottom: 16px;">Abbiamo ricevuto la tua candidatura per entrare in <strong>OFF32</strong>.</p>
              <p style="color: #555; line-height: 1.7; margin-bottom: 16px;">Il nostro team la esaminerà nei prossimi <strong>7 giorni lavorativi</strong> e ti risponderemo via email.</p>
              <div style="background: #F8F5F0; border-left: 3px solid #fe3812; padding: 16px 20px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0; font-size: 13px; color: #666;">Ricorda: valutiamo ogni portfolio con attenzione. La qualità è l'unico criterio.</p>
              </div>
              <p style="color: #555; line-height: 1.7;">A presto,<br/><strong>Il team OFF32</strong></p>
            </div>
            <div style="background: #0D0D0D; padding: 20px 32px; text-align: center;">
              <p style="color: #444; font-size: 11px; margin: 0; letter-spacing: 1px;">© 2025 OFF32 · OFFICINA DIGITALE · off32.it</p>
            </div>
          </div>
        `
      })

      await resend.emails.send({
        from: 'OFF32 <noreply@off32.it>',
        to: ADMIN_EMAIL,
        subject: `Nuova candidatura da ${name}`,
        html: `
          <div style="font-family: helvetica, sans-serif; max-width: 520px; margin: 0 auto;">
            <div style="background: #0D0D0D; padding: 24px 32px;">
              <h1 style="color: #fff; font-size: 20px; margin: 0; letter-spacing: 3px;">OFF32 ADMIN</h1>
            </div>
            <div style="padding: 40px 32px;">
              <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 16px;">Nuova candidatura ricevuta</h2>
              <p style="margin-bottom: 8px;"><strong>Nome:</strong> ${name}</p>
              <p style="margin-bottom: 24px;"><strong>Email:</strong> ${email}</p>
              <a href="https://off32.it/admin" style="background: #fe3812; color: #fff; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 13px;">Vai all'admin panel →</a>
            </div>
          </div>
        `
      })
    }

    // ── BRIEF CLIENTE ───────────────────────────────────────────────────────
    if (type === 'client') {
      await resend.emails.send({
        from: 'OFF32 <noreply@off32.it>',
        to: email,
        subject: 'Brief ricevuta — OFF32',
        html: `
          <div style="font-family: helvetica, sans-serif; max-width: 520px; margin: 0 auto; color: #0D0D0D;">
            <div style="background: #fe3812; padding: 24px 32px;">
              <h1 style="color: #fff; font-size: 20px; margin: 0; letter-spacing: 3px;">OFF32</h1>
            </div>
            <div style="padding: 40px 32px;">
              <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 16px;">Ciao ${name}! 👋</h2>
              <p style="color: #555; line-height: 1.7; margin-bottom: 16px;">Abbiamo ricevuto la tua brief. La esamineremo entro <strong>48 ore</strong> e ti metteremo in contatto con i professionisti giusti.</p>
              <p style="color: #555; line-height: 1.7;">A presto,<br/><strong>Il team OFF32</strong></p>
            </div>
            <div style="background: #0D0D0D; padding: 20px 32px; text-align: center;">
              <p style="color: #444; font-size: 11px; margin: 0; letter-spacing: 1px;">© 2025 OFF32 · OFFICINA DIGITALE · off32.it</p>
            </div>
          </div>
        `
      })

      await resend.emails.send({
        from: 'OFF32 <noreply@off32.it>',
        to: ADMIN_EMAIL,
        subject: `Nuova brief cliente da ${name}`,
        html: `
          <div style="font-family: helvetica, sans-serif; max-width: 520px; margin: 0 auto;">
            <div style="background: #0D0D0D; padding: 24px 32px;">
              <h1 style="color: #fff; font-size: 20px; margin: 0; letter-spacing: 3px;">OFF32 ADMIN</h1>
            </div>
            <div style="padding: 40px 32px;">
              <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 16px;">Nuova brief cliente</h2>
              <p style="margin-bottom: 8px;"><strong>Nome:</strong> ${name}</p>
              <p style="margin-bottom: 24px;"><strong>Email:</strong> ${email}</p>
              <a href="https://off32.it/admin" style="background: #fe3812; color: #fff; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 13px;">Vai all'admin panel →</a>
            </div>
          </div>
        `
      })
    }

    // ── APPROVAZIONE PROFESSIONISTA ─────────────────────────────────────────
    if (type === 'approval') {
      await resend.emails.send({
        from: 'OFF32 <noreply@off32.it>',
        to: email,
        subject: '🎉 Sei stato approvato in OFF32!',
        html: `
          <div style="font-family: helvetica, sans-serif; max-width: 520px; margin: 0 auto; color: #0D0D0D;">
            <div style="background: #fe3812; padding: 24px 32px;">
              <h1 style="color: #fff; font-size: 20px; margin: 0; letter-spacing: 3px;">OFF32</h1>
            </div>
            <div style="padding: 40px 32px;">
              <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 16px;">Benvenuto nell'officina, ${name}! 🎉</h2>
              <p style="color: #555; line-height: 1.7; margin-bottom: 16px;">
                La tua candidatura è stata <strong style="color: #0F6E56;">approvata</strong>. Sei ora un membro ufficiale di OFF32.
              </p>
              <p style="color: #555; line-height: 1.7; margin-bottom: 24px;">
                Accedi alla tua dashboard per completare il profilo, aggiungere i tuoi lavori e iniziare a essere trovato dai clienti giusti.
              </p>
              <div style="background: #F8F5F0; border-left: 3px solid #9fff00; padding: 16px 20px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0; font-size: 13px; color: #666;">Completa il profilo al 100% per aumentare le possibilità di essere contattato.</p>
              </div>
              <a href="https://off32.it/login" style="display: inline-block; background: #fe3812; color: #fff; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 14px; margin-top: 8px;">
                Accedi alla tua dashboard →
              </a>
              <p style="color: #555; line-height: 1.7; margin-top: 32px;">A presto,<br/><strong>Il team OFF32</strong></p>
            </div>
            <div style="background: #0D0D0D; padding: 20px 32px; text-align: center;">
              <p style="color: #444; font-size: 11px; margin: 0; letter-spacing: 1px;">© 2025 OFF32 · OFFICINA DIGITALE · off32.it</p>
            </div>
          </div>
        `
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Errore invio email' }, { status: 500 })
  }
}
