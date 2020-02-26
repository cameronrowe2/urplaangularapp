import Express from "express";
import * as bodyParser from "body-parser";

import routes from "./routes";

class App {
  public app: Express.Application;

  constructor() {
    this.app = Express();
    this.config();
  }

  private config() {
    this.app.use((req: Express.Request, res: Express.Response, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
    this.app.use(bodyParser.json());
    this.app.use(routes);
  }
}

export default new App().app;
