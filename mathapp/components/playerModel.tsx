import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Vector3 } from 'three'

export default function PlayerModel({ children, rotation, position, id }) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/models/player.gltf')
    console.log(
        `I'm a player model ${id}, my x position is: ${JSON.stringify(
            position,
            null,
            2
        )}`
    )
    return (
        <group ref={group} dispose={null}>
            <group
                //   rotation={rotation}
                rotation-x={-Math.PI / 2}
                rotation-z={-Math.PI}
                position={new Vector3(position.x, position.y, position.z)}
                scale={0.4}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube_0.geometry}
                    material={materials['Material.001']}
                />
                {children}
                <group position={rotation} rotation={position} />
            </group>
        </group>
    )
}

useGLTF.preload('/models/player.gltf')
