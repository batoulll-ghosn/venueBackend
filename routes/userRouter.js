const express = require("express");
const router = express.Router();
const control = require("../controller/userControl");
router.post("/addUser", control.postUser);
router.get("/getAll", control.getAllUsers);
router.get("/getById/:id", control.UserByUserId);
router.delete("/deleteuser/:id", control.deleteAllUsers);
router.put("/updateUser/:ID", control.updatedUser);
module.exports = router;
