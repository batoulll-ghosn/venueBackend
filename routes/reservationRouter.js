const express = require("express");
const router = express.Router();
const control = require("../controller/reservationControl");
router.get("/getReservedUser/:id", control.reservationByUserId);
router.get("/getReservedEvent/:id", control.reservationByEventId);
router.get("/getReservation/:id", control.reservationResId);
module.exports = router;