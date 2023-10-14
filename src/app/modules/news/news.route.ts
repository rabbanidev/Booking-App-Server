import express from 'express';
import auth from '../../middlewares/auth';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequestHandler';
import { NewsValidation } from './news.validation';
import { NewsController } from './news.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUMS_USER_ROLE.ADMIN),
  validateRequest(NewsValidation.createNews),
  NewsController.createNews
);

router.patch(
  '/:id',
  auth(ENUMS_USER_ROLE.ADMIN),
  validateRequest(NewsValidation.updateNews),
  NewsController.updateNews
);

router.delete('/:id', auth(ENUMS_USER_ROLE.ADMIN), NewsController.deleteNews);

router.get('/:id', NewsController.getNewses);

router.get('/', NewsController.getNews);

export const NewsRoutes = router;
