import { extend, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { DragControls } from 'three/examples/jsm/controls/DragControls'

extend({ DragControls })
function Draggable({ objects, setObjects, children}) {
    const groupRef = useRef()
    const controlRef = useRef()
  
    const { camera, gl, scene } = useThree()

    useEffect(() => {
        // @ts-ignore
        setObjects(groupRef.current.children)
    }, [groupRef])

    useEffect(() => {
        controlRef.current.addEventListener('hoveron', () => {
             scene.orbitControls.enabled = false
        })
        controlRef.current.addEventListener('hoveroff', () => {
             scene.flyControl.enabled = true
        })
    }, [objects])

    return (
        <group ref={groupRef}>
            {/* @ts-ignore */}
            <dragControls
                ref={controlRef}
                args={[objects, camera, gl.domElement]}
            />
            {children}
        </group>
    )
}

export default Draggable
