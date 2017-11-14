/*

Creating a strong secret with Node:

1. Run Node
2. $ crypto.randomBytes(256).toString('hex')
3. Behold your awesome new secret

*/

const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET || 'verysecret'
};
