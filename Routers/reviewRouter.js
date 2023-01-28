const express = require('express');
const reviewRouter = express.Router();

const {protect_route} = require('../Controllers/authController');
const{createReview, updateReview, deleteReview, getAllReviews, getPlanReview, getTop3Reviews} = require('../Controllers/planController');

// all plans present in database
reviewRouter.route('/allReviews')
    .get(getAllReviews);

reviewRouter.route('/review/:id')
    .get(getPlanReview);

// top 3
reviewRouter.route('/top-3')
    .get(getTop3Reviews);

// can be done by user only
// so we will put a middleware 
reviewRouter.use(protect_route);
reviewRouter.route('/crud')
    .post(createReview);

reviewRouter.route('/crud/:id')
    .patch(updateReview)
    .delete(deleteReview);

module.exports = reviewRouter;