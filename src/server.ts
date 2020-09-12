import express, { Application } from "express";
import cors from "cors";

import { Controller } from "./core/controller";
import { createConnection } from "typeorm";
import errorMiddleware from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";

export class ExpressApp {
  app: Application;
  port: number = 4000;

  /** 
   * Constructor
   * @param controllers
   * @param loaders extra middlewares or configuration
   */
  constructor(controllers: Controller[]) {
    this.app = express();

    this.inititializeDatabase();
    this.initializeMiddleware();
    this.initialiseRoutes(controllers);
    this.handlRouteNotFound();
    this.handleExceptions();
  }

  /**
   * Initializes all the controllers passed from the constructor
   * @param controllers
   */
  initialiseRoutes(controllers: Controller[]) {
    controllers.forEach((controller) => {
      console.log(controller.path);
      this.app.use(controller.path, controller.router);
    });
  }

  /**
   * Initialises all the middlewares
   */
  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors({ credentials: true }));
    this.app.use(cookieParser());
  }

  private handlRouteNotFound() {
    this.app.use((_req, res) => {
      res.send("Route not found")
    })
  }

  /**
   * loades extra configurations for express app
   */
  // public configure(loaders: any[]) {
  //   loaders.forEach((loader) => {
  //     this.app.use(loader);
  //   });
  // }

  private handleExceptions() {
    this.app.use(errorMiddleware);
  }

  public async inititializeDatabase() {
    await createConnection();
  }

  /**
   * Starts express server
   * @param port default 4000
   */
  listen(port?: number) {
    this.port = port ? port : this.port;
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}
