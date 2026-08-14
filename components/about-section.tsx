"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ScrollReveal, AnimatedHeading } from "@/components/animations"

const PRINCIPLES = [
  "See the product from the user’s and the team’s perspective",
  "Simplify complex full-stack and AI workflows",
  "Ship production-ready systems, then iterate on feedback",
]

const FACTS = [
  { label: "Based in", value: "Alabang, Muntinlupa City" },
  { label: "Open to", value: "Remote opportunities" },
  { label: "Certified", value: "DAML Developer Associate" },
]

export function AboutSection() {
  return (
    <section className="border-t border-white/10 bg-[#050505] py-20 md:py-28" id="about">
      <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ScrollReveal>
            <div className="relative mx-auto w-full max-w-md lg:mx-0">
              <div className="absolute -left-2 top-8 h-[78%] w-[78%] rotate-[-6deg] rounded-[1.75rem] border border-white/10 bg-[#141414]" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0c0c0c]">
                <div className="flex aspect-[4/5] flex-col justify-between p-7 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5a1f]">
                    About me
                  </p>
                  <div>
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#ff5a1f] font-display text-2xl font-extrabold text-[#050505]">
                      JL
                    </div>
                    <p className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                      Jerryfel
                      <span className="block text-white/55">Laraga</span>
                    </p>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
                      Senior Full Stack Developer and Lead AI Developer — building software teams can ship.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5a1f]">
              My approach
            </p>
            <AnimatedHeading className="mb-6 max-w-xl font-display text-[clamp(1.85rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              Good software is invisible — it simply works as expected.
            </AnimatedHeading>

            <ScrollReveal>
              <div className="max-w-xl space-y-4 text-[1.02rem] leading-relaxed text-white/65">
                <p>
                  I’m a software engineer with 8 years of experience shipping full-stack products,
                  websites, and AI-powered features end to end — from architecture and delivery through
                  handoff.
                </p>
                <p>
                  Right now I focus on senior full-stack work and leading AI development: clear scopes,
                  dependable timelines, and systems that stay maintainable after launch.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal className="mt-10">
              <h3 className="mb-4 font-display text-lg font-bold">Key principles of how I work</h3>
              <ul className="space-y-3">
                {PRINCIPLES.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.45 }}
                    className="flex items-start gap-3 text-[0.98rem] text-white/80"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5a1f]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff5a1f]">
                    {fact.label}
                  </p>
                  <p className="mt-1 text-sm text-white/75">{fact.value}</p>
                </div>
              ))}
            </ScrollReveal>

            <ScrollReveal className="mt-8">
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center rounded-full border border-white/80 px-6 text-sm text-white transition hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
              >
                Let&apos;s connect
              </a>
              <Link
                href="/rates"
                className="ml-4 inline-flex min-h-11 items-center text-sm text-white/60 underline underline-offset-4 transition hover:text-[#ff5a1f]"
              >
                View rates
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
