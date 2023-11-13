const dbb = require("../config/db");
const getAllUsers = async (req, res) => {
  try {
    const [result] = await dbb.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: "Users data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get new user",
      error,
    });
  }
};
const UserByUserId = async (req, res) => {
  try {
    const [result] = await dbb.query(`SELECT * FROM users WHERE ID = ?`, [
      req.params.id,
    ]);
    res.status(200).json({
      success: true,
      message: "Reservation data by user_id retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get reservation",
      error,
    });
  }
};
const postUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const [result] = await dbb.query(
      `INSERT INTO users(fullName, email, password, role) VALUES ("${fullName}","${email}","${password}","${role}")`
    );
    res.status(200).json({
      success: true,
      message: "Users data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get new user",
      error,
    });
  }
};
const updatedUser = async (req, res) => {
  const { fullName, email, password, role, active } = req.body;
  const ID = req.params.ID;
  try {
    const sql = `UPDATE users
                     SET fullName = '${fullName}',email = '${email}', password = '${password}', role = '${role}'
                     WHERE ID= ${ID}`;

    const [result] = await dbb.query(sql);

    res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to update data",
      error: error,
    });
  }
};
const deleteAllUsers = async (req, res) => {
  try {
    const [result] = await dbb.query(`DELETE FROM users WHERE ID = ?`, [
      req.params.id,
    ]);
    res.status(200).json({
      success: true,
      message: "Users data deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get new user",
      error,
    });
  }
};
module.exports = {
  getAllUsers,
  UserByUserId,
  postUser,
  deleteAllUsers,
  updatedUser,
};
