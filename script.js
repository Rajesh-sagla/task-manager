const taskInput=document.getElementById("taskInput");
const button=document.getElementById("addBtn");
const listElement=document.getElementById("taskList");
let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => {
    createTaskElement(task);
});
function createTaskElement(task) {

    let liElement = document.createElement("li");


    let deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    let checkBoxElement=document.createElement("input");
    checkBoxElement.type="checkbox";
    checkBoxElement.checked=task.completed;
    
    let span=document.createElement("span");
    span.textContent=task.text;
    if (task.completed) {
        span.classList.add("completed");
    }
    //checkBox checking
    checkBoxElement.addEventListener("change", function() {

    task.completed = checkBoxElement.checked;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    if (task.completed) {
        span.classList.add("completed");
    } else {
        span.classList.remove("completed");
    }

});

    deleteButton.addEventListener("click", () => {
        liElement.remove();
        tasks = tasks.filter(t => t.id !== task.id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    listElement.appendChild(liElement);
    liElement.appendChild(checkBoxElement);
    liElement.appendChild(span);
    liElement.append(deleteButton);

}

button.addEventListener("click",function(){
    let inputElement=taskInput.value;
    if (inputElement===""){
        alert("Empty Value!!");
        return;
    }
    let taskInfo={
        id:Date.now(),
        text:inputElement,
        completed:false
    };
    tasks.push(taskInfo);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTaskElement(taskInfo);

    taskInput.value = "";
});

function filterTasks(type) {

    listElement.innerHTML = "";

    let filteredTasks;

    if (type === "all") {
        filteredTasks=tasks
    } 
    else if (type === "completed") {
        filteredTasks=tasks.filter(task=>task.completed)
    } 
    else {
        filteredTasks=tasks.filter(task=>!task.completed)
    }

    filteredTasks.forEach(task => createTaskElement(task));
}
