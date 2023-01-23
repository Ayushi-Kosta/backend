// fetcing user model from useModels
const UserModel = require('../Models/userModel');

// bcrypt
const bcrypt = require('bcrypt');

// jwt
var jwt = require('jsonwebtoken');
const jwt_key = require("../secrets");

module.exports.getsign = function getsign(req, res){
    res.sendFile(__dirname + "/signup.html");
}
module.exports.signup = async function signup(req, res){
    const data = req.body;
    console.log(data);
    await UserModel.create(data);
    res.send(data);
}

module.exports.login = async function login(req, res){
    try{
        const data = req.body;
        if(data.email===""){
            res.send("Email is required");
        }
        let user = await UserModel.findOne({email: data.email});
        
        if(user){

            bcrypt.compare(data.password, user.password, function(err, result) {
                if(result===true){
                    // checking through cookies
                    // res.cookie("loggedIn", "true", {Secure: true, httpOnly: true})
                    // res.send("Login successful");

                    // checking through jwt
                    const uid = user._id;
                    let token = jwt.sign({payload: uid}, jwt_key);
                    res.cookie("jwt", token, {Secure: true, httpOnly: true});
                    res.send("Login successful");
                }
                else{
                    res.send("Invalid password");
                }
            });
        }
        else{
            res.send("User not found");
        }
    }
    catch{
        res.send("Server Error");
    }
}
