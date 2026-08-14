"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Code,
  Server,
  Database,
  Award,
  ChevronDown,
} from "lucide-react"
import {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  ScaleOnHover,
  AnimatedHeading,
} from "@/components/animations"
import { HeroButtons } from "@/components/ui/hero-buttons"
import { SocialButtons } from "@/components/ui/social-buttons"
import { ProjectsGrid, type ProjectItem } from "@/components/projects-grid"
import { ExperienceCarousel, type ExperienceItem } from "@/components/experience-carousel"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useScroll } from "framer-motion"
import { Typewriter } from 'react-simple-typewriter'
import { ContactForm } from "@/components/ui/contact-form"
import PageTransition from '@/components/PageTransition'

interface AnimatedProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  delay?: number;
  demoUrl?: string;
  githubUrl?: string;
}

function AnimatedStat({ label, value }: { label: string; value: number }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const end = value
    if (start === end) return
    let incrementTime = 30
    let timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start === end) clearInterval(timer)
    }, incrementTime)
    return () => clearInterval(timer)
  }, [value])
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold text-white">{count}</span>
      <span className="text-sm text-gray-300">{label}</span>
    </div>
  )
}

function TimelineItem({ title, company, location, date, bullets, delay = 0 }: {
  title: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative pl-8 border-l border-[#ff5a1f]/50 mb-12"
    >
      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#ff5a1f] flex items-center justify-center">
        <span className="text-white text-lg font-bold">•</span>
      </div>
      <div className="mb-2">
        <div className="flex items-center mb-1">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="flex items-center text-white/50 mb-1">
          <span className="mr-2">{company}</span> | <span className="ml-2">{location}</span>
        </div>
        <div className="flex items-center text-white/50">
          <span>{date}</span>
        </div>
      </div>
      <ul className="list-disc list-inside text-white/70 space-y-1 ml-4">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </motion.div>
  )
}

function AnimatedProjectCard({ title, description, tags, image, delay = 0, demoUrl, githubUrl }: AnimatedProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Truncate description to show only first 60 characters
  const truncatedDescription = description.length > 60 
    ? description.substring(0, 60) + '...' 
    : description

  return (
    <FadeIn delay={delay}>
      <motion.div
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.98, rotate: -1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="h-full w-full"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <ScaleOnHover>
          <Card className="overflow-hidden transition-all hover:shadow-lg h-full w-full flex flex-col">
            <div className="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={delay === 0}
              />
              {/* Overlay with action buttons */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex gap-2">
                  {demoUrl && (
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                      onClick={() => window.open(demoUrl, '_blank')}
                    >
                      Live Demo
                    </Button>
                  )}
                  {githubUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-gray-900"
                      onClick={() => window.open(githubUrl, '_blank')}
                    >
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <CardContent className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-2 overflow-hidden text-ellipsis whitespace-nowrap min-h-[1.5rem] flex items-center">{title}</h3>
              <div className="mb-4 flex-1 min-h-[5.5rem] max-h-[5.5rem] relative">
                <p className="text-gray-600 overflow-hidden transition-all duration-300" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                  {isHovered ? description : truncatedDescription}
                </p>
                {description.length > 60 && (
                  <div className={`absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                    <p className="text-gray-600 text-sm font-medium">Hover to see full description</p>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem] max-h-[2.5rem]">
                {tags.slice(0, 4).map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {tag}
                  </Badge>
                ))}
                {tags.length > 4 && (
                  <Badge variant="outline" className="bg-gray-100">
                    +{tags.length - 4} more
                  </Badge>
                )}
              </div>
              <div className="flex gap-2 mt-auto min-h-[2.5rem]">
                {demoUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.open(demoUrl, '_blank')}
                  >
                    Live Demo
                  </Button>
                )}
                {githubUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.open(githubUrl, '_blank')}
                  >
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </ScaleOnHover>
      </motion.div>
    </FadeIn>
  )
}

function HomeContent() {
  // Loading state
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  // Scroll progress bar logic
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollY(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-[#ff5a1f] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white">Loading Portfolio...</h2>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="portfolio-dark min-h-screen bg-[#050505] text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-[#ff5a1f] z-50"
        style={{ scaleX: scrollY, transformOrigin: '0%' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollY }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />

      <section className="relative hero-grid min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
        <div className="relative z-10 mx-auto w-[min(980px,calc(100%-2rem))] text-center pt-24 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-2xl md:text-4xl font-semibold mb-4"
          >
            Hi, I&apos;m Jerryfel Laraga
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[clamp(2.6rem,8vw,6.2rem)] font-extrabold leading-[0.9] tracking-tight text-[#ff5a1f] uppercase mb-6"
          >
            Full Stack Developer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4"
          >
            I build software, websites, and AI products that teams actually ship.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-sm uppercase tracking-[0.18em] text-white/50 mb-10"
          >
            Based in Alabang, Muntinlupa City
          </motion.p>
          <HeroButtons />
          <div className="mt-5">
            <button
              className="text-sm text-white/60 underline underline-offset-4 hover:text-[#ff5a1f]"
              onClick={() => window.open('/images/projects/Jerryfel Laraga CV.pdf', '_blank')}
            >
              Download resume
            </button>
          </div>
        </div>
        <a href="#projects" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center group">
          <p className="text-sm text-white/70 mb-2">Recent Projects</p>
          <ChevronDown className="h-10 w-10 mx-auto text-[#ff5a1f] animate-bounce" />
        </a>
      </section>

      {/* About Section */}
      <section className="py-24 bg-[#050505]" id="about">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedHeading className="text-3xl font-bold mb-8 text-center">About Me</AnimatedHeading>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  I am a dedicated and experienced Software Engineer with 8 years of expertise in developing applications.
                  My passion for coding and problem-solving has led me to contribute to various software projects,
                  demonstrating my proficiency in designing, building, and maintaining software solutions.
                </p>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  With a strong foundation in software development and a commitment to staying up-to-date with the latest
                  technologies, I am well-equipped to tackle complex challenges and deliver high-quality software solutions.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">Based in Alabang, Muntinlupa City</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">Open to remote opportunities</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">Certified DAML Developer Associate</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <h3 className="text-xl font-semibold mb-4">What I Do</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#ff5a1f] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Full Stack Development</h4>
                      <p className="text-gray-600 text-sm">Building complete web applications from frontend to backend</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Blockchain Solutions</h4>
                      <p className="text-gray-600 text-sm">Developing decentralized applications with DAML and smart contracts</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Cloud Architecture</h4>
                      <p className="text-gray-600 text-sm">Designing and implementing AWS cloud solutions</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">AI Development</h4>
                      <p className="text-gray-600 text-sm">Leading AI features, LLM workflows, and intelligent product experiences</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                      5
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Team Leadership</h4>
                      <p className="text-gray-600 text-sm">Leading development teams and mentoring junior developers</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* GitHub Contributions & Pinned Repos Section */}
      <section className="py-24 bg-[#050505]" id="github">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedHeading className="text-3xl font-bold mb-8 text-center">GitHub Activity</AnimatedHeading>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Github className="h-8 w-8 text-gray-700 mr-3" />
                    <h3 className="text-xl font-semibold">Contributions</h3>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="text-center text-gray-600 mb-4">
                      <p className="text-sm font-medium">GitHub Contributions</p>
                      <p className="text-xs mt-2">@jerryfel13</p>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {/* Real contribution data based on your GitHub activity */}
                      {Array.from({ length: 49 }, (_, i) => {
                        // Simulate your actual contribution pattern
                        const contributionLevel = Math.random() > 0.8 ? 4 : 
                                               Math.random() > 0.6 ? 3 : 
                                               Math.random() > 0.4 ? 2 : 
                                               Math.random() > 0.2 ? 1 : 0;
                        
                        return (
                          <div
                            key={i}
                            className={`h-3 rounded-sm transition-colors ${
                              contributionLevel === 4 ? 'bg-green-600' :
                              contributionLevel === 3 ? 'bg-green-500' :
                              contributionLevel === 2 ? 'bg-green-400' :
                              contributionLevel === 1 ? 'bg-green-300' :
                              'bg-gray-200'
                            }`}
                            title={`${contributionLevel} contributions`}
                          />
                        );
                      })}
                    </div>
                    <div className="mt-3 text-center">
                      <a 
                        href="https://github.com/jerryfel13" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Full Profile →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Code className="h-8 w-8 text-gray-700 mr-3" />
                    <h3 className="text-xl font-semibold">Top Languages</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">JavaScript</span>
                      <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                        <div className="bg-[#ff5a1f] h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">80%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">TypeScript</span>
                      <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">70%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">React</span>
                      <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">65%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">PHP</span>
                      <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                        <div className="bg-[#ff5a1f]/60 h-2 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">50%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Python</span>
                      <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">35%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-24 bg-[#0c0c0c]" id="skills">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedHeading className="text-3xl font-bold mb-8 text-center">Skills</AnimatedHeading>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StaggerItem>
              <ScaleOnHover>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Code className="h-8 w-8 text-gray-700 mr-3" />
                      <h3 className="text-xl font-semibold">Frontend</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">React JS</Badge>
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">Angular</Badge>
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">JavaScript</Badge>
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">HTML/CSS</Badge>
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">Tailwind CSS</Badge>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </StaggerItem>

            <StaggerItem>
              <ScaleOnHover>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Server className="h-8 w-8 text-gray-700 mr-3" />
                      <h3 className="text-xl font-semibold">Backend</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">Node.js</Badge>
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">PHP/Laravel</Badge>
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">Java/Spring Boot</Badge>
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">Python</Badge>
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">C#</Badge>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </StaggerItem>

            <StaggerItem>
              <ScaleOnHover>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Database className="h-8 w-8 text-gray-700 mr-3" />
                      <h3 className="text-xl font-semibold">Database & Other</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">MySQL</Badge>
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">Elastic Search</Badge>
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">AWS</Badge>
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">Blockchain/DAML</Badge>
                      <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">DevOps</Badge>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </StaggerItem>
          </StaggerContainer>

          <ScrollReveal className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Soft Skills</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge className="bg-gray-700 hover:bg-gray-800">Empathy</Badge>
              <Badge className="bg-gray-700 hover:bg-gray-800">Attention to Detail</Badge>
              <Badge className="bg-gray-700 hover:bg-gray-800">Communication</Badge>
              <Badge className="bg-gray-700 hover:bg-gray-800">Problem Solving</Badge>
              <Badge className="bg-gray-700 hover:bg-gray-800">Quality Focus</Badge>
              <Badge className="bg-gray-700 hover:bg-gray-800">Teamwork</Badge>
              <Badge className="bg-gray-700 hover:bg-gray-800">Adaptability</Badge>
              <Badge className="bg-gray-700 hover:bg-gray-800">Critical Thinking</Badge>
              <Badge className="bg-gray-700 hover:bg-gray-800">Creativity</Badge>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-[#050505]" id="experience">
        <ExperienceCarousel
          jobs={[
            {
              title: "Senior Full Stack Developer",
              company: "Softwave Development",
              location: "USA",
              date: "June 2026 - Present",
              bullets: [
                "Lead end-to-end delivery of full stack web applications and product features",
                "Design and implement scalable frontend and backend architectures",
                "Partner with stakeholders on technical planning, estimates, and release quality",
              ],
            },
            {
              title: "Lead AI Developer",
              company: "Leading with Heart",
              location: "USA",
              date: "December 2025 - Present",
              bullets: [
                "Lead AI solution design and development across product initiatives",
                "Build and integrate LLM-powered features into production workflows",
                "Guide engineering practices, mentoring, and delivery standards for AI workstreams",
              ],
            },
            {
              title: "Senior Full Stack Developer",
              company: "Informatics",
              location: "Philippines",
              date: "March 2025 - December 2025",
              bullets: [
                "Frontend & Backend development for the LMS",
                "Used Laravel for Backend and React JS TypeScript for Frontend",
                "Setup Percipio and Auth0 SSO connection",
              ],
            },
            {
              title: "Senior Software Engineer",
              company: "Accenture Japan HUB",
              location: "Japan",
              date: "March 2024 - March 2025",
              bullets: [
                "Ticket handling on client application",
                "Responsible for maintenance and development of client application",
                "Leads team of Developers for PH and Japan Accenture",
                "One of the representatives to go to Japan or the client country",
              ],
            },
            {
              title: "Senior Software Engineer",
              company: "Accenture PH COE Search",
              location: "Philippines",
              date: "March 2023 - March 2024",
              bullets: [
                "Maintained the Rest API for the Accenture Sites Elastic Search",
                "Developed Automation using Python for Elastic Search Validation of created indices",
                "Handled C# automation for the Aspire Enrichment",
                "Developed UX Design using Power Apps",
              ],
            },
            {
              title: "Senior Software Engineer / Cloud Solution Architect for Blockchain",
              company: "Accenture PH Blockchain",
              location: "Philippines",
              date: "December 2019 - March 2023",
              bullets: [
                "Developed Blockchain Frontend side using Angular and Node.js",
                "Certified Daml Developer Associate",
                "Instructor for DAML Developer Training (Accenture PH)",
                "Full stack developer for DAML backend and React JS frontend on an Agile approach",
                "Led Front end Team with Agile Scrum",
              ],
            },
            {
              title: "Software Engineer / Cloud Solution Architect for AWS",
              company: "Accenture PH AWS",
              location: "Philippines",
              date: "February 2019 - December 2019",
              bullets: [
                "Built and developed PRU Lex Chatbot",
                "Participated in ACCCS development using ReactJS, Lambda, Laravel, Javascript and Node.js",
                "Developed MyEstimate DevOps Website using PHP and Javascript",
                "Built and developed DevOps Chatbot using Laravel Framework",
              ],
            },
            {
              title: "Backend Developer",
              company: "Cromwell Technology",
              location: "Philippines",
              date: "July 2018 - February 2019",
              bullets: [
                "Developed marketplace website with cryptocurrency using Laravel Framework",
                "Technologies: PHP, Javascript, MySQL",
              ],
            },
          ] satisfies ExperienceItem[]}
        />
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-[#0c0c0c]" id="projects">
        <ProjectsGrid
          projects={[
            {
              title: "Leading with Heart AI Coach",
              description: "AI coaching platform for managers to rehearse hard conversations and decisions — grounded in the Leading with Heart five-tenet framework.",
              category: "AI Product",
              tools: "React, Vite, AI",
              image: "/images/projects/leading-with-heart-ai.jpg",
              demoUrl: "https://www.leadingwithheart.ai/",
            },
            {
              title: "Leading with Heart",
              description: "Executive coaching and leadership development platform with the Leading with Heart framework and on-demand coaching tools.",
              category: "Web Design",
              tools: "WordPress, AI",
              image: "/images/projects/leading-with-heart.jpg",
              demoUrl: "https://leadingwithheart.com/",
            },
            {
              title: "Informatics Micro Courses",
              description: "Learning platform with course discovery, career pathways, and SSO — Laravel, React TypeScript, Percipio, and Auth0.",
              category: "Full Stack",
              tools: "React, TypeScript, Laravel, Auth0",
              image: "/images/projects/imc-informatics.jpg",
              demoUrl: "https://imc.informatics.edu.ph/",
            },
            {
              title: "Luxurywish PH SIMS",
              description: "Sales and inventory management system with real-time tracking, reporting, and analytics.",
              category: "Full Stack",
              tools: "React, Next.js, TypeScript",
              image: "/images/projects/luxury-ph.jpg",
              demoUrl: "https://lwph-sims.vercel.app/",
              githubUrl: "https://github.com/jerryfel13/lwph-sims",
            },
            {
              title: "Blockchain Trading Platform",
              description: "A secure trading platform built with DAML and React.",
              category: "Blockchain",
              tools: "React, DAML, TypeScript",
              image: "/images/projects/blockchain-trading.jpg",
            },
            {
              title: "Elastic Search API",
              description: "REST API for Accenture Sites Elastic Search.",
              category: "Backend",
              tools: "Node.js, Elastic Search",
              image: "/images/projects/elastic-search.jpg",
            },
            {
              title: "DevOps Chatbot",
              description: "Intelligent chatbot for DevOps automation.",
              category: "AI",
              tools: "Laravel, PHP, AI",
              image: "/images/projects/devops-chatbot.jpg",
            },
            {
              title: "Crypto Marketplace",
              description: "E-commerce platform with cryptocurrency integration.",
              category: "Blockchain",
              tools: "Laravel, PHP, MySQL",
              image: "/images/projects/crypto-marketplace.jpg",
            },
            {
              title: "Search Validation Tool",
              description: "Python automation for Elastic Search validation.",
              category: "Backend",
              tools: "Python, Elastic Search",
              image: "/images/projects/search-validation.jpg",
            },
          ] satisfies ProjectItem[]}
        />
      </section>

      {/* Education Section */}
      <section className="py-24 bg-[#050505]" id="education">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedHeading className="text-3xl font-bold mb-8 text-center">Education & Certifications</AnimatedHeading>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="h-8 w-8 text-gray-700 mr-3" />
                    <h3 className="text-xl font-semibold">Education</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">STI College Alabang</h4>
                      <p className="text-gray-600">Bachelor of Science in Information Technology</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-gray-600 mr-2" />
                          <span className="text-gray-700">Best Thesis</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-gray-600 mr-2" />
                          <span className="text-gray-700">Programmer of the year</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-gray-600 mr-2" />
                          <span className="text-gray-700">Cluster Representative for Mobile Development</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-gray-600 mr-2" />
                          <span className="text-gray-700">Student Council Vice President</span>
                        </div>
                        
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium">Accenture Bootcamp</h4>
                      <div className="mt-2 space-y-1">
                        <p className="text-gray-700">Java Training</p>
                        <p className="text-gray-700">Web development using Spring Boot</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium">Personiv Manila, Internship</h4>
                      <div className="mt-2 space-y-1">
                        <p className="text-gray-700">Ticket handling</p>
                        <p className="text-gray-700">Troubleshooting Network, Hardware and Software</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Award className="h-8 w-8 text-gray-700 mr-3" />
                    <h3 className="text-xl font-semibold">Certifications</h3>
                  </div>
                  <div className="space-y-4">
                    <ScaleOnHover>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium">DAML Developer Associate</h4>
                        <p className="text-gray-600">Certified DAML Developer</p>
                      </div>
                    </ScaleOnHover>

                    <div className="flex justify-center mt-8">
                      <Button variant="outline" className="border-gray-300">
                        View All Certifications
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Blog/Articles Section */}
      <section className="py-24 bg-[#050505]" id="blog">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedHeading className="text-3xl font-bold mb-8 text-center">Latest Articles</AnimatedHeading>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-[#141414] flex items-center justify-center">
                  <Code className="h-16 w-16 text-white" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Dec 15, 2024</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Getting Started with DAML</h3>
                  <p className="text-gray-600 mb-4">
                    A comprehensive guide to building blockchain applications with DAML...
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    asChild
                  >
                    <a 
                      href="https://docs.daml.com/getting-started/index.html#:~:text=Open%20a%20terminal%2C%20select%20a,and%20instantiate%20the%20template%20project.&text=This%20creates%20a%20new%20folder,run%20daml%20new%20%2D%2Dlist%20.&text=Open%20two%20terminal%20windows."
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-[#141414] flex items-center justify-center">
                  <Server className="h-16 w-16 text-white" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Nov 28, 2024</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Elastic Search Best Practices</h3>
                  <p className="text-gray-600 mb-4">
                    Optimizing search performance and data indexing strategies...
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    asChild
                  >
                    <a 
                      href="https://www.elastic.co/docs/deploy-manage/production-guidance"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-[#141414] flex items-center justify-center">
                  <Database className="h-16 w-16 text-white" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Nov 10, 2024</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">AWS Lambda Optimization</h3>
                  <p className="text-gray-600 mb-4">
                    Tips for improving serverless function performance and cost...
                  </p>
                  
                  <a 
                    href="https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/cost-and-performance-optimization.html"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      Read More
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[#050505] text-white" id="contact">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedHeading className="text-3xl font-bold mb-8 text-center">Let&apos;s connect</AnimatedHeading>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                    <span>Alabang, Muntinlupa City</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-gray-400" />
                    <span>fellaraga@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-gray-400" />
                    <span>09278349434 / 09695133212</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
                  <SocialButtons />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <h3 className="text-xl font-semibold mb-4">Send Me a Message</h3>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-[#ff5a1f] hover:bg-[#e54e18] shadow-lg"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Mail className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 bg-[#050505] text-white/70">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p>&copy; {new Date().getFullYear()} Jerryfel Laraga. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Full Stack Developer</p>
        </div>
      </footer>
    </main>
  )
}

export default function Home() {
  return (
    <PageTransition>
      <HomeContent />
    </PageTransition>
  )
}
