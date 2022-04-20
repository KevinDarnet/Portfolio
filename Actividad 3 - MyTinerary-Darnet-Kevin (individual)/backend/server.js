require("dotenv").config();
require("./config/database");
const cors = require("cors");
const Router = require("./routes/routes");
const express = require("express");
const itinerariesRouter = require("./routes/itinerariesroutes");
const routerUser = require("./routes/routesUser");
const passport = require("passport");
const activitiesroutes = require("./routes/activitiesroutes");

const PORT = 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/api", Router);
app.use("/api", itinerariesRouter);
app.use("/api", routerUser);
app.use("/api", activitiesroutes);
app.listen(PORT, () => console.log("Server ready on PORT" + PORT));
