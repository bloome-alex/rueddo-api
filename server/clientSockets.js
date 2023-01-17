import fs from 'fs'
import webpush from '../src/webpush'

import { createTravel } from '../src/services/TravelServices'
import { authenticationUser } from '../src/services/UserServices'

export class ClientSockets {
    constructor(socket, io){
        this.socket = socket
        this.io = io
    }

    clientConnected(){
        this.socket.on('client_connected', (token) => {
            try {
                const user = authenticationUser({token})
                this.socket.emit('CLIENT_CONNECT', {
                    msg: 'Un cliente se ha conectado',
                    client: user
                })
            } catch (error) {
                this.socket.emit('ERROR_TO_CONNECT_CLIENT')
            }
        })
    }

    clientCancelNeedVehicle(){
        this.socket.on('client_cancel_need_vehicle', ()=>{
            console.log('el cliente cancelo el viaje')
            this.io.emit('client_cancel_need_vehicle')
        })
    }

    clientNeedVehicle(){
        this.socket.on('client_need_vehicle', async ({client: token, travel})=>{
            try {
                const {destinationAddress, originAddress, help, methodOfPay, payLocation, originlng, originlat, originDetails, destinationlng, destinationlat, destinationDetails, delivery, vehicle} = travel

                const {floor: originFloor, contact: originContact, phone: originPhone, message: originMessage} = originDetails

                const {floor: destinationFloor, contact: destinationContact, phone: destinationPhone, message: destinationMessage} = destinationDetails

                const client = authenticationUser({token})
                if(!client) throw new Error('Unauthenticated User')
                
                const newTravel = {
                    origin: {
                        address: originAddress,
                        lat: originlat,
                        lng: originlng,
                        floor: originFloor,
                        contact: originContact,
                        phone: originPhone,
                        optionalMessage: originMessage
                    },
                    destinations: [
                        {
                            address: destinationAddress,
                            lat: destinationlng,
                            lng: destinationlat,
                            floor: destinationFloor,
                            contact: destinationContact,
                            phone: destinationPhone,
                            optionalMessage: destinationMessage
                        }
                    ],
                    designedDriver: '',
                    designedClient: client.email,
                    delivery,
                    vehicle,
                    methodOfPay,
                    payLocation,
                    help
                }

                const travelCreated = await createTravel(newTravel)

                const subscription = JSON.parse(fs.readFileSync('./src/webpush/subscription.json'))

                webpush.sendNotification(subscription, JSON.stringify({
                    title: 'Oportunidad de Viaje!'
                }))

                this.io.emit('driver_new_travel', travelCreated)
            } catch (error) {
                console.log('error: ', error)
            }
        })
    }
}