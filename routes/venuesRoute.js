const express = require("express");
const router = express.Router();
const multer = require("multer");
const control = require("../controller/venueControl");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/getAll", control.getAllVenue);
router.get("/getVenueById/:id", control.venueById);
router.post("/addVenue", upload.single("image"), control.postVenue);
router.put("/update/:id", upload.single("image"), control.updateVenue);
router.delete("/deleteVenue/:id", control.deleteVenue);
module.exports = router;
