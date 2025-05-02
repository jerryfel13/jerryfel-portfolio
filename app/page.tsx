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
import PageTransition from '@/components/PageTransition'

interface AnimatedProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  delay?: number;
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

export default function Home() {
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

  return (
    <PageTransition>
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
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image src="/images/jerryfel.jpg?height=300&width=300" alt="Jerryfel Laraga" fill className="object-cover" />
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
              <a
                href="/resume.pdf"
                download
                className="inline-block mt-4"
              >
                <Button
                  variant="outline"
                  className="bg-transparent border-white hover:bg-white hover:text-gray-900"
                >
                  Download Resume
                </Button>
              </a>
            </SlideInRight>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-white" id="about">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedHeading className="text-3xl font-bold mb-8 text-center">About Me</AnimatedHeading>
            <ScrollReveal className="max-w-3xl mx-auto">
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                I am a dedicated and experienced Software Engineer with 6 years of expertise in developing applications.
                My passion for coding and problem-solving has led me to contribute to various software projects,
                demonstrating my proficiency in designing, building, and maintaining software solutions.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                With a strong foundation in software development and a commitment to staying up-to-date with the latest
                technologies, I am well-equipped to tackle complex challenges and deliver high-quality software solutions.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* GitHub Contributions & Pinned Repos Section */}
      
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

              <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatedProjectCard
                  title="Blockchain Trading Platform"
                  description="A secure trading platform built with DAML and React"
                  tags={["React", "DAML", "Blockchain", "TypeScript"]}
                  image="/images/projects/blockchain-trading.jpg"
                  delay={0}
                />
                <AnimatedProjectCard
                  title="Elastic Search API"
                  description="REST API for Accenture Sites Elastic Search"
                  tags={["Node.js", "Elastic Search", "REST API"]}
                  image="/images/projects/elastic-search.jpg"
                  delay={0.1}
                />
                <AnimatedProjectCard
                  title="DevOps Chatbot"
                  description="Intelligent chatbot for DevOps automation"
                  tags={["Laravel", "PHP", "AI", "DevOps"]}
                  image="/images/projects/devops-chatbot.jpg"
                  delay={0.2}
                />
                <AnimatedProjectCard
                  title="Crypto Marketplace"
                  description="E-commerce platform with cryptocurrency integration"
                  tags={["Laravel", "PHP", "MySQL", "Blockchain"]}
                  image="/images/projects/crypto-marketplace.jpg"
                  delay={0.3}
                />
                <AnimatedProjectCard
                  title="Search Validation Tool"
                  description="Python automation for Elastic Search validation"
                  tags={["Python", "Elastic Search", "Automation"]}
                  image="/images/projects/search-validation.jpg"
                  delay={0.4}
                />
                <AnimatedProjectCard
                  title="UX Design System"
                  description="Component library built with Power Apps"
                  tags={["Power Apps", "UX Design", "Components"]}
                  image="/images/projects/ux-design.jpg"
                  delay={0.5}
                />
              </TabsContent>

              <TabsContent value="frontend" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatedProjectCard
                  title="Blockchain Trading Platform"
                  description="A secure trading platform built with DAML and React"
                  tags={["React", "DAML", "Blockchain", "TypeScript"]}
                  image="/images/projects/blockchain-trading.jpg"
                  delay={0}
                />
                <AnimatedProjectCard
                  title="UX Design System"
                  description="Component library built with Power Apps"
                  tags={["Power Apps", "UX Design", "Components"]}
                  image="/images/projects/ux-design.jpg"
                  delay={0.1}
                />
              </TabsContent>

              <TabsContent value="backend" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatedProjectCard
                  title="Elastic Search API"
                  description="REST API for Accenture Sites Elastic Search"
                  tags={["Node.js", "Elastic Search", "REST API"]}
                  image="/images/projects/elastic-search.jpg"
                  delay={0}
                />
                <AnimatedProjectCard
                  title="Search Validation Tool"
                  description="Python automation for Elastic Search validation"
                  tags={["Python", "Elastic Search", "Automation"]}
                  image="/images/projects/search-validation.jpg"
                  delay={0.1}
                />
                <AnimatedProjectCard
                  title="DevOps Chatbot"
                  description="Intelligent chatbot for DevOps automation"
                  tags={["Laravel", "PHP", "AI", "DevOps"]}
                  image="/images/projects/devops-chatbot.jpg"
                  delay={0.2}
                />
              </TabsContent>

              <TabsContent value="blockchain" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                          placeholder="Your Email"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                          placeholder="Your Message"
                        ></textarea>
                      </div>
                    </div>
                    <ScaleOnHover>
                      <Button className="w-full bg-gray-100 text-gray-900 hover:bg-white">Send Message</Button>
                    </ScaleOnHover>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 bg-gray-800 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p>&copy; {new Date().getFullYear()} Jerryfel Laraga. All rights reserved.</p>
            <p className="text-gray-400 mt-2">Full Stack Developer</p>
          </div>
        </footer>
      </main>
    </PageTransition>
  )
}

function AnimatedProjectCard({ title, description, tags, image, delay = 0 }: AnimatedProjectCardProps) {
  return (
    <FadeIn delay={delay}>
      <motion.div
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.98, rotate: -1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <ScaleOnHover>
          <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={delay === 0}
              />
            </div>
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 mb-4">{description}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScaleOnHover>
      </motion.div>
    </FadeIn>
  )
}
