import React, { useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Box, OrbitControls } from "@react-three/drei"
import Model from "../components/model"
import BestScene from "../components/scene"
import Apple from "../components/apple"
import Scenetest from "../components/scenetest"
import { Physics, useBox, usePlane, useTrimesh } from "@react-three/cannon"
import {
  DefaultXRControllers,
  Hands,
  RayGrab,
  VRCanvas,
  useXR,
} from "@react-three/xr"

const Scene = () => {
  const boxRef = useRef()

  return (
    <group castShadow receiveShadow>
      <Physics>
        <Model position={[0, 0, 0]} />
        <RayGrab>
          <BigBox />
        </RayGrab>
        <BigPlane />
      </Physics>
    </group>
  )
}
function BigPlane(props) {
  const [ref] = usePlane(() => ({
    mass: 0,
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[250, 250]} />
      <meshStandardMaterial attach="material" color="#2D4628" />
    </mesh>
  )
}
function BigBox(props) {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 3] }))
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 5, 3)
      }}
      ref={ref}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="red" />
    </mesh>
  )
}

export default function App() {
  return (
    // shadowMap prop must be set to true on the Canvas. And
    // you must set castShadow to true on all lights casting shadows.
    <VRCanvas colorManagement shadows>
      {/* <fog attach="fog" args={["white", 0, 40]} /> */}
      <ambientLight intensity={0.1} />
      <pointLight
        position={[5, 50, 0]}
        rotation={[0, 0, 180]}
        intensity={1}
        castShadow
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
        shadowCameraFar={200}
        shadowCameraNear={0.5}
        shadowBias={-0.001}
      />
      <Scene />
      <Hands />
      <DefaultXRControllers />

      <OrbitControls />
    </VRCanvas>
  )
}
