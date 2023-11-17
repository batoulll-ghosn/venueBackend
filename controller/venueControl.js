const dbb = require("../config/db");
const cloudinaryConfig = require("../config/cloud");
const cloudinary = require("cloudinary").v2;
const { imageUploader } = require("../extra/imageUploader");
const getAllVenue = async (req, res) => {
  try {
    const [result] = await dbb.query(`SELECT * FROM venues`);
    res.status(200).json({
      success: true,
      message: "Venues data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get Venues",
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
  async (req, res) => {
    const { name, description, capacity, address } = req.body;
    const query = `INSERT INTO venues (name, description, capacity, image, address) VALUES (?, ?, ?, ?, ?);`;
    try {
      const imageURL = await imageUploader(req.file);
      const [response] = await connection.query(query, [
        name,
        description,
        capacity,
        imageURL,
        address,
      ]);
      const [data] = await getVenueByID(response.insertId);
      res.status(200).json({
        success: true,
        message: `Venue added successfully`,
        data: data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `Unable to add venue`,
        error: error.message,
      });
    }
  };
};
const updateVenue = async (req, res) => {
  const { ID } = req.params;
  const { name, description, capacity, image, address } = req.body;
  const query = `UPDATE venues SET name = ?, description = ?, capacity = ?, image = ?, address = ? WHERE ID = ?;`;
  let imageURL = "";
  try {
    if (req.file) {
      imageURL = await imageUploader(req.file);
    } else {
      imageURL = image;
    }
    console.log(imageURL);
    const [response] = await connection.query(query, [
      name,
      description,
      capacity,
      imageURL,
      address,
      ID,
    ]);
    const data = await getVenueByID(ID);
    res.status(200).json({
      success: true,
      message: `Venue with ID = ${ID} updated successfully`,
      data: data[0],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to update venue with id = ${ID}`,
      error: error.message,
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
const getVenueByID = async (ID) => {
  const query = `SELECT * FROM venues WHERE ID = ?;`;
  try {
    const [response] = await connection.query(query, [ID]);
    return response;
  } catch (error) {
    return error;
  }
};
module.exports = {
  getAllVenue,
  venueById,
  postVenue,
  updateVenue,
  deleteVenue,
};
