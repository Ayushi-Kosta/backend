const express = require('express');
const planRouter = express.Router();

const {protect_route} = require('../Controllers/authController');
const{isAuthorised, createPlan, updatePlan, deletePlan, getAllPlans, getPlan, getTop3Plans} = require('../Controllers/planController');

// all plans present in database
planRouter.route('/allPans')
    .get(getAllPlans);

// plan of particular user
// so we will put a middleware 
planRouter.use(protect_route);
planRouter.route('/plan/:id')
    .get(getPlan);

// top 3
planRouter.route('/top-3')
    .get(getTop3Plans);

// can be only done by admin or restaurant owner
// so we will put a middleware
// planRouter.use(isAuthorised(['admin', 'restaurant owner']));
planRouter.use(isAuthorised);
planRouter.route('/crudPlan')
    .post(createPlan)

planRouter.route('/crudPlan/:id')
    .patch(updatePlan)
    .delete(deletePlan);


module.exports = planRouter;