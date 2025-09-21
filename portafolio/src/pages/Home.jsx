import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Loader } from '../components/Loader'
import Island from '../models/Island-'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'


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
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage}></HomeInfo>}
      </div>
      <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader></Loader>}>
          <directionalLight position={[3, 1, 1]} intensity={2}></directionalLight>
          <ambientLight intensity={0.5}></ambientLight>
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}></hemisphereLight>
          {/* <Bird></Bird> */}
          <Sky isRotating={isRotating}></Sky>
          <Island position={islandPosition} scale={isladScale} rotation={islandRotation} isRotating={isRotating} setIsRotating={setIsRotating} setCurrentStage={setCurrentStage}
          ></Island>
          <Plane isRotating={isRotating} scale={planeScale} position={planePosition} rotation={[0, 20, 0]}></Plane>
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home;