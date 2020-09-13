import { validationResult } from "express-validator";
import { HttpException } from "../core/exceptions/HttpException";
import { Request } from "express";

export default (req: Request, entity: string) => {

    var result = validationResult(req);
    if (!result.isEmpty()) {
        throw (
            new HttpException({
                status: 400,
                message: `${entity} couldnt be created`,
                data: result.array(),
                type: "BadRequest",
            })
        );
    }
}