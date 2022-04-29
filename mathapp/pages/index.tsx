import * as MUI from '@mui/material'
import {
    DefaultXRControllers,
    Hands,
    RayGrab,
    useXR,
    VRCanvas
} from '@react-three/xr'
import { useEffect, useState } from 'react'
import { ControlsWrapper } from '../components/controlsWrapper'
import { ObjectWrapper } from '../components/ObjectsWrapper'
import { UserWrapper } from '../components/UserWrapper'
import { movement } from '../util/hooks/movementHook'
import GltfLoader from '../components/gltfloader'
import Draggable from '../components/Draggable'
import { useStore } from '../util/store'
import * as Colyseus from 'colyseus.js'
import shallow from 'zustand/shallow'

const Home = () => {
    const [socketClient, setSocketClient] = useState<Colyseus.Client>(null)
    // It's important to use object destructuring here, otherwise the state won't be re-rendered on every state change. Should perhaps be changed to map, somehow
    const { players } = useStore(
        (state) => ({ players: state.players }),
        shallow
    )
    const setPlayers = useStore((state) => state.setPlayers)
    const objects = useStore((state) => state.objects)
    const setObjects = useStore((state) => state.setObjs)
    const [room, setRoom] = useState<Colyseus.Room>()
    // const [objects, setObjects] = useState({})

    const { player, controllers } = useXR()

    const socketInitializer = async () => {
        var client = new Colyseus.Client('wss://localhost:2567')
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
                        const player = state.players.get(room.sessionId)

                        const players = state.players

                        setPlayers(players)
                        setObjects(state.objects)
                    })

                    room.state.players.onAdd = (player) => {
                        console.log('player added', player.id)
                        setPlayers(player)
                    }
                    room.state.players.onRemove = (player) => {
                        console.log('player not really removed', player)
                    }

                    room.state.players.onChange = (change) => {
                        console.log(
                            'player changed',
                            JSON.stringify(change, null, 2)
                        )
                    }

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

    /*
    const state = useStore((s) => s)
    useEffect(() => {
        console.log('clients updated')
        console.log(state)
    }, [players, state])
     */

    return (
        <MUI.Container sx={{ height: '100vh' }}>
            {socketClient && room && (
                <VRCanvas
                    camera={{ position: [0, 1, -5], near: 0.1, far: 1000 }}
                >
                    {/*  <Stats /> */}

                    <ControlsWrapper socket={room} />
                    {/*  <gridHelper rotation={[0, 0, 0]} /> */}

                    {/* Filter myself from the client list and create user box  es with IDs */}
                    {players
                        .filter((p) => p.id !== room.sessionId)
                        .map((client) => {
                            console.log(client)
                            console.log('loading client')
                            return (
                                <UserWrapper
                                    id={client.id}
                                    key={client.id}
                                    position={client.position}
                                    rotation={client.rotation}
                                />
                            )
                        })}
                    <Draggable>
                        <RayGrab>
                            {objects
                                // Map does something for each object
                                // Each object is named in the callback function
                                .map((object) => {
                                    console.log(object)
                                    const {
                                        id,
                                        name,
                                        position,
                                        rotation,
                                        scale
                                    } = object

                                    return (
                                        <ObjectWrapper
                                            socketClient={room}
                                            id={id}
                                            key={name}
                                            name={name}
                                            position={position}
                                            rotation={rotation}
                                            scale={scale}
                                        />
                                    )
                                })}
                        </RayGrab>
                    </Draggable>
                    <Hands />

                    <DefaultXRControllers />
                    <pointLight position={[0, 10, 0]} />
                    {/* <ObjectWrapper
                                position={[0, 0, 1]}
                                rotation={[0, 0, 0]}
                                
                            /> */}

                    {/*  <GltfLoader /> */}
                    <GltfLoader />
                </VRCanvas>
            )}
        </MUI.Container>
    )
}

export default Home
