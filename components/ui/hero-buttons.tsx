'use client'

import { StaggerContainer, StaggerItem } from "@/components/animations"
import Link from "next/link"

export function HeroButtons() {
  return (
    <StaggerContainer className="flex flex-wrap gap-4 justify-center">
      <StaggerItem>
        <a
          href="#contact"
          className="inline-flex min-h-11 items-center rounded-full border border-white/80 px-6 text-sm text-white transition hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
        >
          Let's connect
        </a>
      </StaggerItem>
      <StaggerItem>
        <Link
          href="/rates"
          className="inline-flex min-h-11 items-center text-sm text-white/70 underline underline-offset-4 transition hover:text-[#ff5a1f]"
        >
          View rates
        </Link>
      </StaggerItem>
    </StaggerContainer>
  )
}
