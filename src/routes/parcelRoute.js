import express from 'express';
import ParcelController from '../controllers/ParcelController';

const router = express.Router();

// To create new parcels
router.post('/parcels', ParcelController.createParcels);

// To get all parcel delivery orders
router.get('/parcels', ParcelController.getAllParcels);

// To get a parcel delivery order with ID
router.get('/parcels/:parcelId', ParcelController.getParcel);

export default router;
