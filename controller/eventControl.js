const dbb = require("../config/db");
const getAllEvents = async (req, res) => {
  try {
    const [result] = await dbb.query(`SELECT * FROM events`);
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
const EventById = async (req, res) => {
  try {
    const [result] = await dbb.query(`SELECT * FROM events WHERE ID = ?`, [
      req.params.id,
    ]);
    res.status(200).json({
      success: true,
      message: "Event By ID gotten succesfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get event",
      error,
    });
  }
};
const postEvent = async (req, res) => {
  const { title, date, ticketPrice, description, venueID } = req.body;
  try {
    const [result] = await dbb.query(
      `INSERT INTO events(title, date, ticketPrice, description, venueID) VALUES ('${title}','${date}','${ticketPrice}','${description}','${venueID}')`
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
const deleteAllEvents = async (req, res) => {
  try {
    const [result] = await dbb.query(`DELETE FROM events WHERE ID = ?`, [
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
const updatedEvent = async (req, res) => {
  const { title, date, ticketPrice, description, venueID } = req.body;
  const ID = req.params.ID;
  try {
    const sql = `UPDATE event
      title='${title}',date='${date}',ticketPrice='${ticketPrice}',description='${description}',venueID='${venueID}' WHERE ID= ${ID}`;

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
module.exports = { getAllEvents, postEvent, deleteAllEvents, EventById,updatedEvent };
