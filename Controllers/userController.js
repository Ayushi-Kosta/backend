// fetcing user model from userModels
const UserModel = require('../Models/userModel');

module.exports.getUser = async function getUser(req, res){
    let id = req.id;
    // console.log(id);
    let user = await UserModel.findById(id);
    if(user){
        return res.json(user);
    }
    else{
        return res.json({
            "message": "User not found"
        });
    }
};
module.exports.post = async function post(req, res){
    const data = req.body;
    console.log(data);
    let user = await UserModel.create(data);
    return res.json({
        "message": "Post req recieved",
        sent: user
    });
    // res.send('Post req recieved');
};

module.exports.updateUser = async function updateUser(req, res){
    try{
        const datatobeupdated = (req.body);
        let id = req.params.id;
        // console.log(id);
        let user = await UserModel.findById(id);
        if(user){
            // console.log(user);
            const keys=[];
            for(let key in datatobeupdated){
                keys.push(key);
            }
            for(let i=0; i<keys.length; i++){
                user[keys[i]] = datatobeupdated[keys[i]];
            }
            let updateData  = await user.save();
            return res.json({
                "message": "User updated Successfully",
                "data": user
            });
        }
        else{
            return res.json({
                "message": "User not found"
            });
        }
    }
    catch(err){
        return res.json({
            "message": err
        });
    }
};
module.exports.deleteUser = async function deleteUser(req, res){
    try{
        const id = (req.params.id);
        // console.log(name);
        let found  = await UserModel.findOneAndDelete({id: id});
        if(found){
            return res.json({
                "message": "User deleted Successfully"
            });
        }
        else{
            return res.json({
                "message": "User not found"
            });
        }
    }
    catch(err){
        res.json({
            "message": err
        });
    }
};

module.exports.getAllUser = async function getAllUser(req, res){
    try{
        let user = await UserModel.find();
        if(user){
            return res.json({
                message: "User retrieved successfully",
                data: user
            });
        }
        else{
            return res.json({
                "message": "User not found"
            });
        }
    }
    catch(err){
        return res.json({
            "message": err
        });
    }
}

