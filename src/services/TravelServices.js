import { Travel } from '../models/Travel'

export const createTravel = async ({
    origin, destinations, designedDriver, designedClient, delivery, vehicle, help, methodOfPay, payLocation
}) => {
    const travel = new Travel({
        origin,
        destinations,
        designedDriver,
        designedClient,
        delivery,
        vehicle,
        methodOfPay,
        payLocation,
        help,
        status: 'CREATED'
    })

    return await travel.save()
}

export const rejectTravel = async ({id}) => {
    const travel = await Travel.findById(id)
    travel.status = 'REJECTED'
    return await travel.save()
}