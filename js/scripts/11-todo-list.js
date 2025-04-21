let todolist=[];

function addTodo(){
    let todos= document.querySelector('.todo-list');
    
    let todo= todos.value;
    todolist.push(todo);
    console.log(todolist);
    display();

    todos.value='';
}
function display(){
    let displayList= document.querySelector('.display-list');
    displayList.innerHTML = '';
    for (let i=0; i<todolist.length; i++){
        listt=`${todolist[i]}
        <button onclick="
        todolist.splice(${i},1);
        display();
        ">Delete </button><br>`;
        
        displayList.innerHTML+=listt;

    }

}