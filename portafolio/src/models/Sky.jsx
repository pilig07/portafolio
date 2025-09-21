import { useGLTF } from '@react-three/drei';
import React from 'react'
import skyScene from '../assets/3d/nebula.glb'
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const Sky = ({ isRotating }) => {
    const sky = useGLTF(skyScene);
    const skyRef = useRef();

    useFrame((_, delta) => {
        if (isRotating) {
            skyRef.current.rotation.y += 0.015 * devicePixelRatio;
        }
    })
    return (
        <mesh ref={skyRef}>
            <primitive object={sky.scene}>

            </primitive>
        </mesh>
    )
}

export default Sky;