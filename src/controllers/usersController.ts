import { Request, Response } from "express";
import { IUserData } from "../types/usersType";
import * as usersService from "../services/usersService"

export async function signUp(req: Request, res: Response) {
 const user: IUserData = req.body
 await usersService.createUser(user)
 return res.status(201).send("new user create")
}

export async function signIn(req: Request, res: Response) {
    const user: IUserData = req.body 
   const token = await usersService.login(user)
   return res.status(200).send(token)
}