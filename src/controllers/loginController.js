import { loginUser } from "../services/UserServices"

export const loginController = async(request, response) => {
    const { email, password } = request.body
    if(!email || !password) response.status(400).send('faltan argumentos para iniciar sesión')
    
    const result = await loginUser({ email, password })
    if(!result) return response.status(400).send('no está autorizado')

    return response.status(200).json({
        message: 'Inicio de sesión exitoso',
        token: result
    })
}