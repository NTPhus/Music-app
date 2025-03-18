import  dotenv  from 'dotenv';
import express, { Express, Request, Response } from 'express';
import * as database from "./configs/database";

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/topic", (req: Request, res: Response) => {
    res.render("client/pages/topics/index");
});

app.listen(port, () => {
    console.log("App listening on port "+ port);
})