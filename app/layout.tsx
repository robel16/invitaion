import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Ethiopic } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans-family', display: 'swap' })

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif-family',
  weight: ['300', '400', '500'],
  display: 'swap',
})

// Ge'ez / Amharic script — latin fonts have no Ethiopic coverage.
const ethiopic = Noto_Sans_Ethiopic({
  subsets: ['ethiopic'],
  variable: '--font-ethiopic-family',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ሮቢል & ማህሌት | Robel & Mahlet — Kurban, Addis Ababa',
  description:
    'Kurban · The Holy Matrimony of Robel and Mahlet at Gerji Maryam, Addis Ababa — Saturday, 6 February 2027, with the reception at the family home in Bole.',
  openGraph: {
    title: 'Robel and Mahlet — 6 February 2027',
    description: 'ቁርባን · An Ethiopian Orthodox Tewahedo wedding in Addis Ababa.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4f2ee',
  // userScalable stays on: pinch-zoom is an accessibility requirement.
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: browser extensions inject attributes onto <html>
    // (e.g. data-xt-extension-active) before React hydrates. This only ignores
    // attribute diffs on this one element — real mismatches inside still warn.
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorant.variable} ${ethiopic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
