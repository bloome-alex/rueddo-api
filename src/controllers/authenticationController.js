import { authenticationUser } from "../services/UserServices"

export const authenticationController = (request, response) => {
    const { token } = request.body

    const user = authenticationUser({token})  

    response.status(200).json({
        message: 'autenticado correctamente',
        user
    })
}