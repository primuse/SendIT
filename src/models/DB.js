import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} Promise
   */
  async query(text, params) {
    return pool.query(text, params);
  },

  async insert(table, columns, data) {
    const placeholders = Array(columns.length)
      .fill('').map((e, index) => `$${index + 1}`).join();

    const query = `INSERT INTO ${table} (
      ${columns.join()}
      ) VALUES(${placeholders})`;

    return this.query(query, data);
  },
};
