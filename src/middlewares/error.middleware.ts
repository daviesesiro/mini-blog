import { NextFunction, Request, Response } from "express";
import { HttpException } from "../core/exceptions/HttpException";
import Respond from "../services/Respond";

function errorMiddleware(
  error: HttpException,
  _request: Request,
  res: Response,
  _next: NextFunction
) {
  const type = error.type || "UnknownError";
  const data = error.data;
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  Respond(res).Fail(status, type, message, data);
}

export default errorMiddleware;
