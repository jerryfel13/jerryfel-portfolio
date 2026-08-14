import "./globals.css"
import { Outfit, Manrope } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { CustomCursor } from "@/components/custom-cursor"
import { ReactNode } from "react"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "Jerryfel Laraga | Full Stack Developer",
  description:
    "Professional portfolio of Jerryfel Laraga, a Senior Full Stack and Lead AI Developer with 8 years of experience",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${manrope.variable} font-body antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <CustomCursor />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
