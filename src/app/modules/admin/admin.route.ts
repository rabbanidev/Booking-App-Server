import express from 'express';
import auth from '../../middlewares/auth';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequestHandler';
import { AdminValidation } from './admin.validation';
import { AdminController } from './admin.controller';

const router = express.Router();

router.patch(
  '/update-profile',
  auth(ENUMS_USER_ROLE.ADMIN),
  validateRequest(AdminValidation.updateProfile),
  AdminController.updateProfile
);

export const AdminRoutes = router;
