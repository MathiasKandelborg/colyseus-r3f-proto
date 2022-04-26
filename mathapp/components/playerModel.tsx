import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function PlayerModel(props, { rotation, position, id }) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/models/player.gltf')
    return (
        <group ref={group} {...props} dispose={null}>
            <group
                rotation={rotation}
                rotation-x={-Math.PI / 2}
                rotation-z={-Math.PI}
                position={position}
                scale={0.4}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube_0.geometry}
                    material={materials['Material.001']}
                />
                <group position={rotation} rotation={position} />
            </group>
        </group>
    )
}

useGLTF.preload('/models/player.gltf')
