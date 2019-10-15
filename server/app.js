const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const app = express();
require('./database/mongoose');

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const {
  fakerRoute,
  authRoute,
  projectRoute,
  taskRoute
} = require('./routes');



app.use('/api/faker', fakerRoute);
app.use('/api/auth', authRoute);
app.use('/api/projects', projectRoute);
app.use('/api/tasks', taskRoute);



app.use(express.static('dist/rg-task-manager'));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'dist', 'rg-task-manager', 'index.html')));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
