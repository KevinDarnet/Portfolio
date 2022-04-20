const Ciudades = require("../models/ciudades");

const ciudadesControllers = {
  consultarCiudades: async (req, res) => {
    let ciudades;
    let error = null;
    try {
      ciudades = await Ciudades.find();
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" : { ciudades },
      success: error ? false : true,
      error: error,
    });
  },
  cargarCiudad: async (req, res) => {
    //console.log(req.body);
    const { name, country, coin } = req.body;
    new Ciudades({ name, country, coin })
      .save()
      .then((respuesta) => res.json({ respuesta }));
  },
  borrarCiudad: async (req, res) => {
    const id = req.params.id;
    await Ciudades.findOneAndDelete({ _id: id }).then((respuesta) =>
      res.json({ respuesta, recontradatito: "citie morida" })
    );
  },
  modificarCiudad: async (req, res) => {
    const id = req.params.id;
    const ciudad = req.body;
    let ciudadb = await Ciudades.findOneAndUpdate({ _id: id }, ciudad).then(
      (respuesta) => res.json({ respuesta })
    );
  },
  pedirCity: async (req, res) => {
    const id = req.params.id;
    await Ciudades.findOne({ _id: id }).then((respuesta) =>
      res.json({ respuesta })
    );
  },
};
module.exports = ciudadesControllers;
