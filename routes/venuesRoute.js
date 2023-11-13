const express = require("express");
const router = express.Router();
const control = require("../controller/venueControl");
router.get("/getAll", control.getAllVenue);
router.get("/getVenueById/:id", control.venueById);
router.post("/addVenue", control.postVenue);
router.put("/updateVenue/:ID", control.updateVenue);
router.delete("/deleteVenue/:id", control.deleteVenue);
module.exports = router;
