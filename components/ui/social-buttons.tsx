'use client'

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/animations"

export function SocialButtons() {
  return (
    <StaggerContainer className="flex space-x-4">
      <StaggerItem>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-transparent border-gray-700 hover:bg-gray-800"
          onClick={() => window.open('https://github.com/jerryfel13', '_blank')}
        >
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </Button>
      </StaggerItem>
      <StaggerItem>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-transparent border-gray-700 hover:bg-gray-800"
          onClick={() => window.open('https://www.linkedin.com/in/jerryfel-laraga/', '_blank')}
        >
          <Linkedin className="h-5 w-5" />
          <span className="sr-only">LinkedIn</span>
        </Button>
      </StaggerItem>
      <StaggerItem>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-transparent border-gray-700 hover:bg-gray-800"
          onClick={() => window.location.href = 'mailto:fellaraga@gmail.com'}
        >
          <Mail className="h-5 w-5" />
          <span className="sr-only">Email</span>
        </Button>
      </StaggerItem>
    </StaggerContainer>
  )
}