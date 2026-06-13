import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Job Prostuti - অ্যাডমিন প্যানেল',
  description: 'Job Prostuti অ্যাপ্লিকেশনের জন্য অ্যাডমিন প্যানেল',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn">
      <body className={inter.className}>{children}</body>
    </html>
  )
}