import { SignIn } from '@clerk/nextjs'

export default function LoginCatchAll() {
  return (
    <main style={{
      background: '#F0EBE0',
      minHeight: '100vh',
      fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <a href="/" style={{ marginBottom: '32px', textDecoration: 'none' }}>
        <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '36px' }} />
      </a>
      <SignIn
            routing="hash"
            forceRedirectUrl="/dashboard"
            appearance={{
             variables: {
            colorPrimary: '#fe3812',
            colorBackground: '#ffffff',
            colorText: '#0D0D0D',
            colorInputBackground: '#F8F5F0',
            colorInputText: '#0D0D0D',
            borderRadius: '8px',
          },
          elements: {
            card: { boxShadow: 'none', border: '1px solid #EDE8DF' },
            formButtonPrimary: { background: '#fe3812', borderRadius: '999px' },
            footerActionLink: { color: '#fe3812' },
          }
        }}
      />
      <p style={{ marginTop: '24px', fontSize: '12px', color: '#AAA098', textAlign: 'center' }}>
        Non sei ancora dentro?{' '}
        <a href="/apply" style={{ color: '#fe3812', fontWeight: 700 }}>Candidati come professionista →</a>
      </p>
    </main>
  )
}