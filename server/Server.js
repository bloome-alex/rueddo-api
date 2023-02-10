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
                origin: ["https://rueddo-vuelder-production.up.railway.app", "https://rueddo-mobile-production.up.railway.app"],
                methods: ["GET", "POST"],
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
            console.log('nuevo socket: ', socket.id)
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
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*"); 
            res.header('Access-Control-Allow-Credentials', false);
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
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