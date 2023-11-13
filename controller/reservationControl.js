const dbb = require("../config/db");
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
module.exports = {
  reservationByUserId,
  reservationResId,
  reservationByEventId,
};
