// userService.js chinh la mot MODEL cua MVC
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';

import db from '../models/models/index';

// create the connection, specify bluebird as Promise
// const connection = await mysql.createConnection(
//     {
//         host:'localhost', 
//         user: 'root', 
//         database: 'jwt_nodejs_01', 
//         Promise: bluebird});
const salt = bcrypt.genSaltSync(10);

// https://www.npmjs.com/package/bcryptjs
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

// https://www.npmjs.com/package/mysql2
// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
const createNewUser = async(email, password, username) => {
    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            username: username,
            email:email,
            password:hashPass
        })
    } catch (error) {
        console.log(error);
    }
    

}

const getListUser = async() => {
    let users = [];
    users = await db.User.findAll();
    return users;
}

const deleteUser = async(userId) => {
    await db.User.destroy({
        where: {id: userId}
    })
}

const getUserById = async(userId) => {
    let user = {};
    user = await db.User.findOne({
        where: {id: userId}
    })
    return user.get({plain: true}); //convert sequelize object => javascript object
    // console.log(">>> check user findOne: ", user, "id = ", userId);
}
const updateUserInfo = async(email, username, id) => {
    await db.User.update(
        {email:email, username:username},
        {where: {id: id}}
    );
}


module.exports = {
    createNewUser,
    getListUser,
    deleteUser,
    getUserById, 
    updateUserInfo,
}