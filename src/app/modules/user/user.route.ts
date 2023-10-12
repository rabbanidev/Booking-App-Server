import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequestHandler';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-super-admin',
  auth(ENUMS_USER_ROLE.SUPER_ADMIN),
  validateRequest(UserValidation.createSuperAdmin),
  UserController.createSuperAdmin
);

router.post(
  '/create-admin',
  auth(ENUMS_USER_ROLE.SUPER_ADMIN),
  validateRequest(UserValidation.createAdmin),
  UserController.createAdmin
);

export const UserRoutes = router;
