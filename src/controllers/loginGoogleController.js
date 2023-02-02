import { loginUser } from "../services/UserServices"

export const loginGoogleController = async(request, response) => {
    try {
        const {email, role} = request.body

        console.log('login google controller: ', {email, role})
        const token = await loginUser({email, role, authenticatedWithGoogle: true})
    
        if(token) return response.status(200).json({
            token,
            msg: 'Login Successfull'
        })
    } catch (error) {
        console.log('error loginGoogleController: ', error)
        return response.status(402).json({
            msg: 'Authorized Failed'
        })
    }
}