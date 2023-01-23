const express = require('express');

// mini app
const auth_router = express.Router();

const {getsign, signup, login} = require('../Controllers/authController');

 // here / is the base root path
auth_router.route("/signup")
    .get(getsign)
    .post(signup);

auth_router.route("/login")
    .get(login);

module.exports = auth_router;