import { IRoute } from '../../interfaces/route';
import { AllUsersRoutes } from '../modules/users/users.route';

const modulesRoutes: IRoute[] = [
  {
    path: '/users',
    route: AllUsersRoutes,
  },
];

export default modulesRoutes;
