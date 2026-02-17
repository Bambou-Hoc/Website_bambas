'use client'

import React from "react"

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'

export default function ContactPage() {
  const { language, setLanguage, t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
    services: [] as string[],
    about: ''
  })
  

  return (
    <div className="min-h-screen bg-background">
      {/* Side Navigation */}
      <aside className="fixed left-0 top-0 h-screen w-64 p-8 flex flex-col justify-between z-50 bg-background">
        <div>
          <Link href="/" className="block mb-16">
            <h1 className="text-3xl font-bold tracking-tight">
              BAMBOU HOCEPIED
            </h1>
          </Link>
          
          <nav className="flex flex-col gap-4">
            <Link 
              href="/about" 
              className="text-foreground hover:text-muted-foreground transition-colors uppercase text-sm tracking-widest"
            >
              {t('nav.about')}
            </Link>
            <Link 
              href="/#projects" 
              className="text-foreground hover:text-muted-foreground transition-colors uppercase text-sm tracking-widest"
            >
              {t('nav.projects')}
            </Link>
            <Link 
              href="/contact" 
              className="text-foreground hover:text-muted-foreground transition-colors uppercase text-sm tracking-widest"
            >
              {t('nav.contact')}
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-col gap-2 text-xs text-muted-foreground tracking-widest">
          <button 
            type="button"
            onClick={() => setLanguage('en')}
            className={`text-left hover:text-foreground transition-colors ${language === 'en' ? 'text-foreground' : ''}`}
          >
            EN
          </button>
          <button 
            type="button"
            onClick={() => setLanguage('es')}
            className={`text-left hover:text-foreground transition-colors ${language === 'es' ? 'text-foreground' : ''}`}
          >
            ES
          </button>
          <button 
            type="button"
            onClick={() => setLanguage('pt')}
            className={`text-left hover:text-foreground transition-colors ${language === 'pt' ? 'text-foreground' : ''}`}
          >
            PT
          </button>
          <p className="text-left mt-4 text-xs text-muted-foreground leading-tight transform origin-left" style={{ transform: 'scale(0.6)' }}>
            © 2026 Bambou Hocepied. All Rights Reserved. Designed &amp; Built by Bambou Hocepied
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 overflow-y-auto">
        {/* First Section - Email centered vertically, aligned right */}
        <section className="h-screen flex flex-col justify-between px-14 py-16">
          <div /> {/* Spacer */}
          
          {/* Email with animated underline - centered vertically, aligned right */}
          <div className="flex justify-end">
            <a 
              href="mailto:bambouhocepied@gmail.com" 
              className="group relative text-foreground text-lg tracking-wide"
            >
              <span>bambouhocepied@gmail.com</span>
              <span 
                className="absolute left-0 bottom-0 w-0 h-[1px] bg-foreground transition-all duration-500 ease-out group-hover:w-full"
              />
            </a>
          </div>

          {/* Great design quote - at bottom, aligned right */}
          <div className="flex justify-end">
            <p className="text-sm text-muted-foreground tracking-wide">
              {t('contact.teamSport')}
            </p>
          </div>
        </section>

        {/* Second Section - Form (visible on scroll) */}
        <section className="min-h-screen flex justify-end px-14 py-16">
          <div className="w-full max-w-sm">
            {/* Contact Form (posts to Formsubmit.co) */}
            <form
              action="https://formsubmit.co/bambouhocepied@gmail.com"
              method="POST"
              className="w-full space-y-8"
            >
              {/* Configuration fields for Formsubmit */}
              <input type="hidden" name="_next" value="https://www.bambouhocepied.com/contact" />
              <input type="hidden" name="_subject" value="New Message from Bambou Hocepied Website" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" style={{ display: 'none' }} />
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t('contact.yourName')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t('contact.namePlaceholder')}
                  className="w-full bg-transparent border-b border-muted-foreground/30 py-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t('contact.yourEmail')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder={t('contact.emailPlaceholder')}
                  className="w-full bg-transparent border-b border-muted-foreground/30 py-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t('contact.howCanIHelp')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder={t('contact.messagePlaceholder')}
                  rows={4}
                  className="w-full bg-transparent border-b border-muted-foreground/30 py-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative text-foreground text-sm uppercase tracking-widest"
              >
                <span>{t('contact.sendMessage')}</span>
                <span 
                  className="absolute left-0 bottom-0 w-0 h-[1px] bg-foreground transition-all duration-500 ease-out group-hover:w-full"
                />
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
