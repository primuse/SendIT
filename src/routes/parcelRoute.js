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
router.post('/parcels', ValidateMiddleware.validateToken, ValidateMiddleware.validateParcel, ParcelController.createParcels);

/**
* Route to get all Parcel Orders
* @param  {string} route The Get Parcels url route
* @param  {function} ParcelController.getAllParcels The handler function
* @returns {(obj|obj} parcel or error message
*/
router.get('/parcels', ValidateMiddleware.validateToken, ParcelController.getAllParcels);

/**
* Route to get parcel order by ID
* @param  {string} route The Get parcels/:parcelID url route
* @param  {function} ParcelController.getParcel The handler function
* @returns {(obj|obj} parcel or error message
*/
router.get('/parcels/:parcelId', ValidateMiddleware.validateToken, ParcelController.getParcel);

/**
* Route to cancel a parcel order
* @param  {string} route The cancel url route
* @param  {function} ParcelController.cancelParcel The handler function
* @returns {(obj|obj} success message or error message
*/
router.patch('/parcels/:parcelId/cancel', ValidateMiddleware.validateToken, ParcelController.cancelParcel);

/**
* Route to cancel a parcel order
* @param  {string} route The cancel url route
* @param  {function} ParcelController.cancelParcel The handler function
* @returns {(obj|obj} success message or error message
*/
router.patch('/parcels/:parcelId/destination', ValidateMiddleware.validateToken, ValidateMiddleware.validateDestination, ParcelController.updateParcel);

export default router;
