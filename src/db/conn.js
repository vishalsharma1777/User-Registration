// const mongoose = require("mongoose");

//         mongoose.connect("mongodb+srv://Vishal:vu6ywxhp3M05UTYb@userregistration.jcaijdw.mongodb.net/test", {
//         }).then(() => {
//             console.log(`connection successful`); //if connection is established 
//         }).catch((e) => {
//             console.log(`connection failed`) //if connection is not successfull
//             mongoose.connect("mongodb://127.0.0.1:27017/userRegistration")//use this at connect if you want to run it in your local data base
//         })
// //used to connect to the database where the user inputs will be stored.

// // COMMENT THE ABOVE AND UN COMMENT THE BELOW IF YOU WANT TO USE IT IN YOUR LOCAL DATABAE AND VICE VERSA


const mongoose = require("mongoose");

        mongoose.connect("mongodb://127.0.0.1:27017/userRegistration", {
        }).then(() => {
            console.log(`connection successful`); //if connection is established 
        }).catch((e) => {
            console.log(`connection failed`) //if connection is not successfull

        })