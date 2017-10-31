const Koa = require('koa');
const app = new Koa;
const mongoose = require('mongoose');
const bluebird = require('bluebird');

// MongoDB config:

mongoose.Promise = bluebird;

mongoose
  .connect('mongodb://localhost:27017/koa_climbing_app')
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

app.use(async ctx => {
  ctx.body = 'Hello world!';
});

app.listen(3000);
