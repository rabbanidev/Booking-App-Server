import express from 'express';
import auth from '../../middlewares/auth';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequestHandler';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';

const router = express.Router();

router.patch(
  '/update-profile',
  auth(ENUMS_USER_ROLE.USER),
  validateRequest(UserValidation.updateProfile),
  UserController.updateProfile
);

export const UserRoutes = router;
