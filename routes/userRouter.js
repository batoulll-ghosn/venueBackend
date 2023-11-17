const express = require("express");
const router = express.Router();
const control = require("../controller/userControl");
router.post("/addUser", control.postUser);
router.get("/getAll", control.getAllUsers);
router.get("/getById/:ID", control.UserByUserId);
router.delete("/deleteuser/:id", control.deleteAllUsers);
router.put("/updateUser/:ID", control.updateByID);
router.post("/login", control.login);
router.post("/register", control.register);
router.put("/switchToAdmin/:ID", control.switchToAdmin);
module.exports = router;
