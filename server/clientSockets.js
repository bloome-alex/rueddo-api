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
            console.log('travel: ', travel)
            try {
                const {origin, destinations, originDetails, destinationsDetails, delivery, vehicle, help, floors, secure, methodOfPay, payLocation} = travel

                const client = authenticationUser({token})
                if(!client) throw new Error('Unauthenticated User')
                
                const destinationsArray = []

                destinations.forEach((destination, index) => {
                    destinationsArray.push({
                        address: destination.destination,
                        lat: destination.lat,
                        lng: destination.lng,
                        floor: destinationsDetails[index] ? destinationsDetails[index].floor: '',
                        contact: destinationsDetails[index] ? destinationsDetails[index].contact: '',
                        phone: destinationsDetails[index] ? destinationsDetails[index].phone: '',
                        message: destinationsDetails[index] ? destinationsDetails[index].message: ''
                    })
                });

                const newTravel = {
                    origin: {
                        address: origin.origin,
                        lat: origin.lat,
                        lng: origin.lng,
                        floor: originDetails.floor,
                        contact: originDetails.contact,
                        phone: originDetails.phone,
                        optionalMessage: originDetails.message
                    },
                    destinations: destinationsArray,
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