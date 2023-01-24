import { User } from "../models/User"


export const fetchAllUsers = async() => {
    const users = await User.find({})
    return users
}