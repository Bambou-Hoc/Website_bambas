'use client'

import React from 'react'

export default function TacoRow() {
  const items = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 w-full my-8">
      {items.map((index) => (
        <div key={index} className="relative w-full">
          <img
            src={`/Watercolors/comida/taco${index}.jpg`}
            alt={`Taco illustration ${index}`}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
  )
}
