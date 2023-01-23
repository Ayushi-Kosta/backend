// const express = require('express');

// const app = express();
// app.use(express.json());


// let user = [
//     {name: "John",
//     age: 30}, 
//     {name: "Peter",
//     age: 40}    
// ];
// app.get('/', (req, res) => {
//     res.json(user);
//     // res.send('Hello World!')
// });
// app.get('/:id', (req, res) => {
//     const id = (req.params.id);
//     for (let i=0; i<user.length; i++){
//         // console.log(parseInt(user[i].age));
//         if(user[i].name === id){
//             res.json(user[i]);
//         }
//     }
//     // res.send('Hello World!')
// });
// app.post('/post', (req, res) => {
//     const data = req.body;
//     console.log(data);
//     user.push(data);
//     res.json({
//         "message": "Post req recieved",
//         sent: data
//     });
//     // res.send('Post req recieved');
// });
// app.listen(3000, () => {
//     console.log('App listening on port 3000!')
// });



// using router and mini app

// const express = require('express');
// const user_router = express.Router();
// const app = express();
// app.use(express.json());
// app.use("/", user_router); // here / is the base root path

// // routes
// user_router.route('/')
//    .get(get)
//    .post(post);

// user_router.route('/user')
//    .get(getbyquery);

// user_router.route('/:id')
//     .get(getbyname);

// let user = [
//     {name: "John",
//     age: 30}, 
//     {name: "Peter",
//     age: 40}    
// ];
// function get(req, res){
//     res.json(user);
//     res.send('Hello World!');
// };
// function post(req, res){
//     const data = req.body;
//     console.log(data);
//     for(let i=0; i<data.length; i++){
//         console.log(data[i]);
//         user.push(data[i]);
//     }
//     // user.push(data);
//     res.json({
//         "message": "Post req recieved",
//         sent: data
//     });
//     // res.send('Post req recieved');
// };
// function getbyname(req, res){
//     const name = (req.params.id);
//     for (let i=0; i<user.length; i++){
//         // console.log(parseInt(user[i].age));
//         if(user[i].name === name){
//             res.json(user[i]);
//         }
//     }
//     // res.send('Hello World!')
// };
// function getbyquery(req, res){
//     const name = (req.query.name);
//     const age = parseInt(req.query.age);
//     // console.log(name, age);
//     for (let i=0; i<user.length; i++){
//         // console.log(parseInt(user[i].age));
//         if(user[i].name === name && user[i].age === age){
//             res.json(user[i]);
//         }
//     }
//     // res.send('Hello World!')
// };
// app.listen(3000, () => {
//     console.log('App listening on port 3000!')
// });



const express = require('express');

var cookie_parser = require('cookie-parser');


// main app
const app = express();
app.use(express.json());
app.use(cookie_parser());

const user_router = require('./Routers/userRouter');
// (user_router is a mini app)
app.use("/user", user_router); // here / is the base root path

const auth_router = require('./Routers/authRouter');
app.use("/auth", auth_router);







app.listen(3000, () => {
    console.log('App listening on port 3000!')
});
