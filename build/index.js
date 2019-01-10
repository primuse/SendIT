"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("./swagger.json"));

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

var corsOptions = {
  origin: '*',
  credentials: true
};
app.use((0, _cors.default)(corsOptions));
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use('/api/v1', _parcelRoute.default);
app.use('/api/v1', _userRoute.default);
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
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
app.use('*/', function (req, res) {
  res.status(404).send({
    message: 'Page not found'
  });
});
var server = app.listen(port, function () {
  console.log("Server started on PORT ".concat(port));
});
var _default = server;
exports.default = _default;