import type { Metadata } from "next"
import { Figtree, Syne } from "next/font/google"
import { RatesClient } from "./rates-client"

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-figtree",
})

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
})

export const metadata: Metadata = {
  title: "Rate Card | Jerryfel Laraga",
  description:
    "Freelance and project rates for Jerryfel Laraga — Senior Full Stack Developer and Lead AI Developer with 8 years of experience.",
}

export default function RatesPage() {
  return (
    <div className={`${figtree.variable} ${syne.variable} ${figtree.className}`}>
      <RatesClient />
    </div>
  )
}
