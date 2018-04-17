// create schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	id: Number,
	todo: String,
 });

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
