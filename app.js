const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const { expressjwt } = require('express-jwt'); 
const config = require('config');
const i18n = require('i18n');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const directorsRouter = require('./routes/directors');
const actorsRouter = require('./routes/actors');
const genresRouter = require('./routes/genres');
const membersRouter = require('./routes/members');
const moviesRouter = require('./routes/movies');
const bookingsRouter = require('./routes/bookings');
const copiesRouter = require('./routes/copies');
const awaitListsRouter = require('./routes/awaitLists');


const JwtKey = config.get("secret.key");

const app = express();

// mongodb://<dbUser>?:<dbPass>?@<url>:<port>/<dbName>
const url = "mongodb://localhost:27017/video-club";
mongoose.connect(url);
const db = mongoose.connection;
db.on('open',()=>{
  console.log("Conexión OK");
});

db.on('error',()=>{
  console.log("NO se ha podido conectar");
});

i18n.configure({
  locales: ['es','en'],
  cookie: 'language',
  directory: `${__dirname}/locales`
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init); //le pasamos la función pero no la ejecutamos
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressjwt({secret:JwtKey, algorithms:['HS256']})
  .unless({path:["/login"]}));

  //middlewares de enrutamiento
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/directors', directorsRouter);
app.use('/actors', actorsRouter);
app.use('/genres', genresRouter);
app.use('/members', membersRouter);
app.use('/movies', moviesRouter);
app.use('/bookings', bookingsRouter);
app.use('/copies', copiesRouter);
app.use('/awaitLists', awaitListsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
