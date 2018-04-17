// seeds our database for testing purposes
const db = require('./models');

const todo_list = [
  {
		id: 1,
    todo: 'This is a Todo'
  },
	{
		id: 2,
    todo: 'This is another Todo'
  },
	{
		id: 3,
		todo: 'This is yet another Todo'
	},
	{
		id: 4,
		todo: 'Okay, how many Todos do we need'
	}
];

// remove all records
db.Todo.remove({}, function(err, todos){

  if(err) {
    console.log('Remove error: ', err);

  } else {
    console.log('Removed all Todos');

    // create new records
    db.Todo.create(todo_list, function(err, todos){

      if(err) {
				return console.log('Create error: ', err);
			}

      console.log('Todos created: ', todos.length, 'todos');
      process.exit();
    });
  }
});
