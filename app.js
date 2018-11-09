const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// const Post = require('./models/post');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/javascripts',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);

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

module.exports = app;
