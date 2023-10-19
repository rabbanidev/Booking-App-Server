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

router.patch(
  '/accept/:id',
  auth(ENUMS_USER_ROLE.SUPER_ADMIN, ENUMS_USER_ROLE.ADMIN),
  BookingController.acceptBooking
);

router.patch(
  '/reject/:id',
  auth(ENUMS_USER_ROLE.SUPER_ADMIN, ENUMS_USER_ROLE.ADMIN),
  BookingController.rejectedBooking
);

router.patch(
  '/adjust-schedule/:id',
  auth(ENUMS_USER_ROLE.SUPER_ADMIN, ENUMS_USER_ROLE.ADMIN),
  validateRequest(BookingValidation.adjustSchedules),
  BookingController.adjustSchedules
);

router.get(
  '/my-booking',
  auth(ENUMS_USER_ROLE.USER),
  BookingController.getMyBookings
);

router.get(
  '/',
  auth(ENUMS_USER_ROLE.SUPER_ADMIN, ENUMS_USER_ROLE.ADMIN),
  BookingController.getBokings
);

router.get(
  '/:id',
  auth(
    ENUMS_USER_ROLE.SUPER_ADMIN,
    ENUMS_USER_ROLE.ADMIN,
    ENUMS_USER_ROLE.USER
  ),
  BookingController.getBooking
);

export const BookingRoutes = router;
