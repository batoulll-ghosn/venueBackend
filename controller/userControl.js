const dbb = require("../config/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../extra/token");

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

const login = async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT email,password FROM users WHERE email = ?;`;
  try {
    const [response] = await dbb.query(query, [email]);

    if (!response.length || response.length === 0)
      return res.status(400).json({
        success: false,
        message: `User with email ${email} not found`,
      });

    const THEPassword = response[0].password;
    if (password !== THEPassword) {
      return res.status(400).json({
        success: false,
        message: `Entered password of email ${email} is wrong`,
      });
    }
    res.status(200).json({
      success: true,
      message: `User with email ${email} logged in successfully`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to login for user with email ${email}`,
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const query = `INSERT INTO users (fullName, email, password) VALUES (?, ?, ?);`;
  try {
    const [response] = await dbb.query(query, [
      fullName,
      email,
      hashedPassword,
    ]);
    const [data] = await getUserByID(response.insertId);
    generateToken(1, "admin");
    res.status(200).json({
      success: true,
      message: `User registered successfully`,
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to register a new user`,
      error: error.message,
    });
  }
};

const UserByUserId = async (req, res) => {
  const { ID } = req.params;
  try {
    const response = await getUserByID(ID);
    return res.status(200).json({
      success: true,
      message: `User of id = ${ID} data retrieved successfully `,
      data: response[0],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to get user by id = ${ID}`,
      error: error.message,
    });
  }
};
const postUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const [result] = await dbb.query(
      `INSERT INTO users(fullName, email, password) VALUES ("${fullName}","${email}","${password}")`
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
const updateByID = async (req, res) => {
  const { ID } = req.params;
  const { fullName, email } = req.body;
  const query = `UPDATE users SET fullName = ?, email = ? WHERE ID = ?;`;

  try {
    const [response] = await dbb.query(query, [fullName, email, ID]);
    if (!response.affectedRows)
      return res.status(400).json({
        success: false,
        message: `User with ID = ${ID} not found`,
      });
    const data = await getUserByID(ID);
    res.status(200).json({
      success: true,
      message: `User with ID = ${ID} updated successfully`,
      data: data[0],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to update user with ID = ${ID}`,
      error: error.message,
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
const switchToAdmin = async (req, res) => {
  const { ID } = req.params;
  const query = `UPDATE users SET role = 'admin' WHERE ID = ?;`;

  try {
    const [response] = await dbb.query(query, [ID]);
    if (!response.affectedRows)
      return res.status(400).json({
        success: false,
        message: `User with ID = ${ID} not found`,
      });
    const data = await getUserByID(ID);
    res.status(200).json({
      success: true,
      message: `User with ID = ${ID} switched to admin successfully`,
      data: data[0],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to switch to admin for user with ID = ${ID}`,
      error: error.message,
    });
  }
};
const getUserByID = async (ID) => {
  const query = `SELECT ID, fullName, email, role FROM users WHERE ID = ?;`;
  try {
    const [response] = await dbb.query(query, [ID]);
    return response;
  } catch (error) {
    return error;
  }
};
module.exports = {
  getAllUsers,
  UserByUserId,
  postUser,
  deleteAllUsers,
  updateByID,
  login,
  register,
  switchToAdmin,
  generateToken,
};
