import { loginUser } from "../services/UserServices"

export const loginGoogleController = async(request, response) => {
    try {
        const {email, role} = request.body

        const token = await loginUser({email, role, authenticatedWithGoogle: true})
    
        if(token) return response.status(200).json({
            token,
            msg: 'Login Successfull'
        })
    } catch (error) {
        return response.status(402).json({
            msg: 'Authorized Failed'
        })
    }
}