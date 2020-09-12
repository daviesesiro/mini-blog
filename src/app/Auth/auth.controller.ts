import { Controller } from "../../core/controller";
import { Router, RequestHandler } from "express";
import { AuthService } from "./auth.service";
import Respond from "../../services/Respond";
import { checkSignup, checkSignin } from "./auth.validator";
import checkvalidator from "../../services/checkvalidator";

export class Auth implements Controller {
    path = "/auth";
    router = Router();

    constructor(private authService: AuthService) {
        this.initialiseRoutes();
    }

    initialiseRoutes(): void {
        this.router.post("/signup", checkSignup, this.signup);
        this.router.post("/signin", checkSignin, this.signin);
    }

    private signup: RequestHandler = async (req, res, next) => {
        try {
            checkvalidator(req, 'user')

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
            checkvalidator(req, 'user')
            const { accessToken, refreshToken } = await this.authService.signin(req.body)
            res.cookie('rid', refreshToken, { httpOnly: true })
            Respond(res).Success(202, 'Sigin Successful', { accessToken });
        } catch (e) {
            next(e)
        }
    }
}

export default (authService: AuthService) => new Auth(authService);
