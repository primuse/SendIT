/**
* @fileOverview Database configuration.
*
* @exports DB query
* @requires pg
* @requires dotenv
*/
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = require('pg');

/**
* Connection URI to PostgreSQL database hosted online
*/
const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
});

pool.connect().catch((err) => {
  console.log(err);
});


export default pool;
