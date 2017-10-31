const Route = require('../models/Route');

exports.getRoutes = async (ctx) => {
  const routes = await Route.find({});
  if (!routes) {
    throw new Error('There was a problem fetching the routes :(');
  } else {
    ctx.body = routes;
  }
};

exports.createRoute = async (ctx) => {
  const { name, grade, colour, style, rope, date } = ctx.request.body;
  const result = await Route.create({
    name: name,
    grade: grade,
    colour: colour,
    style: style,
    rope: rope,
    date: date,
  });

  if (!result) {
    throw new Error('There was a problem creating your route :(');
  } else {
    ctx.body = {
      message: 'Route created :D',
      data: result
    };
  }
};
