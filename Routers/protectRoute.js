const jwt = require('jsonwebtoken');
const jwt_key = require("../secrets");

// middleware function to check whether user is logged in or not and then only it will return user data
async function protect_route(req, res, next){
    let cookie = await req.cookies;
    // using nomal cookie
    // if(cookie.loggedIn === "true"){
    //     next();
    // }else{
    //     res.json({
    //         "message": "You are not logged in"
    //     });
    // }

    // using jwt
    let verified = jwt.verify(cookie.jwt, jwt_key);
    if(verified){
        next();
    }else{
        res.json({
            "message": "You are not logged in"
        });
    }
}

module.exports = protect_route;