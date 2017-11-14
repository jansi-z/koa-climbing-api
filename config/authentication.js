const passport = require('koa-passport');
// const mongoose = require('mongoose');
const passportJWT = require('passport-jwt');
const User = require('../models/User');
const jwtOptions = require('./jwt');

const JwtStrategy = passportJWT.Strategy;

const tokenStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id);
    user ? done(null, user) : done(null, false);
  } catch(error) {
    done(error, false);
  }
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(tokenStrategy);

module.exports = passport;
