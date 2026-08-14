import type { Metadata } from "next"
import { RatesClient } from "./rates-client"

export const metadata: Metadata = {
  title: "Rate Card | Jerryfel Laraga",
  description:
    "Freelance and project rates for Jerryfel Laraga — Senior Full Stack Developer and Lead AI Developer with 8 years of experience.",
}

export default function RatesPage() {
  return <RatesClient />
}
