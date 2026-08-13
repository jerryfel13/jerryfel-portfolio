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

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

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
    { name: "Home", href: "/", id: "home" },
    { name: "About", href: section("#about"), id: "about" },
    { name: "Skills", href: section("#skills"), id: "skills" },
    { name: "Experience", href: section("#experience"), id: "experience" },
    { name: "Projects", href: section("#projects"), id: "projects" },
    { name: "Rates", href: "/rates", id: "rates" },
    { name: "Contact", href: section("#contact"), id: "contact" },
  ]

  const inactiveClass = scrolled
    ? "text-gray-700 hover:text-gray-900"
    : "text-gray-200 hover:text-white"

  const activeClass = scrolled
    ? "text-gray-900 font-semibold"
    : "text-white font-semibold"

  const isActive = (id: string) => activeSection === id

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Link href="/" className={`text-xl font-bold ${scrolled ? "text-gray-900" : "text-white"}`}>
              JL
            </Link>
          </motion.div>

          <div className="hidden md:flex space-x-6">
            {navLinks.map((link, index) => {
              const active = isActive(link.id)
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className={`pb-1 transition-colors ${active ? activeClass : inactiveClass}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full ${
                        scrolled ? "bg-gray-900" : "bg-white"
                      }`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className={scrolled ? "text-gray-900" : "text-white"}
            >
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
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4 absolute left-4 right-4"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link, index) => {
                  const active = isActive(link.id)
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`block py-2 px-2 rounded-md ${
                          active
                            ? "text-gray-900 font-semibold bg-gray-100"
                            : "text-gray-700 hover:text-gray-900"
                        }`}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
