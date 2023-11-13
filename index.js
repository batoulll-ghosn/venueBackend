require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT;
require("./config/db");
const cloud = require("./config/cloud");
const userRoutes = require("./routes/userRouter");
const reservationRoutes = require("./routes/reservationRouter");
const EventRoutes = require("./routes/eventRoute");
const VenueRoutes = require("./routes/venuesRoute");
app.use(bodyParser.json());
app.use("/user", userRoutes);
app.use("/event", EventRoutes);
app.use("/reserve", reservationRoutes);
app.use("/vi", VenueRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
