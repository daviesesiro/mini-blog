import { check, validationResult } from "express-validator";
import { HttpException } from "../../core/exceptions/HttpException";
import { Request, NextFunction, Response } from "express";

export const createPostValidator = [
  check("title", "Post add a valid title")
    .not()
    .isEmpty({ ignore_whitespace: true }),
  check("content", "Please add content").notEmpty(),
  (req: Request, _res: Response, next: NextFunction) => {
    var result = validationResult(req);
    if (!result.isEmpty()) {
      next(
        new HttpException({
          status: 400,
          message: "Post couldnt be created",
          data: result.array(),
          type: "BadRequest",
        })
      );
    }
    next(req);
  },
];
