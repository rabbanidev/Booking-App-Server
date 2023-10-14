import express from 'express';
import auth from '../../middlewares/auth';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequestHandler';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUMS_USER_ROLE.ADMIN),
  validateRequest(BlogValidation.createBlog),
  BlogController.createBlog
);

router.patch(
  '/:id',
  auth(ENUMS_USER_ROLE.ADMIN),
  validateRequest(BlogValidation.updateBlog),
  BlogController.updateBlog
);

router.delete('/:id', auth(ENUMS_USER_ROLE.ADMIN), BlogController.deleteBlog);

router.get('/:id', BlogController.getBlog);

router.get('/', BlogController.getBlogs);

export const BlogRoutes = router;
