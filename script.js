const chk = document.getElementById('chk');
const date = new Date();
const format = { weekday: "long", month: "short", day: "numeric" };
const taskContainer =document.querySelector('.tasks-container')
const taskInput=document.querySelector('.task-input')
const addBoutton = document.querySelector('.task-boutton')

let text = date.toLocaleDateString("English", format);
document.getElementById("date").textContent = text;

chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
});

addBoutton.onclick = function (e){
    e.preventDefault()
    if(taskInput.value){
        saveToLocalStorge(taskInput.value)
        taskInput.value=""
    }
}
function saveToLocalStorge(taskContent){
    const task ={
        id : Date.now() ,
        title: taskContent ,
        completed: false ,
    };
    let todos ;
    if(localStorage.getItem('todos')==null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(task)
    localStorage.setItem('todos',JSON.stringify(todos))
    console.log(todos)
}