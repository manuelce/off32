# Linee guida per la community WhatsApp di Off32

Come tenere fuori dal gruppo e dalla community WhatsApp bot, numeri casuali, malintenzionati e servizi automatici.

Nessun sistema blocca il 100% degli accessi indesiderati. Con due livelli di filtro, uno su WhatsApp e uno sul sito, ci si va molto vicino.

---

## 1. Su WhatsApp: approvazione manuale

È la protezione più importante, perché funziona anche se il link di invito finisce nelle mani sbagliate.

- **Attivare l'approvazione dei nuovi membri** nelle impostazioni della community e di ogni gruppo. Chi apre il link non entra subito: invia una richiesta, e un amministratore la accetta o la rifiuta guardando nome, foto e numero.
- **Limitare i poteri dei membri.** Solo gli amministratori possono aggiungere persone e modificare nome, descrizione e immagine del gruppo.
- **Usare il gruppo annunci** della community per le comunicazioni ufficiali. Lì scrivono solo gli amministratori, quindi un eventuale bot non riesce a fare spam.
- **Reimpostare il link di invito** ogni tanto, e sempre quando gira dove non dovrebbe. Il vecchio link smette subito di funzionare.
- **Nominare due o tre co-amministratori** per gestire le richieste, così nessuno resta in attesa per giorni.

## 2. Sul sito: non pubblicare il link in chiaro

Se il link di invito è scritto nella pagina, i bot lo trovano leggendo il codice HTML. Va messo dietro un passaggio:

1. **Modulo di iscrizione** su `off32.it/community/unisciti` con nome, email, ruolo (per esempio UX designer o marketer) e, facoltativo, il profilo LinkedIn.
2. **Protezione anti-bot** sul modulo: Cloudflare Turnstile (gratuito e quasi invisibile per gli utenti) più un campo nascosto che solo i bot compilano (*honeypot*).
3. **Il link arriva per email**, non compare sulla pagina. Così si ha anche un indirizzo reale di ogni membro, utile per gli eventi.
4. **Controllo di coerenza:** quando arriva la richiesta su WhatsApp, l'amministratore verifica che quella persona abbia compilato il modulo. Chi non risulta tra gli iscritti viene rifiutato.

### Redirect per eventi, slide e QR code

Creare un redirect `off32.it/community/whatsapp` (un semplice redirect, non serve un reverse proxy). Deve puntare al **modulo di iscrizione**, non direttamente al gruppo. Vantaggi:

- indirizzo pulito da mettere su slide, QR code e post;
- se cambia qualcosa, si aggiorna un solo punto;
- si può contare quante persone ci cliccano.

## 3. Regole e moderazione

- **Regole chiare** nella descrizione della community: niente spam, niente autopromozione non richiesta, niente messaggi privati agli altri membri senza consenso.
- **Intervento rapido:** chi viola le regole viene rimosso e segnalato a WhatsApp.
- **Privacy dei membri:** nei gruppi in cui si chatta, i numeri di telefono sono visibili agli altri partecipanti. Va detto nel modulo d'iscrizione, ed è proprio il motivo per cui conviene filtrare bene chi entra.

## 4. WhatsApp e SEO

Quello che succede dentro WhatsApp non viene indicizzato da Google e non porta nulla alla SEO. La parte pubblica della community (home, eventi, meetup, recap, corsi) deve stare sul sito, in `off32.it/community/`. WhatsApp è lo strumento per parlarsi, il sito è quello che fa trovare la community.

---

## In sintesi

1. Modulo sul sito con protezione anti-bot.
2. Link di invito inviato per email, mai pubblicato in chiaro.
3. Approvazione manuale delle richieste su WhatsApp, incrociata con gli iscritti al modulo.

Con questi tre passaggi bot e numeri casuali restano fuori quasi sempre, e chi entra lascia un contatto verificato.
