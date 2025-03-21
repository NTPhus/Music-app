import  dotenv  from 'dotenv';
import express, { Express, Request, Response } from 'express';
import * as database from "./configs/database";
import clientRoutes from './routes/client/index.route';

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

//Client Routes
clientRoutes(app);

app.listen(port, () => {
    console.log("App listening on port "+ port);
})