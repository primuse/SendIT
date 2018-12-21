"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @fileOverview Database configuration.
*
* @exports DB query
* @requires pg
* @requires dotenv
*/
_dotenv.default.config();

var _require = require('pg'),
    Pool = _require.Pool;
/**
* Connection URI to PostgreSQL database hosted online
*/


var pool = new Pool({
  connectionString: process.env.DATABASE_URI
});
pool.connect();
var _default = pool;
exports.default = _default;