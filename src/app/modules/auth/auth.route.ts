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

export const AuthRoutes = router;
