// setup dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const routes = require('./routes/index');
const app = express();


// setup views
app.set('views', './views');
app.set('view engine', 'ejs');


// setup logging, data, public, routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);


// setup port listener/server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Hello Dave.`);
});
