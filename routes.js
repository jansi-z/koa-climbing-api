const Router = require('koa-better-router');
const climbingRoute = require('./controllers/RouteController');
const user = require('./controllers/UserController');
const passport = require('./config/authentication');

const router = Router().loadMethods();

// Routes for users
router.post('/users', user.createUser);
router.get('/users/me', passport.authorize('jwt', { session: false }), user.getCurrentUser);
router.post('/sessions', passport.authenticate('local'), user.signIn);

// Routes for routes
router.get('/routes', climbingRoute.getRoutes);
router.post('/routes', passport.authorize('jwt', { session: false }), climbingRoute.createRoute);
router.get('/routes/:id', climbingRoute.findRoute);
router.patch('/routes/:id', passport.authorize('jwt', { session: false}), climbingRoute.updateRoute);
router.del('/routes/:id', passport.authorize('jwt', { session: false }), climbingRoute.removeRoute);

module.exports = router;
