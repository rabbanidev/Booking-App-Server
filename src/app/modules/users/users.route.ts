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

router.post(
  '/create-user',
  auth(ENUMS_USER_ROLE.ADMIN),
  validateRequest(AllUsersValidation.createUser),
  AllUsersController.createUser
);

router.patch(
  '/:id',
  auth(ENUMS_USER_ROLE.SUPER_ADMIN),
  validateRequest(AllUsersValidation.updateUserRole),
  AllUsersController.updateUserRole
);

router.get(
  '/',
  auth(ENUMS_USER_ROLE.SUPER_ADMIN),
  AllUsersController.getAllUsers
);

export const AllUsersRoutes = router;
