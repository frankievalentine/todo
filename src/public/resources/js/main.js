// 4 features
// store all values in a data object that is globally acceptable
// save it in our local storage so we can close and reopen app
// add some simple styling when the lists were empty
// add event listener for enter keystroke

// database update
// removed local Storage data array and methods to update local storage
// connected our API to a mySQL database
// added functionality to getTasks, update Tasks and remove Tasks using
// XMLHTTP requests and JSON stringify


// parse JSON local data storage to become a JavaScript object
// var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
//   todo: [],
//   completed: []
// };

// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>'
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22" /><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z" /></g></svg>'

/*
Fetch all tasks from API and add them to the DOM
*/

getTasks((tasks) => {
  tasks.forEach((item) => {
    addItemToDOM(item, item.completed);
  });
});

// renderTodoList(); used for local storage

// add item when button is clicked
document.getElementById('add').addEventListener('click', function() {
  var value = document.getElementById('item').value;
  if (value) {
    addItem(value);
  }
});

// add item when Enter is pressed
document.getElementById('item').addEventListener('keydown', function (e) {
  var value = this.value;
  if (e.code === 'Enter' && value) {
    addItem(value);
  }
});

// add item
function addItem (value) {
  // reset value in placeholder once added
  document.getElementById('item').value = '';
  // API
  sendTaskToAPI(value, (item) => {
    addItemToDOM(item);
    // dataObjectUpdated(); local storage dataobject update no longer used
  });
}

// adds items from the data array to the DOM directly when the app is started
function renderTodoList() {
  /*
  Rewrite to use the API
  */
  
  // if (!data.todo.length && !data.completed.length) return;

  // // goes through data array and places item in DOM
  // for (var i = 0; i < data.todo.length; i++) {
  //   var value = data.todo[i];
  //   addItemToDOM(value);
  // }

  // for (var j = 0; j < data.completed.length; j++) {
  //   var value = data.completed[j];
  //   addItemToDOM(value, true);
  // }
}

  // set localStorage to JSON string so it can be added to the data array
  // function dataObjectUpdated () {
  //   localStorage.setItem('todoList', JSON.stringify(data));
  // }

function removeItem() {
  // parentNode of the item is the div
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var taskId = parseInt(item.getAttribute('data-id'));

  // splicing remove from the data array LocalStorage
  // if (id === "todo") {
  //   data.todo.splice(data.todo.indexOf(value), 1);
  // } else {
  //   data.completed.splice(data.completed.indexOf(value), 1);
  // }
  // dataObjectUpdated();

  var req = new XMLHttpRequest();
  req.open("POST", "/tasks/" + taskId + "/remove");
  req.setRequestHeader("Content-Type", "application/json");
  req.send();

  req.addEventListener("load", () => {
    var results = JSON.parse(req.responseText);
    if (results.error) return console.log(results.error);

    parent.removeChild(item);
  });

  req.addEventListener("error", () => {
    console.log("Damn, error.");
    console.log(e);
  });
}

function completeItem() {
  // parentNode of the item is the div
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id =  parent.id;
  var value = item.innerText;
  var taskId = parseInt(item.getAttribute("data-id"));

  // splicing completed and todo into data array LocalStorage
  // if (id === 'todo') {
  //   data.todo.splice(data.todo.indexOf(value), 1);
  //   data.completed.push(value);
  // } else {
  //   data.completed.splice(data.completed.indexOf(value), 1);
  //   data.todo.push(value);
  // }
  // dataObjectUpdated();

  // check if the item should be added to the completed list
  var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);

  var req = new XMLHttpRequest();
  req.open("POST", "/tasks/" + taskId + "/update");
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify({ completed: (id === 'todo') }));

  req.addEventListener("load", () => {
    var results = JSON.parse(req.responseText);
    if (results.error) return console.log(results.error);

    // parent.removeChild(item);
  });

  req.addEventListener("error", () => {
    console.log("Damn, error.");
    console.log(e);
  });
}

// adding and removing elements to the DOM
function addItemToDOM(task, completed) {
  // get todo ul
  var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');
  
  // make an li insert text to value
  var item = document.createElement('li');
  item.innerText = task.description;
  item.setAttribute('data-id', task.id);

  // make a div with class buttons
  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  // make a button add the class remove and add SVG HTML
  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  // add click event for removing item
  remove.addEventListener('click', removeItem);

  // make a button add class complete and add SVG HTML
  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;

  // add click event for completing the item
  complete.addEventListener("click", completeItem);

  // append both remove and complete elements to li
  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  // insert the newly created todos before the first child of ul
  list.insertBefore(item, list.childNodes[0]);
}

// Method for sending to-do item to API
function sendTaskToAPI(item, callback) {
  var req = new XMLHttpRequest();
  req.open('POST', '/tasks/add');
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify({ item: item }));

  req.addEventListener('load', () => {
    var results = JSON.parse(req.responseText);
    if (results.error) return console.log(results.error);

    if (callback) callback(results);
  });

  req.addEventListener('error', () => {
    console.log("Damn, error.");
    console.log(e);
  });
}

/*
Will fetch all tasks from API
*/
function getTasks(callback) {
  var req = new XMLHttpRequest();
  req.open('GET', '/tasks');
  req.send();

  req.addEventListener("load", () => {
    var results = JSON.parse(req.responseText);
    if (results.error) return console.log(results.error);

    if (callback) callback(results);
  });

  req.addEventListener("error", () => {
    console.log("Damn, error.");
    console.log(e);
  });
}