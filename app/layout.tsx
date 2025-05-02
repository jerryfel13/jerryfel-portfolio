import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { ReactNode } from 'react'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Jerryfel Laraga | Full Stack Developer",
  description: "Professional portfolio of Jerryfel Laraga, a Full Stack Developer with 5 years of experience",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
