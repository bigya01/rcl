const todolist = [];

document.querySelector(".add-todo-button").addEventListener("click", () => {
  addTodo();
});

function addTodo() {
  let taskInputElement = document.querySelector(".todo-list");
  let dateInputElement = document.querySelector(".due-date");
  let task = taskInputElement.value;
  let dueDate = dateInputElement.value;
  todolist.push({
    task, //shorthand property
    dueDate,
  });

  display();
  taskInputElement.value = "";
  dateInputElement.value = "";
}
function display() {
  let displayList = document.querySelector(".display-list");
  displayList.innerHTML = "";
  todolist.forEach((todoObject, index) => {
    const { task, dueDate } = todoObject;
    const listt = `
        <div>${task}</div>
        <div>${dueDate}</div>
        <button class="delete-btn">Delete</button>`;

    displayList.innerHTML += listt;
  });

  document.querySelectorAll(".delete-btn").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      todolist.splice(index, 1);
      display();
    });
  });
}
