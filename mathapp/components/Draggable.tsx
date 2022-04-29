import React, { useEffect, useRef, useState } from 'react'
import { extend, useThree } from '@react-three/fiber'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { useStore } from '../util/store'

extend({ DragControls })

function Draggable({ children }) {
    const groupRef = useRef<HTMLCanvasElement>(null)
    const controlsRef = useRef<HTMLCanvasElement>(null)
    const [draggableObjects, setObjects] = useState([])
    const { camera, gl, scene } = useThree()
    const setOrbitControlsEnabled = useStore(
        (state) => state.setOrbitControlsEnabled
    )

    useEffect(() => {
        setObjects(groupRef.current.children)
    }, [groupRef])

    useEffect(() => {
        controlsRef.current.addEventListener('hoveron', () => {
            setOrbitControlsEnabled(false)
        })
        controlsRef.current.addEventListener('hoveroff', () => {
            setOrbitControlsEnabled(true)
        })
    }, [draggableObjects])

    return (
        <group ref={groupRef}>
            <dragControls
                ref={controlsRef}
                args={[draggableObjects, camera, gl.domElement]}
            />
            {children}
        </group>
    )
}

export default Draggable
