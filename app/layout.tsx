import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "ResumeAI - Optimize Your Resume for ATS",
  description: "AI-powered resume analysis to help you pass ATS screenings and get more interviews.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://resume-ats-tracker.vercel.app'),
  keywords: ["resume optimizer", "ATS tracker", "AI resume analysis", "job application tracker", "resume keywords", "interview success", "career tools"],
  authors: [{ name: 'ResumeAI' }],
  creator: 'ResumeAI',
  publisher: 'ResumeAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'ResumeAI - AI-Powered Resume ATS Tracker & Optimizer',
    description: 'Boost your job hunt with ResumeAI. Our AI-powered platform analyzes your resume against job descriptions to optimize keywords, track applications, and improve interview chances.',
    siteName: 'ResumeAI',
    images: [
      {
        url: '/resume-logo.svg',
        width: 512,
        height: 512,
        alt: 'ResumeAI - AI-Powered Resume ATS Tracker & Optimizer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeAI - AI-Powered Resume ATS Tracker & Optimizer',
    description: 'Boost your job hunt with ResumeAI. Our AI-powered platform analyzes your resume against job descriptions to optimize keywords, track applications, and improve interview chances.',
    creator: '@resumeai',
    images: ['/resume-logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/resume-logo.svg',
    shortcut: '/resume-logo.svg',
    apple: '/resume-logo.svg',
    other: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/resume-logo.svg',
      },
      {
        rel: 'mask-icon',
        url: '/resume-logo.svg',
        color: '#38bdf8',
      },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [
        { url: '/rss/feed.xml', title: 'ResumeAI Blog RSS Feed' },
      ],
    },
  },
  category: 'technology',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}


import './globals.css'