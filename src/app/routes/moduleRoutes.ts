import { IRoute } from '../../interfaces/route';
import { FAQRoutes } from '../modules/FAQ/FAQ.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { CartRoutes } from '../modules/cart/cart.route';
import { FeedbackRoutes } from '../modules/feedback/feedback.route';
import { NewsRoutes } from '../modules/news/news.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { ServiceManagmentRoutes } from '../modules/service/service.route';
import { SuperAdminRoutes } from '../modules/superAdmin/superAdmin.route';
import { UserRoutes } from '../modules/user/user.route';
import { UserManagementRoutes } from '../modules/userManagment/userManagment.route';
import { AllUsersRoutes } from '../modules/users/users.route';

const modulesRoutes: IRoute[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: AllUsersRoutes,
  },
  {
    path: '/super-admins',
    route: SuperAdminRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
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
  {
    path: '/carts',
    route: CartRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/feedbacks',
    route: FeedbackRoutes,
  },
];

export default modulesRoutes;
