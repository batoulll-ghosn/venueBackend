const express = require("express");
const router = express.Router();

const {
  getAll,
  getByID,
  getByUserID,
  getByEventID,
  addReservation,
  updateByID,
  deleteByID,
} = require("../controller/reservationControl");

router.get("/getAll", getAll);
router.get("/getByID/:ID", getByID);
router.get("/getByUserID/:ID", getByUserID);
router.get("/getByEventID/:ID", getByEventID);
router.post("/add", addReservation);
router.put("/update/:ID", updateByID);
router.delete("/delete/:ID", deleteByID);

module.exports = router;
