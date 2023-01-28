
import db from '../models/models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

// https://www.npmjs.com/package/bcryptjs
let hashPassword;
const hashUserPassword = (userPassword) => {
     hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExisted = async(userEmail) => {
    let user = await db.User.findOne({
        where: {email: userEmail}
    })

    if(user){
        return true;
    }
    return false;
}
const checkPhoneExisted = async(userPhone) => {
    let user = await db.User.findOne({
        where: {phone: userPhone}
    })

    if(user){
        return true;
    }
    return false;
}
const registerNewUser = async(rawUserData) => {
    try {

    //check email/phone existed
    let isEmailExist = await checkEmailExisted(rawUserData.email);
    if(isEmailExist === true){
        return{
            EM: 'The email is already exist',
            EC: 1
        }
    }
    let isPhoneExist = await checkPhoneExisted(rawUserData.phone);
    if(isPhoneExist === true){
        return{
            EM: 'The Phone is already exist',
            EC: 1
        }
    }
    //hash user password
    let hashPassword = hashUserPassword(rawUserData.password);

    //create  new user
    await db.User.create({
        email: rawUserData.email,
        username: rawUserData.username,
        password: hashPassword,
        phone: rawUserData.phone,
    })
    return{
        EM: 'A user is created successfully',
        EC: 0
    }
} catch (error) {
    return{
        EM: 'Something wrong in service...',
        EC: -2
    }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); 
}
const handleUserLogin = async(rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        console.log(">>>check user javascript obj: ", user.get({plain: true}));
        console.log(">>>check user sequelize obj: ", user);

        if(user){
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if(isCorrectPassword === true){
                return{
                    EM: 'Login success',
                    EC: 0,
                    DT: ''
            }
            }
        }
            console.log(">>>Not found user with email/phone: ", rawData.valueLogin, "password: ", rawData.password);
            return{
            EM: 'Your email or phone or password is incorrect',
            EC: 1,
            DT: ''
        }
    }
 catch (error) {
        console.log(">>>error service: ", error);
        return{
            EM: 'Something wrong in service...',
            EC: -2
        }
    }
}
module.exports={
    registerNewUser,
    handleUserLogin,
}