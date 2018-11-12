const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const staticAsset = require('static-asset');
const mongoose = require('mongoose');
const config = require('./config');

// database
mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION);

mongoose.connection
  .on('error', error => console.log(error))
  .on('close', () => console.log('Database connection closed.'))
  .once('open', () => {
    const info = mongoose.connections[0];
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  });

mongoose.connect(
  config.MONGO_URL,
  { useMongoClient: true });

// const Post = require('./models/post');
// express
const app = express();

// sets and uses
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/javascripts',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);

// routers
app.get('/', (req, res) => {
  // Post.find({})
  //   .then(posts => {
  res.render('index');
  // })
  // .catch(err => {
  //   res.sratus(200).json({ err: err });
  // });
});

// app.get('/create', (req, res) => res.render('create'));
// app.post('/create', (req, res) => {
//   //arr.push(req.body.text);
//   const { title, body } = req.body;

//   Post.create({
//     title: title,
//     body: body
//   }).then(post => console.log(post.id));
//   res.redirect('/');
//   console.log(req.body);
// });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error', {
    message: error.message,
    error: !config.IS_PRODUCTION ? error : {},
    title: 'Oops...'
  });
});

app.listen(config.PORT, () =>
  console.log(`Example app listening on part ${config.PORT}!`)
);
