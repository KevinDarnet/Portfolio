const mongoose = require("mongoose");

const ciudadesSchema = new mongoose.Schema({
  image: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  country: { type: String, required: true },
  coin: { type: String, required: true },
  lenguage: { type: String, required: true },
  flag: { type: String, required: true },
});
const Ciudades = mongoose.model("ciudades", ciudadesSchema);
module.exports = Ciudades;
