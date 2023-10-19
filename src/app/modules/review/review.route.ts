import express from 'express';
import auth from '../../middlewares/auth';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequestHandler';
import { ReviewValidation } from './review.validation';
import { ReviewController } from './review.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUMS_USER_ROLE.USER),
  validateRequest(ReviewValidation.createReview),
  ReviewController.createReview
);

router.get('/:id', ReviewController.getReviewsByService);

router.get('/', ReviewController.getReviews);

export const ReviewRoutes = router;
