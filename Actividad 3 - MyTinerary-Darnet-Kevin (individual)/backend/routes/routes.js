const Router = require(`express`).Router();

const ciudadesControllers = require(`../controllers/ciudadesControllers`);

const {
  consultarCiudades,
  cargarCiudad,
  borrarCiudad,
  modificarCiudad,
  pedirCity,
} = ciudadesControllers;

Router.route(`/allcities`).get(consultarCiudades).post(cargarCiudad);

Router.route(`/allcities/:id`)
  .delete(borrarCiudad)
  .put(modificarCiudad)
  .get(pedirCity);
module.exports = Router;
