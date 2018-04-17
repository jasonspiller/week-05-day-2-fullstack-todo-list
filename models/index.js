const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todo");

// aggregate the models
module.exports.Todo = require("./todo");
