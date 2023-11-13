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
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [result] = await db.query(
      `SELECT ID, role, password FROM users WHERE email = ?`,
      [email]
    );

    if (!result || result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const storedPassword = result[0].password;

    if (password !== storedPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      role: result[0].role,
      ID: result[0].ID,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to log in",
      error: error.message,
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
  loginUser,
};
