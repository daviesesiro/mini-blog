import { check, validationResult } from "express-validator";
import { HttpException } from "../../core/exceptions/HttpException";
import { Request, NextFunction, Response } from "express";

export const validateChecks = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log("hel");
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
  next();
};

export const checkCreatePost = [
  check("title", "Post add a valid title")
    .not()
    .isEmpty({ ignore_whitespace: true }),
  check("content", "Please add content").notEmpty(),
  validateChecks,
];

export const checkDeletePost = [
  check("id", "Post id must be valid")
    .not()
    .isEmpty({ ignore_whitespace: true }),
  validateChecks,
];
