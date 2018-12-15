/**
* @fileOverview Parcel Route module
*
* @exports router
* @requires express
* @requires ParcelController
* @requires ValidateMiddleware
*/
import express from 'express';
import UserController from '../controllers/userController';
import ValidateMiddleware from '../middleware/validator';

const router = express.Router();

/**
* Route to create new users
* @param  {string} route The Post url route
* @param  {function} UserController.createUsers The handler method
* @returns {(obj|obj} success message or error message
*/
router.post('/auth/signup', ValidateMiddleware.validateUser, UserController.createUsers);

/**
* Route to update user
* @param  {string} route The Post url route
* @param  {function} UserController.updateUser The handler method
* @returns {(obj|obj} success message or error message
*/
router.patch('/users/:userId/upgrade', ValidateMiddleware.validateToken, ValidateMiddleware.validateUserParam, ValidateMiddleware.validateUserRole, UserController.updateUser);

/**
* Route to downgrade user
* @param  {string} route The Post url route
* @param  {function} UserController.downgradeUser The handler method
* @returns {(obj|obj} success message or error message
*/
router.patch('/users/:userId/downgrade', ValidateMiddleware.validateToken, ValidateMiddleware.validateUserParam, ValidateMiddleware.validateUserRole, UserController.downgradeUser);

/**
* Route to get all Parcel Orders
* @param  {string} route The Get Parcels url route
* @param  {function} ParcelController.getAllParcels The handler function
* @returns {(obj|obj} parcel or error message
*/
router.get('/users', ValidateMiddleware.validateToken, ValidateMiddleware.validateUserRole, UserController.getAllUsers);

/**
* Route to get parcel order by ID
* @param  {string} route The Get parcels/:parcelID url route
* @param  {function} ParcelController.getParcel The handler function
* @returns {(obj|obj} parcel or error message
*/
router.get('/users/:userId', ValidateMiddleware.validateToken, ValidateMiddleware.validateUserRole, ValidateMiddleware.validateUserParam, UserController.getUser);

/**
* Route to get all parcels by user
* @param  {string} route The Post url route
* @param  {function} UserController.userParcels The handler method
* @returns {(obj|obj} success message or error message
*/
router.get('/users/:userId/parcels', ValidateMiddleware.validateUsers, ValidateMiddleware.validateUserParam, UserController.userParcels);
/**
* Route to login Users
* @param  {string} route The Post url route
* @param  {function} UserController.loginUser The handler method
* @returns {(obj|obj} success message or error message
*/
router.post('/auth/login', ValidateMiddleware.validateLogin, UserController.loginUser);

export default router;
