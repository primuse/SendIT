const { Pool } = require('pg');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const logger = require('./src/helper/logger');

dotenv.config();

const hashedPassword = bcrypt.hashSync('cim', 8);

const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
});

pool.on('connect', () => {
});

/**
 * Create Tables
 */
const createTables = () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS
      userTable (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR (128) NOT NULL,
        lastName VARCHAR (128) NOT NULL,
        otherNames VARCHAR (128) NOT NULL,
        username VARCHAR (128) UNIQUE NOT NULL,
        email VARCHAR (355) UNIQUE NOT NULL,
        registered VARCHAR NOT NULL,
        isAdmin BOOLEAN NOT NULL,
        password VARCHAR (128) NOT NULL
      )`,
    `CREATE TABLE IF NOT EXISTS
      parcelTable (
        id SERIAL PRIMARY KEY,
        parcelName VARCHAR (128) NOT NULL,
        placedBy INT NOT NULL,
        price FLOAT (11) NOT NULL,
        weight FLOAT (11) NOT NULL,
        metric VARCHAR (20) NOT NULL,
        pickupLocation VARCHAR (128) NOT NULL,
        destination VARCHAR (128) NOT NULL,
        status VARCHAR (128) NOT NULL,
        receiver VARCHAR (128) NOT NULL,
        email VARCHAR (355) NOT NULL,
        phoneNumber VARCHAR(20) NOT NULL,
        currentLocation VARCHAR (128) NOT NULL,
        sentOn VARCHAR NOT NULL,
        deliveredOn VARCHAR
      )`,
  ];
  queries.forEach((queryText) => {
    pool.query(queryText)
      .then((res) => {
        logger.info(res);
      })
      .catch((err) => {
        logger.info(err);
      });
  });
};

/**
 * Drop Tables
 */
const dropParcelTable = () => {
  const queryText = 'DROP TABLE IF EXISTS parcelTable';
  pool.query(queryText)
    .then((res) => {
      logger.info(res);
    })
    .catch((err) => {
      logger.info(err);
    });
};

const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS userTable';
  pool.query(queryText)
    .then((res) => {
      logger.info(res);
    })
    .catch((err) => {
      logger.info(err);
    });
};

const createAdmin = () => {
  const queryText = `INSERT INTO userTable(firstName, lastName, otherNames, username, email, registered, isAdmin, password)
  VALUES('tiku', 'okoye', 'divine', 'cim', 'tikuokoye@yahoo.com', '12-10-18', 'true', '${hashedPassword}')`;
  pool.query(queryText)
    .then((res) => {
      logger.info(res);
    })
    .catch((err) => {
      logger.info(err);
    });
};

const createParcel = () => {
  const parcelQuery = `INSERT INTO 
  parcelTable(parcelName, placedBy, price, weight, metric,
  pickupLocation, destination, status, receiver, email, phoneNumber, currentLocation, sentOn)
  VALUES('Rice', '1', '100', '13', 'kg', 'Lagos', 'Owerri', 'Created', 'Belvi Nosa', 'belvinosa@gmail.com', '08129814330', 'Aba', '12-10-2018')`;
  pool.query(parcelQuery)
    .then((res) => {
      logger.info(res);
    })
    .catch((err) => {
      logger.info(err);
    });
};


pool.on('remove', () => {
  logger.info('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropParcelTable,
  dropUserTable,
  createAdmin,
  createParcel,
};

require('make-runnable');
