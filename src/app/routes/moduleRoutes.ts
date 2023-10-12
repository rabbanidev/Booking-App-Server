import { IRoute } from '../../interfaces/route';
import { AuthRoutes } from '../modules/auth/auth.route';
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
];

export default modulesRoutes;
