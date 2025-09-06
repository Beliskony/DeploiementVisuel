import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [imageErreur, setImageErreur] = useState(false)
  const [imageChargee, setImageChargee] = useState(false)

  const imageUrl = '/creation/Affiche1.jpg' // mets bien l’image ici

  useEffect(() => {
    const img = new Image()
    img.src = imageUrl
    img.onload = () => setImageChargee(true)
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
      {imageChargee && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-100 hover:scale-105"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      )}

      {/* Optional overlay with soft blur */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-lg"></div>

      {/* Optional message */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-y-2.5 p-3 md:p-1.5 lg:p-0">
        <img className='h-[600px] w-[450px]' src={imageUrl}/>
        <h1 className="text-white font-cy text-3xl md:text-3xl lg:text-5xl font-bold drop-shadow-xl text-center animate-fade-in">
          Joyeux Anniversaire
        </h1>
      </div>
    </div>
  )
}

export default App
