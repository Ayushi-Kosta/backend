const planModel = require('../Models/planModel');

module.exports.isAuthorised = async function isAuthorised(req, res, next){
    // return function(req, res, next){
        let roles=["admin", "restaurant owner"];
        if(roles.includes(req.role) === true){
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

module.exports.createPlan = async function createPlan(req, res){
    try{
        let planData = req.body;
        let createPlan = await planModel.create(planData);
        return res.json({
            "message": "Plan created successfully",
            "data": createPlan
        });
    }
    catch(err){
        return res.status(500).json({
            "message": err
        });
    }
}

module.exports.updatePlan = async function updatePlan(req, res){
    try{
        let id = req.params.id;
        let Datatobeupdated = req.body;
        // console.log(id);
        let plan = await planModel.findById(id);
        if(plan){
            // console.log(plan);
            const keys=[];
            for(let key in Datatobeupdated){
                keys.push(key);
            }
            for(let i=0; i<keys.length; i++){
                plan[keys[i]] = Datatobeupdated[keys[i]];
            }
            let updateData  = await plan.save();
            return res.json({
                "message": "plan updated Successfully",
                "data": plan
            });
        }
        else{
            return res.json({
                "message": "plan not found"
            });
        }
    }
    catch(err){
        return res.json({
            "message": err
        });
    }


}

module.exports.deletePlan = async function deletePlan(req, res){
    try{
        let id = req.params.id;
        let deletePlan = await planModel.findByIdAndDelete(id);
        return res.json({
            "message": "Plan deleted successfully",
            "data": deletePlan
        });
    }
    catch(err){
        return res.status(500).json({
            "message": err
        });
    }
}
module.exports.getAllPlans = async function getAllPlans(req, res){
    try{
        let plans = await planModel.find();
        if(plans){
            return res.json({
                message: "Plans retrieved successfully",
                data: plans
            });
        }
        else{
            return res.json({
                "message": "Plans not found"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            "message": err
        });
    }
}

module.exports.getPlan = async function getPlan(req, res){
    try{
        let id = await req.params.id;
        let plans = await planModel.findById(id);
        if(plans){
            return res.json({
                message: "Plan retrieved",
                data: plans
            });
        }
        else{
            return res.json({
                "message": "Plan not found"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            "message": err
        });
    }
}

module.exports.getTop3Plans = async function getTop3Plans(req, res){
    try{
        let plans = await planModel.find().sort({
            ratingsAverage: -1
        }).limit(3);
        if(plans){
            return res.json({
                message: "Top 3 plans",
                data: plans
            });
        }
        else{
            return res.json({
                "message": "Plans not found"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            "message": err
        });
    }
}