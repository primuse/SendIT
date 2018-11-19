/**
* @fileOverview Database configuration.
*
* @exports DB query
* @requires pg
* @requires dotenv
*/
import dotenv from 'dotenv';

dotenv.config();

const { Client } = require('pg');

/**
* Connection URI to PostgreSQL database hosted online
*/
const pool = new Client({
  connectionString: process.env.DATABASE_URI,
});

pool.connect();

export default pool;
