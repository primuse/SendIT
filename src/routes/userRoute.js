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
* @param  {function} UserController.createUsers The handler method
* @returns {(obj|obj} success message or error message
*/
router.patch('/users/:userId/update', ValidateMiddleware.validateToken, ValidateMiddleware.validateUserRole, UserController.updateUser);

/**
* Route to login Users
* @param  {string} route The Post url route
* @param  {function} UserController.loginUser The handler method
* @returns {(obj|obj} success message or error message
*/
router.post('/auth/login', ValidateMiddleware.validateLogin, UserController.loginUser);

export default router;
