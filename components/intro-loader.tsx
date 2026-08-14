"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type IntroLoaderProps = {
  onComplete: () => void
  durationMs?: number
}

export function IntroLoader({ onComplete, durationMs = 1700 }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))

      if (t < 1) {
        frame = requestAnimationFrame(tick)
        return
      }

      setExiting(true)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [durationMs])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (exiting) onComplete()
      }}
      aria-live="polite"
      aria-busy={!exiting}
      role="status"
    >
      <div className="flex flex-col items-center">
        <div className="relative h-[100px] w-[100px]">
          {/* Empty / base state */}
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#161616] ring-1 ring-white/10">
            <span className="font-display text-[2rem] font-bold tracking-tight text-white/25">JL</span>
          </div>

          {/* Filled state rises from the bottom — Adham jPreLoader pattern */}
          <div
            className="absolute inset-x-0 bottom-0 overflow-hidden transition-[height] duration-75 ease-linear"
            style={{ height: `${progress}%` }}
          >
            <div className="absolute bottom-0 left-0 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#ff5a1f]">
              <span className="font-display text-[2rem] font-bold tracking-tight text-[#050505]">JL</span>
            </div>
          </div>
        </div>

        <p className="mt-8 font-body text-sm tabular-nums tracking-[0.08em] text-white/55">
          {progress}%
        </p>
      </div>
    </motion.div>
  )
}
