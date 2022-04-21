import { io } from 'socket.io-client'
import React, { useState, useEffect } from 'react'

import { Hands, VRCanvas, DefaultXRControllers, useXR, useController, useXRFrame} from '@react-three/xr'
import { movement } from './util/movementHook' 
import { ControlsWrapper } from './components/ControlsWrapper'
import { ObjectWrapper }  from './components/ObjectsWrapper'
import  { UserWrapper }  from './components/UserWrapper'

import './App.css' 

// Okay try it out and see if movement works
// I think you can do without, it's just a lot of reconnects
// idk how bad it was haha
// Oh well, you'll get it running soon. Maybe you wanna make sure everything is formatted correctly
// Also we don't need most the comments on this file, you know the ones that are their own files now

// What's it saying? What line
// I'm pretty sure it's possible, I'll fight with it a bit later
// Okay so we need to find this 'find' function
// If you click the think in the console you get the file.
// Press the {} in the bottom left of that window
// Then it should be somewhat readable
//  let's goooooo
// I added a screenshot of the code*, it's pretty good < thanks copilot 
// Wait, it was working on pc before
// Try and restartshould :DDDDDDDD
// It's an issue with websockets and ngrok
// restartttt
// I was working fine with ngrok before
//http://b691-152-115-164-30.ngrok.io
// what about in dev mode in your browser
//I sent you on slack it seems that websocekts are working
//:D done it is up, when I am going directly to localhost there errors are the same
// Oh that's an error because it can't find any controllers
// i am in the file oh wait it is for error can i send you the ngrok link? it will be probably easier than realying on me XD
// yea wait my headset is dead, sure
//need to wait a little bit quest 2 does not have apps now and quest 1 is dead because of battery
// there was update on quest 2 and everyone is complaining about it on reddit
// and quest 1 did not went to sleep mode and it was running all the time <facepalm>


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
