import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

// To create new parcels
router.post('/users', UserController.createUser);

// To get all parcel users
router.get('/users', UserController.getAllUsers);

// // To get a parcel delivery order with ID
router.get('/users/:userId', UserController.getUser);

// To get all parcels from User with ID
router.get('/users/:userId/parcels', UserController.getUserParcel);

// To update the destination of a parcel with ID
router.put('/parcels/:parcelId/destination', UserController.updateParcel);

// To cancel a Parcel with ID
router.put('/users/:userId/parcels/:parcelId/cancel', UserController.cancelParcel);

export default router;
