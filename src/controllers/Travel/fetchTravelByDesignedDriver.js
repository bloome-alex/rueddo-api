import {fetchTravelByDesignedDriver} from '../../services/TravelServices'
import { authenticationUser } from '../../services/UserServices'

export const fetchTravelByDesignedDriverController = async (req, res) => {
    try {
        const {token} = req.body
        
        const {email: driverEmail} = await authenticationUser({token})
    
        if(typeof(driverEmail) != 'string' || !driverEmail){
            return res.status(404).json({
                msg: 'driverEmail must be a String type',
            })
        }
    
        const travels = await fetchTravelByDesignedDriver({driverEmail})
    
        return res.status(200).json({
            travels
        })
    } catch (error) {
        return res.status(400).json({
            msg: error.message
        })   
    }
}