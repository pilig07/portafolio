import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Loader } from '../components/Loader'
import Island from '../models/Island-'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'
import { motion } from 'framer-motion'
import ComputersCanvas from '../canvas/Computers'
import { styles } from '../styles'

export const Home = () => {

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [4, 4, 4];

    } else {
      screenScale = [6, 6, 6];

    }
    return [screenScale, screenPosition, rotation];
  }
  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition

    if (window.innerWidth < 768) {
      screenScale = [0.06, 0.06, 0.06];
      screenPosition = [0, -1.5, 0];

    } else {
      screenScale = [0.2, 0.2, 0.2];
      screenPosition = [0, -5, -5];

    }
    return [screenScale, screenPosition];
  }

  const [isladScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();


  return (
    <section className={`relative w-full h-screen mx-auto `}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-black`}>
            Hi, I'm <span className='text-[#915EFF]'>Pilar</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            A Software Developer from Mexico 🌮
          </p>
        </div>
      </div>

      <ComputersCanvas />

      
    </section>
    // <section className='w-full h-screen relative mx-auto violet-gradient'>
    //   <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
    //     {currentStage && <HomeInfo currentStage={currentStage}></HomeInfo>}
    //   </div>
    //   <div className='flex flex-col justify-center items-center mt-5'>
    //     <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
    //     <div className='w-1 sm:h-80 h-40 violet-gradient' />
    //   </div>

    //   <div>
    //     <h1 className={`${styles.heroHeadText} text-white`}>
    //       Hi, I'm <span className='text-[#915EFF]'>Adrian</span>
    //     </h1>
    //     <p className={`${styles.heroSubText} mt-2 text-white-100`}>
    //       I develop 3D visuals, user <br className='sm:block hidden' />
    //       interfaces and web applications
    //     </p>
    //   </div>


    // </section>
  )
}

export default Home;