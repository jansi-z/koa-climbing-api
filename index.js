// Configures the environment variables.
require('dotenv').config();
// To set them yourself, create a file called '.env' in the root folder.
// Simply define the environment variables there: MONGO_URL=/path/to/your/mongodb:etcetera

const Koa = require('koa');
const app = new Koa;
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const KoaRes = require('koa-res');
const convert = require('koa-convert');
const router = require('./routes');
const passport = require('./authentication');

// MongoDB config:

mongoose.Promise = bluebird;

mongoose
  .connection.openUri(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB :)');         //eslint-disable-line no-console
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB :(');  //eslint-disable-line no-console
    console.log(error);                             //eslint-disable-line no-console
  });

// Logger:
app.use(logger());
// Bodyparser:
app.use(bodyParser());
// Convert Response to JSON:
app.use(convert(KoaRes()));
// Use router:
app.use(router.middleware());
// Use authentication:
app.use(passport.initialize());
// Error catcher:
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.listen(process.env.HOST_PORT);
