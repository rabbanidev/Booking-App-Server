import express from 'express';
import auth from '../../middlewares/auth';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequestHandler';
import { ServiceManagmentValidation } from './serviceManagment.validation';
import { ServiceManagmentController } from './serviceManagment.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUMS_USER_ROLE.ADMIN),
  validateRequest(ServiceManagmentValidation.createService),
  ServiceManagmentController.createService
);

router.patch(
  '/:id',
  auth(ENUMS_USER_ROLE.ADMIN),
  validateRequest(ServiceManagmentValidation.updateService),
  ServiceManagmentController.updateService
);

router.delete(
  '/:id',
  auth(ENUMS_USER_ROLE.ADMIN),
  ServiceManagmentController.deleteService
);

router.get('/:id', ServiceManagmentController.getService);

router.get('/', ServiceManagmentController.getServices);

export const ServiceManagmentRoutes = router;
