"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _require = require('winston'),
    createLogger = _require.createLogger,
    format = _require.format,
    transports = _require.transports;

var logger = createLogger({
  level: 'debug',
  format: format.simple(),
  transports: [new transports.Console()]
});
var _default = logger;
exports.default = _default;