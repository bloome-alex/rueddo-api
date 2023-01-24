import { authenticationUser } from "../services/UserServices"

export const authenticationController = async(request, response) => {
    const { token } = request.body

    const user = await authenticationUser({token})  

    response.status(200).json({
        message: 'autenticado correctamente',
        user
    })
}