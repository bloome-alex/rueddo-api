import express from 'express'
import cors from 'cors'
import { ApiRoutes } from '../src/routes'
import { ClientSockets } from './clientSockets'
import { DriverSockets } from './driverSockets'

class Server{
    constructor(){
        this.port = process.env.PORT
        this.connectToDatabase()
        this.app = express()
        this.middlewares()
        this.setStaticPages()
        this.http = require('http').Server(this.app)
        this.io = require('socket.io')(this.http, {
            cors: {
                origin: true,
                methods: ["GET", "POST", "PUT"],
            }
        })
        this.routes()
        this.sockets()
    }

    setStaticPages(){
        this.app.use(express.static('public'))
    }

    connectToDatabase(){
        require('../database/database.js')
    }

    sockets(){
        this.io.on('connection', (socket)=>{
            //client sockets declaration
            const clientSockets = new ClientSockets(socket, this.io)
            clientSockets.clientConnected()
            clientSockets.clientNeedVehicle()
            clientSockets.clientCancelNeedVehicle()
            clientSockets.clientProposalDriver()
            //driver sockets declaration

            const driverSockets = new DriverSockets(socket, this.io)
            driverSockets.driverConnected()
            driverSockets.acceptTravel()
            driverSockets.driverArriving()   
            driverSockets.driverDownloading() 
            driverSockets.driverLocation    ()
            driverSockets.rejectTravel()
        })
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
    }

    routes(){
        this.app.use('/api', ApiRoutes)
    }

    listen(){
        this.http.listen(this.port, () => {
            console.log('listen at port ' + this.port)
        })
    }
}

export default Server