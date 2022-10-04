const chk = document.getElementById('chk');
const date = new Date();
const format = { weekday: "long", month: "short", day: "numeric" };
const taskContainer =document.querySelector('.todo-list')
const taskInput=document.querySelector('.task-input')
const addBoutton = document.querySelector('.Add-boutton')
const header = document.querySelector('.header')
const toDoIcon = document.querySelector('.fa-3x')
const section = document.querySelector('.section')
const form = document.querySelector('.form')
const theDate =document.querySelector('.date')

let text = date.toLocaleDateString("English", format);
document.getElementById("date").textContent = text;

chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
    header.classList.toggle("darkHead");
    toDoIcon.classList.toggle("darkicon");
    section.classList.toggle("darkSection");
    taskContainer.classList.toggle("darkTask");
    form.classList.toggle("darkForm")
    addBoutton.classList.toggle("darkBoutton")
    theDate.classList.toggle("darkDate")
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

        let check = document.createElement('div')
        // taskContainer.appendChild(check)

        check.innerHTML=='<i class="fa fa-circle-thin"></i>';


        // check.classList.add("fa","fa-check-circle")

        // if(task.completed){
            // taskItem.classList.add('lineThrough');
        // }else{
        //     check.classList.add("fa-regular","fa-circle")
        // }

        check.addEventListener("click",()=>{
            console.log(task.id)
            console.log(task.completed)
                if (check.innerHTML == '<i class="fa fa-circle-thin"></i>') {
                    check.innerHTML = '<i class="fa fa-check-circle"></i>';
                    // task_input_el.classList.add('lineThrough');
                } else {
                    check.innerHTML = '<i class="fa fa-circle-thin"></i>';
                    // task_input_el.classList.remove('lineThrough');
                }

            if(task.completed){
                check.classList.add("fa-regular","fa-circle")
                // taskItem.classList.remove('fa-check-circle');
                // taskItem.classList.remove('fa');

                // taskItem.classList.remove('lineThrough');
                task.completed = false;
            }else{
                check.classList.add("fa","fa-check-circle")
                // taskItem.classList.add('lineThrough');
                task.completed=true;
            }
        })

        let paragraph = document.createElement("input")
        paragraph.type="text"
        paragraph.classList.add("para")
        paragraph.value=task.title
        paragraph.setAttribute('readonly', 'readonly');
        taskdiv.appendChild(taskItem)
        taskItem.appendChild(check)
        taskItem.appendChild(paragraph)

        const Actions =document.createElement("div")
        Actions.setAttribute("class","AcionsIcon")
        taskItem.appendChild(Actions) 

        const Edit =document.createElement('div')
        Edit.innerHTML='<i class="fas fa-edit"></i>'
        taskItem.appendChild(Edit)
        
        Edit.addEventListener("click",(e)=>{
            if (Edit.innerHTML == '<i class="fas fa-edit"></i>') {
                Edit.innerHTML = '<i class="fa fa-check"></i>';
                paragraph.removeAttribute("readonly");
                // task.title=paragraph.value;
                paragraph.focus();
            } else {
                Edit.innerHTML = '<i class="fas fa-edit""></i>';
                saveEdit(task.id, paragraph.value);
                // task.title=paragraph.value;
                paragraph.setAttribute("readonly", "readonly");
            }
        });

        const trash=document.createElement('i')
        trash.classList.add("fa","fa-trash")
        taskItem.appendChild(trash)
        trash.addEventListener("click",delet)
        Actions.append(trash,Edit)
        
    });
};

function saveEdit(id, newValue){
    let tasks = JSON.parse(localStorage.getItem('todos'))

    let update = tasks.forEach((task)=>{if(task.id==id){
        task.title=newValue;
}})
localStorage.setItem('todos', JSON.stringify(tasks))
}

function getData(){
    let data = window.localStorage.getItem("todos")
    if(data){
        let todos =JSON.parse(data)
        AddTasks(todos)
    }
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