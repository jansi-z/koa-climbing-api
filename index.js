const Koa = require('koa');
const app = new Koa;
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const KoaRes = require('koa-res');
const convert = require('koa-convert');

// MongoDB config:

mongoose.Promise = bluebird;

mongoose
  .connection.openUri('mongodb://localhost:27017/koa_climbing_app')
  .then(() => {
    console.log('Connected to MongoDB :)');         //eslint-disable-line no-console
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB :(');  //eslint-disable-line no-console
    console.log(error);                             //eslint-disable-line no-console
  });

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

// Logger:
app.use(logger());
// Bodyparser:
app.use(bodyParser());
// Convert Response to JSON:
app.use(convert(KoaRes()));

app.use(async ctx => {
  ctx.body = 'Hello world!';
});

app.listen(3000);
