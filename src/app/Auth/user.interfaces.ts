import { User } from "./user.entity";
import { Request } from "express";

export interface RequestWithUser extends Request {
    user: User
}

export interface JwtAccessTokenPayload {
    userId: number;
    email: string
}
export interface JwtResfreshTokenPayload {
    userId: number;
    tokenVersion: number
}