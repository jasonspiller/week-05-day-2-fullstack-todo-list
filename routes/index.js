var express = require('express');
var router = express.Router();


// home page
router.get('/', function(req, res, next) {
	let data = {title: 'Welcome!'};
	res.render('index', data);
});

// catch all 404
app.get('*', (req, res) => {
	res.render('404', {});
});


module.exports = router;
