import { User } from "../models/User"

export const updateUser = async ({id, email, role, name, surname, address, state}) => {

    const updateBody = {
        email,
        role,
        driverEnabled: state,
        clientDetails: {},
        driverDetails: {}
    }

    if(role === 'CLIENT'){
        updateBody.clientDetails.name = name
        updateBody.clientDetails.surname = surname
        updateBody.clientDetails.address = address
    }
    
    if(role === 'DRIVER'){
        updateBody.driverDetails.name = name
        updateBody.driverDetails.surname = surname
        updateBody.driverDetails.address = address
    }

    const user = await User.findByIdAndUpdate(id, updateBody)

    return user
}