import * as http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import Config from "./config";
import { Routes } from "./common/common.routes";
import { ShoppingList } from "./shoppingList/shoppingList.routes";
import mongooseService from "./database/mongoose.service";

mongooseService.connect();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Routes[] = [];

const corsOptions = {
  origin: `http://localhost:${Config.CLIENT_PORT}`,
};

app.use(express.json({ limit: "2mb" }));
app.use(cors(corsOptions));

routes.push(new ShoppingList(app));

const health = `Express running at http://localhost:${Config.SERVER_PORT}`;

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(health);
});

server.listen(Config.SERVER_PORT, () => {
  routes.forEach((route: Routes) => {
    route.configureRoutes();
    console.log(`Configured routes ${route.getName()}`);
  });
  console.log(health);
});

export default server;
