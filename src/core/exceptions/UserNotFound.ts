import { HttpException } from "./HttpException";

export class UserNotFound extends HttpException {
    constructor(email?: string) {
        const message = email ? `User with email "${email}" not found` : 'User not found'
        super({
            message,
            status: 404,
            type: 'UserNotFound'
        });
    }
}
