const chk = document.getElementById('chk');
const date = new Date();
const format = { weekday: "long", month: "short", day: "numeric" };
const taskContainer =document.querySelector('.todo-list')
const taskInput=document.querySelector('.task-input')
const addBoutton = document.querySelector('.Add-boutton')

let text = date.toLocaleDateString("English", format);
document.getElementById("date").textContent = text;

chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
});
getData();

addBoutton.onclick = function (){
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


function AddTasks(todos){
    todos.forEach(task => {
        let taskdiv = document.createElement('div') 
        taskdiv.setAttribute("class","task")
        taskdiv.setAttribute("task-id",task.id)

        taskContainer.appendChild(taskdiv)
        let taskItem = document.createElement('li')

        let check = document.createElement('input')
        check.type="checkbox"
        check.classList.add("checkbox")

        // if(task.completed){
        //     check.classList.add("fa","fa-check-circle")
        //     taskItem.classList.add('lineThrough');
        // }else{
        //     check.classList.add("fa-regular","fa-circle")
        // }

        // check.addEventListener("click",()=>{
        //     if(task.completed){
        //         check.classList.add("fa-regular","fa-circle")
        //         taskItem.classList.remove('lineThrough');
        //         task.completed = false

        //     }else{
        //         check.classList.add("fa","fa-check-circle")
        //         taskItem.classList.add('lineThrough');
        //         task.completed=true
        //     }
        // })

        let paragraph = document.createElement("p")
        paragraph.classList.add("text")
        paragraph.textContent=task.title
        taskdiv.appendChild(taskItem)
        taskItem.appendChild(check)
        taskItem.appendChild(paragraph)

        const Actions =document.createElement("div")
        Actions.setAttribute("class","AcionsIcon")
        taskItem.appendChild(Actions) 

        const Edit =document.createElement('i')
        Edit.classList.add("fas","fa-edit")
        taskItem.appendChild(Edit)
        Edit.addEventListener("click",edit)

        const trash=document.createElement('i')
        trash.classList.add("fa","fa-trash")
        taskItem.appendChild(trash)
        trash.addEventListener("click",delet)
        Actions.append(trash,Edit)
        
    });
}

function getData(){
    let data = window.localStorage.getItem("todos")
    if(data){
        let todos =JSON.parse(data)
        AddTasks(todos)
    }
}

function edit(){

}

function delet(e){
    let li =e.target.parentElement.parentElement.parentElement
    let liID = li.getAttribute("task-id") 
    let tasks = JSON.parse(localStorage.getItem('todos'))

    let task =  tasks.forEach((task)=>{if(task.id==liID){console.log(tasks.indexOf(task))}})
    tasks.splice(task, 1);
    //  save the new array in the local storage
    localStorage.setItem('todos', JSON.stringify(tasks))
    location.reload()
}