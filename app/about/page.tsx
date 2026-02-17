'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

export default function AboutPage() {
  const { language, setLanguage, t } = useLanguage()
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
            onClick={() => setLanguage('en')}
            className={`text-left hover:text-foreground transition-colors ${language === 'en' ? 'text-foreground' : ''}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage('es')}
            className={`text-left hover:text-foreground transition-colors ${language === 'es' ? 'text-foreground' : ''}`}
          >
            ES
          </button>
          <button 
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
      <main className="ml-64 h-screen overflow-y-auto flex items-start justify-center px-14 py-16">
        <div className="max-w-xs flex flex-col gap-8">
          <img
            src="/About/IMG_0328.jpeg"
            alt="Bambou Hocepied"
            className="w-full h-auto block"
          />
          <p className="text-foreground text-sm leading-relaxed text-justify" style={{ hyphens: 'none', WebkitHyphens: 'none' }}>
            {t('about.bio')}
          </p>
        </div>
      </main>
    </div>
  )
}
