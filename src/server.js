import express from 'express';

import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';
import bodyParser from 'body-parser';

require("dotenv").config();

// https://stackoverflow.com/questions/48486561/setup-server-with-express-and-body-parser

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// -----------------------------------------------

//config view engine
configViewEngine(app); 

//init web routes
initWebRoutes(app);

// define a port

// const PORT = 8081;
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('>>> App is running on the port = ', +PORT);
})