import { rejectTravel, travelUpdateDesignedDriver } from '../src/services/TravelServices'
import { authenticationUser } from '../src/services/UserServices'

export class DriverSockets{
    constructor(socket, io){
        this.socket = socket
        this.io = io
    }

    driverConnected(){
        this.socket.on('driver_connected', async (token) => {
            try {
                const user = await authenticationUser({token})
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
        this.socket.on('accept_travel', async ({id, token})=> {
            
            const user = await authenticationUser({token})

            travelUpdateDesignedDriver({id, driverEmail: user.email})

            this.io.emit('CLIENT_TRAVEL_ACCEPTED')
        })
    }

    rejectTravel(){
        this.socket.on('TRAVEL::REJECT', ({id}) => {
            rejectTravel({id})
            this.io.emit('CLIENT::TRAVEL-REJECTED', {id})
        })
    }

    driverArriving(){
        this.socket.on('DRIVER::ARRIVING', (address) => {
            this.io.emit('CLIENT_DRIVER_ARRIVING', address)
        })
    }

}