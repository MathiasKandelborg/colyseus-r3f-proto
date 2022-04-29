import { Text, useIntersect } from '@react-three/drei'
import {
    MeshNormalMaterial,
    MeshStandardMaterial,
    SphereBufferGeometry,
    BoxBufferGeometry,
    Vector3,
    Euler
} from 'three'
import React, { useEffect, useRef, useState } from 'react'

const ObjectWrapper = ({
    socketClient,
    scale,
    position,
    rotation,
    name,
    id
}) => {
    const [hovered, set] = useState(false)

    const objectRef = useIntersect<HTMLCanvasElement>(() => {
        console.log(`intersected object ${name}`)
    })
    const [updateCallback, setUpdateCallback] = useState(null)

    const onObjectChange = (val) => {
        /*  if (orbitControlsEnabled) { */
        const { position, rotation, scale } = val
        // console.log(socket)

        const posArray = []
        const rotArray = []

        position.toArray(posArray)
        rotation.toArray(rotArray)

        console.log(id)

        // https://docs.colyseus.io/colyseus/client/client/#send-type-message
        if (socketClient) {
            socketClient.send('object-position-update', {
                name: name,
                id: id,
                rotation: rotArray,
                position: posArray,
                scale: scale.toArray()
            })
        }
    }

    return (
        <mesh
            ref={objectRef}
            uuid={id}
            onPointerOver={() => set(true)}
            onPointerOut={(v) => {
                onObjectChange(v.eventObject)
                set(false)
            }}
            onPointerMove={(v) => {
                onObjectChange(v.eventObject)
            }}
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
