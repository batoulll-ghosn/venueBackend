const connection = require("./connection");

const CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users (
                                ID INT PRIMARY KEY AUTO_INCREMENT,
                                fullName VARCHAR(100) NOT NULL,
                                email VARCHAR(255) NOT NULL UNIQUE,
                                password VARCHAR(255) NOT NULL,
                                role VARCHAR(10) NOT NULL DEFAULT 'user'
                              );`;

const CREATE_VENUES_TABLE = `CREATE TABLE IF NOT EXISTS venues (
                                ID INT PRIMARY KEY AUTO_INCREMENT,
                                name VARCHAR(100) NOT NULL,
                                description VARCHAR(255) NOT NULL,
                                capacity INT NOT NULL,
                                image VARCHAR(255) NOT NULL,
                                address VARCHAR(255) NOT NULL
                               );`;

const CREATE_EVENTS_TABLE = `CREATE TABLE IF NOT EXISTS events (
                                ID INT PRIMARY KEY AUTO_INCREMENT,
                                title VARCHAR(255) NOT NULL,
                                date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(),
                                ticketPrice INT NOT NULL,
                                description VARCHAR(255) NOT NULL,
                                venueID INT NOT NULL,
                                FOREIGN KEY (venueID)
                                REFERENCES venues(ID)
                                ON DELETE CASCADE
                                ON UPDATE CASCADE
                            );`;

const CREATE_RESERVATION_TABLE = `CREATE TABLE IF NOT EXISTS reservations (
                                    ID INT PRIMARY KEY AUTO_INCREMENT,
                                    eventID INT NOT NULL,
                                    userID INT NOT NULL,
                                    FOREIGN KEY (eventID)
                                    REFERENCES events(ID)
                                    ON DELETE CASCADE
                                    ON UPDATE CASCADE,
                                    FOREIGN KEY (userID)
                                    REFERENCES users(ID)
                                    ON DELETE CASCADE
                                    ON UPDATE CASCADE
                                );`;

const createTables = async () => {
  try {
    const [usersTableCreation] = await connection.query(CREATE_USERS_TABLE);
    const [venuesTableCreation] = await connection.query(CREATE_VENUES_TABLE);
    const [eventsTableCreation] = await connection.query(CREATE_EVENTS_TABLE);
    const [reservationsTableCreation] = await connection.query(
      CREATE_RESERVATION_TABLE
    );
    console.log({
      usersTableCreation,
      venuesTableCreation,
      eventsTableCreation,
      reservationsTableCreation,
    });
  } catch (error) {
    console.error(error);
  }
};

createTables();
