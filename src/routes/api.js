import express from 'express';
// import { handleRegister } from '../controller/apiController';
import apiController from '../controller/apiController';
import userController from '../controller/userController';
// ----------------------------------------------
const router = express.Router();

// const handleHelloWorld = (req, res) => {
//     return res.send("Hello world");
// }
const initApiRoutes = (app) => {

    
    router.get("/test-api", apiController.testApi);

    router.post("/register", apiController.handleRegister);

    router.post("/login", apiController.handleLogin);

    router.get("/user/read", userController.readUserFunc); //?page=10&limit=20
    router.post("/user/create", userController.createUserFunc);
    router.put("/user/update", userController.updateUserFunc);
    router.delete("/user/delete", userController.deleteUserFunc);
    // Nap router da khai bao o trong file, "/" = homepage
    // return app.use("/", router);
    return app.use("/api/v1/", router);
}

export default initApiRoutes;