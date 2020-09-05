import { Controller } from "../core/controller";
import { Router } from "express";

export class A implements Controller {
  path = "/path";
  router = Router();

  constructor() {
    this.initialiseRoutes();
  }

  initialiseRoutes(): void {
    this.router.get("/", async (_req, res) => {
      res.send("hello");
    });
  }
}

export default () => new A();
