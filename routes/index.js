const express = require('express'),
			db 			= require('../models'),
			router 	= express.Router();


// home page
router.get('/', function(req, res, next) {

	// get all todos
  db.Todo.find(function(err, todos){
    if (err) {
      console.log("DB error: " + err);
      res.sendStatus(500);
    }
		console.log(todos);
		res.render('index', {todos: todos});
  });
});


// catch all 404
router.get('*', (req, res) => {
	res.render('404', {});
});


module.exports = router;
