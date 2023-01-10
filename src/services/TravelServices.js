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
        help
    })

    return await travel.save()
}