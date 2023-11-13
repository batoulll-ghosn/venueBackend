const dbb = require("../config/db");
const cloudinaryConfig = require("../config/cloud");
const cloudinary = require("cloudinary").v2;
const getAllVenue = async (req, res) => {
  try {
    const [result] = await dbb.query(`SELECT * FROM venues`);
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
const venueById = async (req, res) => {
  try {
    const [result] = await dbb.query(`SELECT * FROM venues WHERE ID = ?`, [
      req.params.id,
    ]);
    res.status(200).json({
      success: true,
      message: "venue of id  retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get venue",
      error,
    });
  }
};
const postVenue = async (req, res) => {
  const { name, description, capacity, address } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image not provided",
      });
    }
    const imageBuffer = req.file.buffer.toString("base64");
    const imageResult = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBuffer}`,
      {
        folder: "venues",
      }
    );
    const [result] = await dbb.query(
      `INSERT INTO venues(name, description,capacity,image,address) VALUES ('${name}','${description}','${capacity}','${imageResult.secure_url}','${address}'`
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
const updateVenue = async (req, res) => {
  const { name, description, capacity, image, address } = req.body;
  const ID = req.params.ID;
  try {
    const sql = `UPDATE venues
                         SET name = '${name}',description = '${description}',capacity = '${capacity}',image = '${image}',address = '${address}'
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
const deleteVenue = async (req, res) => {
  try {
    const [result] = await dbb.query(`DELETE FROM venues WHERE ID = ?`, [
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
  getAllVenue,
  venueById,
  postVenue,
  updateVenue,
  deleteVenue,
};
