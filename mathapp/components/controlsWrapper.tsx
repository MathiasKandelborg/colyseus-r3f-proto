import { OrbitControls } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'

const ControlsWrapper = ({ socket }) => {
    const controlsRef = useRef()
    const [updateCallback, setUpdateCallback] = useState(null)

    // Register the update event and clean up
    useEffect(() => {
        const onControlsChange = (val) => {
            const { position, rotation } = val.target.object
            const { id } = socket

            const posArray = []
            const rotArray = []

            position.toArray(posArray)
            rotation.toArray(rotArray)

            socket.emit('move', {
                id,
                rotation: rotArray,
                position: posArray
            })
        }

        if (controlsRef.current) {
            setUpdateCallback(
                // @ts-ignore
                controlsRef.current.addEventListener('change', onControlsChange)
            )
        }

        // Dispose
        return () => {
            if (updateCallback && controlsRef.current)
                // @ts-ignore
                controlsRef.current.removeEventListener(
                    'change',
                    onControlsChange
                )
        }
    }, [controlsRef, socket])

    //
    return <OrbitControls ref={controlsRef} />
}

export { ControlsWrapper }
