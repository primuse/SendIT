/**
* @fileOverview Database configuration.
*
* @exports DB query
* @requires pg
*/

const { Client } = require('pg');

/**
* Connection URI to PostgreSQL database hosted online
*/
const connectionString = 'postgres://kzqbbkwl:eN4OypUPY13ir8ondO6ROLnVu_98ZmsQ@pellefant.db.elephantsql.com:5432/kzqbbkwl';

const pool = new Client({
  connectionString,
});

// pool.on('connect', () => {
//   console.log('connected to the db');
// });

// pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });
pool.connect();


export default pool;
// /**
//  * DB Query
//  * @param {object} text
//  * @param {object} params
//  * @returns {object} Promise
//  */
// query(text, params) {
//   return new Promise((resolve, reject) => {
//     pool.query(text, params)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// },
