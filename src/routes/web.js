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

    // Delete = post, ":id" <=> id is a dynamic param
    router.post("/delete-user/:id", homeController.handleDeleteUser);

    // Update B1: get update (on user page (edit button))
    router.get("/update-user/:id", homeController.getUpdateUserPage);

    // Update B2: complete update = post (on update page(update button))
    router.post("/users/update-user", homeController.handleUpdateUser);


    // Nap router da khai bao o trong file, "/" = homepage
    return app.use("/", router);
}

export default initWebRoutes;