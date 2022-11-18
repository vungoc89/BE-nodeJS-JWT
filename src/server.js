import express from 'express';

import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';

require("dotenv").config();

const app = express();

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