import * as MUI from '@mui/material'
import { DefaultXRControllers, Hands, useXR, VRCanvas } from '@react-three/xr'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { ControlsWrapper } from '../components/controlsWrapper'
import { ObjectWrapper } from '../components/ObjectsWrapper'
import { UserWrapper } from '../components/UserWrapper'
import { movement } from '../util/hooks/movementHook'

let socket

const Home = () => {
    const [socketClient, setSocketClient] = useState(null)
    const [clients, setClients] = useState({})
    const [objects, setObjects] = useState({})

    const { player, controllers } = useXR()

    useEffect(() => {
        socketInitializer()
        movement(socketClient, player, controllers)
    }, [])

    useEffect(() => {
        // On mount initialize the socket connection
    }, [])

    // Useeffect to listen for updates from the socket clients
    useEffect(() => {
        if (socketClient) {
            socketClient.on('connect', () => {
                console.log('connected')
            })

            socketClient.on('disconnect', () => {
                console.log('connected')
            })

            socketClient.on('move', (clients) => {
                setClients(clients)
            })

            socketClient.on('update-object-position', (objects) => {
                setObjects(objects)
            })
        }
    }, [socketClient])

    const socketInitializer = async () => {
        await fetch('/api/socket')
        // socket = io()
        setSocketClient(io())

        // Dispose gracefuly
        return () => {
            if (socketClient) socketClient.disconnect()
        }
    }

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
                    {Object.keys(objects)
                        // Map does something for each object
                        // Each object is named in the callback function
                        .map((object) => {
                            console.log(objects[object])
                            const { position, rotation } = objects[object]
                            return (
                                <ObjectWrapper
                                    key={object}
                                    id={object}
                                    position={position}
                                    rotation={rotation}
                                />
                            )
                        })}
                    <Hands />
                    <DefaultXRControllers />
                    <pointLight position={[10, 10, 10]} />
                    <ObjectWrapper
                        position={[0, 0, 1]}
                        rotation={[0, 0, 0]}
                        id="123"
                    />
                </VRCanvas>
            )}
        </MUI.Container>
    )
}

export default Home
