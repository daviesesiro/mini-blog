import { HttpException } from "./HttpException";

export class Unauthenticated extends HttpException {
    constructor() {
        super({
            message: `You are not authenticated`,
            status: 404,
            type: 'Unauthenticated'
        });
    }
}
