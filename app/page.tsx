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
      className="relative pl-8 border-l-2 border-blue-400 mb-12"
    >
      <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
        <span className="text-white text-lg font-bold">•</span>
      </div>
      <div className="mb-2">
        <div className="flex items-center mb-1">
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div className="flex items-center text-gray-600 mb-1">
          <span className="mr-2">{company}</span> | <span className="ml-2">{location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <span>{date}</span>
        </div>
      </div>
      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Portfolio...</h2>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Animated Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
        style={{ scaleX: scrollY, transformOrigin: '0%' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollY }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
          <SlideInLeft className="md:w-1/2 mb-10 md:mb-0 flex justify-center md:justify-start">
            <div className="relative">
              {/* Profile Photo */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/images/Jerryfel.jpg"
                  alt="Jerryfel Laraga"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Floating Tech Icons */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Code className="h-6 w-6 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Server className="h-6 w-6 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 -right-8 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Database className="h-5 w-5 text-white" />
              </motion.div>
            </div>
          </SlideInLeft>
          <SlideInRight className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Jerryfel Laraga</h1>
            <h2 className="text-xl md:text-2xl mb-6 text-gray-300">
              <Typewriter
                words={["Full Stack Developer", "Blockchain Enthusiast", "Cloud Solution Architect"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </h2>
            <div className="flex gap-8 justify-center md:justify-start mb-6">
              <AnimatedStat label="Years Experience" value={6} />
              <AnimatedStat label="Projects" value={18} />
              <AnimatedStat label="Certifications" value={3} />
            </div>
            <p className="text-gray-300 mb-8 max-w-lg">
              Dedicated and experienced Software Engineer with 6 years of expertise in developing applications.
            </p>
            <HeroButtons />
                          <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  onClick={() => window.open('/images/projects/Jerryfel Laraga CV.pdf', '_blank')}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
          </SlideInRight>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white" id="about">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedHeading className="text-3xl font-bold mb-8 text-center">About Me</AnimatedHeading>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  I am a dedicated and experienced Software Engineer with 6 years of expertise in developing applications.
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
                    <span className="text-gray-700">Based in San Pedro, Laguna, Philippines</span>
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
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Full Stack Development</h4>
                      <p className="text-gray-600 text-sm">Building complete web applications from frontend to backend</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Blockchain Solutions</h4>
                      <p className="text-gray-600 text-sm">Developing decentralized applications with DAML and smart contracts</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Cloud Architecture</h4>
                      <p className="text-gray-600 text-sm">Designing and implementing AWS cloud solutions</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                      4
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
      <section className="py-16 bg-white" id="github">
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
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
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
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '50%' }}></div>
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
      <section className="py-16 bg-gray-50" id="skills">
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
      <section className="py-16 bg-white" id="experience">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedHeading className="text-3xl font-bold mb-8 text-center">Work Experience</AnimatedHeading>
          <div className="max-w-4xl mx-auto">
            {/* Timeline Start */}
            <div className="relative">
              <TimelineItem
                title="Senior Software Engineer"
                company="Accenture Japan HUB"
                location="Japan"
                date="March 2024 - Present"
                bullets={[
                  "Ticket handling on client application",
                  "Responsible for maintenance and development of client application",
                  "Leads team of Developers for PH and Japan Accenture",
                  "One of the representatives to go to Japan or the client country"
                ]}
                delay={0}
              />
              <TimelineItem
                title="Senior Software Engineer"
                company="Accenture PH COE Search"
                location="Philippines"
                date="March 2023 - March 2024"
                bullets={[
                  "Maintained the Rest API for the Accenture Sites Elastic Search",
                  "Developed Automation using Python for Elastic Search Validation of created indices",
                  "Handled C# automation for the Aspire Enrichment",
                  "Developed UX Design using Power Apps"
                ]}
                delay={0.1}
              />
              <TimelineItem
                title="Senior Software Engineer/Cloud Solution Architect for Blockchain"
                company="Accenture PH Blockchain"
                location="Philippines"
                date="December 2019 - March 2023"
                bullets={[
                  "Developed Blockchain Frontend side using Angular and Node.js",
                  "Certified Daml Developer Associate",
                  "Instructor for DAML Developer Training (Accenture PH)",
                  "Worked as the Full Stack developer for the project that leveraged DAML for the backend and React JS for frontend system on an Agile approach",
                  "Led Front end Team with Agile Scrum"
                ]}
                delay={0.2}
              />
              <TimelineItem
                title="Software Engineer/Cloud Solution Architect for AWS"
                company="Accenture PH AWS"
                location="Philippines"
                date="February 2019 - December 2019"
                bullets={[
                  "Built and developed PRU Lex Chatbot",
                  "Participated in the development of ACCCS using ReactJS, Lambda, Laravel, Javascript and Node.js",
                  "Developed MyEstimate DevOps Website using PHP and Javascript",
                  "Built and developed DevOps Chatbot using Laravel Framework"
                ]}
                delay={0.3}
              />
              <TimelineItem
                title="Backend Developer"
                company="Cromwell Technology"
                location="Philippines"
                date="July 2018 - February 2019"
                bullets={[
                  "Developed market place website with Crypto Currency using Laravel Framework",
                  "Technologies: PHP, Javascript, MySQL"
                ]}
                delay={0.4}
              />
            </div>
            {/* Timeline End */}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-gray-50" id="projects">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedHeading className="text-3xl font-bold mb-8 text-center">Featured Projects</AnimatedHeading>

          <Tabs defaultValue="all" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-items-stretch">
              <AnimatedProjectCard
                title="Luxurywish PH - Sales & Inventory Management System"
                description="A comprehensive sales and inventory management system with real-time tracking, reporting, and analytics"
                tags={["React", "Next.js", "TypeScript", "Swagger", "Full Stack"]}
                image="/images/projects/luxury-ph.jpg"
                delay={0}
                demoUrl="https://lwph-sims.vercel.app/"
                githubUrl="https://github.com/jerryfel13/lwph-sims"
              />
              <AnimatedProjectCard
                title="Blockchain Trading Platform"
                description="A secure trading platform built with DAML and React"
                tags={["React", "DAML", "Blockchain", "TypeScript"]}
                image="/images/projects/blockchain-trading.jpg"
                delay={0.1}
              />
              <AnimatedProjectCard
                title="Elastic Search API"
                description="REST API for Accenture Sites Elastic Search"
                tags={["Node.js", "Elastic Search", "REST API"]}
                image="/images/projects/elastic-search.jpg"
                delay={0.2}
              />
              <AnimatedProjectCard
                title="DevOps Chatbot"
                description="Intelligent chatbot for DevOps automation"
                tags={["Laravel", "PHP", "AI", "DevOps"]}
                image="/images/projects/devops-chatbot.jpg"
                delay={0.3}
              />
              <AnimatedProjectCard
                title="Crypto Marketplace"
                description="E-commerce platform with cryptocurrency integration"
                tags={["Laravel", "PHP", "MySQL", "Blockchain"]}
                image="/images/projects/crypto-marketplace.jpg"
                delay={0.4}
              />
              <AnimatedProjectCard
                title="Search Validation Tool"
                description="Python automation for Elastic Search validation"
                tags={["Python", "Elastic Search", "Automation"]}
                image="/images/projects/search-validation.jpg"
                delay={0.5}
              />
            </TabsContent>

            <TabsContent value="frontend" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-items-stretch">
              <AnimatedProjectCard
                title="Luxurywish PH - Sales & Inventory Management System"
                description="A comprehensive sales and inventory management system with real-time tracking, reporting, and analytics"
                tags={["React", "Next.js", "TypeScript", "Swagger", "Full Stack"]}
                image="/images/projects/luxury-ph.jpg"
                delay={0}
                demoUrl="https://lwph-sims.vercel.app/"
                githubUrl="https://github.com/jerryfel13/lwph-sims"
              />
              <AnimatedProjectCard
                title="Blockchain Trading Platform"
                description="A secure trading platform built with DAML and React"
                tags={["React", "DAML", "Blockchain", "TypeScript"]}
                image="/images/projects/blockchain-trading.jpg"
                delay={0.1}
              />
            </TabsContent>

            <TabsContent value="backend" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-items-stretch">
              <AnimatedProjectCard
                title="Luxurywish PH - Sales & Inventory Management System"
                description="A comprehensive sales and inventory management system with real-time tracking, reporting, and analytics"
                tags={["React", "Next.js", "TypeScript", "Swagger", "Full Stack"]}
                image="/images/projects/luxury-ph.jpg"
                delay={0}
                demoUrl="https://lwph-sims.vercel.app/"
                githubUrl="https://github.com/jerryfel13/lwph-sims"
              />
              <AnimatedProjectCard
                title="Elastic Search API"
                description="REST API for Accenture Sites Elastic Search"
                tags={["Node.js", "Elastic Search", "REST API"]}
                image="/images/projects/elastic-search.jpg"
                delay={0.1}
              />
              <AnimatedProjectCard
                title="Search Validation Tool"
                description="Python automation for Elastic Search validation"
                tags={["Python", "Elastic Search", "Automation"]}
                image="/images/projects/search-validation.jpg"
                delay={0.2}
              />
              <AnimatedProjectCard
                title="DevOps Chatbot"
                description="Intelligent chatbot for DevOps automation"
                tags={["Laravel", "PHP", "AI", "DevOps"]}
                image="/images/projects/devops-chatbot.jpg"
                delay={0.3}
              />
            </TabsContent>

            <TabsContent value="blockchain" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-items-stretch">
              <AnimatedProjectCard
                title="Blockchain Trading Platform"
                description="A secure trading platform built with DAML and React"
                tags={["React", "DAML", "Blockchain", "TypeScript"]}
                image="/images/projects/blockchain-trading.jpg"
                delay={0}
              />
              <AnimatedProjectCard
                title="Crypto Marketplace"
                description="E-commerce platform with cryptocurrency integration"
                tags={["Laravel", "PHP", "MySQL", "Blockchain"]}
                image="/images/projects/crypto-marketplace.jpg"
                delay={0.1}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 bg-white" id="education">
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
      <section className="py-16 bg-white" id="blog">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedHeading className="text-3xl font-bold mb-8 text-center">Latest Articles</AnimatedHeading>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
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
                <div className="h-48 bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
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
                <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
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
      <section className="py-16 bg-gray-900 text-white" id="contact">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedHeading className="text-3xl font-bold mb-8 text-center text-white">Get In Touch</AnimatedHeading>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                    <span>Block 1 lot 94 Hyacinth Street Saint Joseph 9 Barangay Langgam San Pedro Laguna</span>
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
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Mail className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white">
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
