"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _parcelRoute = _interopRequireDefault(require("./routes/parcelRoute"));

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
*/
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
app.use('/api/v1', _userRoute.default);
app.use('/api/v1', _parcelRoute.default);
/**
* Index Route
* @param  {string} route The index url route
* @param  {function}
* @returns {string} success message
*/

app.get('/', function (req, res) {
  res.send('Welcome to SendIT!');
});

if (port == null || port === '') {
  port = 3000;
}

var server = app.listen(port, function () {
  console.log("Server started on PORT ".concat(port));
});
var _default = server;
exports.default = _default;