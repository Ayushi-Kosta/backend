const express = require('express');
const user_router = express.Router();


// server for signup
// const auth_router = express.Router();
const{get, post, updatedata, deleteuser, getcookie, setcookie, getbyname} = require('../Controllers/userController');
const protect_route = require('./protectRoute');

// routes 
user_router.route('/')
   .get(protect_route, get)
   .post(post)
   .patch(updatedata)
   .delete(deleteuser);

user_router.route('/getcookie')
   .get(getcookie);
user_router.route('/setcookie')
   .get(setcookie);


user_router.route('/:id')
    .get(getbyname);


module.exports = user_router;