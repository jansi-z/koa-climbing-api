const Route = require('../models/Route');

function deleteRoute(routeId, userId) {
  return new Promise((resolve, reject) => {
    Route.findById(routeId)
      .then((route) => {
        if (route.author.toString() === userId.toString()) {
          Route.findOneAndRemove({ _id: route._id })
            .then((result) => {
              return resolve(result);
            })
            .catch((error) => {
              return reject(error);
            });
        } else {
          return reject('Not authorised');
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
    throw new Error(error);
  }
};

exports.createRoute = async (ctx) => {
  const routeData = { ...ctx.request.body, author: ctx.state.account._id };
  const result = await Route.create(routeData);

  if (!result) {
    throw new Error('There was a problem creating your route :(');
  } else {
    ctx.body = {
      message: 'Route created :D',
      route: result
    };
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
    result ? ctx.body = result : ctx.throw(new Error('Could not remove that route'));
  } catch(error) {
    throw new Error(error);
  }
};
