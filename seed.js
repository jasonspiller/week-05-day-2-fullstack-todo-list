// seeds our database for testing purposes
const db = require('./models');

const todo_list = [
  {
    text: 'This is a Todo'
  },
	{
    text: 'This is another Todo',
		isDone: true
  },
	{
		text: 'This is yet another Todo'
	},
	{
		text: 'Okay, how many Todos do we need'
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
