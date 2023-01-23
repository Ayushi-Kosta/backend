// fetcing user model from userModels
const UserModel = require('../Models/userModel');

module.exports.get = async function get(req, res){
    let user = await UserModel.find();
    console.log(user);
    res.json(user);
    // res.send('Hello World!');
};
module.exports.post = async function post(req, res){
    const data = req.body;
    console.log(data);
    let user = await UserModel.create(data);
    res.json({
        "message": "Post req recieved",
        sent: user
    });
    // res.send('Post req recieved');
};


module.exports.getbyname = async function getbyname(req, res){
    const name = (req.params.id);
    let found  = await UserModel.findOne({name: name});
    res.json(found);
    // res.send('Hello World!')
};
module.exports.updatedata = async function updatedata(req, res){
    const email = (req.body.email);
    const datatobeupdated = (req.body);
    // console.log(name);
    let found  = await UserModel.findOneAndUpdate({email: email}, datatobeupdated);
    res.json(found);
    // res.send('Hello World!')
};
module.exports.deleteuser = async function deleteuser(req, res){
    const email = (req.body.email);
    // console.log(name);
    let found  = await UserModel.findOneAndDelete({email: email});
    res.json(found);
    // res.send('Hello World!')
};

// cookie parser
module.exports.getcookie = async function getcookie(req, res){
    let cookie = await req.cookies;
    console.log(cookie);
    res.json(cookie);
};
module.exports.setcookie = function setcookie(req, res){
    // without using npm package cookie-parser
    // res.setHeader('Set-Cookie', 'Name=Ayushi');

    // using npm package cookie-parser
    res.cookie('snamejh', 'Kosta', {maxAge: 1000*60*60*24*7, Secure: true, httpOnly: true});
    console.log("cookie has been set");
    res.send("cookie has been set");
};
