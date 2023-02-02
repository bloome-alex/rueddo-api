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

export const fetchTravelByDesignedClient = async ({clientEmail}) => {
    return await Travel.find({designedClient: clientEmail})
}

export const fetchTravelByDesignedDriver = async({driverEmail}) => {
    return await Travel.find({designedDriver: driverEmail})
}

export const travelUpdateDesignedDriver = async({id, driverEmail}) => {
    return await Travel.findByIdAndUpdate(id, {
        designedDriver: driverEmail
    })
}

export const getTravelById = async(id) => {
    return await Travel.findById(id)
}