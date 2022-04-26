import * as MUI from '@mui/material'
import { DefaultXRControllers, Hands, useXR, VRCanvas } from '@react-three/xr'
import { useEffect, useState } from 'react'
import { ControlsWrapper } from '../components/controlsWrapper'
import { ObjectWrapper } from '../components/ObjectsWrapper'
import { UserWrapper } from '../components/UserWrapper'
import { movement } from '../util/hooks/movementHook'
import GltfLoader from '../components/gltfloader'
import Draggable from '../components/Draggable'
import { useStore } from '../util/store'
import { obj } from '../util/objectData'
import * as Colyseus from 'colyseus.js'

const Home = () => {
    const [socketClient, setSocketClient] = useState<Colyseus.Client>(null)
    const [clients, setClients] = useState({})
    const objects = useStore((state) => state.objects)
    const setObjects = useStore((state) => state.setObjects)
    const setState = useStore((state) => state.setObjs)
    const [room, setRoom] = useState<Colyseus.Room>()
    // const [objects, setObjects] = useState({})

    const { player, controllers } = useXR()

    const socketInitializer = async () => {
        var client = new Colyseus.Client('wss://9b44-80-208-56-134.eu.ngrok.io')
        //  await fetch('/api/socket')
        // socket = io()
        setSocketClient(client)

        // Dispose gracefuly
        return () => {}
    }

    useEffect(() => {
        socketInitializer()

        movement(Boolean(socketClient), player, controllers)
    }, [])

    useEffect(() => {
        if (socketClient) {
            socketClient
                .joinOrCreate('my_room')
                .then((room) => {
                    console.log(room.sessionId, 'joined', room.name)
                    // Yea it does!

                    // Set room in state
                    setRoom(room)

                    room.onStateChange((state) => {
                        const player = state.players.find(
                            (p) => p.id === room.sessionId
                        )

                        console.log(state.players)
                        if (player.position) {
                            console.log(player.position)
                        }
                        //   console.log(state.players.get(room.sessionId))
                    })

                    //https://docs.colyseus.io/colyseus/client/client/#onleave
                    room.onLeave((code: 1000) => {
                        // It's time to test
                        // I've made a second terminal and shared it
                        // it is on node.js unfortunately
                        console.log(room.name, 'Someone left!')
                    })
                })
                .catch((e) => {
                    console.log('JOIN ERROR', e)
                })
        }
    }, [socketClient])

    // Useeffect to listen for updates from the socket clients
    /* useEffect(() =>  // do it up in the if statement :)
        socketClient.onStateChange((state) => { 
            console.log("Something changed woooo!") */
    /* if (socketClient) {
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
    }, [socketClient]) */

    return (
        <MUI.Container sx={{ height: '100vh' }}>
            {socketClient && (
                <VRCanvas
                    camera={{ position: [0, 1, -5], near: 0.1, far: 1000 }}
                >
                    {/*  <Stats /> */}

                    <ControlsWrapper socket={room} />
                    <gridHelper rotation={[0, 0, 0]} />

                    {/* Filter myself from the client list and create user box  es with IDs */}
                    {Object.keys(clients)
                        .filter((clientKey) => clientKey !== room.id)
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
                    {/*   {objects
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
                        })} */}
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
