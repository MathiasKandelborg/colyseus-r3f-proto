import React, { useEffect, useRef, useState } from 'react'
import { extend, useThree } from '@react-three/fiber'
import { DragControls } from 'three/examples/jsm/controls/DragControls'

extend({ DragControls })
function Draggable(props) {
    const groupRef = useRef()
    const controlRef = useRef()
    const [objects, setObjects] = useState([])
    const { camera, gl, scene } = useThree()
    useEffect(() => {
        setObjects(groupRef.current.children)
    }, [groupRef])

    useEffect(() => {
        /*       controlRef.current.addEventListener('hoveron', () => {
            scene.orbitControls.enabled = false
        })
        controlRef.current.addEventListener('hoveroff', () => {
            if (scene. .orbitControls) {
            scene.flyControl.enabled = true
        }) */
    }, [objects])
    return (
        <group ref={groupRef}>
            <dragControls
                ref={controlRef}
                args={[objects, camera, gl.domElement]}
            />
            {props.children}
        </group>
    )
}

export default Draggable
