import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
  constructor(id: number, entity: string) {
    super({
      message: `Could not find ${entity} with id '${id}`,
      status: 404,
      type: 'NotFound'
    });
  }
}
