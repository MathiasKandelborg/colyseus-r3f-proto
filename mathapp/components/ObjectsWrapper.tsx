import { Text } from '@react-three/drei'
import {
    MeshNormalMaterial,
    MeshStandardMaterial,
    SphereBufferGeometry,
    BoxBufferGeometry
} from 'three'
import Draggable from './Draggable'

import React from 'react'

const ObjectWrapper = ({ position, rotation, id }) => {
    return (
        <Draggable>
            <mesh
                position={position}
                rotation={rotation}
                geometry={new SphereBufferGeometry()}
                material={new MeshStandardMaterial()}
            >
                <Text
                    position={[0, 1.0, 0]}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    {id}
                </Text>
            </mesh>
        </Draggable>
    )
}

export { ObjectWrapper }
