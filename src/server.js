import express from 'express';

import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configCors from './config/cors';
import bodyParser from 'body-parser';

import connection from "./config/connect_db";
require("dotenv").config();

// https://stackoverflow.com/questions/48486561/setup-server-with-express-and-body-parser

const app = express();
app.use(bodyParser.json()); //bodyParser: convert body to object
app.use(bodyParser.urlencoded({ extended: true }));

// -----------------------------------------------
//config CORS
configCors(app);

//config view engine
configViewEngine(app); 

//test connection db
connection();

//init web routes
initWebRoutes(app);

initApiRoutes(app);
// define a port

// const PORT = 8081;
const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {
    console.log('>>> App is running on the port = ', +PORT);
})