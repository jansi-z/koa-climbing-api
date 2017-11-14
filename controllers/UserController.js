const User = require('../models/User');

// Async function for creating new user

function createNewUser(email, password) {
  return new Promise((resolve, reject) => {
    return User.register(new User({ email: email }), password, (err, user) => {
      return err ? reject(err) : resolve(user);
    });
  });
}

exports.createUser = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;

    const user = await createNewUser(email, password);

    ctx.body = user.email;

  } catch(error) {
    throw new Error(error);
  }
};
