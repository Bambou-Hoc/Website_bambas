export const projectsData: Record<string, {
  title: string
  location: string
  year: string
  summary: string
  description: string
  area: string
  architect: string
  images: string[]
}> = {
  '1': {
    title: 'DWELL IN MEMORY',
    location: 'Porto Santo, Portugal',
    year: '2023',
    summary: 'Drawing (in) Aridity. Idle Instances. An architectural thesis exploring the relationship between landscape, memory, and winemaking traditions on the island of Porto Santo.',
    description: 'This project documents an architectural proposal developed to deeply understand and reconnect with the nature of Porto Santo island. The design proposes a cooperative winery that links the local population with visitors, celebrating both the visit and the routine of traditional winemaking. The gravity winery follows the rhythm suggested by crocheted walls, stretching towards the sea and culminating in a courtyard sheltered by the dunes.',
    area: 'Architecture Thesis',
    architect: 'Bambou Hocepied',
    images: [
      '/Projecto Final/project1-cover.jpg',
      '/Projecto Final/project1-img1.jpg',
      '/Projecto Final/project1-img2.jpg',
      '/Projecto Final/project1-img3.jpg',
      '/Projecto Final/project1-img4.jpg',
      '/Projecto Final/project1-img5.jpg',
      '/Projecto Final/project1-img6.jpg',
      '/Projecto Final/project1-img7.jpg',
      '/Projecto Final/project1-img8.jpg',
      '/Projecto Final/project1-img9.jpg',
      '/Projecto Final/project1-img10.jpg',
      '/Projecto Final/project1-img11.jpg',
      '/Projecto Final/project1-img12.jpg',
      '/Projecto Final/project1-img13.jpg',
      '/Projecto Final/project1-img14.jpg',
    ]
  },
  '2': {
    title: 'The Saree Tote',
    location: 'Studio',
    year: '2025',
    summary: 'A singular handbag handcrafted from repurposed cotton saree fabric, hand-selected in India. This piece explores the intersection of traditional textile art and modern form, utilizing the fabric\'s intricate geometric patterns and vibrant, high-contrast color palette to define its structure.',
    description: 'A singular handbag handcrafted from repurposed cotton saree fabric, hand-selected in India. This piece explores the intersection of traditional textile art and modern form, utilizing the fabric\'s intricate geometric patterns and vibrant, high-contrast color palette to define its structure.',
    area: 'Limited Edition',
    architect: 'Bambou Hocepied',
    images: [
      '/Malas/project2-img1.jpg',
      '/Malas/project2-img3.jpg',
      '/Malas/project2-img4.jpg',
    ]
  },
  '3': {
    title: 'MINIMALIST STUDIO',
    location: 'Madrid',
    year: '2023',
    summary: 'A clean, minimalist workspace designed for creative professionals.',
    description: 'A thoughtfully designed studio space that prioritizes simplicity and functionality.',
    area: '150 m²',
    architect: 'Bambou Hocepied',
    images: ['/desert-sand-dunes.jpg']
  },
  '4': {
    title: 'FLEA MARKET',
    location: 'Brussels',
    year: '2025',
    summary: 'Event poster design for a community flea market featuring DJ sets, tattoos, upcycled jewelry, and more.',
    description: 'Creative poster design for a Brussels flea market event. The event features DJ sets, tattoos, upcycled jewelry, tooth gems, and second-hand clothes. A vibrant community gathering celebrating creativity and sustainability.',
    area: 'Event Design',
    architect: 'Bambou Hocepied',
    images: ['/project4-img1.png', '/project4-img2.jpg']
  },
  '5': {
    title: 'CALENDAR',
    location: 'San Miguel de Allende, Mexico',
    year: '2026',
    summary: 'A surreal exploration of the domestic sphere. This 12-month collection reimagines the quiet rituals and invisible labor of the home through a distinctly Mexican lens. By blending architectural geometry with dreamlike compositions, Dos Cabezas elevates the "everyday" into the extraordinary.',
    description: 'A surreal exploration of the domestic sphere. This 12-month collection reimagines the quiet rituals and invisible labor of the home through a distinctly Mexican lens. By blending architectural geometry with dreamlike compositions, Dos Cabezas elevates the "everyday" into the extraordinary.',
    area: 'Print Design',
    architect: 'Bambou Hocepied',
    images: [
      '/Calendário/calendario_05_1.png',
      '/Calendário/calendario__00PORTADA.png',
      '/Calendário/calendario__01Enero.png',
      '/Calendário/calendario__02February.png',
      '/Calendário/calendario__03Marzo.png',
      '/Calendário/calendario__04Abril.png',
      '/Calendário/calendario__05Maio.png',
      '/Calendário/calendario__06June.png',
      '/Calendário/calendario__07July.png',
      '/Calendário/calendario__08Agosto.png',
      '/Calendário/calendario__09September.png',
      '/Calendário/calendario__10October.png',
      '/Calendário/calendario__11November.png',
      '/Calendário/calendario__12December.png',
      '/Calendário/calendario__13 Portada Final.png',
    ]
  },
  '6': {
    title: 'PORTRAIT OF THE DAY',
    location: 'Various',
    year: '2024-2025',
    summary: 'A daily drawing practice spanning one full year, capturing 365 unique portraits.',
    description: 'For one year, I committed to creating a portrait every single day. This discipline resulted in 365 portraits, each one a unique exploration of the human face through various media and techniques. The project became a meditation on consistency, observation, and the infinite variety found in portraiture.',
    area: '365 Portraits',
    architect: 'Bambou Hocepied',
    images: Array.from({ length: 120 }, (_, i) => `/Portraits/${i + 1}.jpg`)
  }
}