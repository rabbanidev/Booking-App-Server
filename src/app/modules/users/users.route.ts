import express from 'express';
import { AllUsersController } from './users.controller';
import auth from '../../middlewares/auth';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequestHandler';
import { AllUsersValidation } from './users.validation';

const router = express.Router();

router.post(
  '/create-super-admin',
  auth(ENUMS_USER_ROLE.SUPER_ADMIN),
  validateRequest(AllUsersValidation.createSuperAdmin),
  AllUsersController.createSuperAdmin
);

router.post(
  '/create-admin',
  auth(ENUMS_USER_ROLE.SUPER_ADMIN),
  validateRequest(AllUsersValidation.createAdmin),
  AllUsersController.createAdmin
);

export const AllUsersRoutes = router;
