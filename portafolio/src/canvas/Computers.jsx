import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../components/Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("/models/programmer.glb");

  return (
    <mesh>
      <hemisphereLight intensity={2}  />
     <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
      />
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
        scale={isMobile ? 1.2 : 1.25}   //  hazlo más grande
        position={[0, -1.5, 0]}          //  baja un poco
        rotation={[0, Math.PI / 2, 0]} // gira de frente
      />

    </mesh>
  );
};

const ComputersCanvas = () => {
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
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          target={[0, 0.2, 0]} // 👈 centrado al nivel del modelo
        />

        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
