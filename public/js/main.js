console.log('Hello Dave.');

let $todoList,
		arrTodos = [];

$(function() {

	$todoList = $('#todoList');

	$.ajax({
		method: 'GET',
		url: '/todos',
		success: handleSuccess,
		error: handleError
	});

});

function outputTodoHTML(todo) {

	let strIcon = 'fa-square',
			strDone = '';

	// determine if item is marked done and add class and change icon accordingly
	if (todo.isDone) {
		strIcon = 'fa-check-square';
		strDone = 'done';
	}

  return `<li class="todo">
						<div class="checkbox"><i class="far ${strIcon} fa-2x"></i></div>
						<input type="text" class="todo-content disabled ${strDone}" value="${todo.text}">
						<div class="delete"><i class="fas fa-window-close fa-2x"></i></div>
					</li>`
}


function outputAllTodoHTML(todos) {
  return todos.map(outputTodoHTML).join("");
}

function render() {

  // empty Todo list
  $todoList.empty();

  // pass `allBooks` into the template function
  let strTodosHTML = outputAllTodoHTML(arrTodos);

  // append html to the view
  $todoList.append(strTodosHTML);
};

function handleSuccess(json) {
  arrTodos = json;
  render();
}

function handleError(e) {
  console.log('AJAX Error');
  $('$todoList').text('Failed to load your Todos');
}

//
$('.create').on('click', function(e) {
	e.preventDefault();

});


const newTodo = (obj) => {
	// ensure there is text entered
	if (obj.val() !== '') {

		console.log(obj.serialize());

		$.ajax({
			method: 'POST',
			url: '/todos',
			data: obj.serialize(),
			success: newTodoSuccess,
			error: newTodoError
		});

		// reset error message
		if ($('#msg').hasClass('error')) {
			$('#msg')
				.removeClass('error')
				.text('What would you like Todo?');
		}

		// clear text from input
		//$('#todo').val('');

	} else {
		$('#msg')
			.addClass('error')
			.text('Try entering a Todo first');
	}
}

function newTodoSuccess(json) {
//  $('#newTodoForm input').val('');
  arrTodos.push(json);
  render();
}

function newTodoError() {
  console.log('New Todo Error');
}

// add the event listeners
$('#frmTodo').on('submit', function(e) {
  e.preventDefault();
	newTodo($('#todo'));
});


/*

const doneTodo = (ele) => {
	// check to see if box is "checked" and toggle accordingly
	if (ele.find('svg').hasClass('fa-square')) {

		// toggle icon and strikethought text
		ele
			.empty()
			.append('<i class="far fa-check-square fa-2x"></i>')
			.next('.todo-content')
			.addClass('done');
			let todoMatched = $(arrTodos).filter(function(){
					return this.todoText === ele.next('.todo-content').val();
			});

			// reverse array to match todo list order
			arrTodos.reverse();

			// find each todo that is maked as done
			$.each($('.checkbox'), function (i,val) {
				if($(val).next('.todo-content').hasClass('done')) {
					arrTodos[i].todoDone = true;
				}
			});

			// update localStorage
			localStorage.setItem('todo', JSON.stringify(arrTodos.reverse()));

	} else {

		// toggle icon and remove striketrough
		ele
			.empty()
			.append('<i class="far fa-square fa-2x"></i>')
			.next('.todo-content')
			.removeClass('done');

			// reverse array to match todo list
			arrTodos.reverse();

			// find each todo that is maked as done
			$.each($('.checkbox'), function (i,val) {
				if(!$(val).next('.todo-content').hasClass('done')) {
					arrTodos[i].todoDone = false;
				}
			});

			// update localStorage
			localStorage.setItem('todo', JSON.stringify(arrTodos.reverse()));
	}
}

const editTodo = (ele) => {
	ele
		.removeClass('disabled')
		.next('.delete')
		.empty()
		.append('<i class="fas fa-check-square fa-2x"></i>')
		.addClass('save')
		.removeClass('delete');
}

const saveTodo = (ele) => {
	ele
		.addClass('delete')
		.removeClass ('save')
		.empty()
		.append('<i class="fas fa-window-close fa-2x"></i>')
		.prev('.todo-content')
		.addClass('disabled')
		.prev('.todo-content');

		// reverse array to match todo list
		arrTodos.reverse();

		// find each todo that is maked as done
		$.each($('.todo-content'), function (i,ele) {
			arrTodos[i].todoText = $(ele).val();
		});

		// update localStorage
		localStorage.setItem('todo', JSON.stringify(arrTodos.reverse()));
}

const deleteTodo = (ele) => {

	ele.parent().addClass('todoToDelete')

	// reverse array to match todo list
	arrTodos.reverse();

	// iterate over todos to determine if one has been marked for deletion
	$.each($('.todo'), function (i,ele) {

		if ($(ele).hasClass('todoToDelete')) {
			// remove todo from array
			arrTodos.splice(i,1);
		}
	});

	// update localStorage
	localStorage.setItem('todo', JSON.stringify(arrTodos.reverse()));

	// remove from interface
	ele.parent().remove();
}





// completed checkbox
$('#todoList').on('click', '.checkbox', function() {
	doneTodo($(this));
})

// edit todo
$('#todoList').on('click', '.disabled', function() {
	editTodo($(this));
})

// save todo
$('#todoList').on('click', '.save', function() {
	saveTodo($(this));
})

// delete todo
$('#todoList').on('click', '.delete', function() {
	deleteTodo($(this));
})

*/
