"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

const coreRates = [
  {
    title: "Hourly",
    desc: "Feature work, AI integrations, consulting, code reviews, and scoped fixes.",
    price: "$75–$120",
    note: "per hour",
  },
  {
    title: "Day rate",
    desc: "Focused delivery days for builds, architecture, pairing, or AI solution design.",
    price: "$550–$850",
    note: "per day",
  },
  {
    title: "Landing page",
    desc: "Conversion-focused single page: responsive UI, form/CTA, basic SEO, and handoff.",
    price: "$1,500–$3,000",
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
    <div className="bg-[#eef3f0] text-[#0f1714]">
      <header className="relative isolate flex min-h-[100svh] items-end overflow-hidden text-[#f5f8f6]">
        <div className="absolute inset-0 -z-20" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="h-full w-full object-cover [transform:scale(1.04)] animate-[rateHeroZoom_18s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          />
        </div>
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,18,14,0.35)_0%,rgba(8,18,14,0.58)_55%,rgba(8,18,14,0.82)_100%),linear-gradient(90deg,rgba(8,18,14,0.45)_0%,transparent_55%)]"
          aria-hidden
        />

        <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))] max-w-xl pb-10 pt-28 md:pb-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8fd4b5] opacity-0 translate-y-5 animate-[rateRise_0.9s_cubic-bezier(0.22,1,0.36,1)_0.05s_forwards]">
            Rate card
          </p>
          <h1 className="mb-4 font-[family-name:var(--font-syne)] text-[clamp(2.75rem,8vw,5.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] opacity-0 translate-y-5 animate-[rateRise_0.9s_cubic-bezier(0.22,1,0.36,1)_0.15s_forwards]">
            Jerryfel Laraga
          </h1>
          <p className="mb-7 max-w-md text-[clamp(1.05rem,2.2vw,1.25rem)] font-medium text-[#f5f8f6]/85 opacity-0 translate-y-5 animate-[rateRise_0.9s_cubic-bezier(0.22,1,0.36,1)_0.32s_forwards]">
            Senior Full Stack Developer and Lead AI Developer — 8 years building software, websites, and AI-powered products.
          </p>
          <div className="flex flex-wrap gap-3 opacity-0 translate-y-5 animate-[rateRise_0.9s_cubic-bezier(0.22,1,0.36,1)_0.48s_forwards]">
            <a
              href="#rates"
              className="inline-flex min-h-11 items-center justify-center rounded-sm bg-[#f5f8f6] px-5 text-[0.95rem] font-semibold text-[#0f1714] transition hover:-translate-y-0.5 hover:bg-white"
            >
              View rates
            </a>
            <Link
              href="/#experience"
              className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[#f5f8f6]/45 px-5 text-[0.95rem] font-semibold text-[#f5f8f6] transition hover:-translate-y-0.5 hover:border-[#f5f8f6] hover:bg-[#f5f8f6]/10"
            >
              See experience
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[#f5f8f6]/45 px-5 text-[0.95rem] font-semibold text-[#f5f8f6] transition hover:-translate-y-0.5 hover:border-[#f5f8f6] hover:bg-[#f5f8f6]/10"
            >
              Portfolio
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section id="rates" className="py-16 md:py-24">
          <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
            <div className="mb-10 max-w-xl md:mb-12">
              <h2 className="mb-3 font-[family-name:var(--font-syne)] text-[clamp(1.85rem,4vw,2.6rem)] font-bold leading-tight tracking-[-0.02em]">
                Core rates
              </h2>
              <p className="text-[1.05rem] text-[#4a5c54]">
                Priced for senior full-stack and lead AI delivery — clear scopes, dependable timelines, and production-ready handoff.
              </p>
            </div>

            <div ref={ratesRef} className="border-t border-[#0f1714]/12">
              {coreRates.map((rate) => (
                <article
                  key={rate.title}
                  data-rate
                  className="grid grid-cols-1 items-start gap-3 border-b border-[#0f1714]/12 py-5 opacity-0 translate-y-3 transition duration-700 ease-out sm:grid-cols-[minmax(10rem,16rem)_1fr_auto] sm:gap-x-8"
                >
                  <h3 className="font-[family-name:var(--font-syne)] text-[1.2rem] font-bold tracking-[-0.01em]">
                    {rate.title}
                  </h3>
                  <p className="max-w-xl text-[0.98rem] text-[#4a5c54]">{rate.desc}</p>
                  <p className="text-right font-[family-name:var(--font-syne)] text-[1.15rem] font-bold text-[#145c44] sm:whitespace-nowrap">
                    {rate.price}
                    <span className="mt-0.5 block font-[family-name:var(--font-figtree)] text-[0.8rem] font-medium text-[#4a5c54]">
                      {rate.note}
                    </span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0f1714] py-16 text-[#f5f8f6] md:py-24">
          <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
            <div className="mb-10 max-w-xl md:mb-12">
              <h2 className="mb-3 font-[family-name:var(--font-syne)] text-[clamp(1.85rem,4vw,2.6rem)] font-bold leading-tight tracking-[-0.02em]">
                Website & product packages
              </h2>
              <p className="text-[1.05rem] text-[#f5f8f6]/70">
                Typical engagements packaged so scope and investment stay easy to compare.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {packages.map((pkg) => (
                <article key={pkg.name} className="border-t border-[#f5f8f6]/20 pt-5">
                  <h3 className="mb-1 font-[family-name:var(--font-syne)] text-[1.35rem] font-bold">{pkg.name}</h3>
                  <p className="mb-3 font-[family-name:var(--font-syne)] text-[1.5rem] font-bold text-[#8fd4b5]">{pkg.price}</p>
                  <p className="mb-4 text-[0.98rem] text-[#f5f8f6]/72">{pkg.blurb}</p>
                  <ul className="space-y-2">
                    {pkg.items.map((item) => (
                      <li
                        key={item}
                        className="relative pl-4 text-[0.95rem] text-[#f5f8f6]/88 before:absolute before:left-0 before:top-[0.55em] before:h-[0.45rem] before:w-[0.45rem] before:bg-[#8fd4b5] before:content-['']"
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

        <section className="py-16 md:py-24">
          <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
            <div className="mb-10 max-w-xl md:mb-12">
              <h2 className="mb-3 font-[family-name:var(--font-syne)] text-[clamp(1.85rem,4vw,2.6rem)] font-bold leading-tight tracking-[-0.02em]">
                Working terms
              </h2>
              <p className="text-[1.05rem] text-[#4a5c54]">
                Simple expectations so projects stay clear from kickoff to launch.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 md:gap-x-12">
              {terms.map((term) => (
                <article key={term.title}>
                  <h3 className="mb-1 font-[family-name:var(--font-syne)] text-[1.1rem] font-bold">{term.title}</h3>
                  <p className="text-[0.98rem] text-[#4a5c54]">{term.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-[#0f1714]/12 py-16 md:py-24">
          <div className="mx-auto flex w-[min(1120px,calc(100%-2.5rem))] flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mb-3 font-[family-name:var(--font-syne)] text-[clamp(1.85rem,4vw,2.6rem)] font-bold leading-tight tracking-[-0.02em]">
                Let’s build it
              </h2>
              <p className="mb-5 max-w-lg text-[#4a5c54]">
                Share your goals, timeline, and any references — I’ll come back with a clear scope and quote.
              </p>
              <div className="space-y-1">
                <a
                  href="mailto:fellaraga@gmail.com"
                  className="block font-semibold text-[#145c44] underline underline-offset-4 hover:text-[#1f7a5c]"
                >
                  fellaraga@gmail.com
                </a>
                <Link href="/" className="block font-semibold text-[#145c44] underline underline-offset-4 hover:text-[#1f7a5c]">
                  View full portfolio
                </Link>
                <a
                  href="https://www.linkedin.com/in/jerryfel-laraga/"
                  target="_blank"
                  rel="noreferrer"
                  className="block font-semibold text-[#145c44] underline underline-offset-4 hover:text-[#1f7a5c]"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <a
              href="mailto:fellaraga@gmail.com?subject=Project%20inquiry%20—%20Jerryfel%20Laraga"
              className="inline-flex min-h-11 items-center justify-center rounded-sm bg-[#1f7a5c] px-5 text-[0.95rem] font-semibold text-[#f5f8f6] transition hover:-translate-y-0.5 hover:bg-[#145c44]"
            >
              Email Jerryfel
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#0f1714]/12 py-6 text-[0.9rem] text-[#4a5c54]">
        <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
          <p>
            © <span id="rate-year" /> Jerryfel Laraga · Software, website & AI development rate card
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes rateRise {
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes rateHeroZoom {
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
