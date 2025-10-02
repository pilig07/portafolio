import React, { useState, useEffect } from 'react'
import ComputersCanvas from '../canvas/Computers'
import HomeInfo from '../components/HomeInfo'
import { motion } from 'framer-motion'
import { styles } from '../styles'


export const Home = () => {
  const [currentStage, setCurrentStage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mediaQuery.matches)
    const handleResize = (event) => setIsMobile(event.matches)
    mediaQuery.addEventListener('change', handleResize)
    return () => mediaQuery.removeEventListener('change', handleResize)
  }, [])

  // Cambiar stages automáticamente en móvil
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentStage((prev) => (prev === 4 ? 1 : prev + 1))
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isMobile])

  return (
    <>
      <section className="relative w-full h-screen mx-auto hidden md:block">
        <div
          className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-10`}
        >
          {/* Lado izquierdo: stages / textboxes */}
          <div className="flex flex-col justify-start items-start mt-5 w-1/2">
            {currentStage && <HomeInfo currentStage={currentStage} />}
          </div>

          {/* Lado derecho: Hi, I'm Pilar + línea y punto */}
          <div className="flex flex-col justify-center items-end w-3/5 relative mt-10 md:mt-0">
            {/* Punto y línea */}
            <div className="flex flex-col justify-center items-center absolute left-[-30px] top-0">
              <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
              <div className="w-1 sm:h-80 h-40 violet-gradient" />
            </div>

            {/* Texto alineado */}
            <div className="flex flex-col items-start mt-24 md:mt-20 px-4 md:px-0">
              <h1 className={`${styles.heroHeadText} text-black text-3xl sm:text-5xl`}>
                Hi, I'm <span className="text-[#915EFF]">Pilar</span>
              </h1>
              <p className={`${styles.heroSubText} mt-2 text-white-100 text-sm sm:text-base`}>
                A Software Developer from Mexico 🌮
              </p>

              {/* Card info */}
              <div className="mt-6 md:mt-8 p-4 bg-[#1f1f1f]/80 backdrop-blur-md rounded-xl max-w-xs shadow-lg">
                <p className="text-white text-sm">🚀 Currently exploring 3D web, React & Three.js</p>
                <p className="text-white text-sm mt-1">💻 Building interactive experiences</p>
              </div>

              {/* Partículas / burbujas */}
              <motion.div
                className="mt-4 md:mt-6 flex gap-2"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-3 sm:w-4 h-3 sm:h-4 bg-[#6c5ce7] rounded-full" />
                <div className="w-3 sm:w-4 h-3 sm:h-4 bg-[#a29bfe] rounded-full" />
                <div className="w-3 sm:w-4 h-3 sm:h-4 bg-[#6c5ce7] rounded-full" />
              </motion.div>
            </div>
          </div>

          {/* Mensaje rotate solo desktop */}
          <p className="absolute right-[120px] bottom-[100px] text-white italic text-sm sm:text-base"
            style={{ textShadow: '0 0 6px rgba(0,0,0,0.5)' }}>
            Rotate to see the magic ✨
          </p>

        </div>

        {/* Partículas de fondo */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
          <div className="w-8 h-8 bg-[#915EFF]/30 rounded-full absolute top-10 left-20 animate-pulse" />
          <div className="w-6 h-6 bg-[#915EFF]/20 rounded-full absolute top-40 left-40 animate-pulse" />
        </div>

        {/* Canvas 3D solo desktop */}
        {!isMobile && <ComputersCanvas setCurrentStage={setCurrentStage} />}


      </section>

      {/* Mobile */}
      {/* Mobile */}
      <section className="relative w-full h-screen mx-auto block md:hidden pt-24">
        <div className="flex flex-col items-center text-center p-4">
          {/* Mensajes rotando arriba */}
          {currentStage && <HomeInfo currentStage={currentStage} />}


          {/* Texto principal */}
          <h1 className={`${styles.heroHeadText} text-black text-3xl mt-6 pt-10`}>
            Hi, I'm <span className="text-[#915EFF]">Pilar</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 text-sm`}>
            A Software Developer from Mexico 🌮
          </p>

          {/* Card info */}
          <div className="mt-6 p-4 bg-[#1f1f1f]/80 backdrop-blur-md rounded-xl shadow-lg w-full max-w-sm">
            <p className="text-white text-sm">🚀 Currently exploring 3D web, React & Three.js</p>
            <p className="text-white text-sm mt-1">💻 Building interactive experiences</p>
          </div>

          {/* Partículas / burbujas */}
          <motion.div
            className="mt-4 flex gap-2 justify-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-3 h-3 bg-[#6c5ce7] rounded-full" />
            <div className="w-3 h-3 bg-[#a29bfe] rounded-full" />
            <div className="w-3 h-3 bg-[#6c5ce7] rounded-full" />
          </motion.div>

        </div>
      </section>

    </>


  )
}

export default Home
