"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

const coreRates = [
  {
    title: "Hourly",
    desc: "Feature work, AI integrations, consulting, code reviews, and scoped fixes.",
    price: "$10–$12",
    note: "per hour",
  },
  {
    title: "Day rate",
    desc: "Focused delivery days for builds, architecture, pairing, or AI solution design.",
    price: "$80–$100",
    note: "per day",
  },
  {
    title: "Landing page",
    desc: "Conversion-focused single page: responsive UI, form/CTA, basic SEO, and handoff.",
    price: "$1,000–$1,200",
    note: "per project",
  },
  {
    title: "Business website",
    desc: "Multi-page site with CMS or editable content, integrations, and performance polish.",
    price: "$3,500–$7,000",
    note: "per project",
  },
  {
    title: "Custom software / web app",
    desc: "Dashboards, portals, APIs, and product features — scoped after discovery.",
    price: "From $8,000",
    note: "starting point",
  },
  {
    title: "AI feature / agent build",
    desc: "LLM workflows, assistants, RAG, and production AI features led end to end.",
    price: "From $5,000",
    note: "starting point",
  },
  {
    title: "Care & maintenance",
    desc: "Updates, monitoring, small changes, and priority support for live products.",
    price: "$300–$600",
    note: "per month",
  },
]

const packages = [
  {
    name: "Starter",
    price: "$1,800",
    blurb: "A sharp web presence for freelancers and small businesses.",
    items: ["Up to 5 pages", "Mobile-responsive build", "Contact form", "Basic on-page SEO", "1 round of revisions"],
  },
  {
    name: "Growth",
    price: "$4,200",
    blurb: "A fuller site for brands that need content systems and lead capture.",
    items: [
      "Up to 10 pages",
      "CMS or editable sections",
      "Blog or resources setup",
      "Analytics & form integrations",
      "2 rounds of revisions",
    ],
  },
  {
    name: "Product / AI",
    price: "Custom",
    blurb: "Software and AI products shaped around your workflows — priced after discovery.",
    items: [
      "Requirements workshop",
      "Architecture & timeline",
      "Iterative delivery",
      "Auth, APIs, dashboards, or AI agents",
      "Handoff & documentation",
    ],
  },
]

const terms = [
  {
    title: "Deposit",
    body: "50% to start, remaining balance due before final handoff or go-live.",
  },
  {
    title: "Timeline",
    body: "Landing pages typically 1–2 weeks; business sites 3–6 weeks; custom/AI work on agreed milestones.",
  },
  {
    title: "Revisions",
    body: "Package rates include the listed revision rounds. Extra changes billed hourly.",
  },
  {
    title: "Ownership",
    body: "You own the deliverables after final payment. Third-party licenses remain with their vendors.",
  },
]

