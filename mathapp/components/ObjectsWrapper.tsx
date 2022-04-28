import { Text } from '@react-three/drei'
import {
    MeshNormalMaterial,
    MeshStandardMaterial,
    SphereBufferGeometry,
    BoxBufferGeometry,
    Vector3,
    Euler
} from 'three'
import React from 'react'


const ObjectWrapper = ({ scale, position, rotation, name }) => {
    return (
        <mesh
            position={new Vector3(position.x, position.y, position.z)}
            rotation={
                new Euler(rotation.x, rotation.y, rotation.z, rotation.order)
            }
            scale={new Vector3(scale.x, scale.y, scale.z)}
            geometry={new SphereBufferGeometry()}
            material={new MeshStandardMaterial()}
        >
            <Text
                position={[0, 1.0, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                {name}
            </Text>
        </mesh>
    )
}

export { ObjectWrapper }
