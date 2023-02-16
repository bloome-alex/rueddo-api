import { fetchTravels } from "../../services/TravelServices"

export const fetchTravelsController = async(req, res) => {
    try{
        return res.status(200).json({
            travels: await fetchTravels()
        })
    } catch(error) {
        return res.status(400).json({
            error: error
        })
    }
}