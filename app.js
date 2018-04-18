// setup dependencies
const express = require('express'),
			path 		= require('path'),
			logger 	= require('morgan'),
			parser 	= require('body-parser'),
			routes 	= require('./routes/index'),
			app 		= express();


// setup views
app.set('views', './views');
app.set('view engine', 'ejs');


// setup logging, data, public, routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.urlencoded({ extended: true }));
app.use('/', routes);


// setup port listener/server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Hello Dave.`);
});
