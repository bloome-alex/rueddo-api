import { authenticationUser } from '../src/services/UserServices'

export class DriverSockets{
    constructor(socket, io){
        this.socket = socket
        this.io = io
    }

    driverConnected(){
        this.socket.on('driver_connected', (token) => {
            try {
                const user = authenticationUser({token})
                this.socket.emit('DRIVER_CONNECTED', {
                    msg: 'Un driver se ha conectado',
                    client: user
                })                
            } catch (error) {
                this.socket.emit('ERROR_TO_CONNECT_DRIVER')
            }
        })
    }

    acceptTravel(){
        this.socket.on('accept_travel', ()=> {

            this.io.emit('CLIENT_TRAVEL_ACCEPTED')
        })
    }

}