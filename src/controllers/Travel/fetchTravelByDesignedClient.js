import {fetchTravelByDesignedClient} from '../../services/TravelServices'
import { authenticationUser } from '../../services/UserServices'

export const fetchTravelByDesignedClientController = async (req, res) => {
    try {
        const {token} = req.body

        const {email: clientEmail} = await authenticationUser({token})

        if(typeof(clientEmail) != 'string' || !clientEmail){
            return res.status(404).json({
                msg: 'clientEmail must be a String type',
            })
        }
    
        const travels = await fetchTravelByDesignedClient({clientEmail})
    
        return res.status(200).json({
            travels
        })
    } catch (error) {
        return res.status(400).json({
            msg: error.message
        })
    }
}