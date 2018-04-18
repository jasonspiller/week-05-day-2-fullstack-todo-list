console.log('Hello Dave.');

$(function() {

	// get output element
	let $todoList = $('#todoList');
	let	arrTodos = [];

	// get all the todos in the database
	$.ajax({
		method: 'GET',
		url: '/todos',
		success: handleSuccess,
		error: handleError
	});


	// render list of todos to the view
	const render = () => {

	  // empty Todo list
	  $todoList.empty();

	  // reverse the array and pass it to the output function
	  let strTodosHTML = outputAllTodosHTML(arrTodos);

	  // append html to the view
	  $todoList.append(strTodosHTML);
	};


	// output a single todo
	const outputTodoHTML = (todo) => {

		let strIcon = 'fa-square';
		let strDone = '';

		// determine if item is marked done and add class and change icon accordingly
		if (todo.isDone) {
			strIcon = 'fa-check-square';
			strDone = 'done';
		}

	  return `<li class="todo">
							<div class="checkbox"><i class="far ${strIcon} fa-2x"></i></div>
							<input type="text" class="todo-content disabled ${strDone}" value="${todo.text}" data-id="${todo.text}">
							<div class="delete"><i class="fas fa-window-close fa-2x"></i></div>
						</li>`
	}

	// output all todos
	const outputAllTodosHTML = (todos) => {
	  return todos.map(outputTodoHTML).join("");
	}

	// handle successful ajax call (ES6 func call erroring, using ES5 to fix)
	function handleSuccess(json) {
	  arrTodos = json;

		// reverse array to make newest on top
		arrTodos.reverse()
		render();
	}

	// handle an ajax error (ES6 func call erroring, using ES5 to fix)
	function handleError(e) {
	  console.log('AJAX Error');
	  $('$todoList').text('Failed to load your Todos');
	}


	// create a new todo
	const newTodo = (obj) => {

		// ensure there is text entered
		if (obj.val() !== '') {

			$.ajax({
				method: 'POST',
				url: '/todos',
				data: obj.serialize(),
				success: newTodoSuccess,
				error: newTodoError
			});
		} else {
			$('#msg')
				.addClass('error')
				.text('Try entering a Todo first');
		}
	}

	// handle a completed create
	const newTodoSuccess = (json) => {

		// reset error message
		if ($('#msg').hasClass('error')) {
			$('#msg')
				.removeClass('error')
				.text('What would you like Todo?');
		}

		// clear text from input
		$('#todo').val('');

		// add todo to the array that display in the view
	  arrTodos.unshift(json);

	  render();
	}

	// handle a create error
	const newTodoError = (e) => {
	  console.log('New Todo Error: ' + e);
	}

	// create event listner
	$('#frmTodo').on('submit', function(e) {
	  e.preventDefault();
		newTodo($('#todo'));
	});


	// delete todo
	const deleteTodo = (ele) => {

		$.ajax({
			method: 'DELETE',
			url: '/todos/' + ele.prev('input').attr('data-id'),
			success: deleteTodoSuccess,
			error: deleteTodoError
		});
	}

	function deleteTodoSuccess(json) {

		// get input using text key value from json
		let ele = $(`input[data-id='${json.text}']`);

		// mark the item to be deleted
		ele.parent().addClass('todoToDelete')

		// iterate over todos to determine which one has been marked for deletion
		$.each($('.todo'), function (i,ele) {

			if ($(ele).hasClass('todoToDelete')) {
				// remove todo from array
				arrTodos.splice(i,1);
			}
		});

	  render();
	}

	function deleteTodoError(e) {
	  console.log('New Todo Error: ' + e);
	}

	// create event listner
	$('#todoList').on('click', '.delete', function() {
		deleteTodo($(this));
	})


	// mark a Todo as done
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
		}
	}

	// completed checkbox
	$('#todoList').on('click', '.checkbox', function() {
		doneTodo($(this));
	})


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
	}


	// edit todo
	$('#todoList').on('click', '.disabled', function() {
		editTodo($(this));
	})

	// save todo
	$('#todoList').on('click', '.save', function() {
		saveTodo($(this));
	})

});
