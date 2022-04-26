import { OrbitControls } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../util/store'
import * as Colyseus from 'colyseus.js'

const ControlsWrapper = ({ socket }: { socket: Colyseus.Room }) => {
    const controlsRef = useRef()
    const [updateCallback, setUpdateCallback] = useState(null)
    const orbitControlsEnabled = useStore((state) => state.orbitControlsEnabled)

    // Register the update event and clean up
    useEffect(() => {
        const onControlsChange = (val) => {
            /*  if (orbitControlsEnabled) { */
            const { position, rotation } = val.target.object
            // console.log(socket)

            const posArray = []
            const rotArray = []

            position.toArray(posArray)
            rotation.toArray(rotArray)

            // https://docs.colyseus.io/colyseus/client/client/#send-type-message
            if (socket) {
                const { id } = socket
                socket.send('move', {
                    id,
                    rotation: rotArray,
                    position: posArray
                })
            }
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
    return <OrbitControls enabled={orbitControlsEnabled} ref={controlsRef} />
}

export { ControlsWrapper }