export function RatesClient() {
  const ratesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const year = document.getElementById("rate-year")
    if (year) year.textContent = String(new Date().getFullYear())

    const nodes = ratesRef.current?.querySelectorAll<HTMLElement>("[data-rate]")
    if (!nodes?.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-3")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    nodes.forEach((node, index) => {
      node.style.transitionDelay = `${index * 60}ms`
      observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-[#fafafa]">
      <header className="hero-grid relative flex min-h-[88svh] items-center overflow-hidden">
        <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))] pt-28 pb-16 text-center md:pb-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff5a1f] opacity-0 translate-y-5 animate-[rateRise_0.9s_cubic-bezier(0.22,1,0.36,1)_0.05s_forwards]">
            What I offer
          </p>
          <h1 className="font-display text-[clamp(3.2rem,12vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] opacity-0 translate-y-5 animate-[rateRise_0.9s_cubic-bezier(0.22,1,0.36,1)_0.15s_forwards]">
            <span className="block text-white">Rate card</span>
            <span className="mt-2 block text-[#ff5a1f]">SERVICES</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[clamp(1rem,2vw,1.2rem)] text-white/70 opacity-0 translate-y-5 animate-[rateRise_0.9s_cubic-bezier(0.22,1,0.36,1)_0.32s_forwards]">
            Senior full-stack and lead AI delivery — clear scopes, dependable timelines, and production-ready handoff.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 opacity-0 translate-y-5 animate-[rateRise_0.9s_cubic-bezier(0.22,1,0.36,1)_0.48s_forwards]">
            <a
              href="#rates"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#ff5a1f] px-6 text-sm font-semibold text-white transition hover:bg-[#e54e18]"
            >
              View rates
            </a>
            <Link
              href="/#experience"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/80 px-6 text-sm text-white transition hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
            >
              See experience
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section id="rates" className="border-t border-white/10 py-16 md:py-24">
          <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
            <div className="mb-10 max-w-2xl md:mb-14">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5a1f]">Core rates</p>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-[-0.02em]">
                Clear pricing for the work that ships
              </h2>
            </div>

            <div ref={ratesRef} className="border-t border-white/10">
              {coreRates.map((rate) => (
                <article
                  key={rate.title}
                  data-rate
                  className="grid grid-cols-1 items-start gap-3 border-b border-white/10 py-6 opacity-0 translate-y-3 transition duration-700 ease-out sm:grid-cols-[minmax(10rem,16rem)_1fr_auto] sm:gap-x-8"
                >
                  <h3 className="font-display text-[1.25rem] font-bold tracking-[-0.01em]">{rate.title}</h3>
                  <p className="max-w-xl text-[0.98rem] text-white/60">{rate.desc}</p>
                  <p className="text-left font-display text-[1.2rem] font-bold text-[#ff5a1f] sm:text-right sm:whitespace-nowrap">
                    {rate.price}
                    <span className="mt-0.5 block font-body text-[0.8rem] font-medium text-white/45">
                      {rate.note}
                    </span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
            <div className="mb-10 max-w-2xl md:mb-14">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5a1f]">Packages</p>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-[-0.02em]">
                Website & product packages
              </h2>
              <p className="mt-3 max-w-xl text-white/60">
                Typical engagements packaged so scope and investment stay easy to compare.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {packages.map((pkg) => (
                <article
                  key={pkg.name}
                  className="rounded-3xl border border-white/10 bg-[#0c0c0c] p-6 md:p-7"
                >
                  <h3 className="mb-1 font-display text-[1.35rem] font-bold">{pkg.name}</h3>
                  <p className="mb-3 font-display text-[1.6rem] font-bold text-[#ff5a1f]">{pkg.price}</p>
                  <p className="mb-5 text-[0.95rem] text-white/60">{pkg.blurb}</p>
                  <ul className="space-y-2.5">
                    {pkg.items.map((item) => (
                      <li
                        key={item}
                        className="relative pl-4 text-[0.92rem] text-white/80 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#ff5a1f] before:content-['']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16 md:py-24">
          <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
            <div className="mb-10 max-w-xl md:mb-12">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5a1f]">Working terms</p>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-[-0.02em]">
                Simple expectations
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 md:gap-x-12 md:gap-y-10">
              {terms.map((term) => (
                <article key={term.title}>
                  <h3 className="mb-2 font-display text-[1.15rem] font-bold">{term.title}</h3>
                  <p className="text-[0.98rem] text-white/60">{term.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-white/10 py-16 md:py-24">
          <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
            <h2 className="mb-10 text-center font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.02em]">
              Let&apos;s connect
            </h2>

            <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
              <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-white/10 bg-[#0c0c0c] p-8">
                <div className="text-center">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5a1f]">Take action</p>
                  <p className="font-display text-2xl font-bold md:text-3xl">Ready for a conversation?</p>
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-3xl border border-white/10 bg-[#0c0c0c] p-8">
                <p className="mb-6 max-w-md text-white/65">
                  Share your goals, timeline, and any references — I&apos;ll come back with a clear scope and quote.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:fellaraga@gmail.com?subject=Project%20inquiry%20—%20Jerryfel%20Laraga"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#ff5a1f] px-6 text-sm font-semibold !text-white transition hover:bg-[#e54e18]"
                  >
                    Send message
                  </a>
                  <Link
                    href="/#contact"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/80 px-6 text-sm text-white transition hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
                  >
                    Contact page
                  </Link>
                </div>
                <div className="mt-6 space-y-1 text-sm text-white/55">
                  <a href="mailto:fellaraga@gmail.com" className="block transition hover:text-[#ff5a1f]">
                    fellaraga@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jerryfel-laraga-18b9b3201/"
                    target="_blank"
                    rel="noreferrer"
                    className="block transition hover:text-[#ff5a1f]"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/50">
        <p>
          © <span id="rate-year" /> Jerryfel Laraga · Rate card
        </p>
      </footer>

      <style jsx global>{`
        @keyframes rateRise {
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}
