import express from 'express';
import auth from '../../middlewares/auth';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequestHandler';
import { UserManagementController } from './userManagment.controller';
import { UserManagmentValidation } from './userManagment.validation';
const router = express.Router();

router.patch(
  '/manage-account/:id',
  auth(ENUMS_USER_ROLE.ADMIN),
  UserManagementController.manageUserAccount
);

router.patch(
  '/:id',
  auth(ENUMS_USER_ROLE.ADMIN),
  validateRequest(UserManagmentValidation.updateUser),
  UserManagementController.updateUser
);

export const UserManagementRoutes = router;
