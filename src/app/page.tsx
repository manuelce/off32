export default function HomePage() {
  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '40px',
        textAlign: 'center',
        background: '#0D0D0D',
        overflow: 'hidden',
      }}
    >
      {/* VIDEO SFONDO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.45,
        }}
      >
        <source src="/train_small.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY per leggibilità */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(13,13,13,0.4) 0%, rgba(13,13,13,0.85) 100%)',
          zIndex: 1,
        }}
      />

      {/* CONTENUTO */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          maxWidth: '640px',
          width: '90%',
          textAlign: 'center',
        }}
      >
        <img
          src="/off32_green_cube.svg"
          alt="OFF32"
          style={{width: '20%', marginBottom: '48px',transform: 'translateX(200%)' }}
        />

        <div
          style={{
            fontSize: '10px',
            letterSpacing: '2.5px',
            color: '#fe3812',
            textTransform: 'uppercase',
            fontFamily: "'Axiforma', sans-serif",
            marginBottom: '20px',
          }}
        >
          // Officina in aggiornamento
        </div>

        <h1
          style={{
            fontFamily: "'Canela', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(32px, 5vw, 52px)',
            lineHeight: 1.1,
            letterSpacing: '-1px',
            color: '#F0EBE0',
            margin: '0 0 20px',
          }}
        >
          Stiamo aggiornando<br />il sito.
        </h1>

        <p
          style={{
            fontFamily: "'Axiforma', sans-serif",
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'rgba(240,235,224,0.65)',
            marginBottom: '32px',
          }}
        >
          OFF32 tornerà online a breve con una nuova esperienza.
        </p>

        <a
          href="mailto:info@off32.it"
          style={{
            display: 'inline-block',
            background: '#fe3812',
            color: '#fff',
            fontFamily: "'Axiforma', sans-serif",
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.5px',
            padding: '14px 32px',
            borderRadius: '999px',
            textDecoration: 'none',
          }}
        >
          Richieste urgenti → info@off32.it
        </a>
      </div>
    </main>
  )
}
