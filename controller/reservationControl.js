const dbb = require("../config/db");
const getAllReservation = async (req, res) => {
  try {
    const [result] = await dbb.query(`SELECT * FROM reservation`);
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
const reservationResId = async (req, res) => {
  try {
    const [result] = await dbb.query(`SELECT * FROM reservation WHERE ID = ?`, [
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
const postReservation = async (req, res) => {
  const { eventID, userID } = req.body;
  try {
    const [result] = await dbb.query(
      `INSERT INTO reservation(eventID, userID) VALUES ('${eventID}','${userID}')`
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
const reservationByUserId = async (req, res) => {
  try {
    const [result] = await dbb.query(
      `SELECT * FROM reservation WHERE userID = ?`,
      [req.params.id]
    );
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
const reservationByEventId = async (req, res) => {
  try {
    const [result] = await dbb.query(
      `SELECT * FROM reservation WHERE eventID = ?`,
      [req.params.id]
    );
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
const reservationById = async (req, res) => {
  try {
    const [result] = await dbb.query(
      `SELECT events.*,users.*, reservation.ID, events.*
        FROM evebts,users 
            LEFT JOIN reservation ON reservation.userID = users.ID 
            LEFT JOIN events ON reservation.eventID = events.ID
        WHERE reservation.ID = ${id};`,
      [req.params.id]
    );
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
const deleteReservation = async (req, res) => {
  try {
    const [result] = await dbb.query(`DELETE FROM reservation WHERE ID = ?`, [
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
const updatedReservation = async (req, res) => {
  const { eventID, userID } = req.body;
  const ID = req.params.ID;
  try {
    const sql = `UPDATE reservation
                       SET eventID = '${eventID}',userID = '${userID}'
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
module.exports = {
  getAllReservation,
  reservationByUserId,
  reservationResId,
  reservationByEventId,
  reservationById,
  postReservation,
  deleteReservation,
  updatedReservation,
};
