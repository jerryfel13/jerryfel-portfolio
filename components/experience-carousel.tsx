"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type ExperienceItem = {
  title: string
  company: string
  location: string
  date: string
  bullets: string[]
}

function ExperienceCard({ job }: { job: ExperienceItem }) {
  const initials = job.company
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  return (
    <article className="h-[min(72vh,560px)] w-[min(78vw,440px)] shrink-0 rounded-[28px] border border-white/10 bg-[#141414] p-7 md:p-8 flex flex-col">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff5a1f]/15 font-display text-xl font-bold text-[#ff5a1f]">
        {initials}
      </div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5a1f]">
        {job.company}
      </p>
      <h3 className="font-display mb-4 text-2xl font-semibold leading-tight text-white">{job.title}</h3>
      <ul className="mb-6 flex-1 space-y-2 text-sm leading-relaxed text-white/65">
        {job.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <p className="text-sm text-white/45">
        {job.location} · {job.date}
      </p>
    </article>
  )
}

export function ExperienceCarousel({ jobs }: { jobs: ExperienceItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [travel, setTravel] = useState(0)

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setTravel(Math.max(0, track.scrollWidth - window.innerWidth))
    }

    measure()
    const frame = requestAnimationFrame(measure)
    const observer = new ResizeObserver(measure)
    if (trackRef.current) observer.observe(trackRef.current)
    window.addEventListener("resize", measure)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [jobs])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel])

  const nudge = (direction: -1 | 1) => {
    const distance = Math.max(window.innerHeight * 0.35, 280)
    window.scrollBy({ top: direction * distance, behavior: "smooth" })
  }

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100vh + ${travel}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex h-full items-center gap-6 pl-[8vw] pr-[12vw] will-change-transform"
        >
          <div className="w-[min(88vw,640px)] shrink-0 pr-6">
            <p className="mb-8 font-display text-sm font-semibold uppercase leading-relaxed tracking-[0.18em]">
              <span className="block text-[#ff5a1f]">Work</span>
              <span className="block text-white">Experience</span>
            </p>
            <p className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.25] text-white/90">
              Every challenge has more than one <em className="italic">answer</em>. I{" "}
              <em className="italic">explore, test, and ship</em> until it clicks. I don’t just write code.{" "}
              <em className="italic text-[#ff5a1f]">I rethink what the problem is.</em>
            </p>
          </div>

          {jobs.map((job) => (
            <ExperienceCard key={`${job.company}-${job.date}`} job={job} />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute bottom-8 left-[8vw] flex gap-3">
          <button
            type="button"
            onClick={() => nudge(-1)}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-sm text-white/80 backdrop-blur-sm transition hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous role
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-sm text-white/80 backdrop-blur-sm transition hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
          >
            Next role
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
