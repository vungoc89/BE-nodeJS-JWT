
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
const handleCreateNewUser = (req, res) => {
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

// Export a file 
module.exports = {
    handleHelloWorld, 
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
}