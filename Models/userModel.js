// with database 
const mongoose = require('mongoose');

// npm package for email validation
var emailvalidator = require("email-validator");

// bcrypt library for hashing and salt
const bcrypt = require('bcrypt');


// password = 5S6KYyLF5rOarp4H

let dblink = 'mongodb+srv://Ayushi:5S6KYyLF5rOarp4H@cluster0.n2sygfc.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dblink)
    .then(() => {
        console.log("Connected to database");
    })
    .catch(() => {
        console.log("Connection failed");
    });

// Schema
const userSchema = new mongoose.Schema(
    {   name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            validate: function(){
                return emailvalidator.validate(this.email);
            },            
            minLength: 5
        },
        password: {
            type: String,

            required: true,
        },
        confirmpassword: {
            type: String,
            validate: function(){
                return this.password === this.confirmpassword;
            },
            required: true
        }
    }
);

// pre and post hooks of mongoose
// pre hook runs before saving the data in data base
userSchema.pre('save', function(){
    console.log("pre hook");
    // console.log(this);
});
// post hook runs after saving the data in data base
userSchema.post('save', function(){
    console.log("post hook");
});
//explore remove

// now there is no sense of saving confirm password 
// so we will remove it before saving it in database
userSchema.pre('save', function(){
    // we made confirm password as undefined and 
    // undefined data is not saved in database of 
    // mogoose acc to its documentation
    this.confirmpassword = undefined;
});

// generating hash for password using bcrypt
userSchema.pre('save', async function(){
    let salt = await bcrypt.genSalt();
    let hash = await bcrypt.hash(this.password, salt); 
    this.password = hash;
    // console.log(this.password);  
});





// model
const UserModel = mongoose.model('UserModel', userSchema);

// export
module.exports = UserModel;