import React, { useEffect } from 'react'
import { useRef } from 'react'
import planeScene from '../assets/3d/radiant_p_bc1.glb'
import { useAnimations, useGLTF } from '@react-three/drei'


export const Plane = ({ isRotating, ...props }) => {

  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  

  const { actions } = useAnimations(animations, ref);

  useEffect(()=>{
    console.log(isRotating);
    if(isRotating){
      actions['Take 001'].play();
    }else{
      actions['Take 001'].stop();
    }
  })
  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene}></primitive>
    </mesh>
  )
}
export default Plane;