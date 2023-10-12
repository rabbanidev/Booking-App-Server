import { IRoute } from '../../interfaces/route';
import { AuthRoutes } from '../modules/auth/auth.route';
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
];

export default modulesRoutes;
