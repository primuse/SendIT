"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _parcelRoute = _interopRequireDefault(require("./routes/parcelRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = process.env.PORT;
app.use(_bodyParser.default.json()); // support json encoded bodies

app.use(_bodyParser.default.urlencoded({
  extended: true
})); // support encoded bodies

app.use('/api/v1', _userRoute.default);
app.use('/api/v1', _parcelRoute.default);

if (port == null || port === '') {
  port = 3000;
}

var server = app.listen(port, function () {
  console.log("Server started on PORT ".concat(port));
});
var _default = server;
exports.default = _default;