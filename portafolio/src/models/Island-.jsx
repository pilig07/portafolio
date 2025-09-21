
import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { a } from '@react-spring/three'

import islandScene from '../assets/3d/planet.glb'

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
    const islandRef = useRef();
    const { gl, viewport } = useThree();
    const { nodes, materials } = useGLTF(islandScene);

    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.95; //que tan rapido se mueve

    const handlePointerDown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsRotating(true);

        const clientX = e.touches ? e.touches[0] : e.clientX;

        lastX.current = clientX;
    }
    const handlePointerUp = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsRotating(false);


    }
    const handlePointerMove = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (isRotating) {
            const clientX = e.touches ? e.touches[0] : e.clientX;

            const delta = (clientX - lastX.current) / viewport.width;

            islandRef.current.rotation.y += delta * 0.01 * Math.PI

            lastX.current = clientX;

            rotationSpeed.current = delta * 0.01 * Math.PI;
        }
    }

    const handleKeyDown = (e) => {
        if (e.key == 'ArrowLeft') {
            if (!isRotating) setIsRotating(true);
            islandRef.current.rotation.y += 0.01 * Math.PI;
            
            rotationSpeed.current = 0.0125;


        } else if (e.key == 'ArrowRight') {
            if (!isRotating) setIsRotating(true);
            islandRef.current.rotation.y -= 0.01 * Math.PI;
             rotationSpeed.current = -0.0125;
        }
    }

    const handleKeyUp = (e) => {
        if (e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
            setIsRotating(false);
        }
    }

    useFrame(() => {
        if (!isRotating) {
            rotationSpeed.current *= dampingFactor;

            if (Math.abs(rotationSpeed.current) < 0.001) {
                rotationSpeed.current = 0;
            }
            islandRef.current.rotation.y += rotationSpeed.current;
         } else {
                // When rotating, determine the current stage based on island's orientation
                const rotation = islandRef.current.rotation.y;

                /**
                 * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
                 * The goal is to ensure that the rotation value remains within a specific range to
                 * prevent potential issues with very large or negative rotation values.
                 *  Here's a step-by-step explanation of what this code does:
                 *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
                 *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
                 *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
                 *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
                 *     This is done to ensure that the value remains positive and within the range of
                 *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
                 *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
                 *     modulo operation to the value obtained in step 2. This step guarantees that the value
                 *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
                 *     circle in radians.
                 */
                const normalizedRotation =
                    ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

                // Set the current stage based on the island's orientation
                switch (true) {
                    case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
                        setCurrentStage(4);
                        break;
                    case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
                        setCurrentStage(3);
                        break;
                    case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
                        setCurrentStage(2);
                        break;
                    case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
                        setCurrentStage(1);
                        break;
                    default:
                        setCurrentStage(null);
                }
            }
        
    })

    useEffect(() => {
        const canvas = gl.domElement;
        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointerup', handlePointerUp);
        canvas.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            canvas.removeEventListener('pointerdown', handlePointerDown);
            canvas.removeEventListener('pointerup', handlePointerUp);
            canvas.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [gl, handlePointerDown, handlePointerUp, handlePointerMove])





    return (
        <a.group {...props} ref={islandRef}>
            <group scale={0.01}>
        <group position={[16.94, 18.247, -24.024]} scale={100}>
          <mesh geometry={nodes.Globo_Sphere003_Green_0.geometry} material={materials.Green} />
          <mesh geometry={nodes.Globo_Sphere003_White_0.geometry} material={materials.White} />
        </group>
        <group
          position={[62.58, 172.937, 256.589]}
          rotation={[-0.46, 0.235, -0.069]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder001_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder001_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[-81.045, 188.092, 243.023]}
          rotation={[-0.529, -0.275, 0.158]}
          scale={[10.449, 10.449, 20.252]}>
          <mesh geometry={nodes.Cylinder003_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder003_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-18.729, 253.327, 187.87]}
          rotation={[-0.879, 0.036, 0.08]}
          scale={[7.914, 7.914, 15.338]}>
          <mesh geometry={nodes.Cylinder004_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder004_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[78.952, 212.401, 222.504]}
          rotation={[-0.646, 0.165, 0.057]}
          scale={[7.914, 7.914, 15.338]}>
          <mesh geometry={nodes.Cylinder005_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder005_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-3.583, 204.854, 240.425]}
          rotation={[-0.738, 0.07, 0.06]}
          scale={[7.914, 7.914, 15.338]}>
          <mesh geometry={nodes.Cylinder006_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder006_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-100.369, 235.284, 187.657]}
          rotation={[-0.984, -0.433, -0.022]}
          scale={[7.601, 7.601, 14.732]}>
          <mesh geometry={nodes.Cylinder007_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder007_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[16.793, 162.745, 270.74]}
          rotation={[-0.405, 0.072, 2.574]}
          scale={[10.449, 10.449, 20.252]}>
          <mesh geometry={nodes.Cylinder008_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder008_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[92.566, 3.727, 301.702]}
          rotation={[0.023, 0.362, -1.462]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder009_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder009_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[-56.295, 136.072, 280.459]}
          rotation={[-0.467, -0.207, 0.078]}
          scale={[7.914, 7.914, 15.338]}>
          <mesh geometry={nodes.Cylinder010_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder010_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[144.111, -109.219, 263.059]}
          rotation={[0.317, 0.303, -0.928]}
          scale={[10.449, 10.449, 20.252]}>
          <mesh geometry={nodes.Cylinder012_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder012_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[176.456, 244.034, -91.972]}
          rotation={[-1.9, 0.59, 0.558]}
          scale={[9.3, 9.3, 18.025]}>
          <mesh geometry={nodes.Cylinder013_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder013_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[56.491, 97.887, 291.554]}
          rotation={[-0.261, 0.082, -2.402]}
          scale={[7.003, 7.003, 0.739]}>
          <mesh geometry={nodes.Cylinder014_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder014_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[305.744, 73.861, -51.295]}
          rotation={[-2.121, 1.144, 0.769]}
          scale={[9.3, 9.3, 18.025]}>
          <mesh geometry={nodes.Cylinder015_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder015_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[231.041, 84.105, -198.632]}
          rotation={[-2.65, 0.751, 1.241]}
          scale={[9.3, 9.3, 18.025]}>
          <mesh geometry={nodes.Cylinder016_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder016_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[207.448, 45.252, -233.634]}
          rotation={[-3.086, 0.743, 1.625]}
          scale={[8.211, 8.211, 15.914]}>
          <mesh geometry={nodes.Cylinder017_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder017_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[269.727, -7.618, -169.947]}
          rotation={[2.959, 1.045, 2.507]}
          scale={[9.3, 9.3, 18.025]}>
          <mesh geometry={nodes.Cylinder018_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder018_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[236.737, -99.72, -182.827]}
          rotation={[2.736, 0.837, -2.912]}
          scale={[10.449, 10.449, 20.252]}>
          <mesh geometry={nodes.Cylinder019_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder019_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[218.849, -39.473, -224.887]}
          rotation={[3.069, 0.543, 2.937]}
          scale={[8.257, 8.257, 16.003]}>
          <mesh geometry={nodes.Cylinder020_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder020_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[315.015, 38.906, 10.108]}
          rotation={[-1.976, 1.488, -0.025]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder021_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder021_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[223.03, 216.781, -70.848]}
          rotation={[-1.445, 0.913, -0.541]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder022_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder022_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[86.235, 252.934, -167.369]}
          rotation={[-2.168, 0.346, 0.878]}
          scale={[9.3, 9.3, 18.025]}>
          <mesh geometry={nodes.Cylinder023_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder023_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-6.916, 210.393, -235.492]}
          rotation={[-2.394, 0.017, 0.919]}
          scale={[8.068, 8.068, 15.638]}>
          <mesh geometry={nodes.Cylinder024_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder024_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-102.429, 210.17, -216.548]}
          rotation={[-2.353, -0.481, 0.955]}
          scale={[9.3, 9.3, 18.025]}>
          <mesh geometry={nodes.Cylinder025_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder025_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-164.17, 147.396, -227.204]}
          rotation={[-2.541, -0.419, 0.889]}
          scale={[8.388, 8.388, 16.258]}>
          <mesh geometry={nodes.Cylinder026_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder026_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-216.023, -115.739, -200.541]}
          rotation={[2.823, -0.806, -2.921]}
          scale={[10.449, 10.449, 20.252]}>
          <mesh geometry={nodes.Cylinder027_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder027_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-277.835, -96.874, -114.304]}
          rotation={[2.386, -0.993, -0.636]}
          scale={[9.202, 9.202, 17.835]}>
          <mesh geometry={nodes.Cylinder028_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder028_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[190.199, -124.922, 221.649]}
          rotation={[0.451, 0.56, 0.872]}
          scale={[9.14, 9.14, 17.714]}>
          <mesh geometry={nodes.Cylinder030_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder030_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[215.409, -37.187, 228.09]}
          rotation={[0.136, 0.681, 1.057]}
          scale={[9.14, 9.14, 17.714]}>
          <mesh geometry={nodes.Cylinder031_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder031_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-182.827, 207.685, -153.282]}
          rotation={[-2.293, -0.511, 0.945]}
          scale={[8.068, 8.068, 15.638]}>
          <mesh geometry={nodes.Cylinder032_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder032_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[273.75, -72.984, -138.932]}
          rotation={[2.447, 1.101, 1.816]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder033_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder033_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[289.122, -13.27, -126.68]}
          rotation={[2.839, 1.048, 1.47]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder034_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder034_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[237.864, -49.126, -201.98]}
          rotation={[2.82, 0.731, -2.099]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder035_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder035_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[188.986, 2.053, -253.498]}
          rotation={[-3.133, 0.508, -2.293]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder036_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder036_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[203.909, -78.082, -226.375]}
          rotation={[2.757, 0.669, -2.072]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder037_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder037_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[143.738, -86.953, -265.884]}
          rotation={[2.835, 0.49, -2.115]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder038_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder038_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[-3.809, 108.203, -298.185]}
          rotation={[-2.856, 0.115, -2.3]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder039_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder039_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[-51.734, 112.74, -291.599]}
          rotation={[-3.027, -0.184, -2.306]}
          scale={[6.595, 6.595, 0.696]}>
          <mesh geometry={nodes.Cylinder040_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder040_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[-160.448, 79.969, -261.185]}
          rotation={[-3.088, -0.683, 2.662]}
          scale={[4.933, 4.933, 0.521]}>
          <mesh geometry={nodes.Cylinder041_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder041_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[-188.78, -0.282, -253.743]}
          rotation={[-2.974, -0.561, -2.317]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder042_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder042_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[-146.42, 2.513, -281.636]}
          rotation={[3.105, -0.213, -0.344]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder043_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder043_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[-258.457, -79.363, -164.094]}
          rotation={[2.711, -1.004, -0.59]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder044_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder044_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[-285.369, -69.861, -117.523]}
          rotation={[2.589, -1.09, -1.829]}
          scale={[4.764, 4.764, 0.503]}>
          <mesh geometry={nodes.Cylinder045_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder045_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[132.977, 213.668, -195.616]}
          rotation={[-2.512, 0.38, -2.386]}
          scale={[7.083, 7.083, 0.748]}>
          <mesh geometry={nodes.Cylinder046_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder046_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[77.981, 179.984, -246.799]}
          rotation={[-2.556, 0.49, -0.571]}
          scale={[6.279, 6.279, 0.663]}>
          <mesh geometry={nodes.Cylinder047_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder047_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[-20.735, 158.007, -272.839]}
          rotation={[-2.297, -0.023, -1.612]}
          scale={15.357}>
          <mesh geometry={nodes.Cylinder048_Grey_0.geometry} material={materials.Grey} />
          <mesh geometry={nodes.Cylinder048_White_0.geometry} material={materials.White} />
        </group>
        <group
          position={[215.714, 212.136, -90.891]}
          rotation={[-2.409, 0.581, -1.547]}
          scale={10.571}>
          <mesh geometry={nodes.Cylinder049_Grey_0.geometry} material={materials.Grey} />
          <mesh geometry={nodes.Cylinder049_White_0.geometry} material={materials.White} />
        </group>
        <group
          position={[250.104, 34.706, -190.639]}
          rotation={[-2.805, 0.905, -1.279]}
          scale={10.571}>
          <mesh geometry={nodes.Cylinder050_Grey_0.geometry} material={materials.Grey} />
          <mesh geometry={nodes.Cylinder050_White_0.geometry} material={materials.White} />
        </group>
        <group
          position={[206.722, 4.348, -238.904]}
          rotation={[3.038, 0.714, -0.913]}
          scale={[8.257, 8.257, 16.003]}>
          <mesh geometry={nodes.Cylinder051_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder051_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[157.469, 32.328, -269.99]}
          rotation={[-3.065, 0.496, -2.326]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder052_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder052_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[103.086, 139.611, -262.723]}
          rotation={[-2.664, 0.353, 1.371]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder053_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder053_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[-66.041, 252.47, -176.432]}
          rotation={[-2.223, -0.263, 1.35]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder054_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder054_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[-157.175, 257.886, -93.608]}
          rotation={[-2.143, -0.761, 3.108]}
          scale={[7.339, 7.339, 0.775]}>
          <mesh geometry={nodes.Cylinder055_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder055_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[245.195, 8.469, -199.907]}
          rotation={[-3.106, 0.99, 1.568]}
          scale={[7.077, 7.077, 13.716]}>
          <mesh geometry={nodes.Cylinder056_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder056_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[224.745, -82.336, 208.18]}
          rotation={[0.538, 0.828, -2.222]}
          scale={[7.077, 7.077, 13.716]}>
          <mesh geometry={nodes.Cylinder057_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder057_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[162.437, -53.593, 265.46]}
          rotation={[0.146, 0.508, -1.986]}
          scale={[7.077, 7.077, 13.716]}>
          <mesh geometry={nodes.Cylinder058_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder058_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[139.475, -157.296, 239.744]}
          rotation={[0.636, 0.631, -2.23]}
          scale={[7.077, 7.077, 13.716]}>
          <mesh geometry={nodes.Cylinder059_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder059_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[102.729, -57.045, 293.792]}
          rotation={[0.216, 0.436, -2.042]}
          scale={[7.077, 7.077, 13.716]}>
          <mesh geometry={nodes.Cylinder060_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder060_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[171.363, -1.081, 266.237]}
          rotation={[-0.037, 0.238, -0.164]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder061_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder061_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[94.971, -179.698, 245.796]}
          rotation={[0.806, 0.345, -0.42]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder062_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder062_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[137.965, 15.755, 282.743]}
          rotation={[-0.011, 0.136, 1.374]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder063_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder063_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder063_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-8.628, 74.71, 306.822]}
          rotation={[-0.296, -0.631, -2.709]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder064_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder064_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder064_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-5.529, 77.267, 305.996]}
          rotation={[-0.451, -0.11, 0.166]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder065_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder065_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder065_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-33.779, 177.921, 258.935]}
          rotation={[-0.604, -0.144, 0.147]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder066_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder066_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder066_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[248.752, -59.227, 186.441]}
          rotation={[0.395, 0.95, -0.345]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder067_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder067_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder067_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[291.68, 36.172, -119.865]}
          rotation={[-2.626, 1.082, 2.655]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder068_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder068_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder068_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[113.579, 92.893, -278.486]}
          rotation={[-2.777, 0.191, 2.755]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder069_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder069_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder069_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-28.988, 94.369, -301.28]}
          rotation={[-2.831, -0.349, 2.751]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder070_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder070_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder070_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-122.427, 84.814, -279.865]}
          rotation={[-2.737, -0.45, 1.474]}
          scale={[4.714, 4.714, 0.498]}>
          <mesh geometry={nodes.Cylinder071_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder071_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder071_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-291.195, -21.717, -118.439]}
          rotation={[2.732, -1.071, 3.034]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder072_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder072_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder072_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-121.995, 284.771, -63.138]}
          rotation={[-1.651, -0.311, -1.72]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder073_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder073_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder073_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-89.835, 286.296, -100.938]}
          rotation={[-1.905, -0.341, 1.108]}
          scale={[8.068, 8.068, 15.638]}>
          <mesh geometry={nodes.Cylinder074_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder074_Green2_0.geometry} material={materials.Green2} />
          <mesh geometry={nodes.Cylinder074_White_0.geometry} material={materials.White} />
        </group>
        <group
          position={[-15.883, 286.121, -135.639]}
          rotation={[-1.999, 0.008, 1.092]}
          scale={[8.068, 8.068, 15.638]}>
          <mesh geometry={nodes.Cylinder075_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder075_Green2_0.geometry} material={materials.Green2} />
          <mesh geometry={nodes.Cylinder075_White_0.geometry} material={materials.White} />
        </group>
        <group
          position={[69.292, 264.678, 161.412]}
          rotation={[-1.131, 0.259, 1.067]}
          scale={[8.068, 8.068, 15.638]}>
          <mesh geometry={nodes.Cylinder076_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder076_Green2_0.geometry} material={materials.Green2} />
          <mesh geometry={nodes.Cylinder076_White_0.geometry} material={materials.White} />
        </group>
        <group
          position={[-76.723, 278.443, 130.03]}
          rotation={[-1.1, -0.213, 1.066]}
          scale={[9.27, 9.27, 17.967]}>
          <mesh geometry={nodes.Cylinder002_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder002_Green2_0.geometry} material={materials.Green2} />
          <mesh geometry={nodes.Cylinder002_White_0.geometry} material={materials.White} />
        </group>
        <group
          position={[265.791, 85.732, -144.404]}
          rotation={[-2.572, 0.77, 0.46]}
          scale={[6.166, 6.166, 0.651]}>
          <mesh geometry={nodes.Cylinder077_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder077_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder077_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-258.222, -152.724, -99.114]}
          rotation={[2.04, -0.941, 2.736]}
          scale={[9.202, 9.202, 17.835]}>
          <mesh geometry={nodes.Cylinder078_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder078_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-246.605, -122.066, -158.93]}
          rotation={[2.255, -0.786, -0.305]}
          scale={[8.068, 8.068, 15.638]}>
          <mesh geometry={nodes.Cylinder079_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder079_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[274.033, 103.627, -114.338]}
          rotation={[-2.513, 0.812, -1.829]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder080_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder080_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder080_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[260.44, 177.558, -19.586]}
          rotation={[-1.605, 0.859, 1.744]}
          scale={[8.257, 8.257, 16.003]}>
          <mesh geometry={nodes.Cylinder081_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder081_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[52.734, 210.16, -228.328]}
          rotation={[-2.439, 0.152, 2.193]}
          scale={[8.257, 8.257, 16.003]}>
          <mesh geometry={nodes.Cylinder082_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder082_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-10.074, 253.259, -188.45]}
          rotation={[-2.249, 0.125, 2.76]}
          scale={[8.257, 8.257, 16.003]}>
          <mesh geometry={nodes.Cylinder083_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder083_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-133.257, 247.251, -144.127]}
          rotation={[-2.099, -0.383, -0.415]}
          scale={[8.257, 8.257, 16.003]}>
          <mesh geometry={nodes.Cylinder084_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder084_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[148.49, 88.561, -264.896]}
          rotation={[-2.953, 0.546, -0.373]}
          scale={[6.279, 6.279, 0.663]}>
          <mesh geometry={nodes.Cylinder085_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder085_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[217.554, 182.322, -137.866]}
          rotation={[-2.135, 0.579, -0.827]}
          scale={[6.279, 6.279, 0.663]}>
          <mesh geometry={nodes.Cylinder086_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder086_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[195.828, 170.443, -180.783]}
          rotation={[-2.588, 0.668, -0.559]}
          scale={[6.279, 6.279, 0.663]}>
          <mesh geometry={nodes.Cylinder087_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder087_Yellow_0.geometry} material={materials.Yellow} />
        </group>
        <group
          position={[152.386, 174.17, -217.457]}
          rotation={[-2.612, 0.424, 2.243]}
          scale={[8.257, 8.257, 16.003]}>
          <mesh geometry={nodes.Cylinder088_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder088_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[82.652, 37.95, 301.988]}
          rotation={[-0.127, 0.265, -1.922]}
          scale={[7.077, 7.077, 13.716]}>
          <mesh geometry={nodes.Cylinder089_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder089_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-116.917, 111.478, -274.791]}
          rotation={[-2.757, -0.444, 1.422]}
          scale={[8.388, 8.388, 16.258]}>
          <mesh geometry={nodes.Cylinder090_Brown_0.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Cylinder090_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-170.523, 112.328, -240.239]}
          rotation={[-2.891, -0.595, 2.255]}
          scale={[6.354, 6.354, 0.671]}>
          <mesh geometry={nodes.Cylinder091_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder091_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder091_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[131.95, -16.146, 285.749]}
          rotation={[0.081, 0.479, 1.346]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder011_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder011_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder011_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-111.896, 194.725, 221.497]}
          rotation={[-0.833, -0.216, 2.763]}
          scale={[7.973, 7.973, 0.842]}>
          <mesh geometry={nodes.Cylinder029_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder029_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder029_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-54.774, 216.986, 225.272]}
          rotation={[-0.821, -0.122, 1.681]}
          scale={[6.284, 6.284, 0.664]}>
          <mesh geometry={nodes.Cylinder092_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder092_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder092_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-125.815, 262.499, 124.053]}
          rotation={[-1.347, -0.517, 3.121]}
          scale={[6.284, 6.284, 0.664]}>
          <mesh geometry={nodes.Cylinder093_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder093_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder093_Green2_0.geometry} material={materials.Green2} />
        </group>
        <group
          position={[-104.785, 172.243, -242.031]}
          rotation={[-2.737, -0.45, 1.474]}
          scale={[4.714, 4.714, 0.498]}>
          <mesh geometry={nodes.Cylinder094_White_0.geometry} material={materials.White} />
          <mesh geometry={nodes.Cylinder094_Yellow_0.geometry} material={materials.Yellow} />
          <mesh geometry={nodes.Cylinder094_Green2_0.geometry} material={materials.Green2} />
        </group>
        <mesh
          geometry={nodes.Sphere_Blue_0.geometry}
          material={materials.Blue}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={312.136}
        />
      </group>
            {/* <mesh
                geometry={nodes.polySurface944_tree_body_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface945_tree1_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface946_tree2_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface947_tree1_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface948_tree_body_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface949_tree_body_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh geometry={nodes.pCube11_rocks1_0.geometry} material={materials.PaletteMaterial001} /> */}
        </a.group>
    )
}

export default Island;