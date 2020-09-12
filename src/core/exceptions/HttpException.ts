/**
 * Throws an HttpException
 */
export class HttpException extends Error {
  status: number;
  message: string;
  data?: any;
  type: string;

  /**
   *
   * @param status
   * @param message
   * @param data
   */
  constructor(httpError: IHttpError) {
    super(httpError.message);
    this.type = httpError.type ? httpError.type : "UnknownError";
    this.status = httpError.status;
    this.data = httpError.data;
    this.message = httpError.message;
  }
}
interface IHttpError {
  status: number;
  message: string;
  data?: any;
  type?: string;
}
