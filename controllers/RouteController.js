const Route = require('../models/Route');

function deleteRoute(routeId, userId) {
  return new Promise((resolve, reject) => {
    return Route.findById(routeId)
      .then((route) => {
        if (route.author.toString() === userId.toString()) {
          return Route.findOneAndRemove({ _id: route._id })
            .then((result) => {
              return resolve(result);
            })
            .catch((error) => {
              return reject(error);
            });
        } else {
          return reject(new Error('You are not the author of the route'));
        }
      })
      .catch((error) => {
        return reject(error);
      });
  });
}

exports.getRoutes = async (ctx) => {
  try {
    const routes = await Route.find();
    ctx.body = routes;
  } catch(error) {
    ctx.throw(error);
  }
};

exports.createRoute = async (ctx) => {
  try {
    const routeData = { ...ctx.request.body, author: ctx.state.account._id };
    const newRoute = await Route.create(routeData);
    ctx.body = newRoute;
  } catch(error) {
    ctx.throw(422, error.message);
  }
};

exports.findRoute = async (ctx) => {
  try {
    const { id } = ctx.params;
    const route = await Route.findById(id);
    route ? ctx.body = route : ctx.throw(404, 'Oops, that route could not be found');
  } catch(error) {
    ctx.throw(404, 'Oops, that route could not be found');
  }
};

exports.removeRoute = async (ctx) => {
  try {
    const routeId = ctx.params.id;
    const userId = ctx.state.account._id;
    const result = await deleteRoute(routeId, userId);
    ctx.body = result;
  } catch(error) {
    throw new Error(error);
  }
};
