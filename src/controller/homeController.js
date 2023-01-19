
/**
 * https://www.npmjs.com/package/mysql2
 */
import userService from '../service/userService';

const handleHelloWorld = (req, res) => {
    // return res.send("Hello world controller 2");

    return res.render("home.ejs");
}

const handleUserPage = async(req, res) => {
    let userList = await userService.getListUser();
    console.log('>>> check userList: ', userList);
   
    return res.render("user.ejs",{userList});
}
const handleCreateNewUser = async(req, res) => {
    // console.log(">>>Check request: ", req);
    // console.log(">>>Check request: ", req.body);//get value of name attribute
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    //model <=> get data from database
    userService.createNewUser(email, password, username);

    return res.redirect("/user");
}

const handleDeleteUser = async(req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

const getUpdateUserPage = async(req, res) => {
    
    let id = req.params.id;

    let user = await userService.getUserById(id);
    let userData = {};


    if(user && user.length > 0){
        userData = user[0];
    }
    return res.render("user-update.ejs", {userData});
}
const handleUpdateUser = async(req, res) => {
    
   let email = req.body.email;
   let username = req.body.username;
   let id = req.body.id;

   await userService.updateUserInfo(email, username, id);

    return res.redirect("/user");
}

// Export a file 
module.exports = {
    handleHelloWorld, 
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser,
}