import { fetchAllUsers } from "../services/FetchAlllUsers"

export const fetchUsersController = async(req, res) => {
    const users = await fetchAllUsers()

    res.status(200).json({
        users
    })
}