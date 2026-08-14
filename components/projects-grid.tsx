"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export type ProjectItem = {
  title: string
  description: string
  category: string
  tools: string
  image: string
  demoUrl?: string
  githubUrl?: string
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const [hovered, setHovered] = useState(false)
  const href = project.demoUrl || project.githubUrl

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href={href || "#projects"}
        target={href ? "_blank" : undefined}
        rel={href ? "noreferrer" : undefined}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414]">
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

            <p className="absolute left-4 top-4 z-10 text-xs tracking-wide text-white/70">{project.category}</p>

            <motion.div
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-black/30 backdrop-blur-sm"
              animate={{
                backgroundColor: hovered ? "rgba(255,90,31,0.95)" : "rgba(0,0,0,0.3)",
                borderColor: hovered ? "rgba(255,90,31,1)" : "rgba(255,255,255,0.35)",
              }}
              transition={{ duration: 0.28 }}
            >
              <motion.span
                className="block h-1.5 w-1.5 rounded-full bg-white"
                animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0.4 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute"
                initial={false}
                animate={{ opacity: hovered ? 1 : 0, rotate: hovered ? 0 : -45, scale: hovered ? 1 : 0.4 }}
                transition={{ duration: 0.28 }}
              >
                <ArrowUpRight className="h-4 w-4 text-white" />
              </motion.span>
            </motion.div>
          </div>

          <div className="px-5 pb-5 pt-4">
            <div className="mb-2 flex items-start justify-between gap-4">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-white">{project.title}</h3>
              <p className="shrink-0 pt-1 text-right text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
                {project.tools}
              </p>
            </div>
            <motion.p
              className="text-sm leading-relaxed text-white/55"
              animate={{ opacity: hovered ? 1 : 0.72, y: hovered ? 0 : 4 }}
              transition={{ duration: 0.3 }}
            >
              {project.description}
            </motion.p>
          </div>
        </div>
      </a>
    </motion.article>
  )
}

export function ProjectsGrid({ projects }: { projects: ProjectItem[] }) {
  return (
    <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-16 max-w-4xl font-display text-[clamp(1.6rem,3.6vw,2.7rem)] font-medium leading-[1.2] text-white"
      >
        Anyone can ship code. Some can make it <em className="italic">reliable</em>. A{" "}
        <span className="text-[#ff5a1f]">professional full stack developer</span> turns your product into an{" "}
        <em className="italic">experience</em> people actually use.
      </motion.p>

      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">PROJECTS</h2>
        <p className="max-w-xs text-right text-xs font-semibold uppercase leading-relaxed tracking-[0.14em] text-[#ff5a1f]">
          Full stack, AI, web design,
          <br />
          blockchain, cloud
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}
