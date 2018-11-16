/**
* @fileOverview User Route module
*
* @exports router
* @requires express
* @requires UserController
*/
import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

/**
* Route to get all parcel orders by a user
* @param  {string} route The get User Parcels url route
* @param  {function} ParcelController.createParcels The handler method
* @returns {(obj|obj} parcels or error message
*/
router.get('/users/:userId/parcels', UserController.getUserParcel);

export default router;
