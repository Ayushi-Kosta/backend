// fetcing user model from useModels
const UserModel = require('../Models/userModel');

// bcrypt
const bcrypt = require('bcrypt');

// jwt
var jwt = require('jsonwebtoken');
const jwt_key = require("../secrets");

module.exports.getsign = function getsign(req, res){
    // res.sendFile(__dirname + "/signup.html");
    res.sendFile("C:/Users/User/OneDrive/Desktop/server/server/signup.html");
}
module.exports.signup = async function signup(req, res){
    try{
        const data = req.body;
        // console.log(data);
        let user = await UserModel.create(data);
        if(user){
            res.json({
                message: "user created successfully"
            });
        }
        else{
            res.json({
                message: "error while signing up"
            })
        }
    }
    catch(err){
        res.json({
            message: err
        })
    }
}

module.exports.login = async function login(req, res){
    try{
        const data = req.body;
        if(data.email===""){
            res.send("Email is required");
        }
        if(data.email){
            let user = await UserModel.findOne({email: data.email});
            console.log(user);
            if(user){
                console.log(user);
                // console.log(data.password);
                bcrypt.compare(data.password, user.password, function(err, result) {
                    if(result===true){
                        // checking through cookies
                        // res.cookie("loggedIn", "true", {Secure: true, httpOnly: true})
                        // res.send("Login successful");
    
                        // checking through jwt
                        const uid = user._id;
                        // console.log(uid);
                        let token = jwt.sign({payload: uid}, jwt_key);
                        res.cookie("login", token, {Secure: true, httpOnly: true});
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
        else{
            res.send("Email is required");
        }
    }
    catch{
        res.send("Server Error");
    }
}

// isAuthorised -> to check the user's role (is he user, admin, etc)
module.exports.isAuthorised = async function isAuthorised(req, res, next){
    // return function(req, res, next){
        let roles=["admin"];
        if(roles.includes(req.role) === true){
            console.log(req.role);
            return next();            
        }
        else{
            // unathorised access
            res.status(401).json({
                message: "operation not allowed"
            })
        }
    // }
}

// protect route
// middleware function to check whether user is logged in or not and then only it will return user data
module.exports.protect_route = async function protect_route(req, res, next){
    try{
        let token;
        if(req.cookies.login){
            token = req.cookies.login;
            let payload = jwt.verify(token, jwt_key);
            if(payload){
                const user = await UserModel.findById(payload.payload);
                req.role = user.role;
                req.id = user._id; 
                next();
            }
        }
        else{
            // for browser
            const client = req.get('User-Agent');
            if(client.includes("Mozilla") === true){
                return res.redirect('/login');
            }

            // for postman
            res.json({
                message: "please login"
            });
        }
    }
    catch(err){
        res.json({
            "message": "You are not logged in"
        });
    }
}

// forgot password
module.exports.forgetPassword = async function forgetPassword(req, res){
    let {email_given} = req.body;
    try{
        const user = await UserModel.findOne({email: email_given})
        if(user){
            // creating new token
            const resetToken = user.createResetToken();
            // http://abc.com/resertpassword/resetToken
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            // send email to the user through node mailer
        }
        else{
            return res.json({
                message: "please signup"
            });
        }
    }
    catch(err){
        return res.status(501).json({
            message: err
        });
    }
}

// reset password
module.exports.resetPassword = async function resetPassword(req, res){
    try{
        const token = req.params.token;
        let {password, confirmpassword} = req.body;
        const user = await UserModel.findOne({resetToken: token});
        if(user){
            // will update user's password in database
            user.resetPasswordHandler(password, confirmpassword);            
            await user.save();
            res.json({
                message: "password changed successfully"
            })
        }
        else{
            res.json({
                message: "user not found"
            });
        }
    }
    catch(err){
        res.json({
            message: err
        });    
    }
}

// logout
module.exports.logout = async function logout(req, res){
    console.log("reached");
    try{
        if(req.cookies.login){
            res.cookie("login",'', {maxAge: 1});
            res.json({
                message: "logged out successfully"
            });
        }
        else{
            res.json({
                message: "please login"
            });
        }
    }
    catch(err){
        res.json({
            message: err
        });
    }
}