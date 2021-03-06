var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var os = require('os');

var cpus = os.cpus();

var indexRouter = require('./routes/index');

var postsRouter = require('./routes/posts');

var connectDB = require('./config/db');


var app = express();

connectDB();

const createReadStream = require('fs').createReadStream;
const createWriteStream = require('fs').createWriteStream;
const csvjson = require('csvjson');
const toObject = csvjson.stream.toObject();
const stringify = csvjson.stream.stringify();
// createReadStream('./test-data.csv', 'utf-8')
//     .pipe(toObject)
//     .pipe(stringify)
//     .pipe(createWriteStream('./test-data-output-stream.json'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/posts', postsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

for(var i = 0, len = cpus.length; i < len; i++) {
  console.log("CPU %s:", i);
  var cpu = cpus[i], total = 0;

  for(var type in cpu.times) {
      total += cpu.times[type];
  }

  for(type in cpu.times) {
      console.log("\t", type, Math.round(100 * cpu.times[type] / total));
  }
}


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
