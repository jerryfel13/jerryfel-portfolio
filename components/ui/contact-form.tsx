'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScaleOnHover } from "@/components/animations"
import emailjs from '@emailjs/browser'

// Initialize EmailJS with your public key
const PUBLIC_KEY = 'mhcDa2PXC1i5EDgUV'
const SERVICE_ID = 'service_4re5syg'
const TEMPLATE_ID = 'template_16nfbyd'

emailjs.init(PUBLIC_KEY)

export function ContactForm() {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const form = e.target as HTMLFormElement
      console.log('Form data:', {
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        form: form
      })

      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form
      )

      setSubmitStatus('success')
      setFormData({ from_name: '', from_email: '', message: '' })
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="to_email" value="fellaraga@gmail.com" />
      <input type="hidden" name="to_name" value="Jerry" />
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Your Name
          </label>
          <input
            id="name"
            name="from_name"
            type="text"
            value={formData.from_name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Your Email
          </label>
          <input
            id="email"
            name="from_email"
            type="email"
            value={formData.from_email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Your Email"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Your Message"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <ScaleOnHover>
          <Button 
            type="submit" 
            className="w-full bg-gray-100 text-gray-900 hover:bg-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </ScaleOnHover>
        {submitStatus === 'success' && (
          <p className="text-green-500 text-sm text-center">Message sent successfully!</p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-500 text-sm text-center">Failed to send message. Please try again.</p>
        )}
      </div>
    </form>
  )
}