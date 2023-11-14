const dbb = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(64).toString("hex");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    next();
  };
};

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

    const passwordMatch = await bcrypt.compare(password, storedPassword);

    if (!passwordMatch) {
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

const generateToken = (userId) => {
  const secretKey = crypto.randomBytes(64).toString("hex");
  const expiresIn = "1h";

  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });

  return token;
};

const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (fullName, email, password) VALUES (?, ?, ?);`;
    const [response] = await connection.query(query, [
      fullName,
      email,
      hashedPassword,
    ]);

    const userId = response.insertId;

    const token = generateToken(userId);

    const [data] = await getUserByID(userId);

    res.status(200).json({
      success: true,
      message: `User registered successfully`,
      data: data,
      token: token,
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
const switchToAdmin = async (req, res) => {
  const { ID } = req.params;
  const query = `UPDATE users SET role = 'admin' WHERE ID = ?;`;

  try {
    const [response] = await connection.query(query, [ID]);
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
    const [response] = await connection.query(query, [ID]);
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
  updatedUser,
  loginUser,
  register,
  switchToAdmin,
  generateToken,
};
