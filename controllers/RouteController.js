const Route = require('../models/Route');

exports.getRoutes = async (ctx) => {
  try {
    const routes = await Route.find();
    ctx.body = routes;
  } catch(error) {
    throw new Error(error);
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
  try {
    const { id } = ctx.params;
    const route = await Route.findById(id);
    ctx.body = route;
  } catch(error) {
    throw new Error(error);
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
