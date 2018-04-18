const express = require('express'),
			db 			= require('../models'),
			app 	= express.Router();


// home page
app.get('/', function (req, res) {
  res.render('index');
});

// get all todos
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

// create new todo
app.post('/todos', function (req, res) {

  // create new todo from form data
  console.log('Todo created: ', req.body);

	db.Todo.create(req.body);
  res.json(req.body);
});



// catch all 404
app.get('*', (req, res) => {
	res.render('404', {});
});


module.exports = app;
