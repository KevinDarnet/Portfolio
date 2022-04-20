const activitiesRouter = require(`express`).Router();

const activitiesControllers = require(`../controllers/activitiescontrollers`);

const {
          getAllActivities,
          getOneActivity,
          uploadActivity,
          deleteActivity,
          modifyActivity,
          getItineraryActivities,
} = activitiesControllers;

activitiesRouter
          .route(`/activities`)
          .get(getAllActivities)
          .post(uploadActivity);

activitiesRouter
          .route(`/activities/:id`)
          .delete(deleteActivity)
          .put(modifyActivity)
          .get(getOneActivity);

activitiesRouter.route(`/itineraryActivities/:id`).get(getItineraryActivities);

module.exports = activitiesRouter;