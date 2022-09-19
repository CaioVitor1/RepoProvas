import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    console.log("está aqui")
        const { authorization } = req.headers;
        console.log(authorization)
        if(!authorization) {
            throw { code: "Unauthorized", message: "requisition must have a token" };
        }
        const token:any = authorization?.replace('Bearer ', '');

        const chaveSecreta: any = process.env.JWT_SECRET;
        const {userId}: any = jwt.verify(token,chaveSecreta)
            if(!token || !userId) {
                return res.sendStatus(401);
            }
            console.log("o userId do token é: " + userId)
            res.locals.session = userId
           
            next();
}