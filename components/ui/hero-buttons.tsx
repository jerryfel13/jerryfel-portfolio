'use client'

import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/animations"

export function HeroButtons() {
  return (
    <StaggerContainer className="flex flex-wrap gap-3 justify-center md:justify-start">
      <StaggerItem>
        <Button
          variant="outline"
          className="bg-transparent border-white hover:bg-white hover:text-gray-900"
          onClick={() => window.location.href = 'mailto:fellaraga@gmail.com'}
        >
          <Mail className="mr-2 h-4 w-4" /> Contact Me
        </Button>
      </StaggerItem>
      <StaggerItem>
        <Button
          variant="outline"
          className="bg-transparent border-white hover:bg-white hover:text-gray-900"
          onClick={() => window.open('https://github.com/jerryfel13', '_blank')}
        >
          <Github className="mr-2 h-4 w-4" /> GitHub
        </Button>
      </StaggerItem>
      <StaggerItem>
        <Button
          variant="outline"
          className="bg-transparent border-white hover:bg-white hover:text-gray-900"
          onClick={() => window.open('https://www.linkedin.com/in/jerryfel-laraga/', '_blank')}
        >
          <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
        </Button>
      </StaggerItem>
    </StaggerContainer>
  )
}