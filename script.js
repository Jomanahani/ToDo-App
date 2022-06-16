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

addBoutton.addEventListener('click',addTask)

function addTask(e){
    e.preventdefult()
    if(taskInput.value){
        let taskdiv = document.createElement('div') 
        taskContainer.appendChild(taskdiv)

        let taskItem = document.createElement('li')
        taskItem.textContent=taskInput.value
        taskdiv.appendChild(taskItem)
        
        saveToLocalStorge(taskInput.value)
        taskInput.value=""

        const check=document.createElement('input')
        check.type="checkbox"
        check.setAttribute("class","check")
        taskItem.appendChild(check)

        const Edit =document.createElement('i')
        Edit.classList.add("fas","fa-edit")
        taskItem.appendChild(Edit)
        Edit.addEventListener("click",edit)

        const trash=document.createElement('i')
        trash.classList.add("fa","fa-trash")
        taskItem.appendChild(trash)
        trash.addEventListener("click",delet)

        taskContainer.value=""
    }
}