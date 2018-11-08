import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

// To get all parcels from User with ID
router.get('/users/:userId/parcels', UserController.getUserParcel);

export default router;
