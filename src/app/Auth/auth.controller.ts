import { Controller } from "../../core/controller";
import { Router, RequestHandler, Request } from "express";
import { AuthService } from "./auth.service";
import Respond from "../../services/Respond";
import { checkSignup, checkSignin } from "./auth.checks";
import validateChecks from "../../services/validateChecks";
import { isAuth } from "./isAuth";

export class Auth implements Controller {
    path = "/auth";
    router = Router();

    constructor(private authService: AuthService) {
        this.initialiseRoutes();
    }

    initialiseRoutes(): void {
        this.router.post("/signup", checkSignup, this.signup);
        this.router.post("/signin", checkSignin, this.signin);
        this.router.get("/me", isAuth, this.me);
        this.router.post("/refresh_token", this.getNewAccessToken);
        this.router.post("/logout", isAuth, this.revokeRefreshToken);
    }

    private signup: RequestHandler = async (req, res, next) => {
        try {
            validateChecks(req, 'user')

            await this.authService.signup(req.body);

            // signing user in
            const { accessToken, refreshToken } = await this.authService.signin(req.body);
            res.cookie('rid', refreshToken, { httpOnly: true })
            Respond(res).Success(202, 'Signup Successful', { accessToken });
        } catch (e) {
            next(e)
        }
    }
    private signin: RequestHandler = async (req, res, next) => {
        try {
            validateChecks(req, 'user')
            const { accessToken, refreshToken } = await this.authService.signin(req.body)
            res.cookie('rid', refreshToken, { httpOnly: true })
            Respond(res).Success(202, 'Sigin Successful', { accessToken });
        } catch (e) {
            next(e)
        }
    }

    private getNewAccessToken: RequestHandler = async (req: Request, res, next) => {
        try {
            const { accessToken, refreshToken } = await this.authService.getNewAccessToken(req.cookies.rid)

            res.cookie('rid', refreshToken, { httpOnly: true })
            Respond(res).Success(201, '', { accessToken })
        } catch (e) {
            next(e)
        }

    }

    private revokeRefreshToken: RequestHandler = async (req: any, res) => {
        await this.authService.revokeRefreshToken(req.user)
        res.cookie('rid', '');
        Respond(res).Success(200, 'Logged out')
    }

    private me: RequestHandler = async (req: any, res) => {
        res.send(req.user)
    }
}


export default (authService: AuthService) => new Auth(authService);
