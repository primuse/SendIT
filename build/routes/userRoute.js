"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _validator = _interopRequireDefault(require("../middleware/validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @fileOverview Parcel Route module
*
* @exports router
* @requires express
* @requires ParcelController
* @requires ValidateMiddleware
*/
var router = _express.default.Router();
/**
* Route to create new users
* @param  {string} route The Post url route
* @param  {function} UserController.createUsers The handler method
* @returns {(obj|obj} success message or error message
*/


router.post('/auth/signup', _validator.default.validateUser, _userController.default.createUsers);
/**
* Route to update user
* @param  {string} route The Post url route
* @param  {function} UserController.createUsers The handler method
* @returns {(obj|obj} success message or error message
*/

router.patch('/users/:userId/update', _validator.default.validateToken, _validator.default.validateUserRole, _userController.default.updateUser);
/**
* Route to get all Parcel Orders
* @param  {string} route The Get Parcels url route
* @param  {function} ParcelController.getAllParcels The handler function
* @returns {(obj|obj} parcel or error message
*/

router.get('/users', _validator.default.validateToken, _validator.default.validateUserRole, _userController.default.getAllUsers);
/**
* Route to get parcel order by ID
* @param  {string} route The Get parcels/:parcelID url route
* @param  {function} ParcelController.getParcel The handler function
* @returns {(obj|obj} parcel or error message
*/

router.get('/users/:userId', _validator.default.validateToken, _userController.default.getUser);
/**
* Route to get all parcels by user
* @param  {string} route The Post url route
* @param  {function} UserController.userParcels The handler method
* @returns {(obj|obj} success message or error message
*/

router.get('/users/:userId/parcels', _validator.default.validateUsers, _userController.default.userParcels);
/**
* Route to login Users
* @param  {string} route The Post url route
* @param  {function} UserController.loginUser The handler method
* @returns {(obj|obj} success message or error message
*/

router.post('/auth/login', _validator.default.validateLogin, _userController.default.loginUser);
var _default = router;
exports.default = _default;