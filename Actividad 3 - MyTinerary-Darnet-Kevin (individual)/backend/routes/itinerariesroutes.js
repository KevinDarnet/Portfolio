const itinerariesRouter = require(`express`).Router();
const passport = require("../config/passport");
const itinerariesControllers = require(`../controllers/itineraryControllers`);
const commentsControllers = require("../controllers/commentsControllers");
const { addComment, modifyComment, deleteComment } = commentsControllers;

const {
  getItinerary,
  cargarCiudadItinerary,
  getOneItinerary,
  subirItinerary,
  borrarItinerary,
  modificarItinerary,
  likeDislike,
  prueba,
} = itinerariesControllers;

itinerariesRouter.route(`/itineraries/:id`).get(getOneItinerary);
itinerariesRouter.route(`/itineraries`).get(getItinerary);

//LIKES ROUTES
itinerariesRouter
  .route("/like/:id")
  .put(passport.authenticate("jwt", { session: false }), likeDislike)
  .get(prueba);
itinerariesRouter
  .route(`/itineraryId/:id`)
  .delete(borrarItinerary)
  .put(modificarItinerary)
  .get(subirItinerary);

//Itineraries Comments ROUTES
itinerariesRouter
  .route("/itineraries/comment")
  .post(passport.authenticate("jwt", { session: false }), addComment);

itinerariesRouter
  .route("/itineraries/comment/delete/:id")
  .post(passport.authenticate("jwt", { session: false }), deleteComment);

itinerariesRouter
  .route("/itineraries/comment/modify")
  .put(passport.authenticate("jwt", { session: false }), modifyComment);

itinerariesRouter.route(`/cityItineraries`).get(cargarCiudadItinerary);

module.exports = itinerariesRouter;
