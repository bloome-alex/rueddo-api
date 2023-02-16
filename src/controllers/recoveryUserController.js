import { existEmail, recoveryUser} from "../services/UserServices"
import { RecoveryUser } from "../models/RecoveryUsers"


export const recoveryUserController = async (request, response) => {
    const { email } = request.body
    if(await existEmail({email})){
        try {
            const code = await recoveryUser(email)
            const recovery = new RecoveryUser({
                email,
                code
            })
            await recovery.save()
            return response.status(200).json({
                type: 'success',
                resp: 'Se envío un mail al email: ' + email + ' con los digitos necesarios para recuperar el usuario.'
            })
        } catch (error) {
            console.log('error: ', error)
            return response.status(404).json({
                type: 'error',
                resp: 'Ocurrió un error, lo sentimos :('
            })
        }
    }
    
    return response.status(400).json({
        type: 'error',
        resp: 'El email solicitado no existe'
    }) 
}

export const validCodeController = async (request, response) => {
    const { email, code } = request.body
    console.log({ email, code })
    const recovery = await RecoveryUser.findOne({email, code})
    console.log('recovery: ', recovery)
    if(recovery) return response.status(200).json({
        type: 'success',
        resp: 'Codigo valido.'
    })
    return response.status(400).json({
        type: 'error',
        resp: 'Codigo invalido'
    })
}