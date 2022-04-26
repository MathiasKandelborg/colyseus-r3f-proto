import * as MUI from '@mui/material'
import { DefaultXRControllers, Hands, useXR, VRCanvas } from '@react-three/xr'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { ControlsWrapper } from '../components/controlsWrapper'
import { ObjectWrapper } from '../components/ObjectsWrapper'
import { UserWrapper } from '../components/UserWrapper'
import { movement } from '../util/hooks/movementHook'
import GltfLoader from '../components/gltfloader'
import Draggable from '../components/Draggable'
import { useStore } from '../util/store'
import { obj } from '../util/objectData'

const Home = () => {
    const [socketClient, setSocketClient] = useState(null)
    const [clients, setClients] = useState({})
    const objects = useStore((state) => state.objects)
    const setObjects = useStore((state) => state.setObjects)
    const setState = useStore((state) => state.setObjs)

    // const [objects, setObjects] = useState({})

    const { player, controllers } = useXR()

    const socketInitializer = async () => {
        await fetch('/api/socket')
        // socket = io()
        setSocketClient(io())

        // Dispose gracefuly
        return () => {
            if (socketClient) socketClient.disconnect()
        }
    }

    useEffect(() => {
        socketInitializer()

        movement(socketClient, player, controllers)
    }, [])

    // Useeffect to listen for updates from the socket clients
    useEffect(() => {
        if (socketClient) {
            console.log(socketClient)
            socketClient.on('connect', () => {
                console.log('connected')
            })

            socketClient.on('disconnect', () => {
                console.log('connected')
            })

            socketClient.on('move', (clients) => {
                setClients(clients)
            })

            socketClient.on('state', (state) => {
                console.log(state)
                setState(state)
            })

            console.log('emitting add object')
            socketClient.emit('add-object', {
                object: obj
            })

            socketClient.on('update-object-position', (objects) => {
                console.log(objects)
                setObjects(objects)
            })
        }
    }, [socketClient])

    return (
        <MUI.Container sx={{ height: '100vh' }}>
            {socketClient && (
                <VRCanvas
                    camera={{ position: [0, 1, -5], near: 0.1, far: 1000 }}
                >
                    {/*  <Stats /> */}

                    <ControlsWrapper socket={socketClient} />
                    <gridHelper rotation={[0, 0, 0]} />

                    {/* Filter myself from the client list and create user box  es with IDs */}
                    {Object.keys(clients)
                        .filter((clientKey) => clientKey !== socketClient.id)
                        .map((client) => {
                            const { position, rotation } = clients[client]
                            return (
                                <UserWrapper
                                    key={client}
                                    id={client}
                                    position={position}
                                    rotation={rotation}
                                />
                            )
                        })}
                    {objects
                        // Map does something for each object
                        // Each object is named in the callback function
                        .map((object) => {
                            console.log(object)
                            const { id, position, rotation } = object

                            return (
                                <Draggable socketClient={socketClient}>
                                    <ObjectWrapper
                                        key={id}
                                        id={id}
                                        position={position}
                                        rotation={rotation}
                                    />
                                </Draggable>
                            )
                        })}
                    <Hands />
                    <DefaultXRControllers />
                    <pointLight position={[0, 10, 0]} />
                    {/*    <Draggable socketClient={socketClient}>
                            <ObjectWrapper
                                position={[0, 0, 1]}
                                rotation={[0, 0, 0]}
                                id="0"
                            />
                        </Draggable> */}
                    {/*  <GltfLoader /> */}
                </VRCanvas>
            )}
        </MUI.Container>
    )
}

export default Home
