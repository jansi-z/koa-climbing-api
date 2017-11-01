const Route = require('../models/Route');

exports.getRoutes = async (ctx) => {
  const routes = await Route.find();
  if (!routes) {
    throw new Error('There was a problem fetching the routes :(');
  } else {
    ctx.body = { message: 'Here you go :)', routes: routes };
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

exports.findRoute = async (ctx) => {
  const { id } = ctx.params;
  const route = await Route.findById(id);

  if(!route) {
    ctx.body = {
      error: 'Could not find the route you\'re looking for :('
    };
  }else{
    ctx.body = {
      data: route
    };
  }
};

exports.removeRoute = async (ctx) => {
  const { id } = ctx.params;
  const result = await Route.findOneAndRemove(id);

  if(!result) {
    ctx.body = {
      error: 'Could not remove that route :('
    };
  }else{
    ctx.status = 200;
    ctx.body = result;
  }
};
