const Router = require('koa-better-router');
const climbingRoute = require('./controllers/RouteController');

const router = Router().loadMethods();

router.get('/routes', climbingRoute.getRoutes);
router.get('/routes/:id', climbingRoute.findRoute);
router.post('/routes/new', climbingRoute.createRoute);
router.del('/routes/:id', climbingRoute.removeRoute);

module.exports = router;
