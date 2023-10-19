import express from 'express';
import auth from '../../middlewares/auth';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequestHandler';
import { FeedbackValidation } from './feedback.validation';
import { FeedBackController } from './feedback.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(FeedbackValidation.createFeedback),
  FeedBackController.createFeedBack
);

router.get(
  '/',
  auth(ENUMS_USER_ROLE.SUPER_ADMIN, ENUMS_USER_ROLE.ADMIN),
  FeedBackController.getFeedBacks
);

export const FeedbackRoutes = router;
