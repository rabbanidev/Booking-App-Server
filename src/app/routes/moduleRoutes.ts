import { IRoute } from '../../interfaces/route';
import { FAQRoutes } from '../modules/FAQ/FAQ.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { NewsRoutes } from '../modules/news/news.route';
import { ServiceManagmentRoutes } from '../modules/service/service.route';
import { UserManagementRoutes } from '../modules/userManagment/userManagment.route';
import { AllUsersRoutes } from '../modules/users/users.route';

const modulesRoutes: IRoute[] = [
  {
    path: '/users',
    route: AllUsersRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user-managments',
    route: UserManagementRoutes,
  },
  {
    path: '/services',
    route: ServiceManagmentRoutes,
  },
  {
    path: '/faqs',
    route: FAQRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/news',
    route: NewsRoutes,
  },
];

export default modulesRoutes;
