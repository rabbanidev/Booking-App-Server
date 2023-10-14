import express from 'express';
import auth from '../../middlewares/auth';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequestHandler';
import { SuperAdminValidation } from './superAdmin.validation';
import { SuperAdminController } from './superAdmin.controller';

const router = express.Router();

router.patch(
  '/update-profile',
  auth(ENUMS_USER_ROLE.SUPER_ADMIN),
  validateRequest(SuperAdminValidation.updateProfile),
  SuperAdminController.updateProfile
);

export const SuperAdminRoutes = router;
