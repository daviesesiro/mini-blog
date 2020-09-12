import { Response } from "express";

class Respond {
  res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  /**
   * Success Response
   * @param {number} status (optional) - The status code of the response i.e 200, 201 etc. Defaults to 200.
   * @param {string} message - A short message to be display to user
   * @param {object} data - The return object containing information for the user.
   */
  Success(status: number, message: string, data: object = {}) {
    this.res.status(status).json({
      status,
      message,
      data,
    });
  }

  /**
   * Error Response
   * @param {Number} [Status] - The status/error code of the response i.e 403, 404, 500
   * @param {String} [type] - The type of error being generated i.e RouteNotFound,
   * @param {String} [message] - A short message to be display to user
   * @param {Object} [error] - The error object
   */
  Fail(status: number, type: string, message: string, error: object = {}) {
    this.res.status(status).json({
      status,
      message,
      type,
      error,
    });
  }
}

export default (res: Response) => new Respond(res);
