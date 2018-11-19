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
* Route to create new Parcel Orders
* @param  {string} route The Post url route
* @param  {function} UserController.createUsers The handler method
* @returns {(obj|obj} success message or error message
*/
router.post('/users', ValidateMiddleware.validateUser, UserController.createUsers);
export default router;
