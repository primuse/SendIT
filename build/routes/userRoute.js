"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @fileOverview User Route module
*
* @exports router
* @requires express
* @requires UserController
*/
var router = _express.default.Router();
/**
* Route to get all parcel orders by a user
* @param  {string} route The get User Parcels url route
* @param  {function} ParcelController.createParcels The handler method
* @returns {(obj|obj} parcels or error message
*/


router.get('/users/:userId/parcels', _UserController.default.getUserParcel);
var _default = router;
exports.default = _default;