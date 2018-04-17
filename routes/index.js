const express = require('express'),
			db 			= require('../models'),
			app 	= express.Router();


// home page
app.get('/', function (req, res) {
  res.render('index');
});

// all todos
app.get('/todos', function(req, res, next) {

	// get all todos
  db.Todo.find(function(err, todos){
    if (err) {
      console.log("DB error: " + err);
      res.sendStatus(500);
    }
		console.log(todos);
		res.json(todos);
  });
});


// catch all 404
app.get('*', (req, res) => {
	res.render('404', {});
});


module.exports = app;
