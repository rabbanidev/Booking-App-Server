import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequestHandler';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.login),
  AuthController.login
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshToken),
  AuthController.refreshToken
);

router.post(
  '/register',
  validateRequest(AuthValidation.register),
  AuthController.register
);

export const AuthRoutes = router;
