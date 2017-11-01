const Router = require('koa-better-router');
const climbingRoute = require('./controllers/RouteController');

const router = Router().loadMethods();

router.get('/routes', climbingRoute.getRoutes);

router.post('/routes/new', climbingRoute.createRoute);

module.exports = router;
