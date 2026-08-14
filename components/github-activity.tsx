"use client"

import { Github, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollReveal, AnimatedHeading } from "@/components/animations"

const LANGUAGES = [
  { name: "JavaScript", percent: 80 },
  { name: "TypeScript", percent: 70 },
  { name: "React", percent: 65 },
  { name: "PHP", percent: 50 },
  { name: "Python", percent: 35 },
]

const LEVEL_CLASS = [
  "bg-white/[0.06]",
  "bg-[#ff5a1f]/25",
  "bg-[#ff5a1f]/45",
  "bg-[#ff5a1f]/70",
  "bg-[#ff5a1f]",
]

function contributionLevel(index: number) {
  const x = Math.sin(index * 12.9898 + 78.233) * 43758.5453
  const r = x - Math.floor(x)
  if (r > 0.88) return 4
  if (r > 0.72) return 3
  if (r > 0.52) return 2
  if (r > 0.32) return 1
  return 0
}

function ContributionGraph() {
  const weeks = 52
  const days = 7

  return (
    <div className="w-full overflow-x-auto pb-1">
      <div className="inline-flex min-w-max gap-[3px]">
        {Array.from({ length: weeks }, (_, week) => (
          <div key={week} className="flex flex-col gap-[3px]">
            {Array.from({ length: days }, (_, day) => {
              const index = week * days + day
              const level = contributionLevel(index)
              return (
                <div
                  key={day}
                  className={`h-[11px] w-[11px] rounded-[2px] ${LEVEL_CLASS[level]}`}
                  title={`Activity level ${level}`}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export function GithubActivity() {
  return (
    <section className="border-t border-white/10 bg-[#050505] py-20 md:py-28" id="github">
      <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5a1f]">
              Open source
            </p>
            <AnimatedHeading className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-[-0.02em]">
              GitHub activity
            </AnimatedHeading>
            <p className="mt-3 text-white/60">
              A snapshot of how I ship — contributions, stack focus, and recent repositories.
            </p>
          </div>

          <a
            href="https://github.com/jerryfel13"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/80 px-5 text-sm text-white transition hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
          >
            <Github className="h-4 w-4" />
            @jerryfel13
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ScrollReveal>
            <div className="rounded-3xl border border-white/10 bg-[#0c0c0c] p-6 md:p-8">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold">Contribution graph</h3>
                  <p className="mt-1 text-sm text-white/50">Last 52 weeks · illustrative pattern</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/45">
                  <span>Less</span>
                  {LEVEL_CLASS.map((cls) => (
                    <span key={cls} className={`h-2.5 w-2.5 rounded-[2px] ${cls}`} />
                  ))}
                  <span>More</span>
                </div>
              </div>
              <ContributionGraph />
              <div className="mt-6 flex flex-wrap gap-6 border-t border-white/10 pt-5 text-sm">
                <div>
                  <p className="text-white/45">Public repos</p>
                  <p className="mt-0.5 font-display text-2xl font-bold text-white">20</p>
                </div>
                <div>
                  <p className="text-white/45">Profile</p>
                  <p className="mt-0.5 font-display text-2xl font-bold text-[#ff5a1f]">jerryfel13</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="h-full rounded-3xl border border-white/10 bg-[#0c0c0c] p-6 md:p-8">
              <h3 className="mb-6 font-display text-xl font-bold">Top languages</h3>
              <div className="space-y-5">
                {LANGUAGES.map((lang, index) => (
                  <div key={lang.name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-white/85">{lang.name}</span>
                      <span className="tabular-nums text-white/45">{lang.percent}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-[#ff5a1f]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
