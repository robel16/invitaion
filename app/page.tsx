'use client'

import { useCallback, useEffect, useRef, useState } from 'react' 
import gerjiMaryam from '../assets/gerjiMaryam.jpg'
/* ==================================================================
   EVERYTHING YOU EDIT LIVES IN THIS BLOCK.
   Photos are placeholders — swap the Unsplash ids for your own files
   in /public (e.g. '/photos/teklil.jpg') and the rest keeps working.
   ================================================================== */

const images = [
  
]
const COUPLE = { groom: 'Robel', bride: 'Mahlet', groomAm: 'ሮበል', brideAm: 'ማህሌት' }
const WEDDING_DATE = '2026-09-19T09:00:00+03:00'
const DATE_LONG = 'Saturday, September 19, 2026'
const DATE_AM = 'ቅዳሜ መስከረም ፱ ቀን ፳፻፲፱ ዓ.ም'
const CHURCH = 'Gerji Maryam Church'
const CHURCH_AM = 'ገርጂ ማርያም ቤተ ክርስቲያን'
const HOUSE = 'The family home · Tafo, Addis Ababa'

const MAP_QUERY = 'Medhanealem+Church,+Bole,+Addis+Ababa'
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`

/** The three arches — the days themselves. */
// const DATES = [
//   { n: '01', id: '/assets/gerjiMaryam.jpg', when: 'Fri · 05 Feb 2027', am: 'ሂና', title: 'The Henna Night', alt: 'Hands decorated with henna' },
//   { n: '02', id: 'photo-1519741497674-611481863552', when: 'Sat · 06 Feb 2027', am: 'ተክሊል', title: 'The Crowning', alt: 'A couple standing together' },
//   { n: '03', id: 'photo-1519225421980-715cb0215aed', when: 'Sun · 07 Feb 2027', am: 'መልስ', title: 'Melse', alt: 'A long celebration table' },
// ]
const DATES = [
  { n: '01', src: '/assets/wdd1.png', when: 'Fri · 05 Feb 2027', am: 'ሂና', title: 'The Henna Night', alt: 'Hands decorated with henna' },
  { n: '02', src: '/assets/kaba2.png', when: 'Sat · 06 Feb 2027', am: 'ተክሊል', title: 'The Crowning', alt: 'A couple standing together' },
  { n: '03', src: '/assets/melse.jpg', when: 'Sun · 07 Feb 2027', am: 'መልስ', title: 'Melse', alt: 'A long celebration table' },
]


const STORY = [
  {
    id: 'photo-1606216794074-735e91aa2c92',
    year: '2021',
    am: 'ቡና',
    title: 'It began over coffee',
    copy: 'A friend’s buna ceremony in Kazanchis. Three rounds — abol, tona, baraka — and by the third cup Robel had stopped pretending he came for the coffee.',
    alt: 'Traditional Ethiopian coffee ceremony',
  },
  {
    id: 'photo-1533090161767-e6ffed986c88',
    year: '2023',
    am: 'ሽምግልና',
    title: 'The elders came',
    copy: 'Two uncles, one aunt, and a very long silence before anyone spoke. The shimagille asked properly, Mahlet’s family answered properly, and the dabo was broken that same evening.',
    alt: 'Bread broken and shared at a family gathering',
  },
  {
    id: 'photo-1478146896981-b80fe463b330',
    year: '2025',
    am: 'ላሊበላ',
    title: 'Genna at Lalibela',
    copy: 'We walked down into Bete Giyorgis before sunrise, wrapped in netela, and stood in the cold with ten thousand people singing. We decided somewhere in there.',
    alt: 'Pilgrims at dawn in the highlands',
  },
  {
    id: 'photo-1511285560929-80b456fea0bc',
    year: '2027',
    am: 'ተክሊል',
    title: 'And now, the crown',
    copy: 'Qeddase at Medhanealem, the crowns and the kaba, and then the whole street walking with us back to the house. Come hungry.',
    alt: 'A celebration table prepared for guests',
  },
]

const NOTES = [
  {
    chapter: 'I',
    am: 'ስለ ልብስ',
    title: 'Dress for a church',
    copy: 'Habesha kemis and netela if you have them — anything modest if you don’t. Shoulders covered inside the church, and shoes come off at the threshold. The garden at the house is grass, so heels will lose.',
  },
  {
    chapter: 'II',
    am: 'ስለ ሰዓት',
    title: 'Two clocks, one day',
    copy: 'Every time below is written twice. Ethiopian time counts from sunrise, so 12:30 ጠዋት is 6:30 in the morning. If you are flying in, follow the small grey numbers.',
  },
  {
    chapter: 'III',
    am: 'ስለ ቤቱ',
    title: 'The house stays open',
    copy: 'The church is the ceremony; the house is the wedding. Doors are open from Friday evening through Sunday night in Bole — come for an hour or stay for the whole weekend.',
  },
]

/** The dive. One image at a time — scroll pushes you through it. */
const DIVE = [
  { id: 'photo-1497366216548-37526070297c', am: 'ቡና', title: 'The first coffee', meta: 'Kazanchis · 2021', alt: 'Steam rising from a coffee ceremony' },
  { id: 'photo-1522673607200-164d1b6ce486', am: 'ሽምግልና', title: 'The elders’ blessing', meta: 'Addis Ababa · 2023', alt: 'Family gathered around a table' },
  { id: 'photo-1470217957101-da7150b9b681', am: 'ላሊበላ', title: 'Genna at dawn', meta: 'Lalibela · 2025', alt: 'Highland landscape at first light' },
  { id: 'photo-1465495976277-4387d4b0b4c6', am: 'ቃል ኪዳን', title: 'The covenant', meta: 'Debre Selam · 2027', alt: 'Two hands joined' },
  { id: 'photo-1460978812857-470ed1c77af0', am: 'እስክስታ', title: 'Until tomorrow', meta: 'Bole · 2027', alt: 'Evening celebration under lights' },
]

const SCHEDULE = [
  { et: '12:30 ጠዋት', gc: '6:30 AM', am: 'ቅዳሴ', title: 'Qeddase', copy: 'The Divine Liturgy. Come early if you intend to receive communion with us — the church fills fast.', where: 'The church', icon: 'cross' },
  { et: '3:00 ጠዋት', gc: '9:00 AM', am: 'ተክሊል', title: 'The Crowning', copy: 'The priest crowns us and wraps the kaba. This is the wedding itself; everything after is celebration.', where: 'The church', icon: 'crown' },
  { et: '6:00 ቀትር', gc: '12:00 PM', am: 'ተልዕኮ', title: 'Telosh', copy: 'The groom’s party walks to the bride’s family home with singing, drums and the ceremonial umbrella.', where: 'Bole', icon: 'umbrella' },
  { et: '9:00 ከሰዓት', gc: '3:00 PM', am: 'ግብዣ', title: 'The Reception', copy: 'Injera, doro wot, kitfo and tibs at the house. Tej for anyone brave enough. Vegetarian fasting dishes on every table.', where: 'The house', icon: 'plate' },
  { et: '11:00 ከሰዓት', gc: '5:00 PM', am: 'ቡና', title: 'The Coffee', copy: 'Jebena buna in the garden — three rounds, popcorn, and enough incense to find us from the street.', where: 'The house', icon: 'jebena' },
  { et: '1:00 ማታ', gc: '7:00 PM', am: 'እስክስታ', title: 'Eskista', copy: 'Masinko, kebero and an azmari who will absolutely sing about you by name. It ends when it ends.', where: 'The house', icon: 'drum' },
]

// const PLACES = [
//   {
//     id: 'photo-1445019980597-93fa8acb246c',
//     name: CHURCH,
//     am: CHURCH_AM,
//     tag: 'The ceremony · Bole',
//     copy: 'Qeddase begins at 12:30 ጠዋት (6:30 AM). Enter from the eastern gate; there is a shoe rack under the arch. Photography is welcome in the courtyard but not during the liturgy.',
//     facts: [['Arrive', '12:15 ጠዋት · 6:15 AM'], ['Parking', 'Free, eastern gate'], ['Note', 'Shoulders covered']] as const,
//   },
//   {
//     id: 'photo-1566073771259-6a8506099945',
//     name: 'The family home',
//     am: 'የቤተሰብ ቤት',
//     tag: 'The celebration · Bole',
//     copy: 'Everything after the church happens here, and the invitation is for the whole weekend. Blue taxis know the corner; tell the driver it is the house with the white gate behind the Medhanealem compound.',
//     facts: [['Open', 'Fri 6 PM – Sun late'], ['Distance', '6 min from the church'], ['Parking', 'On the side street']] as const,
//   },
//   {
//     id: 'photo-1445019980597-93fa8acb246c',
//     name: 'Where to stay',
//     am: 'ማረፊያ',
//     tag: 'For guests flying in',
//     copy: 'Bole is the place to be — everything is fifteen minutes from the airport and a short ride from the house. Rooms are held under the family name at both hotels until 10 January.',
//     facts: [['Nearby', 'Skylight & Hyatt Regency'], ['From', 'ETB 6,500 / night'], ['Airport', '15 min · ADD']] as const,
//   },
// ]
const PLACES = [
  {
    img: '/assets/gerjiMaryam.jpg',
    name: CHURCH,
    am: CHURCH_AM,
    tag: 'The ceremony · Bole',
    copy: 'Qeddase begins at 12:30 ጠዋት (6:30 AM). Enter from the eastern gate; there is a shoe rack under the arch. Photography is welcome in the courtyard but not during the liturgy.',
    facts: [['Arrive', '12:15 ጠዋት · 6:15 AM'], ['Parking', 'Free, eastern gate'], ['Note', 'Shoulders covered']] as const,
  },
  {
    img: '/assets/gerjiMaryam.jpg',
    name: 'The family home',
    am: 'የቤተሰብ ቤት',
    tag: 'The celebration · Bole',
    copy: 'Everything after the church happens here, and the invitation is for the whole weekend. Blue taxis know the corner; tell the driver it is the house with the white gate behind the Medhanealem compound.',
    facts: [['Open', 'Fri 6 PM – Sun late'], ['Distance', '6 min from the church'], ['Parking', 'On the side street']] as const,
  },
  {
   img: '/assets/gerjiMaryam.jpg',
    name: 'Where to stay',
    am: 'ማረፊያ',
    tag: 'For guests flying in',
    copy: 'Bole is the place to be — everything is fifteen minutes from the airport and a short ride from the house. Rooms are held under the family name at both hotels until 10 January.',
    facts: [['Nearby', 'Skylight & Hyatt Regency'], ['From', 'ETB 6,500 / night'], ['Airport', '15 min · ADD']] as const,
  },
]

/* ------------------------------------------------------------ icons */

function Icon({ name }: { name: string }) {
  const p = { className: 'schedule-icon', viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', strokeWidth: 1, 'aria-hidden': true } as const
  switch (name) {
    case 'cross': // Ethiopian hand cross
      return (
        <svg {...p}>
          <path d="M16 3v26M6 12h20M11 3h10M11 29h10M6 8v8M26 8v8" />
          <path d="M16 6 23 12 16 18 9 12Z" opacity=".45" />
        </svg>
      )
    case 'crown':
      return (
        <svg {...p}>
          <path d="M5 22 4 9l6 5 6-9 6 9 6-5-1 13Z" />
          <path d="M5 26h22" />
        </svg>
      )
    case 'umbrella': // the ceremonial procession umbrella
      return (
        <svg {...p}>
          <path d="M2 16a14 9 0 0 1 28 0Z" />
          <path d="M16 16v11a3 3 0 0 0 5 2" />
          <path d="M9 16c0-6 3-9 7-9s7 3 7 9" opacity=".45" />
        </svg>
      )
    case 'plate': // mesob
      return (
        <svg {...p}>
          <path d="M4 26h24M6 26 8 12h16l2 14" />
          <path d="M8 12a8 5 0 0 1 16 0" />
          <path d="M12 18h8" opacity=".45" />
        </svg>
      )
    case 'jebena': // coffee pot
      return (
        <svg {...p}>
          <path d="M13 5h6l-1 5c4 2 6 6 6 10a8 8 0 0 1-16 0c0-4 2-8 6-10Z" />
          <path d="M22 14c3 0 4 2 3 4" />
          <path d="M14 3h4" />
        </svg>
      )
    default: // kebero drum
      return (
        <svg {...p}>
          <path d="M7 9h18l-2 16H9Z" />
          <path d="M7 9a9 3 0 0 1 18 0M9 25a7 2.5 0 0 0 14 0" />
          <path d="m9 13 14 8M23 13 9 21" opacity=".45" />
        </svg>
      )
  }
}

/* -------------------------------------------------------- primitives */

function Reveal({
  children,
  as: Tag = 'div',
  motion,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  as?: 'div' | 'section' | 'article' | 'header'
  motion?: 'left' | 'right'
  delay?: number
  className?: string
}) {
  const cls = ['reveal', motion === 'left' ? 'reveal-left' : motion === 'right' ? 'reveal-right' : '', className]
    .filter(Boolean)
    .join(' ')
  return (
    <Tag className={cls} style={{ ['--reveal-delay' as string]: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((n) => n.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
}

function useCountdown(target: string) {
  const [left, setLeft] = useState<[string, number][]>([
    ['days', 0],
    ['hrs', 0],
    ['min', 0],
    ['sec', 0],
  ])
  useEffect(() => {
    const end = new Date(target).getTime()
    const tick = () => {
      const d = Math.max(0, end - Date.now())
      setLeft([
        ['days', Math.floor(d / 86400000)],
        ['hrs', Math.floor(d / 3600000) % 24],
        ['min', Math.floor(d / 60000) % 60],
        ['sec', Math.floor(d / 1000) % 60],
      ])
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  return left
}

/** Native <dialog>, so focus trap, Esc and inert background come free. */
function useDialog(open: boolean) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])
  return ref
}

function Confetti({ fire }: { fire: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!fire) return
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    const colors = ['#16171b', '#9a7b3f', '#fbfaf8', '#6e6e6b']
    const pieces = Array.from({ length: 90 }, (_, i) => ({
      x: w / 2 + (Math.random() - 0.5) * 80,
      y: h * 0.58,
      vx: (Math.random() - 0.5) * 10,
      vy: -Math.random() * 11 - 5,
      size: Math.random() * 6 + 3,
      spin: (Math.random() - 0.5) * 0.25,
      rot: Math.random() * Math.PI,
      color: colors[i % colors.length],
    }))

    let raf = 0
    let frame = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pieces) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.24
        p.vx *= 0.995
        p.rot += p.spin
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = Math.max(0, 1 - frame / 145)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55)
        ctx.restore()
      }
      frame++
      if (frame < 145) raf = requestAnimationFrame(draw)
      else ctx.clearRect(0, 0, w, h)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [fire])
  return <canvas ref={ref} className="confetti" aria-hidden="true" />
}

/* ------------------------------------------------------------- page */

export default function Page() {
  useReveal()
  const countdown = useCountdown(WEDDING_DATE)

  const [rsvpOpen, setRsvpOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answer, setAnswer] = useState<'yes' | 'no'>('yes')
  const [guests, setGuests] = useState('1')
  const [name, setName] = useState('')
  // step 0 is unmounted by the time the form submits, so contact has to live
  // in state — FormData would only see the fields still on screen.
  const [contact, setContact] = useState('')
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [fire, setFire] = useState(0)

  const rsvpRef = useDialog(rsvpOpen)

  const closeRsvp = useCallback(() => {
    setRsvpOpen(false)
    window.setTimeout(() => setStep(0), 340) // let the drawer finish sliding out first
  }, [])

  const openRsvp = useCallback(() => {
    setStep(0)
    setSendError('')
    setRsvpOpen(true)
  }, [])

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setSending(true)
    setSendError('')
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          contact,
          attending: answer,
          guests: answer === 'yes' ? guests : '0',
          notes: data.get('notes'),
          song: data.get('song'),
          invitationSide:data.get('invitation_side')
        }),
      })
      console.log("response:::::::::::::::;", response);
      if (!response.ok) {
        const { error } = await response.json().catch(() => ({ error: '' }))
        throw new Error(error || 'Could not send your reply.')
      }
      // only celebrate once it has actually landed
      setStep(3)
      setFire((n) => n + 1)
    } catch (error) {
      setSendError(error instanceof Error ? error.message : 'Could not send your reply.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="page">
      <nav className="nav" aria-label="Primary">
        <a href="#top" className="nav-mark am">ሮ · ማ</a>
        <div className="nav-links">
          <a href="#story">Our story</a>
          <a href="#moments">Moments</a>
          <a href="#day">The day</a>
          <a href="#places">Where</a>
        </div>
        <a className="nav-cta" href="#places">
          Direction <span aria-hidden="true">→</span>
        </a>
      </nav>

      <main id="top">
        {/* ------------------------------------------------------- hero */}
        <header className="hero section-head">
          <div className="hero-lede stagger">
            <p className="label muted" style={{ ['--i' as string]: 0 }}>
              <span className="am">ተክሊል</span> · Holy Matrimony
            </p>
            <h1 className="display" style={{ ['--i' as string]: 1 }}>
              Save
              <br />
              the
              <br />
              dates
            </h1>
            <p className="hero-names" style={{ ['--i' as string]: 2 }}>
              {COUPLE.groom} &amp; {COUPLE.bride}
            </p>
            <p className="hero-meta" style={{ ['--i' as string]: 3 }}>
              {DATE_LONG} · Addis Ababa
            </p>
            <Seal />
          </div>

          {/* <div>
            <ul className="dates" role="list">
              {DATES.map((d) => (
                <li className="date-card" key={d.n}>
                  <div className="arch">
                    <img src={img(d.id, 900)} alt={d.alt} loading="lazy" decoding="async" />
                    <span className="arch-num" aria-hidden="true">{d.n}.</span>
                  </div>
                  <div className="date-stem" aria-hidden="true" />
                  <div className="date-meta">
                    <p className="label">{d.when}</p>
                    <h3>{d.title}</h3>
                    <p className="am">{d.am}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="swipe-hint">Swipe →</p>
          </div> */}

          <div>
            <ul className="dates" role="list">
              {DATES.map((d) => (
                <li className="date-card" key={d.n}>
                  <div className="arch">
                    <img src={d.src} alt={d.alt} loading="lazy" decoding="async" />
                    <span className="arch-num" aria-hidden="true">{d.n}.</span>
                  </div>
                  <div className="date-stem" aria-hidden="true" />
                  <div className="date-meta">
                    <p className="label">{d.when}</p>
                    <h3>{d.title}</h3>
                    <p className="am">{d.am}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="swipe-hint">Swipe →</p>
          </div>
        </header>

        {/* -------------------------------------------------- countdown */}
        <section className="countdown" aria-label="Countdown">
          <p className="label muted">
            <span className="am">ቀሪ ጊዜ</span> · Until the crowning
          </p>
          <div className="countdown-grid">
            {countdown.map(([label, value]) => (
              <p className="count-unit" key={label}>
                {/* re-keying on the value restarts the flip whenever a digit turns */}
                <strong className="count-value" key={value} style={{ animation: 'flip-in 300ms cubic-bezier(0.22,1,0.36,1) both' }}>
                  {String(value).padStart(2, '0')}
                </strong>
                <small>{label}</small>
              </p>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------- our story */}
        <section className="section" id="story" aria-labelledby="story-title">
          <Reveal className="section-head">
            <p className="label muted"><span className="am">ታሪካችን</span> · Our story</p>
            <h2 className="title" id="story-title">It began<br />over coffee</h2>
          </Reveal>

          <div className="story-rail">
            <svg className="story-path" viewBox="0 0 90 1000" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength={1} d="M45 0 C 12 130, 78 250, 45 380 S 12 620, 45 750 S 78 900, 45 1000" />
            </svg>

            {STORY.map((item, i) => (
              <article className="story-item" key={item.year}>
                <Reveal className="story-media" motion={i % 2 === 0 ? 'left' : 'right'}>
                  <figure className="story-figure">
                    <img src={img(item.id, 900)} alt={item.alt} loading="lazy" decoding="async" />
                  </figure>
                </Reveal>
                <Reveal className="story-copy" motion={i % 2 === 0 ? 'right' : 'left'} delay={100}>
                  <p className="label muted">
                    {item.year} · <span className="am">{item.am}</span>
                  </p>
                  <h3>{item.title}</h3>
                  <p className="body-copy">{item.copy}</p>
                </Reveal>
                <span className="story-node" aria-hidden="true" />
              </article>
            ))}
          </div>

          <Reveal>
            <span className="signature am">ዮ + ማ</span>
          </Reveal>
        </section>

        {/* ------------------------------------------------ notes stack */}
        <section className="stack" aria-label="Before you come">
          {NOTES.map((note, i) => (
            <article className="stack-card" key={note.chapter} style={{ ['--i' as string]: i }}>
              <p className="chapter" aria-hidden="true">{note.chapter}</p>
              <div>
                <p className="label muted am">{note.am}</p>
                <h3>{note.title}</h3>
                <p className="body-copy">{note.copy}</p>
              </div>
            </article>
          ))}
        </section>

        {/* ============================================== the dive =====
            One image. Scrolling pushes you into it until the next frame
            has already taken over. No grid, no list.
            ========================================================= */}
        <section className="dive" id="moments" aria-label="Moments from our story">
          <div className="dive-stage">
            <div className="dive-layers">
              {DIVE.map((frame) => (
                <div className="dive-layer" key={frame.id}>
                  <img src={img(frame.id, 2000)} alt={frame.alt} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>

            <div className="dive-vignette" aria-hidden="true" />

            <div className="dive-head">
              <p className="label"><span className="am">ትዝታዎች</span> · Frames from the in-between</p>
            </div>

            <div className="dive-caption">
              <div className="caps">
                {DIVE.map((frame) => (
                  <div className="dive-cap" key={frame.id}>
                    <p className="label am">{frame.am}</p>
                    <h3>{frame.title}</h3>
                    <p className="meta">{frame.meta}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="dive-progress" aria-hidden="true"><i /></div>
          </div>

          {/* invisible scroll rulers — one viewport per frame */}
          {DIVE.map((frame) => (
            <span className="dive-track" key={`t-${frame.id}`} aria-hidden="true" />
          ))}
        </section>

        {/* --------------------------------------------------- schedule */}
        <section className="section" id="day" aria-labelledby="day-title">
          <Reveal className="section-head">
            <p className="label muted"><span className="am">መርሐ ግብር</span> · The day</p>
            <h2 className="title" id="day-title">{DATE_LONG}</h2>
            <p className="label muted am" style={{ marginTop: 10 }}>{DATE_AM}</p>
          </Reveal>

          <div className="schedule-list">
            {SCHEDULE.map((row, i) => (
              <Reveal as="article" className="schedule-row" key={row.title} delay={i * 70}>
                <Icon name={row.icon} />
                <p className="schedule-time">
                  <b className="am">{row.et}</b>
                  <span>{row.gc}</span>
                </p>
                <div>
                  <h3>
                    <span className="am">{row.am}</span>
                    {row.title}
                  </h3>
                  <p>{row.copy}</p>
                </div>
                <p className="schedule-where">{row.where}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------- places */}
        <section className="section" id="places" aria-labelledby="places-title">
          <Reveal className="section-head">
            <p className="label muted"><span className="am">ቦታው</span> · Where</p>
            <h2 className="title" id="places-title">The church,<br />then the house</h2>
          </Reveal>

          {/* <div className="places">
            {PLACES.map((place, i) => (
              <Reveal key={place.name} delay={i * 90}>
                <details className="place">
                  <summary>
                    <div>
                      <h3>{place.name}</h3>
                      <p className="label">{place.tag}</p>
                    </div>
                    <svg className="plus" width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </summary>
                  <div className="place-body">
                    <img src={img(place.id, 800)} alt={place.name} loading="lazy" decoding="async" />
                    <p className="am" style={{ margin: '14px 0 0', fontSize: 14 }}>{place.am}</p>
                    <p>{place.copy}</p>
                    <dl>
                      {place.facts.map(([term, value]) => (
                        <div key={term} style={{ display: 'contents' }}>
                          <dt>{term}</dt>
                          <dd className={/[ሀ-፿]/.test(value) ? 'am' : undefined}>{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <a className="button button-ghost" href={MAP_LINK} target="_blank" rel="noreferrer">
                      Open in maps <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </details>
              </Reveal>
            ))}
          </div> */}

<div className="places">
  {PLACES.map((place, i) => (
    <Reveal key={typeof place.name === 'string' ? place.name : i} delay={i * 90}>
      <details className="place">
        <summary>
          <div>
            <h3>{place.name}</h3>
            <p className="label">{place.tag}</p>
          </div>
          <svg className="plus" width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1" />
          </svg>
        </summary>
        <div className="place-body">
          <img 
            src={place.img} 
            alt={typeof place.name === 'string' ? place.name : 'Place visual'} 
            loading="lazy" 
            decoding="async" 
          />
          <p className="am" style={{ margin: '14px 0 0', fontSize: 14 }}>{place.am}</p>
          <p>{place.copy}</p>
          <dl>
            {place.facts.map(([term, value]) => (
              <div key={term} style={{ display: 'contents' }}>
                <dt>{term}</dt>
                <dd className={/[ሀ-፿]/.test(value) ? 'am' : undefined}>{value}</dd>
              </div>
            ))}
          </dl>
          <a className="button button-ghost" href={MAP_LINK} target="_blank" rel="noreferrer">
            Open in maps <span aria-hidden="true">→</span>
          </a>
        </div>
      </details>
    </Reveal>
  ))}
</div>
          <Reveal className="map-panel">
            <iframe
              src={MAP_EMBED}
              title={`Map showing ${CHURCH} in Bole, Addis Ababa`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="map-aside">
              <p className="label muted am">{CHURCH_AM}</p>
              <h3 className="title" style={{ fontSize: 'clamp(24px, 6vw, 38px)', margin: '4px 0 0' }}>
                Bole,
                <br />
                Addis Ababa
              </h3>
              <p className="body-copy">
                Fifteen minutes from Bole International. The house is a six-minute walk from the church gate — {HOUSE.split(' · ')[1]}.
                Show a driver the code below if the address gets lost in translation.
              </p>
              <img
                className="qr"
                src={`https://quickchart.io/qr?text=${encodeURIComponent(MAP_LINK)}&size=240&margin=1`}
                alt="QR code linking to the church in Google Maps"
                loading="lazy"
                width={104}
                height={104}
              />
              <a className="button" href={MAP_LINK} target="_blank" rel="noreferrer">
                Get directions <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------------- rsvp */}
        <section className="rsvp-block" id="rsvp" aria-labelledby="rsvp-title">
          <div className="rsvp-media">
            <img src={img('photo-1464366400600-7168b8af9bc3', 2000)} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          </div>
          <div className="rsvp-inner">
            <p className="label"><span className="am">ግብዣ</span> · You are invited</p>
            <h2 className="display" id="rsvp-title">Come<br />bless us</h2>
            <p className="body-copy">
              Kindly reply by <b>10 January 2027</b> so the mesob is set for the right number. <span className="am">እናመሰግናለን።</span>
            </p>
            <button className="button button-light" onClick={openRsvp}>
              RSVP <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>

        <footer className="foot">
          <span className="am">{COUPLE.groomAm} + {COUPLE.brideAm}</span>
          <span>{CHURCH} · Addis Ababa</span>
          <span>06 · 02 · 2027</span>
        </footer>
      </main>

      {/* --------------------------------------------------- rsvp drawer */}
      <dialog className="drawer" ref={rsvpRef} onClose={closeRsvp} aria-labelledby="drawer-title">
        <button className="dialog-close" onClick={closeRsvp} aria-label="Close RSVP">×</button>

        {step < 3 && (
          <div className="steps" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <i key={i} data-on={String(i <= step)} />
            ))}
          </div>
        )}

        {step === 3 ? (
          <div className="step-panel thanks">
            <svg className="cross-mark" width="34" height="46" viewBox="0 0 32 44" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <path d="M16 2v40M4 14h24M10 2h12M8 9v10M24 9v10" />
            </svg>
            <p className="label muted">
              <span className="am">እናመሰግናለን</span> · Thank you, {name.split(' ')[0] || 'friend'}
            </p>
            <h2 id="drawer-title">{answer === 'yes' ? 'See you at the crowning' : 'You’ll be with us anyway'}</h2>
            <p className="body-copy">
              {answer === 'yes'
                ? 'Your seat is at the house. We’ll send the gate code and shuttle times closer to the day.'
                : 'We’ll keep a cup of buna poured for you and send photographs from the church.'}
            </p>
            <div className="drawer-actions">
              <button className="button" onClick={closeRsvp}>
                Close <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit}>
            {step === 0 && (
              <div className="step-panel">
                <p className="label muted">Step one of three</p>
                <h2 id="drawer-title">Who is replying?</h2>
                <label className="field">
                  <span>Full name</span>
                  <input name="name" required autoComplete="name" placeholder="Mahlet Tesfaye" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label className="field">
                  <span>Phone or email</span>
                  <input
                    name="contact"
                    required
                    autoComplete="tel"
                    placeholder="+251 …"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </label>
                <div className="drawer-actions">
                  <button type="button" className="button" disabled={!name.trim() || !contact.trim()} onClick={() => setStep(1)}>
                    Continue <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="step-panel">
                <p className="label muted">Step two of three</p>
                <h2 id="drawer-title">Will you join us?</h2>
                <div className="choice-row">
                  <label className="choice">
                    <input type="radio" name="attending" checked={answer === 'yes'} onChange={() => setAnswer('yes')} />
                    <b>Yes</b>
                    <small className="am">እገኛለሁ</small>
                  </label>
                  <label className="choice">
                    <input type="radio" name="attending" checked={answer === 'no'} onChange={() => setAnswer('no')} />
                    <b>Sadly no</b>
                    <small className="am">አልችልም</small>
                  </label>
                </div>
                {answer === 'yes' && (
                  <label className="field">
                    <span>Seats, including you</span>
                    <select name="guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
                      {['1', '2', '3', '4', '5', '6'].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </label>
                )}
                <div className="drawer-actions">
                  <button type="button" className="button" onClick={() => setStep(2)}>
                    Continue <span aria-hidden="true">→</span>
                  </button>
                  <button type="button" className="button button-ghost" onClick={() => setStep(0)}>Back</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="step-panel">
                <p className="label muted">Step three of three</p>
                <h2 id="drawer-title">Anything we should know?</h2>
                <label className="field">
    <span>Which side did you receive an invitation from?</span>
    <select name="invitation_side" defaultValue="" required>
      <option value="" disabled hidden>
        Select an option
      </option>
      <option value="Mahlet Melaku">Mahlet Melaku</option>
      <option value="Robel Muluwork">Robel Muluwork</option>
    </select>
  </label>
                <p className="field-hint">
                  {answer === 'yes'
                    ? `Reserving ${guests} seat${guests === '1' ? '' : 's'} at the house.`
                    : 'We will miss you — thank you for telling us.'}
                </p>
                {sendError && (
                  <p className="send-error" role="alert">{sendError}</p>
                )}
                <div className="drawer-actions">
                  <button type="submit" className="button" disabled={sending}>
                    {sending ? 'Sending…' : 'Send RSVP'} <span aria-hidden="true">→</span>
                  </button>
                  <button type="button" className="button button-ghost" disabled={sending} onClick={() => setStep(1)}>
                    Back
                  </button>
                </div>
                <p aria-live="polite" className="visually-hidden">
                  {sending ? 'Sending your reply' : sendError ? `Failed: ${sendError}` : ''}
                </p>
              </div>
            )}
          </form>
        )}
      </dialog>

      <Confetti fire={fire} />
    </div>
  )
}

/* The rotating seal from the printed invitation. */
function Seal() {
  return (
    <svg className="seal" viewBox="0 0 100 100" aria-hidden="true">
      <g className="seal-ring">
        <path id="seal-path" fill="none" d="M50 8a42 42 0 1 1-.01 0" />
        <text>
          <textPath href="#seal-path">YOU ARE INVITED · ተጋብዘዋል · </textPath>
        </text>
      </g>
      <path
        className="cross"
        d="M50 32v36M36 44h28M43 32h14M43 68h14M36 39v10M64 39v10"
      />
    </svg>
  )
}
