/**
* @fileOverview Parcel Route module
*
* @exports router
* @requires express
* @requires ParcelController
* @requires ValidateMiddleware
*/
import express from 'express';
import ParcelController from '../controllers/dbParcelController';
import ValidateMiddleware from '../middleware/validator';

const router = express.Router();

/**
* Route to create new Parcel Orders
* @param  {string} route The Post url route
* @param  {function} ParcelController.createParcels The handler method
* @returns {(obj|obj} success message or error message
*/
router.post('/parcels', ValidateMiddleware.validateParcel, ParcelController.createParcels);

// /**
// * Route to get all Parcel Orders
// * @param  {string} route The Get Parcels url route
// * @param  {function} ParcelController.getAllParcels The handler function
// * @returns {(obj|obj} parcel or error message
// */
// router.get('/parcels', ParcelController.getAllParcels);

// /**
// * Route to get parcel order by ID
// * @param  {string} route The Get parcels/:parcelID url route
// * @param  {function} ParcelController.getParcel The handler function
// * @returns {(obj|obj} parcel or error message
// */
// router.get('/parcels/:parcelId', ParcelController.getParcel);

// /**
// * Route to Update a Parcel
// * @param  {string} route The Update url route
// * @param  {function} ParcelController.updateParcel The handler function
// * @returns {(obj|obj} success message or error message
// */
// router.put('/parcels/:parcelId/update', ParcelController.updateParcel);

// /**
// * Route to cancel a parcel order
// * @param  {string} route The cancel url route
// * @param  {function} ParcelController.cancelParcel The handler function
// * @returns {(obj|obj} success message or error message
// */
// router.put('/parcels/:parcelId/cancel', ParcelController.cancelParcel);

export default router;
