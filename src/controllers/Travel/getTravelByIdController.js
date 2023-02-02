import { getTravelById } from "../../services/TravelServices"

export const getTravelByIdController = async (req, res) => {
    try {
        
        const {id} = req.params
    
        const travel = await getTravelById(id)
     
        return res.status(200).json({
            travel
        })
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }

}