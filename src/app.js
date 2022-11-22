const express = require("express"); //importing the express
const path = require("path"); //provides utilities for working with file and directory paths
const app = express(); //making an express app
const hbs = require("hbs"); //use to render hbs files
const Register = require("./modles/registers"); //importing register.js file from modles
const port = process.env.PORT || 3000; //definig the port on which the project will be running
const static_path = path.join(__dirname, "../public"); //use to join specific path segments into one
const template_path = path.join(__dirname, "../templates/views"); //use to join specific path segments into one
const partials_path = path.join(__dirname, "../templates/partials"); //use to join specific path segments into one
const images_path = path.join(__dirname, "../images"); //use to join specific path segments into one

app.use(express.static(__dirname + '../images'));
app.use(express.json()); //using json to store and read files
app.use(express.urlencoded({ extended: false })); //to stop urlencoding 


app.use(express.static(static_path));
app.set("view engine", "hbs"); //setting view engine and hbs
app.set("views", template_path);
hbs.registerPartials(partials_path);
require("./db/conn"); //linking to the connection


app.get("/", (req, res) => {
    res.render("index")
}); //using it to render index.hbs page

app.get("/register", (req, res) => {
    res.render("register");
}); //using it to render register.hbs page


app.get("/login", (req, res) => {
    res.render("login");
}); //using it to render login.hbs page


app.post("/register", async (req, res) => { //creating a async function post request after submiting the form
    try { //try method to check if password and confirm password are really same
        const password = req.body.password; //taking the password user entered
        const cpassword = req.body.confirmpassword; //taking the confirm password that the user entered

        if (password === cpassword) { //checking if both are same
            const registerEmployee = new Register({
                firstname: req.body.firstname, //taking the details that the user fills
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: password,
                confirmpassword: cpassword,

            })
            const registered = await registerEmployee.save(); //saving the data in schema in our database
            res.status(201).render("succesfullregistered"); //rendering the page after user submits the form
            //res.status(201).render("register");
        } else {
            res.send("passwords are not matching") //if the passwords are not matching
        }
    } catch (error) { //error if user tries to register with same email again
        res.status(400).render("already");
    }
});

let email = ""
let password = ""
let useremail = ""
app.post("/login", async (req, res) => { //setting a async function with req and res
    try {
        email = req.body.email; //takig the email and password user enters in login page
        password = req.body.password;
        useremail = await Register.findOne({ email: email }) //checking if the email is registered or not with us
        if (useremail.password === password) {
            res.render("succesfulllogin") //if the user enters the correct password 
        } else {
            res.render("incorrectpassword")
        }
    } catch (error) {
        res.status(400).render("notregistered");
    }
    details();
});

const details = () => {
    app.post("/details", async (req, res) => {
                res.status(201).render("details", {
                    firstname: useremail.firstname,
                    lastname: useremail.lastname,
                    email: useremail.email,
                    phone: useremail.phone,
                    gender: useremail.gender,
                    age: useremail.age})
                });
}
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})

// mongodb+srv://Vishal:vu6ywxhp3M05UTYb@userregistration.jcaijdw.mongodb.net/test