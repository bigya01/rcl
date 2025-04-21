const todolist= [];

function addTodo(){
    let taskInputElement= document.querySelector('.todo-list');
    let dateInputElement= document.querySelector('.due-date');
    let task= taskInputElement.value;
    let dueDate= dateInputElement.value;
    todolist.push({
        task,      //shorthand property
        dueDate,
    });

    display();
    taskInputElement.value='';
    dateInputElement.value='';

}
function display(){
    let displayList= document.querySelector('.display-list');
    displayList.innerHTML = '';
    for (let i=0; i<todolist.length; i++){
        const {task,dueDate}= todolist[i] ;
        const listt = `<div>${task}</div>
        <div>${dueDate}</div>
        <button class="delete-btn" onclick="
        todolist.splice(${i},1);
        display();
        ">Delete</button>`;
        
        displayList.innerHTML+=listt;

    }

}