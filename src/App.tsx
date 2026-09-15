import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type IconName =
  | 'arrow'
  | 'building'
  | 'check'
  | 'clock'
  | 'globe'
  | 'hammer'
  | 'menu'
  | 'quote'
  | 'spark'
  | 'target'
  | 'users'

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>,
    building: <><path d="M4 21V8l8-4v17"/><path d="M12 9h8v12"/><path d="M8 12h.01M8 16h.01M16 13h.01M16 17h.01M2 21h20"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>,
    hammer: <><path d="m14 4 6 6-3 3-6-6zM11 7 4 14l-1 5 5-1 7-7"/><path d="m4 14 4 4"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    quote: <><path d="M9 11H5a4 4 0 0 0 4 4V9a4 4 0 0 0-4-4"/><path d="M19 11h-4a4 4 0 0 0 4 4V9a4 4 0 0 0-4-4"/></>,
    spark: <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2z"/><path d="m18 14 .7 2.3L21 17l-2.3.7L18 20l-.7-2.3L15 17l2.3-.7zM5 15l.5 1.5L7 17l-1.5.5L5 19l-.5-1.5L3 17l1.5-.5z"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m15 9 6-6M17 3h4v4"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? 'brand--light' : ''}`} href="#accueil" aria-label="La Maison d'Apprentissage — Accueil">
      <svg className="brand__mark" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M7 22 24 8l17 14" />
        <path d="M11 20v18c5-3 9-3 13 0V20c-4-3-8-3-13 0Z" />
        <path d="M37 20v18c-5-3-9-3-13 0V20c4-3 8-3 13 0Z" />
      </svg>
      <span className="brand__copy"><strong>La Maison</strong><small>d'Apprentissage</small></span>
    </a>
  )
}

const programs = [
  { code: '01', icon: 'hammer' as IconName, title: 'Métiers du BTP', description: 'Développez les gestes, les méthodes et la culture sécurité indispensables pour évoluer sur un chantier.', tags: ['Sécurité chantier', 'Lecture de plans', 'Second œuvre'], color: 'coral' },
  { code: '02', icon: 'globe' as IconName, title: 'Français professionnel', description: 'Progressez à l’oral et à l’écrit pour communiquer avec confiance dans le monde du travail.', tags: ['FLE', 'Écrit professionnel', 'Oral métier'], color: 'blue' },
  { code: '03', icon: 'building' as IconName, title: 'Rénovation d’immeubles', description: 'Comprenez les étapes d’un projet de rénovation, du diagnostic initial au suivi des travaux.', tags: ['Diagnostic', 'Éco-rénovation', 'Gestion de projet'], color: 'yellow' },
]

const steps = [
  ['01', 'Échangeons', 'Nous faisons le point sur votre expérience, vos besoins et votre objectif professionnel.'],
  ['02', 'Construisons', 'Nous vous orientons vers un parcours concret et adapté à votre rythme.'],
  ['03', 'Apprenons', 'Vous progressez grâce à la pratique, aux mises en situation et à un suivi régulier.'],
  ['04', 'Avançons', 'Vous repartez avec des compétences directement mobilisables sur le terrain.'],
]

const testimonials = [
  {
    initials: 'KM',
    name: 'Karim M.',
    program: 'Parcours BTP',
    quote: 'La formation m’a permis de mieux comprendre l’organisation d’un chantier et surtout de gagner en assurance. Les explications étaient claires et toujours reliées à des situations concrètes.',
  },
  {
    initials: 'SN',
    name: 'Samira N.',
    program: 'Français professionnel',
    quote: 'J’avais du mal à prendre la parole au travail. Grâce aux exercices pratiques, je me sens aujourd’hui plus à l’aise pour échanger avec mon équipe et expliquer ce que je fais.',
  },
  {
    initials: 'AD',
    name: 'Amadou D.',
    program: 'Rénovation d’immeubles',
    quote: 'J’ai apprécié l’approche progressive et l’accompagnement. Je sais maintenant mieux identifier les étapes d’une rénovation et préparer mon projet avec une méthode précise.',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((item) => reveal.observe(item))
    return () => reveal.disconnect()
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Demande d’information — ${data.get('program') || 'Formation'}`)
    const body = encodeURIComponent(
      `Nom : ${data.get('name')}\nTéléphone : ${data.get('phone')}\nE-mail : ${data.get('email')}\nFormation : ${data.get('program')}\n\nMessage :\n${data.get('message') || 'Non renseigné'}`,
    )
    window.location.href = `mailto:lamaisondelapprentissage92@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }
  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Navigation principale">
            <a href="#formations" onClick={closeMenu}>Nos formations</a>
            <a href="#methode" onClick={closeMenu}>Notre approche</a>
            <a href="#ecole" onClick={closeMenu}>L’école</a>
            <a className="nav__cta" href="#contact" onClick={closeMenu}>Nous contacter <Icon name="arrow" size={17} /></a>
          </nav>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu" aria-expanded={menuOpen}><Icon name="menu" /></button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="accueil">
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Se former. Construire. Grandir.</p>
              <h1>Des compétences<br />qui bâtissent <em>l’avenir.</em></h1>
              <p className="hero-intro">La Maison d’Apprentissage accompagne les adultes vers des savoir-faire concrets dans le BTP, la rénovation et la maîtrise du français professionnel.</p>
              <div className="hero-actions"><a className="button button--primary" href="#formations">Découvrir nos formations <Icon name="arrow" size={18} /></a><a className="text-link" href="#contact">Parler de mon projet <span>↗</span></a></div>
              <div className="hero-proof"><div className="avatar-stack" aria-hidden="true"><span>FA</span><span>BT</span><span>+</span></div><p><strong>Une pédagogie de terrain</strong><br />Pensée pour les projets réels</p></div>
            </div>

            <div className="hero-visual" aria-label="Illustration d'une maison d'apprentissage">
              <div className="sun-shape" /><div className="plan-card plan-card--top"><span>APPRENDRE</span><strong>+</strong><span>PRATIQUER</span></div>
              <div className="house-illustration"><div className="house-roof"><span className="chimney" /></div><div className="house-body"><div className="window"><i /><i /><i /><i /></div><div className="door"><span>ENTREZ</span><i /></div><div className="bricks"><i /><i /><i /><i /><i /><i /></div></div></div>
              <div className="tool-card"><Icon name="hammer" size={28} /><div><small>APPRENDRE PAR</small><strong>LA PRATIQUE</strong></div></div><div className="mini-badge"><Icon name="spark" size={18} /> À votre rythme</div>
            </div>
          </div>
          <div className="ticker" aria-hidden="true"><div>FORMATION PROFESSIONNELLE <span>✦</span> SAVOIR-FAIRE <span>✦</span> ACCOMPAGNEMENT <span>✦</span> INSERTION <span>✦</span> FORMATION PROFESSIONNELLE <span>✦</span> SAVOIR-FAIRE</div></div>
        </section>

        <section className="programs-section section" id="formations">
          <div className="container">
            <div className="section-heading reveal"><div><p className="eyebrow eyebrow--dark"><span /> Nos parcours</p><h2>Apprendre un métier.<br /><em>Ouvrir de nouvelles portes.</em></h2></div><p>Des programmes ancrés dans la réalité professionnelle, pour acquérir des compétences utiles et progresser durablement.</p></div>
            <div className="program-grid">
              {programs.map((program) => <article className={`program-card program-card--${program.color} reveal`} key={program.code}><div className="program-card__top"><span>{program.code}</span><div className="program-icon"><Icon name={program.icon} size={31} /></div></div><h3>{program.title}</h3><p>{program.description}</p><ul>{program.tags.map((tag) => <li key={tag}><Icon name="check" size={15} /> {tag}</li>)}</ul><a href="#contact">En savoir plus <Icon name="arrow" size={17} /></a></article>)}
            </div>
            <p className="program-note reveal"><Icon name="spark" size={18} /> Vous avez un besoin spécifique ? Nous pouvons étudier un parcours adapté à votre projet.</p>
          </div>
        </section>

        <section className="method-section section" id="methode">
          <div className="container method-layout">
            <div className="method-visual reveal"><div className="blueprint-lines" /><div className="method-house"><div className="method-roof" /><div className="method-wall"><span /><span /><span /></div></div><div className="stamp">100%<small>CONCRET</small></div><div className="pencil" /></div>
            <div className="method-copy reveal"><p className="eyebrow"><span /> Notre méthode</p><h2>On apprend mieux<br />quand on <em>fait.</em></h2><p className="method-lead">Ici, la théorie prend vie. Chaque notion est reliée à une situation concrète pour mieux comprendre, mémoriser et agir.</p><div className="method-points"><div><span><Icon name="target" /></span><div><h3>Des objectifs clairs</h3><p>Un parcours construit autour de vos besoins et de votre niveau de départ.</p></div></div><div><span><Icon name="users" /></span><div><h3>Un accompagnement humain</h3><p>Des échanges réguliers pour progresser, dépasser les blocages et garder le cap.</p></div></div><div><span><Icon name="clock" /></span><div><h3>Un rythme adapté</h3><p>Des formats conçus pour s’intégrer à votre vie professionnelle et personnelle.</p></div></div></div></div>
          </div>
        </section>

        <section className="journey-section section" id="ecole"><div className="container"><div className="journey-heading reveal"><p className="eyebrow eyebrow--dark"><span /> Votre parcours</p><h2>De votre projet<br />à <em>votre réussite.</em></h2></div><div className="steps-grid">{steps.map(([number, title, text]) => <article className="step reveal" key={number}><div className="step-number">{number}</div><div className="step-line" /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

        <section className="testimonials-section section" id="temoignages">
          <div className="container">
            <div className="testimonials-heading reveal">
              <div><p className="eyebrow eyebrow--dark"><span /> Témoignages</p><h2>Des parcours qui<br /><em>prennent vie.</em></h2></div>
              <p className="demo-notice"><Icon name="spark" size={18} /><span><strong>Exemples de présentation</strong> — contenus fictifs à remplacer par des avis recueillis auprès de vos apprenants.</span></p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <article className="testimonial-card reveal" key={testimonial.name}>
                  <div className="testimonial-stars" aria-label="Exemple d'une note de cinq sur cinq">★★★★★</div>
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <div className="testimonial-author"><span>{testimonial.initials}</span><div><strong>{testimonial.name}</strong><small>{testimonial.program} · Avis de démonstration</small></div></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="quote-section"><div className="container quote-layout reveal"><Icon name="quote" size={56} /><blockquote>“Notre ambition : faire de chaque apprentissage un tremplin vers l’autonomie et l’emploi.”</blockquote><div className="quote-sign"><span>—</span><p><strong>La Maison d’Apprentissage</strong><br />Équipe pédagogique</p></div></div></section>

        <section className="contact-section section" id="contact">
          <div className="container contact-layout">
            <div className="contact-copy reveal"><p className="eyebrow"><span /> Parlons de votre projet</p><h2>Prêt à construire<br />la <em>prochaine étape ?</em></h2><p>Vous êtes salarié, demandeur d’emploi, entreprise ou simplement curieux ? Laissez-nous vos coordonnées : notre équipe vous répondra pour étudier votre besoin.</p><div className="contact-details"><div className="address-card"><span><Icon name="building" /></span><div><small>NOTRE ADRESSE</small><strong>32 rue Guy Môquet<br />92240 Malakoff</strong></div></div><div className="address-card"><span>@</span><div><small>NOTRE E-MAIL</small><a href="mailto:lamaisondelapprentissage92@gmail.com">lamaisondelapprentissage92@gmail.com</a></div></div></div></div>
            <form className="contact-form reveal" onSubmit={handleSubmit}>
              {submitted ? <div className="form-success" role="status"><span><Icon name="check" size={32} /></span><h3>Votre e-mail est prêt !</h3><p>Votre messagerie s’est ouverte avec la demande préremplie. Il ne vous reste plus qu’à cliquer sur « Envoyer ».</p><button type="button" onClick={() => setSubmitted(false)}>Préparer une autre demande</button></div> : <><div className="form-row"><label>Prénom et nom<input name="name" type="text" placeholder="Votre nom" required /></label><label>Téléphone<input name="phone" type="tel" placeholder="06 00 00 00 00" required /></label></div><label>Adresse e-mail<input name="email" type="email" placeholder="vous@exemple.fr" required /></label><label>Je suis intéressé(e) par<select name="program" defaultValue=""><option value="" disabled>Choisir une formation</option><option>Métiers du BTP</option><option>Français professionnel</option><option>Rénovation d’immeubles</option><option>Un parcours sur mesure</option></select></label><label>Votre message<textarea name="message" rows={4} placeholder="Parlez-nous de votre projet..." /></label><button className="button button--coral" type="submit">Envoyer ma demande <Icon name="arrow" size={18} /></button><small className="privacy">En envoyant ce formulaire, vous acceptez d’être recontacté(e) au sujet de votre demande.</small></>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-main"><div><Logo light /><p>Des compétences concrètes pour bâtir votre avenir professionnel.</p></div><div><h3>Navigation</h3><a href="#formations">Nos formations</a><a href="#methode">Notre approche</a><a href="#ecole">L’école</a><a href="#contact">Contact</a></div><div><h3>Nos domaines</h3><a href="#formations">BTP & chantier</a><a href="#formations">Français professionnel</a><a href="#formations">Rénovation immobilière</a></div><div><h3>Nous contacter</h3><p>32 rue Guy Môquet<br />92240 Malakoff<br />France</p><a className="footer-email" href="mailto:lamaisondelapprentissage92@gmail.com">lamaisondelapprentissage92@gmail.com</a></div></div><div className="container footer-bottom"><p>© {new Date().getFullYear()} La Maison d’Apprentissage</p><p>SAS · SIRET 935 350 082 00035 · APE 8559A</p></div></footer>
    </div>
  )
}

export default App
