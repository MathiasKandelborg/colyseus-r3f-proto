import { Server } from 'Socket.IO'

let clients = {}
let objects = {}

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

            // Emit a reciever called move to all clients
            io.sockets.emit('move', clients)

            io.sockets.emit('update-object-position', objects)

            client.on('move', ({ id, rotation, position }) => {
                clients[id].position = position
                clients[id].rotation = rotation

                io.sockets.emit('move', clients)
            })

            client.on(
                'update-object-position',
                ({ id, rotation, position }) => {
                    objects[id].position = position
                    objects[id].rotation = rotation

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
