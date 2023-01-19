import express from 'express';

/**
 * @param {*} app - express app
 * B1: https://expressjs.com/en/starter/static-files.html
 * B2: https://expressjs.com/en/5x/api.html#app.set
 */
const configViewEngine = (app) => {
    app.use(express.static('./src/public')); //config: chi cho phep truy cap folder public
    app.set("view engine", "ejs"); //config: use ejs for html
    app.set("views", "./src/views");
}

export default configViewEngine;