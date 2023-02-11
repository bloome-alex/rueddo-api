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
        this.socket.on('client_cancel_need_vehicle', () =>{
            this.io.emit('client_cancel_need_vehicle')
        })
    }

    clientNeedVehicle(){
        this.socket.on('client_need_vehicle', async ({client: token, travel, clientSocket})=>{
            try {
                const {origin, destinations, originDetails, destinationsDetails, delivery, vehicle, help, floors, secure, methodOfPay, payLocation, date} = travel

                const client = await authenticationUser({token})

                if(!client) throw new Error('Unauthenticated User')
            

                const destinationsArray = destinations.map((destination, index) => ({
                    address: destination.destination,
                    lat: destination.lat,
                    lng: destination.lng,
                    floor: destinationsDetails[index]?.floor || '',
                    contact: destinationsDetails[index]?.contact || '',
                    phone: destinationsDetails[index]?.phone || '',
                    message: destinationsDetails[index]?.message || ''
                }))

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
                    help,
                    date
                }
                const travelCreated = await createTravel(newTravel)

                this.io.to(clientSocket).emit("TRAVEL_CREATED", { id: travelCreated._id })
                this.io.emit('CLIENT_SEARCH_DRIVERS', { travel: travelCreated, clientSocket })
            } catch (error) {
                console.log('error: ', error)
            }
        })
    }

    clientProposalDriver(){
        this.socket.on("client_travel_order", ({ socketId, travel, clientSocket }) => {
            this.io.to(socketId).emit("driver_new_travel", { travel, clientSocket })
        })
    }
}