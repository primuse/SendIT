const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS
      parcel_table (
        id SERIAL PRIMARY KEY,
        parcel_name VARCHAR (128) NOT NULL,
        price FLOAT (11) NOT NULL,
        weight FLOAT(11) NOT NULL,
        destination VARCHAR (128) NOT NULL,
        pickup_location VARCHAR (128) NOT NULL,
        status VARCHAR (128) NOT NULL,
        receiver VARCHAR (128) NOT NULL,
        email VARCHAR (355) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        user_id INTEGER NOT NULL,
        created_date TIMESTAMP NOT NULL,
        modified_date TIMESTAMP
      )`,
    `CREATE TABLE IF NOT EXISTS
      user_table (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR (128) NOT NULL,
        last_name VARCHAR (128) NOT NULL,
        location VARCHAR (128) NOT NULL,
        email VARCHAR (355) UNIQUE NOT NULL,
        sex VARCHAR (8) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        password VARCHAR (128) NOT NULL
      )`,
  ];
  queries.forEach((queryText) => {
    pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS parcel_table';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
};

require('make-runnable');
