import { updateUser } from "../services/UpdateUser"

export const updateUserController = async (req, res) => {
    const {id, email, role, name, surname, address, state} = req.body
    
    const user = await updateUser({id, email, role, name, surname, address, state})
    res.status(200).json({
        user
    })
}