import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [imageErreur, setImageErreur] = useState(false)
  const [imageChargee, setImageChargee] = useState(false)
  const [afficherBg, setAfficherBg] = useState(false)
  const [afficherContent, setAfficherContent] = useState(false)

  //const audioRef = useRef<HTMLAudioElement | null>(null)

  const imageUrl = '/creation/Affiche1.jpg'
  //const audioUrl = '/creation/song.mp3'

  useEffect(() => {
    const img = new Image()
    img.src = imageUrl
    img.onload = () => {
      setImageChargee(true)
      setTimeout(() => setAfficherBg(true), 100)
      setTimeout(() => setAfficherContent(true), 380)
    }
    img.onerror = () => setImageErreur(true)

    {/* écoute le premier clic pour activer le son
    const handleFirstClick = () => {
      if (audioRef.current) {
        audioRef.current.muted = false
        audioRef.current.play().catch(() => {
          console.warn('Impossible de lancer l’audio')
        })
      }
      document.removeEventListener('click', handleFirstClick)
    }

    document.addEventListener('click', handleFirstClick)

    return () => {
      document.removeEventListener('click', handleFirstClick)
    } */}
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

      {/* Contenu */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full gap-y-2.5 p-3 md:p-1.5 lg:p-0
          transition-all duration-700 ease-in-out
          ${afficherContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <img
          className={`h-[600px] w-[500px] max-sm:h-[500px] max-sm:w-[400px] object-fill transition-transform duration-700 ease-in-out
            ${afficherContent ? 'scale-100' : 'scale-95'} ${afficherContent ? 'breath' : ''}`}
          src={imageUrl}
          alt="Affiche anniversaire"
        />
      </div>

      {/* Audio caché, autoplay en mute 
      <audio ref={audioRef} src={audioUrl} autoPlay loop muted hidden />*/}
    </div>
  )
}

export default App
