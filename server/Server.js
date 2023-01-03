import express from 'express'
import cors from 'cors'
import { ApiRoutes } from '../src/routes'
import { authenticationUser } from '../src/services/UserServices'
class Server{
    constructor(){
        this.port = process.env.PORT
        this.connectToDatabase()
        this.app = express()
        this.http = require('http').Server(this.app)
        this.io = require('socket.io')(this.http, {
            cors: {
                origin: '*'
            }
        })
        this.middlewares()
        this.routes()
        this.sockets()
    }

    connectToDatabase(){
        require('../database/database.js')
    }

    sockets(){
        this.io.on('connection', (socket)=>{
            socket.on('client_connected', (token) => {
                try {
                    const user = authenticationUser({token})
                    socket.emit('CLIENT_CONNECT', {
                        msg: 'Un cliente se ha conectado',
                        client: user
                    })
                } catch (error) {
                    socket.emit('ERROR_TO_CONNECT_CLIENT')
                }
            })

            socket.on('driver_connected', (token) => {
                try {
                    const user = authenticationUser({token})
                    socket.emit('DRIVER_CONNECTED', {
                        msg: 'Un driver se ha conectado',
                        client: user
                    })
                } catch (error) {
                    socket.emit('ERROR_TO_CONNECT_DRIVER')
                }
            })

            socket.on('client_need_vehicle', ()=>{
                this.io.emit('driver_new_travel')
            })

            socket.on('accept_travel', ()=> {
                this.io.emit('CLIENT_TRAVEL_ACCEPTED')
            })

            console.log('nuevo socket conectado: ', socket.id)
            
            socket.on('increment', (counter) => {
                console.log('increment')
                this.io.sockets.emit('COUNTER_INCREMENT', counter + 1)
            })

            socket.on('decrement', (counter) => {
                console.log('decrement')
                this.io.sockets.emit('COUNTER_DECREMENT', counter - 1)
            })
        
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