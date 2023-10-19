import express from 'express';
import auth from '../../middlewares/auth';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequestHandler';
import { BookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUMS_USER_ROLE.USER),
  validateRequest(BookingValidation.createBooking),
  BookingController.createBooking
);

router.patch(
  '/cancel/:id',
  auth(ENUMS_USER_ROLE.USER),
  BookingController.cancelBooking
);

router.get(
  '/my-booking',
  auth(ENUMS_USER_ROLE.USER),
  BookingController.getMyBookings
);

export const BookingRoutes = router;
