import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/language-context'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Bambou Hocepied - Architecture & Design',
  description: 'Contemporary architecture and interior design portfolio by Bambou Hocepied',
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <LanguageProvider>
          {children}

          {/* Footer removed — copyright moved into side menu */}

        </LanguageProvider>
      </body>
    </html>
  )
}
