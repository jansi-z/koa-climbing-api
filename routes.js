const Router = require('koa-better-router');
const climbingRoute = require('./controllers/RouteController');
const user = require('./controllers/UserController');

const router = Router().loadMethods();

// Routes for users

router.post('/users', user.createUser);

// Routes for routes
router.get('/routes', climbingRoute.getRoutes);
router.get('/routes/:id', climbingRoute.findRoute);
router.post('/routes/new', climbingRoute.createRoute);
router.del('/routes/:id', climbingRoute.removeRoute);

module.exports = router;
