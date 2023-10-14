import express from 'express';
import auth from '../../middlewares/auth';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequestHandler';
import { FAQValidation } from './FAQ.validation';
import { FAQController } from './FAQ.controller';
const router = express.Router();

router.post(
  '/',
  auth(ENUMS_USER_ROLE.ADMIN),
  validateRequest(FAQValidation.createFAQ),
  FAQController.createFAQ
);

router.patch(
  '/:id',
  auth(ENUMS_USER_ROLE.ADMIN),
  validateRequest(FAQValidation.updateFAQ),
  FAQController.updateFAQ
);

router.delete('/:id', auth(ENUMS_USER_ROLE.ADMIN), FAQController.deleteFAQ);

router.get('/:id', FAQController.getFAQ);

router.get('/', FAQController.getFAQs);

export const FAQRoutes = router;
