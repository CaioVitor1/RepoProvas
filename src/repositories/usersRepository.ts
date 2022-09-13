import client from "../database/postgres"
import { IUserData } from "../types/usersType"

export async function findEmail(user: IUserData) {
return await client.user.findUnique({where: {
    email: user.email
}})
}

export async function insertUser(user: IUserData){
    return await client.user.create({
        data: {
            email: user.email,
            password: user.password
        }
    })
}