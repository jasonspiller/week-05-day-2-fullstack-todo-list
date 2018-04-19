const express = require('express'),
			db 			= require('../models'),
			app 	= express.Router();


// mLab port assignment
//app.set('port', process.env.PORT || 3001)

// app.listen(app.get('port'), () => {
// 	console.log(`✅ PORT: ${app.get('port')} 🌟`)
// })


// home page
app.get('/', function(req, res) {
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
app.post('/todos', function(req, res) {

	db.Todo.create(req.body);
  res.json(req.body);
});

// delete todo (:text is the key)
app.delete('/todos/:text', function(req, res) {

	let objParams = req.params;

	db.Todo.findOneAndRemove(objParams, function(err, todos) {
		if (err) {
			console.log("Index Error: " + err);
			res.sendStatus(500);
		}
		res.json(objParams);
	});
});

// mark todo as done
app.put('/todos/:text', function(req, res) {

	let objBody = req.body;
	let objParams = req.params

  db.Todo.update(objParams, {$set: objBody}, function(err, result) {
    if(err){
			console.log("Index Error: " + err);
			res.sendStatus(500);
    }
    res.json(objParams);
  });
});

// update todo
app.put('/todos/update/:text', function(req, res) {

	let objBody = req.body;
	let objParams = req.params;

	console.log(objBody);
	console.log(objParams);

  db.Todo.update(objParams, {$set: objBody}, function(err, result) {
    if(err){
			console.log("Index Error: " + err);
			res.sendStatus(500);
    }
    res.json(objParams);
  });
});


// catch all 404
app.get('*', (req, res) => {
	res.render('404', {});
});


module.exports = app;
