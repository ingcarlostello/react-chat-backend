const { userConnected, userDisconnected, getUsers, saveMessagesInBD } = require("../controllers/sockets");
const { verifyJWT } = require("../helpers/jwt");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async ( socket ) => {
            // console.log(socket.handshake.query['x-token']);


            const [valid, uid] = verifyJWT(socket.handshake.query['x-token'])
            if(!valid){
                console.log('Socket unidentified.');
                return socket.disconnect()
            }

            // console.log('Connected client!', uid);
            await userConnected(uid)

            //join the user to a socket room
            socket.join(uid)

            
            this.io.emit('list-users', await getUsers())

            //listen when a client send a message
            socket.on('private-message', async (payload)=> {
                const message = await saveMessagesInBD(payload);
                this.io.to(payload.toWho).emit('private-message', message)
                this.io.to(payload.from).emit('private-message', message)
            })

            
            
            socket.on('disconnect', async () => {
                console.log('Client disconnected', uid);
                await userDisconnected(uid)
                this.io.emit('list-users', await getUsers())
            })
        });
    }


}


module.exports = Sockets;