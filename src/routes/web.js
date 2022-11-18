import express from 'express';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello world");
    })

    // Nap router da khai bao o trong file, "/" = homepage
    return app.use("/", router);
}

export default initWebRoutes;