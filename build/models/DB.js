"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
* @fileOverview Database configuration.
*
* @exports DB query
* @requires pg
*/
var _require = require('pg'),
    Client = _require.Client;
/**
* Connection URI to PostgreSQL database hosted online
*/


var connectionString = 'postgres://kzqbbkwl:eN4OypUPY13ir8ondO6ROLnVu_98ZmsQ@pellefant.db.elephantsql.com:5432/kzqbbkwl';
var pool = new Client({
  connectionString: connectionString
}); // pool.on('connect', () => {
//   console.log('connected to the db');
// });
// pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });

pool.connect().catch(function (err) {
  return console.log(err.stack);
});
var _default = {
  /**
   * DB Query
   * @param {object} text
   * @param {object} params
   * @returns {object} Promise
   */
  query: function query(text, params) {
    return new Promise(function (resolve, reject) {
      pool.query(text, params).then(function (res) {
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    });
  }
};
exports.default = _default;

require('make-runnable');