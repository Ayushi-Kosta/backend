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
const reviewSchema = new mongoose.Schema(
    {
        review:{
            type: String,
            required: [true, 'review is required'],
            unique: true
        },
        rating:{
            type: Number,
            min: 1,
            max: 10,
            required: [true, 'Rating is required']
        },
        createdAt:{
            type: Date,
            default: Date.now(),
            required: true
        },
        ratingsAverage:{
            type: Number
        },
        user:{
            type: mongoose.Schema.ObjectId,
            ref: 'UserModel',
            validate: [true, 'review must belong to a user']
        },
        plan:{
            type: mongoose.Schema.ObjectId,
            ref: 'PlanModel',
            validate: [true, 'review must belong to a plan']
        }
        
    }
);

// ^ is regex and ^find means whenever we find 
// something starting with find then we will 
// call this pre function such as findById, findOne etc
reviewSchema.pre(/^find/, function (next)
{
    this.populate({
        path: "user",
        select: "name profileImage"
    }).populate("plan");
    next(); 
});

// model
const ReviewModel = mongoose.model('ReviewModel', reviewSchema);


// export
module.exports = ReviewModel;