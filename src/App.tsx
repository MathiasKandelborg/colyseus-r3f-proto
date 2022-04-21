import { io } from 'socket.io-client'
import React, { useState, useEffect } from 'react'

import { Hands, VRCanvas, DefaultXRControllers, useXR, useController, useXRFrame} from '@react-three/xr'
import { movement } from './util/movementHook' 
import { ControlsWrapper } from './components/ControlsWrapper'
import { ObjectWrapper }  from './components/ObjectsWrapper'
import  { UserWrapper }  from './components/UserWrapper'

import './App.css' 


function App() {
    const [socketClient, setSocketClient] = useState(null)
    const [clients, setClients] = useState({})
    const [objects, setObjects] = useState({})

    const { player, controllers } = useXR()
    const leftController = useController('left')

    
    useXRFrame((time, xrFrame) => {
        movement(socketClient, player, controllers)
    })

    useEffect(() => {
        // On mount initialize the socket connection
        setSocketClient(io())
        // Dispose gracefuly
        return () => {
            if (socketClient) socketClient.disconnect()
        }
    }, [])

    // Useeffect to listen for updates from the socket clients
    useEffect(() => {
        if (socketClient) {
            socketClient.on('move', (clients) => {
                setClients(clients)
            })

            socketClient.on('update-object-position', (objects) => {
                setObjects(objects)
            })
        }
    }, [socketClient])

   // Well some of it, we'll keep some logic in that function


    return (
        socketClient && (
            <VRCanvas camera={{ position: [0, 1, -5], near: 0.1, far: 1000 }}>
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
          {/*   <Movement /> */}
            </VRCanvas>
            
        )
    )
}

export default App
