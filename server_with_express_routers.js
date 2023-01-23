const express = require('express');
const user_router = express.Router();
const app = express();
app.use(express.json());

user_router.route('/')
   .get(get())
   .post(post())

user_router.route('/:id')
    .get(getbyname())

user_router.route('/user')
    .get(getbyquery())


let user = [
    {name: "John",
    age: 30}, 
    {name: "Peter",
    age: 40}    
];
function get(req, res){
    res.json(user);
    // res.send('Hello World!')
};
function post(req, res){
    const data = req.body;
    console.log(data);
    for(let i=0; i<data.length; i++){
        console.log(data[i]);
        user.push(data[i]);
    }
    // user.push(data);
    res.json({
        "message": "Post req recieved",
        sent: data
    });
    // res.send('Post req recieved');
};

function getbyname(req, res){
    const name = (req.params.id);
    for (let i=0; i<user.length; i++){
        // console.log(parseInt(user[i].age));
        if(user[i].name === name){
            res.json(user[i]);
        }
    }
    // res.send('Hello World!')
};

function getbyquery(req, res){
    // const name = (req.query.name);
    // const age = (req.query.age);
    console.log("yes");
    // for (let i=0; i<user.length; i++){
    //     // console.log(parseInt(user[i].age));
    //     if(user[i].name === name && user[i].age === age){
    //         res.json(user[i]);
    //     }
    // }
    res.send('Hello World!')
};
app.listen(3000, () => {
    console.log('App listening on port 3000!')
});
