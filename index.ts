import  dotenv  from 'dotenv';
import express, { Express } from 'express';
import * as database from "./configs/database";
import clientRoutes from './routes/client/index.route';
import adminRoutes from './routes/admin/index.route';
import methodOverride from "method-override";
import { systemConfig } from './configs/config';
import path from 'path';

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(express.static(`${__dirname}/public`));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//End TinyMCE

//App Local Variable
app.locals.prefixAdmin = systemConfig.prefix_admin;

//Client Routes
clientRoutes(app);

//Admin Routes
adminRoutes(app);
app.listen(port, () => {
    console.log("App listening on port "+ port);
})