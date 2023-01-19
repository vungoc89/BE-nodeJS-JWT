// userService.js chinh la mot MODEL cua MVC
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';


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
const createNewUser = async(email, password, username) => {
    let hashPass = hashUserPassword(password);
    const connection = await mysql.createConnection(
        {
            host:'localhost', 
            user: 'root', 
            database: 'jwt_nodejs_01', 
            Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username]);
    } catch (error) {
        console.log(error);
    }
    

}

const getListUser = async() => {
    const connection = await mysql.createConnection(
    {
        host:'localhost', 
        user: 'root', 
        database: 'jwt_nodejs_01', 
        Promise: bluebird});
    let users = [];

    try {    
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        console.log('>>> check rows: ', rows);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async(id) => {
    const connection = await mysql.createConnection(
        {
            host:'localhost', 
            user: 'root', 
            database: 'jwt_nodejs_01', 
            Promise: bluebird});
    try {    
        const [rows, fields] = await connection.execute('Delete from users where id=?', [id]);
        // console.log('>>> check rows: ', rows);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async(id) => {
    const connection = await mysql.createConnection(
        {
            host:'localhost', 
            user: 'root', 
            database: 'jwt_nodejs_01', 
            Promise: bluebird});
    try {    
        const [rows, fields] = await connection.execute('Select * from users where id=?', [id]);
        // console.log('>>> check rows: ', rows);
        return rows;
    } catch (error) {
        console.log(error);
    }
}
const updateUserInfo = async(email, username, id) => {
    const connection = await mysql.createConnection(
        {
            host:'localhost', 
            user: 'root', 
            database: 'jwt_nodejs_01', 
            Promise: bluebird});
    try {    
        const [rows, fields] = await connection.execute('Update users set email=?, username=? where id=?', [email, username, id]);
        console.log('>>> check rows update: ', rows);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    createNewUser,
    getListUser,
    deleteUser,
    getUserById, 
    updateUserInfo,
}