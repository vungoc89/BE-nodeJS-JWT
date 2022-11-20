import express from 'express';

// import { handleHelloWorld } from '../controller/homeController';
import homeController from '../controller/homeController';

// ----------------------------------------------
const router = express.Router();

// const handleHelloWorld = (req, res) => {
//     return res.send("Hello world");
// }
const initWebRoutes = (app) => {

    //path - handler
    // router.get("/", (req, res) => {
        // return res.send("Hello world");
    // })

    //C2: 
    router.get("/", homeController.handleHelloWorld); 

    // router.get("/about", (req, res) => {
    //     return res.send("I'm John Vu");
    // })

    router.get("/user", homeController.handleUserPage);

    //Create = post
    router.post("/users/create-user",homeController.handleCreateNewUser );

    // Delete = post
    router.post("/delete-user/:id", homeController.handleDeleteUser);
    // Nap router da khai bao o trong file, "/" = homepage
    return app.use("/", router);
}

export default initWebRoutes;