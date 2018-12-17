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
router.get('/parcels', ValidateMiddleware.validateToken, ValidateMiddleware.validateUserRole, ParcelController.getAllParcels);

/**
* Route to get parcel order by ID
* @param  {string} route The Get parcels/:parcelID url route
* @param  {function} ParcelController.getParcel The handler function
* @returns {(obj|obj} parcel or error message
*/
router.get('/parcels/:parcelId', ValidateMiddleware.validateToken, ValidateMiddleware.validateParcelParam, ParcelController.getParcel);

/**
* Route to cancel a parcel order
* @param  {string} route The cancel url route
* @param  {function} ParcelController.cancelParcel The handler function
* @returns {(obj|obj} success message or error message
*/
router.patch('/parcels/:parcelId/cancel', ValidateMiddleware.validateToken, ValidateMiddleware.validateParcelParam, ParcelController.cancelParcel);

/**
* Route to change a parcel destination
* @param  {string} route The cancel url route
* @param  {function} ParcelController.updateParcel The handler function
* @returns {(obj|obj} success message or error message
*/
router.patch('/parcels/:parcelId/destination', ValidateMiddleware.validateToken, ValidateMiddleware.validateParcelParam, ValidateMiddleware.validateDestination, ParcelController.updateParcel);

/**
* Route to change currentLocation of a parcel order
* @param  {string} route The cancel url route
* @param  {function} ParcelController.locationParcel The handler function
* @returns {(obj|obj} success message or error message
*/
router.patch('/parcels/:parcelId/currentlocation', ValidateMiddleware.validateToken, ValidateMiddleware.validateUserRole, ValidateMiddleware.validateParcelParam, ValidateMiddleware.validateLocation, ParcelController.locationParcel);

/**
* Route to change status of a parcel order
* @param  {string} route The cancel url route
* @param  {function} ParcelController.locationParcel The handler function
* @returns {(obj|obj} success message or error message
*/
router.patch('/parcels/:parcelId/status', ValidateMiddleware.validateToken, ValidateMiddleware.validateUserRole, ValidateMiddleware.validateParcelParam, ValidateMiddleware.validateStatus, ParcelController.statusParcel);

/**
* Route to request email reset link
* @param  {string} route The reset email
* @param  {function} ParcelController.sendResetEmail The handler function
* @returns {(obj|obj} success message or error message
*/
router.post('/reset/email', ValidateMiddleware.validateReset, ParcelController.sendResetEmail);

/**
* Route to reset user password
* @param  {string} route The reset email
* @param  {function} ParcelController.updatePassword The handler function
* @returns {(obj|obj} success message or error message
*/
router.patch('/reset/:userId', ValidateMiddleware.validateUsers, ValidateMiddleware.validatePassword, ParcelController.updatePassword);

export default router;
