"use strict";

var _express = _interopRequireDefault(require("express"));

var _userRoute = _interopRequireDefault(require("./src/routes/userRoute.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = 3000;
app.app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
app.get('/', function (req, res) {
  // You'll create your note here.
  res.send('Hello');
});
app.get('/joseph', function (req, res) {
  // You'll create your note here.
  res.send('Hello');
});
app.post('/joseph', function (req, res) {
  console.log(req.params, req.query, req.headers);
  res.send('Joseph is great');
});
app.post('/user/:id', function (req, res) {
  console.log(req.params, req.query, req.headers);
  res.send('Joseph is great');
});
app.get('/tiku', function (req, res) {
  // You'll create your note here.
  res.send('Hello');
});
app.listen(port, function () {
  console.log('server started successfully!');
});
app.use('user', _userRoute.default);