import { Server } from 'socket.io'
import { store } from '../../util/store'

let objects = []
let clients = {}

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', (client) => {
            console.log(
                `User ${client.id} connected, there are currently ${io.engine.clientsCount} users connected`
            )

            //Add a new client indexed by his id
            clients[client.id] = {
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            }

            // Emit a receiver called move to all clients
            io.sockets.emit('move', clients)

            io.sockets.emit('update-object-position', objects)

            client.on('move', ({ id, rotation, position }) => {
                clients[id].position = position
                clients[id].rotation = rotation

                io.sockets.emit('move', clients)
            })

            client.on('add-object', (object) => {
                //    console.log('adding object: ', object.object)
                if (objects.find((obj) => obj.uuid === object.object.uuid)) {
                    console.log('object already exists')
                } else {
                    objects.push(object.object)
                }
                //  objects[`${object.uuid}`] = object

                // console.log(objects)

                // console.log(JSON.stringify(objects, null, 2))
                // io.sockets.emit('state', { ...store.getState() })
                io.sockets.emit('update-object-position', objects)
            })

            client.on(
                'update-object-position',
                ({ objArr, obj, id, rotation, position }) => {
                    const newObj = objects.find((ob) => ob.uuid === obj.uuid)
                    console.log('update-object-position')
                    console.log(`Old Obj: ${JSON.stringify(newObj, null, 2)}`)
                    newObj.position = position
                    newObj.find((ob) => ob.uuid === obj.uuid).rotation =
                        rotation

                    // store.getState().setObjects(objects)
                    //     store.setState({ objects: { ...objArr } })
                    /*   objects = {...objArr} */

                    /*  objects[id].position = position
                    objects[id].rotation = rotation */
                    io.sockets.emit('state', objects)
                    io.sockets.emit('update-object-position', objects)
                }
            )

            client.on('disconnect', () => {
                console.log(
                    `User ${client.id} disconnected, there are currently ${io.engine.clientsCount} users connected`
                )

                //Delete this client from the object
                delete clients[client.id]

                io.sockets.emit('move', clients)
            })
        })
    }
    res.end()
}

export default SocketHandler
