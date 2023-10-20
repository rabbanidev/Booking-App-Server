"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FAQ_route_1 = require("../modules/FAQ/FAQ.route");
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blog/blog.route");
const booking_route_1 = require("../modules/booking/booking.route");
const cart_route_1 = require("../modules/cart/cart.route");
const feedback_route_1 = require("../modules/feedback/feedback.route");
const news_route_1 = require("../modules/news/news.route");
const review_route_1 = require("../modules/review/review.route");
const service_route_1 = require("../modules/service/service.route");
const superAdmin_route_1 = require("../modules/superAdmin/superAdmin.route");
const user_route_1 = require("../modules/user/user.route");
const userManagment_route_1 = require("../modules/userManagment/userManagment.route");
const users_route_1 = require("../modules/users/users.route");
const modulesRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: users_route_1.AllUsersRoutes,
    },
    {
        path: '/super-admins',
        route: superAdmin_route_1.SuperAdminRoutes,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/user-managments',
        route: userManagment_route_1.UserManagementRoutes,
    },
    {
        path: '/services',
        route: service_route_1.ServiceManagmentRoutes,
    },
    {
        path: '/faqs',
        route: FAQ_route_1.FAQRoutes,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoutes,
    },
    {
        path: '/news',
        route: news_route_1.NewsRoutes,
    },
    {
        path: '/carts',
        route: cart_route_1.CartRoutes,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes,
    },
    {
        path: '/feedbacks',
        route: feedback_route_1.FeedbackRoutes,
    },
];
exports.default = modulesRoutes;
