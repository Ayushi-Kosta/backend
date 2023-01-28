const express = require('express');
const user_router = express.Router();


// server for signup
// const auth_router = express.Router();
const{getUser, getAllUser, updateUser, deleteUser} = require('../Controllers/userController');
// const protectRoute = require('./protectRoute');
const{signup, login, isAuthorised, protect_route, forgetPassword, resetPassword, logout} = require('../Controllers/authController');
// routes 
user_router.route('/signup')
.post(signup);

user_router.route('/login')
   .post(login);

user_router.use(protect_route);
// user options
user_router.route('/:id')
   .patch(updateUser)
   .delete(deleteUser);

// profile page
user_router.route('/userProfile')
   .get(getUser);


// forget password
user_router.route('/forgetPassword')
   .post(forgetPassword);

// reset password
user_router.route('/resetPassword/:token')
   .post(resetPassword);

// logout
user_router.route('/logout')
   .get(logout);


// admin specific functions
user_router.use(isAuthorised);
user_router.route('/')
    .get(getAllUser);


module.exports = user_router;