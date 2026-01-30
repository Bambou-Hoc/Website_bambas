'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'es' | 'pt'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.digitalProduct': 'Digital & Product',
    'nav.contact': 'Contact',
    
    // About page
    'about.bio': 'My name is Bambou. I was born in Belgium and have lived most of my life in Portugal. I completed my secondary education in Portugal before taking a gap year as a Rotary Exchange Student in California, where I lived with an American family while attending high school. Upon returning, I enrolled in Civil Engineering at Instituto Superior Técnico (IST), later transitioning to the Integrated Master of Architecture. In my fourth year, I was an exchange student at Seoul National University, South Korea, for two semesters, where I developed a heightened awareness of cultural context and space. I chose IST for its strong technical foundation combined with a rigorous approach to design and the creative process. After completing my studies, I moved to Mexico, where I worked at Reyes Rios + Larraín in Mérida and later at Vertebral in Mexico City. From an early age, I have been drawn to design and creative practice. Through drawing, painting, ceramics, photography, and sewing, I have explored different forms of expression and continue to seek new ways of creating.',
    
    // Contact page
    'contact.teamSport': 'Great design is a team sport.',
    'contact.yourName': 'YOUR NAME:',
    'contact.yourEmail': 'YOUR EMAIL:',
    'contact.howCanIHelp': 'HOW CAN I HELP YOU?',
    'contact.namePlaceholder': 'John Doe',
    'contact.emailPlaceholder': 'john@example.com',
    'contact.messagePlaceholder': 'Tell me about your project...',
    'contact.sendMessage': 'Send Message',
    
    // Project page
    'project.info': 'INFO',
    'project.description': 'Description',
    'project.area': 'Area',
    'project.architect': 'Architect',
    'project.press': 'Press',
    'project.pavilion': 'Pavilion',
  },
  es: {
    // Navigation
    'nav.about': 'Sobre mí',
    'nav.projects': 'Proyectos',
    'nav.digitalProduct': 'Digital y Producto',
    'nav.contact': 'Contacto',
    
    // About page
    'about.bio': 'Mi nombre es Bambou. Nací en Bélgica y he vivido la mayor parte de mi vida en Portugal. Completé mi educación secundaria en Portugal antes de tomar un año sabático como estudiante de intercambio Rotary en California, donde viví con una familia estadounidense mientras asistía a la escuela secundaria. Al regresar, me inscribí en Ingeniería Civil en el Instituto Superior Técnico (IST), y luego me cambié al Máster Integrado de Arquitectura. En mi cuarto año, fui estudiante de intercambio en la Universidad Nacional de Seúl, Corea del Sur, durante dos semestres, donde desarrollé una mayor conciencia del contexto cultural y el espacio. Elegí IST por su sólida base técnica combinada con un enfoque riguroso del diseño y el proceso creativo. Después de completar mis estudios, me mudé a México, donde trabajé en Reyes Rios + Larraín en Mérida y luego en Vertebral en Ciudad de México. Desde temprana edad, me he sentido atraída por el diseño y la práctica creativa. A través del dibujo, la pintura, la cerámica, la fotografía y la costura, he explorado diferentes formas de expresión y continúo buscando nuevas formas de crear.',
    
    // Contact page
    'contact.teamSport': 'El diseño se hace en equipo.',
    'contact.yourName': 'TU NOMBRE:',
    'contact.yourEmail': 'TU EMAIL:',
    'contact.howCanIHelp': '¿CÓMO PUEDO AYUDARTE?',
    'contact.namePlaceholder': 'Juan Pérez',
    'contact.emailPlaceholder': 'juan@ejemplo.com',
    'contact.messagePlaceholder': 'Cuéntame sobre tu proyecto...',
    'contact.sendMessage': 'Enviar Mensaje',
    
    // Project page
    'project.info': 'INFO',
    'project.description': 'Descripción',
    'project.area': 'Área',
    'project.architect': 'Arquitecto',
    'project.press': 'Prensa',
    'project.pavilion': 'Pabellón',
  },
  pt: {
    // Navigation
    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'nav.digitalProduct': 'Digital e Produto',
    'nav.contact': 'Contacto',
    
    // About page
    'about.bio': 'O meu nome é Bambou. Nasci na Bélgica e vivi a maior parte da minha vida em Portugal. Completei o ensino secundário em Portugal antes de fazer um ano sabático como estudante de intercâmbio Rotary na Califórnia, onde vivi com uma família americana enquanto frequentava o liceu. Ao regressar, inscrevi-me em Engenharia Civil no Instituto Superior Técnico (IST), tendo depois transitado para o Mestrado Integrado em Arquitectura. No quarto ano, fui estudante de intercâmbio na Universidade Nacional de Seul, Coreia do Sul, durante dois semestres, onde desenvolvi uma maior consciência do contexto cultural e do espaço. Escolhi o IST pela sua sólida base técnica combinada com uma abordagem rigorosa ao design e ao processo criativo. Após concluir os estudos, mudei-me para o México, onde trabalhei na Reyes Rios + Larraín em Mérida e posteriormente na Vertebral na Cidade do México. Desde cedo, senti-me atraída pelo design e pela prática criativa. Através do desenho, pintura, cerâmica, fotografia e costura, explorei diferentes formas de expressão e continuo a procurar novas formas de criar.',
    
    // Contact page
    'contact.teamSport': 'O design faz-se em equipa.',
    'contact.yourName': 'O TEU NOME:',
    'contact.yourEmail': 'O TEU EMAIL:',
    'contact.howCanIHelp': 'COMO POSSO AJUDAR-TE?',
    'contact.namePlaceholder': 'João Silva',
    'contact.emailPlaceholder': 'joao@exemplo.com',
    'contact.messagePlaceholder': 'Conta-me sobre o teu projeto...',
    'contact.sendMessage': 'Enviar Mensagem',
    
    // Project page
    'project.info': 'INFO',
    'project.description': 'Descrição',
    'project.area': 'Área',
    'project.architect': 'Arquitecto',
    'project.press': 'Imprensa',
    'project.pavilion': 'Pavilhão',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && ['en', 'es', 'pt'].includes(saved)) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
