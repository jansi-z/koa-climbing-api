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
router.get('/routes/:id', climbingRoute.findRoute);
router.post('/routes', passport.authorize('jwt', { session: false }), climbingRoute.createRoute);
router.del('/routes/:id', climbingRoute.removeRoute);

module.exports = router;
