"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState("")

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const x = useSpring(mouseX, { stiffness: 500, damping: 35, mass: 0.4 })
  const y = useSpring(mouseY, { stiffness: 500, damping: 35, mass: 0.4 })

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const noReduce = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!finePointer || !noReduce) return
    setEnabled(true)
    document.documentElement.classList.add("has-custom-cursor")

    const isInteractive = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false
      if (el.closest("input, textarea, select")) return false
      return Boolean(el.closest("a, button, [role='button'], label, .group"))
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
      const target = e.target as Element | null
      const interactive = isInteractive(target)
      setHovering(interactive)
      const project = target?.closest("#projects a")
      setLabel(project ? "View" : "")
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    return () => {
      document.documentElement.classList.remove("has-custom-cursor")
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
    }
  }, [mouseX, mouseY])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative flex items-center justify-center rounded-full border border-white bg-transparent"
        animate={{
          width: hovering ? 56 : 12,
          height: hovering ? 56 : 12,
          x: hovering ? -28 : -6,
          y: hovering ? -28 : -6,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <motion.span
          className="absolute rounded-full bg-white"
          animate={{
            width: hovering ? 6 : 4,
            height: hovering ? 6 : 4,
            opacity: label ? 0 : 1,
          }}
        />
        <motion.span
          className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white"
          animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.8 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
