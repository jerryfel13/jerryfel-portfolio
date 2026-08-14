"use client"

import { ScrollReveal, AnimatedHeading, StaggerContainer, StaggerItem } from "@/components/animations"

const SKILL_GROUPS = [
  {
    label: "01",
    title: "Frontend",
    blurb: "Interfaces that stay fast, clear, and production-ready across devices.",
    items: ["React JS", "Angular", "JavaScript", "HTML/CSS", "Tailwind CSS"],
  },
  {
    label: "02",
    title: "Backend",
    blurb: "APIs and services shaped for reliability, scale, and clean handoff.",
    items: ["Node.js", "PHP/Laravel", "Java/Spring Boot", "Python", "C#"],
  },
  {
    label: "03",
    title: "Data & platform",
    blurb: "Storage, cloud, and systems work that keeps products shipping.",
    items: ["MySQL", "Elasticsearch", "AWS", "Blockchain/DAML", "DevOps"],
  },
]

const SOFT_SKILLS = [
  "Empathy",
  "Attention to detail",
  "Communication",
  "Problem solving",
  "Quality focus",
  "Teamwork",
  "Adaptability",
  "Critical thinking",
  "Creativity",
]

export function SkillsSection() {
  return (
    <section className="border-t border-white/10 bg-[#050505] py-20 md:py-28" id="skills">
      <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5a1f]">
            What I bring
          </p>
          <AnimatedHeading className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-[-0.02em]">
            Skills & stack
          </AnimatedHeading>
          <p className="mt-3 text-white/60">
            The tools and craft I use to ship software, websites, and AI-powered products.
          </p>
        </div>

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <StaggerItem key={group.title}>
              <article className="h-full border-t border-white/15 pt-6 transition hover:border-[#ff5a1f]">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5a1f]">
                  {group.label} / {group.title}
                </p>
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-[1.75rem]">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{group.blurb}</p>
                <ul className="mt-6 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="relative pl-4 text-[0.95rem] text-white/80 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#ff5a1f] before:content-['']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal className="mt-16 border-t border-white/10 pt-10">
          <div className="grid gap-6 md:grid-cols-[minmax(10rem,16rem)_1fr] md:gap-12">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5a1f]">
                How I work
              </p>
              <h3 className="font-display text-xl font-bold">Soft skills</h3>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-2 text-[0.95rem] text-white/70">
              {SOFT_SKILLS.map((skill, index) => (
                <span key={skill} className="inline-flex items-center gap-3">
                  <span className="transition hover:text-white">{skill}</span>
                  {index < SOFT_SKILLS.length - 1 && (
                    <span className="text-[#ff5a1f]/70" aria-hidden>
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
