import { IRoute } from '../../interfaces/route';
import { UserRoutes } from '../modules/user/user.route';

const modulesRoutes: IRoute[] = [
  {
    path: '/users',
    route: UserRoutes,
  },
];

export default modulesRoutes;
