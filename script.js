const chk = document.getElementById('chk');
const date = new Date();
const format = { weekday: "long", month: "short", day: "numeric" };
const taskContainer =document.querySelector('.tasks-container')
const taskInput=document.querySelector('.task-input')
const addBoutton = document.querySelector('.Add-boutton')

let text = date.toLocaleDateString("English", format);
document.getElementById("date").textContent = text;

chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
});
getData();

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


function AddTasks(todos){
    todos.forEach(task => {
        let taskdiv = document.createElement('div') 
        taskdiv.setAttribute("class","task")
        taskContainer.appendChild(taskdiv)
        let taskItem = document.createElement('li')

        let check = document.createElement('i')

        if(task.completed){
            check.classList.add("fa","fa-check-circle")
            taskItem.classList.add('lineThrough');
        }else{
            check.classList.add("fa-regular","fa-circle")
        }

        check.addEventListener("click",()=>{
            if(task.completed){
                check.classList.add("fa-regular","fa-circle")
                taskItem.classList.remove('lineThrough');
                task.completed = false

            }else{
                check.classList.add("fa","fa-check-circle")
                taskItem.classList.add('lineThrough');
                task.completed=true
            }
        })

        taskItem.innerHTML=task.title
        taskdiv.appendChild(taskItem)
        taskItem.appendChild(check)


        const Edit =document.createElement('i')
        Edit.classList.add("fas","fa-edit")
        taskItem.appendChild(Edit)
        Edit.addEventListener("click",edit)

        const trash=document.createElement('i')
        trash.classList.add("fa","fa-trash")
        taskItem.appendChild(trash)
        trash.addEventListener("click",delet)
        
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

function delet(){

}