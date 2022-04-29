import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Euler, Vector3 } from 'three'

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
                scale={0.1}
                position={new Vector3(position.x, position.y, position.z)}
                rotation={new Euler(rotation.x, rotation.y, rotation.z, 'XYZ')}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube_0_1.geometry}
                    material={materials['Material.001']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube_0_2.geometry}
                    material={materials['Material.002']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube_0_3.geometry}
                    material={materials['Material.003']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube_0_4.geometry}
                    material={materials['Material.004']}
                />
                {children}
                {/* <group position={rotation} rotation={position} /> */}
            </group>
        </group>
    )
}

useGLTF.preload('/models/player.gltf')
