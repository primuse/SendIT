"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _logger = _interopRequireDefault(require("./helper/logger"));

var _parcelRoute = _interopRequireDefault(require("./routes/parcelRoute"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @fileOverview Server setup file
*
* @exports server
* @requires express
* @requires bodyParser
* @requires userRoute
* @requires parcelRoute
* @requires @babel/polyfill
* @requires dotenv
*/
_dotenv.default.config();

var app = (0, _express.default)();
var port = process.env.PORT;
/**
 * support json encoded bodies
 * support encoded bodies
 */

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use('/api/v1', _parcelRoute.default);
app.use('/api/v1', _userRoute.default);
/**
* Index Route
* @param  {string} route The index url route
* @param  {function}
* @returns {string} success message
*/

app.get('/', function (req, res) {
  res.status(200).send({
    message: 'Welcome to SendIT!'
  });
});
var server = app.listen(port, function () {
  _logger.default.info("Server started on PORT ".concat(port));
});
var _default = server;
exports.default = _default;