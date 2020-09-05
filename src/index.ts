import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { ExpressApp } from "./server";
import Controllers from "./controllers";

/**
 * Creating the server and passing in the controllers
 */
const server = new ExpressApp(Controllers);

server.listen(3232);
