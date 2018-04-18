// create schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	text: String,
	isDone: { type: Boolean, default: false }
 });

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
