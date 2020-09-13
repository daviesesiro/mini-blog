import { Response, NextFunction } from "express";
import { Unauthenticated } from "../../core/exceptions/UnAuthenticated";
import { verify } from "jsonwebtoken";
import { User } from "./user.entity";
import { JwtAccessTokenPayload } from './user.interfaces';



export const isAuth = async (req: any, _res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (!token) {
        return next(new Unauthenticated())
    }


    let payload: JwtAccessTokenPayload;

    try {
        token = token!.split(' ')[1]
        payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtAccessTokenPayload
    } catch (e) {
        return next(new Unauthenticated())
    }

    const user = await User.findOne(payload.userId)

    if (!user) {
        return next(new Unauthenticated())
    }
    req.user = user;

    return next()
}