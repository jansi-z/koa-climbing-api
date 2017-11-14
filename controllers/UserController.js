const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwt');

// Async function for creating new user

function createNewUser(email, password) {
  return new Promise((resolve, reject) => {
    return User.register(new User({ email: email }), password, (err, user) => {
      return err ? reject(err) : resolve(user);
    });
  });
}

// Async function for signing in

function authenticateUser(idObject) {
  return new Promise((resolve, reject) => {
    const result = jwt.sign(idObject, jwtOptions.secretOrKey);
    return result ? resolve(result) : reject({ message: 'Could not sign in for some reason :('});
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

exports.signIn = async (ctx) => {
  try {
    const idObject = { id: ctx.state.account._id };
    const token = await authenticateUser(idObject);

    ctx.body = token;

  } catch(error) {
    throw new Error(error);
  }
};

exports.getCurrentUser = async (ctx) => {
  try {
    const user = ctx.state.account;
    ctx.body = user;
  } catch(error) {
    throw new Error(error);
  }
};
