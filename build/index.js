"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _parcelRoute = _interopRequireDefault(require("./routes/parcelRoute"));

var _https = require("https");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = 3000;
app.use(_bodyParser.default.json()); // support json encoded bodies

app.use(_bodyParser.default.urlencoded({
  extended: true
})); // support encoded bodies

app.use('/api/v1', _userRoute.default);
app.use('/api/v1', _parcelRoute.default);
app.get('/', function (req, res) {
  return res.send('Welcome to SendIT!');
});
app.listen(port, function () {
  console.log('server started successfully!');
});
var _default = app;
exports.default = _default;