// with database 
const mongoose = require('mongoose');

// password = 5S6KYyLF5rOarp4H

let dblink = 'mongodb+srv://Ayushi:5S6KYyLF5rOarp4H@cluster0.n2sygfc.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dblink)
    .then(() => {
        console.log("plan model connected to database");
    })
    .catch(() => {
        console.log("Connection failed");
    });

// Schema
// for plans
const planSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true,
            
            // this does not show full description
            // maxlength: 20

            // so we will make our custom maxlength
            maxlength: [20, "Name cannot be more than 20 characters"]
        },
        duration:{
            type: Number,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        ratingsAverage:{
            type: Number
        },
        discount:{
            type: Number,
            validate: [function(){
                return this.discount < 100;
            }, 'Discount cannot be more than 100%']
        }
        
    }
);

// model
const PlanModel = mongoose.model('PlanModel', planSchema);

// export
module.exports = PlanModel;