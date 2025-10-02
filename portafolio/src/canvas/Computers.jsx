import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../components/Loader";

const Computers = ({ isMobile, setCurrentStage }) => {
  const computer = useGLTF("/models/programmer.glb");
  const meshRef = useRef();

  useFrame(({ camera }) => {
    if (meshRef.current) {
      // Calcula la rotación relativa de la cámara alrededor del modelo en Y
      const angle = Math.atan2(
        camera.position.x - meshRef.current.position.x,
        camera.position.z - meshRef.current.position.z
      );

      // Convierte a positivo y ajusta rango 0-4 (ejemplo 4 stages)
      let normalized = angle >= 0 ? angle : angle + 2 * Math.PI;
      normalized = (normalized / (2 * Math.PI)) * 4;

      // Cambia el stage según el sector
      if (normalized >= 0 && normalized < 1) setCurrentStage(1);
      else if (normalized >= 1 && normalized < 2) setCurrentStage(2);
      else if (normalized >= 2 && normalized < 3) setCurrentStage(3);
      else setCurrentStage(4);
    }
  });

  return (
    <mesh ref={meshRef}>
      <hemisphereLight intensity={2} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      <spotLight
        position={[0, 10, 10]}
        angle={0.3}
        intensity={2}
        castShadow
        shadow-mapSize={2048}
      />
      <pointLight intensity={1.5} position={[0, 5, 5]} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 1.2 : 1.25}
        position={[-15, -2.3, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = ({setCurrentStage}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [5, 3, 10], fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          target={[0, 0.2, 0]}
        />
        <Computers isMobile={isMobile} setCurrentStage={setCurrentStage} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
