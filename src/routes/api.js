import express from 'express';
// import { handleRegister } from '../controller/apiController';
import apiController from '../controller/apiController';
// ----------------------------------------------
const router = express.Router();

// const handleHelloWorld = (req, res) => {
//     return res.send("Hello world");
// }
const initApiRoutes = (app) => {

    
    router.get("/test-api", apiController.testApi);

    router.post("/register", apiController.handleRegister);

    router.post("/login", apiController.handleLogin);

    // Nap router da khai bao o trong file, "/" = homepage
    // return app.use("/", router);
    return app.use("/api/v1/", router);
}

export default initApiRoutes;