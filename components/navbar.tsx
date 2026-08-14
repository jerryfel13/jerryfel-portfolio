"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const HOME_SECTIONS = ["about", "skills", "experience", "projects", "contact"] as const

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isRates = pathname?.startsWith("/rates")

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isHome) {
      setActiveSection(isRates ? "rates" : "")
      return
    }

    const getActiveSection = () => {
      const headerOffset = 120
      let current: (typeof HOME_SECTIONS)[number] | "home" = "home"

      for (const id of HOME_SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - headerOffset <= 0) {
          current = id
        }
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        current = "contact"
      }

      setActiveSection(current)
    }

    getActiveSection()
    window.addEventListener("scroll", getActiveSection, { passive: true })
    window.addEventListener("resize", getActiveSection)
    return () => {
      window.removeEventListener("scroll", getActiveSection)
      window.removeEventListener("resize", getActiveSection)
    }
  }, [isHome, isRates])

  const section = (hash: string) => (isHome ? hash : `/${hash}`)

  const navLinks = [
    { name: "About me", href: section("#about"), id: "about" },
    { name: "My work", href: section("#projects"), id: "projects" },
    { name: "Experience", href: section("#experience"), id: "experience" },
    { name: "Rates", href: "/rates", id: "rates" },
  ]

  const isActive = (id: string) => activeSection === id

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex w-[min(1180px,calc(100%-2rem))] items-center justify-between">
        <Link href="/" className="font-display text-xl font-extrabold tracking-[0.18em] text-white">
          JERRYFEL
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.id)
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-body text-sm transition-colors ${
                  active ? "text-white" : "text-white/70 hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.name}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[#ff5a1f]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <Link
          href={section("#contact")}
          className="hidden md:inline-flex items-center rounded-full border border-white/80 px-5 py-2 text-sm text-white transition hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
        >
          Contact
        </Link>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-4 mt-3 rounded-xl bg-[#0c0c0c] border border-white/10 p-4"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block py-2 px-2 ${isActive(link.id) ? "text-[#ff5a1f]" : "text-white/80"}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href={section("#contact")}
                className="mt-2 inline-flex justify-center rounded-full border border-white/70 px-4 py-2 text-white"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
