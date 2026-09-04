/**
 * Receives an RSVP and pushes it to Telegram.
 *
 * Set these in .env.local (see .env.example) and in your host's env vars:
 *   TELEGRAM_BOT_TOKEN — from @BotFather
 *   TELEGRAM_CHAT_ID   — the chat or group the bot posts into
 *
 * The token never reaches the browser: guests POST here, this runs on the server.
 */

const MAX = { name: 80, contact: 80, notes: 400, song: 120, invitationSide: 100}

/** Clamp anything off the wire to a trimmed string of known length. */
function str(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

// ponytail: in-memory, so the window resets whenever the instance recycles and
// each instance counts separately. Fine for a wedding; move to KV/Redis if this
// ever gets properly abused.
const HITS = new Map<string, number[]>()

function rateLimited(key: string) {
  const now = Date.now()
  const recent = (HITS.get(key) ?? []).filter((t) => now - t < 60_000)
  recent.push(now)
  HITS.set(key, recent)
  if (HITS.size > 500) HITS.clear() // crude cap so the map cannot grow forever
  return recent.length > 5
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    console.error('RSVP: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not set — see .env.example')
    return Response.json({ error: 'RSVP is not configured yet.' }, { status: 503 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) {
    return Response.json({ error: 'Too many replies from here. Try again in a minute.' }, { status: 429 })
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Bad request.' }, { status: 400 })
  }
  const body = (payload ?? {}) as Record<string, unknown>

  const name = str(body.name, MAX.name)
  if (!name) return Response.json({ error: 'A name is required.' }, { status: 400 })

  const attending = body.attending === 'yes'
  const seats = Math.min(Math.max(Number.parseInt(String(body.guests ?? '1'), 10) || 1, 1), 10)
  const contact = str(body.contact, MAX.contact)
  const notes = str(body.notes, MAX.notes)
  const song = str(body.song, MAX.song)
  const invitationSide = str(body.invitation_side, MAX.invitationSide)

  // Plain text on purpose — no parse_mode means no markup for a guest's name to
  // break, so nothing needs escaping.
  const lines = [
    attending ? '✅ RSVP — attending' : '🕊 RSVP — cannot come',
    '',
    `Name: ${name}`,
    contact && `Contact: ${contact}`,
    attending && `Seats: ${seats}`,
    notes && `Notes: ${notes}`,
    song && `Song: ${song}`,
    invitationSide &&  `invitationSide:${invitationSide}`,
    '',
    new Date().toLocaleString('en-GB', { timeZone: 'Africa/Addis_Ababa' }),
  ].filter(Boolean)

  const telegram = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: lines.join('\n'), disable_notification: false }),
  })

  if (!telegram.ok) {
    console.error('RSVP: Telegram rejected the message', telegram.status, await telegram.text())
    return Response.json({ error: 'Could not deliver the reply. Please try again.' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
