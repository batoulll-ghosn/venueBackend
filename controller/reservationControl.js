const connection = require("../config/db");

const getAll = async (_, res) => {
  const query = `SELECT reservation.ID AS reservationID, reservation.userID, users.fullName, users.email, users.role, reservation.eventID, events.title, events.date, events.ticketPrice, events.description, events.venueID, venues.name, venues.description,venues.capacity,venues.image,venues.address FROM reservation INNER JOIN users ON users.ID = reservation.userID INNER JOIN events ON events.ID = reservation.eventID INNER JOIN venues ON venues.ID = events.venueID;`;

  try {
    const [response] = await connection.query(query);
    res.status(200).json({
      success: true,
      message: `All reservations retrieved successfully `,
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to get all reservations`,
      error: error.message,
    });
  }
};

const getByID = async (req, res) => {
  const { ID } = req.params;
  try {
    const response = await getReservationByID(ID);
    return res.status(200).json({
      success: true,
      message: `Reservation of id = ${ID} data retrieved successfully `,
      data: response[0],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to get reservation by id = ${ID}`,
      error: error.message,
    });
  }
};

const getByUserID = async (req, res) => {
  const { ID } = req.params;
  const query = `SELECT reservations.ID AS reservationID, reservations.userID, users.fullName, users.email, users.role, reservations.eventID, events.title, events.date, events.ticketPrice, events.description, events.venueID, venues.name, venues.description,venues.capacity,venues.image,venues.address
                    FROM reservations
                    INNER JOIN users ON users.ID = reservations.userID
                    INNER JOIN events ON events.ID = reservations.eventID
                    INNER JOIN venues ON venues.ID = events.venueID
                    WHERE reservations.userID = ?;`;

  try {
    const [response] = await connection.query(query, [ID]);
    res.status(200).json({
      success: true,
      message: `All reservations for user with ID = ${ID} retrieved successfully `,
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to get all reservations for user with ID = ${ID}`,
      error: error.message,
    });
  }
};

const getByEventID = async (req, res) => {
  const { ID } = req.params;
  const query = `SELECT reservations.ID AS reservationID, reservations.userID, users.fullName, users.email, users.role, reservations.eventID, events.title, events.date, events.ticketPrice, events.description, events.venueID, venues.name, venues.description,venues.capacity,venues.image,venues.address
                    FROM reservations
                    INNER JOIN users ON users.ID = reservations.userID
                    INNER JOIN events ON events.ID = reservations.eventID
                    INNER JOIN venues ON venues.ID = events.venueID
                    WHERE reservations.eventID = ?;`;

  try {
    const [response] = await connection.query(query, [ID]);
    res.status(200).json({
      success: true,
      message: `All reservations for event with ID = ${ID} retrieved successfully `,
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to get all reservations for event with ID = ${ID}`,
      error: error.message,
    });
  }
};

const addReservation = async (req, res) => {
  const { eventID, userID } = req.body;
  const query = `INSERT INTO reservations (eventID, userID) VALUES (?, ?);`;

  try {
    const [response] = await connection.query(query, [eventID, userID]);

    const [data] = await getReservationByID(response.insertId);
    res.status(200).json({
      success: true,
      message: `Reservation added successfully`,
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to reserve a ticket for user with id ${userID} in event with id = ${eventID}`,
      error: error.message,
    });
  }
};

const updateByID = async (req, res) => {
  const { ID } = req.params;
  const { eventID, userID } = req.body;
  const query = `UPDATE reservations SET eventID = ?, userID = ? WHERE ID = ?;`;

  try {
    const [response] = await connection.query(query, [eventID, userID, ID]);
    if (!response.affectedRows)
      return res.status(400).json({
        success: false,
        message: `Reservation with ID = ${ID} not found`,
      });
    const data = await getReservationByID(ID);
    res.status(200).json({
      success: true,
      message: `Reservation with ID = ${ID} updated successfully`,
      data: data[0],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to update reservation with ID = ${ID}`,
      error: error.message,
    });
  }
};

const deleteByID = async (req, res) => {
  const { ID } = req.params;
  const query = `DELETE FROM reservations WHERE ID = ?;`;
  try {
    const [response] = await connection.query(query, [ID]);
    if (!response.affectedRows)
      return res.status(400).json({
        success: false,
        message: `Reservation with ID = ${ID} not found`,
      });
    return res.status(200).json({
      success: true,
      message: `Reservation with ID = ${ID} deleted successfully`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to delete reservation with ID = ${ID}`,
      error: error.message,
    });
  }
};

const getReservationByID = async (ID) => {
  const query = `SELECT reservations.ID AS reservationID, reservations.userID, users.fullName, users.email, users.role, reservations.eventID, events.title, events.date, events.ticketPrice, events.description, events.venueID, venues.name, venues.description,venues.capacity,venues.image,venues.address
                    FROM reservations
                    INNER JOIN users ON users.ID = reservations.userID
                    INNER JOIN events ON events.ID = reservations.eventID
                    INNER JOIN venues ON venues.ID = events.venueID
                    WHERE reservations.ID = ?;`;
  try {
    const [response] = await connection.query(query, [ID]);
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAll,
  getByID,
  getByUserID,
  getByEventID,
  addReservation,
  updateByID,
  deleteByID,
};
