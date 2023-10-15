import express from 'express';
import auth from '../../middlewares/auth';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequestHandler';
import { CartValidation } from './cart.validation';
import { CartController } from './cart.controller';

const router = express.Router();

router.post(
  '/add-to-cart',
  auth(ENUMS_USER_ROLE.USER),
  validateRequest(CartValidation.addToCart),
  CartController.addToCart
);

router.delete(
  '/:id',
  auth(ENUMS_USER_ROLE.USER),
  CartController.removeFromCart
);

router.get('/', auth(ENUMS_USER_ROLE.USER), CartController.myCarts);

export const CartRoutes = router;
