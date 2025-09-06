import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [imageErreur, setImageErreur] = useState(false)
  const [imageChargee, setImageChargee] = useState(false)
  const [afficherBg, setAfficherBg] = useState(false)
  const [afficherContent, setAfficherContent] = useState(false)

  const imageUrl = '/creation/Affiche1.jpg' // mets bien l’image ici

  useEffect(() => {
    const img = new Image()
    img.src = imageUrl
    img.onload = () => {
      setImageChargee(true)
      // petit stagger : d'abord le bg, puis le contenu
      setTimeout(() => setAfficherBg(true), 100)
      setTimeout(() => setAfficherContent(true), 380)
    }
    img.onerror = () => setImageErreur(true)
  }, [])

  if (imageErreur) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600 text-xl italic">
          L’affiche d’anniversaire n’est pas encore disponible.
        </p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* background animé */}
      {imageChargee && (
        <div
          className={`absolute inset-0 bg-cover bg-center transform transition-all duration-[1000ms] ease-in-out
            ${afficherBg ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}

      {/* Overlay doux */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-lg" />

      {/* Contenu : apparition + petite animation continue */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full gap-y-5 p-3 md:p-1.5 lg:p-0
          transition-all duration-700 ease-in-out
          ${afficherContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        {/* image principale : entrée + 'breath' looping */}
        <img
          className={`h-[600px] w-[500px] max-sm:h-[500px] max-sm:w-[400px] object-fill transition-transform duration-700 ease-in-out
            ${afficherContent ? 'scale-100' : 'scale-95'} ${afficherContent ? 'breath' : ''}`}
          src={imageUrl}
          alt="Affiche anniversaire"
        />

        {/* titre : entrée décalée */}
        <h1
          className={`text-white font-cy max-sm:text-5xl md:text-3xl py-3.5 lg:text-5xl font-bold drop-shadow-xl text-center
            ${afficherContent ? 'animate-fade-in' : ''}`}
          style={{ transitionDelay: afficherContent ? '420ms' : '0ms' }}
        >
          Anzoumana Gbane
        </h1>
      </div>
    </div>
  )
}

export default App
