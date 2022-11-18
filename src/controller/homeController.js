
const handleHelloWorld = (req, res) => {
    // return res.send("Hello world controller 2");

    return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
    //model <=> get data from database
    
    return res.render("user.ejs");
}

// Export a file 
module.exports = {
    handleHelloWorld, 
    handleUserPage,
}