let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask(){
    const text = document.getElementById("taskText").value;
    const time = document.getElementById("taskTime").value;

    if(!text || !time){
        alert("请输入完整内容");
        return;
    }

    const targetTime = new Date(time).getTime();

    tasks.push({text, targetTime});
    localStorage.setItem("tasks", JSON.stringify(tasks));

    render();
}

function render(){
    taskList.innerHTML="";
    tasks.forEach((task,index)=>{
        const div = document.createElement("div");
        div.style.marginTop="10px";
        div.innerText = new Date(task.targetTime).toLocaleString() + " - " + task.text;
        taskList.appendChild(div);
    });
}

function checkTime(){
    const now = Date.now();

    tasks.forEach((task,index)=>{
        if(now >= task.targetTime){
            notify(task.text);
            tasks.splice(index,1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            render();
        }
    });
}

function notify(text){
    if(Notification.permission === "granted"){
        new Notification("QuickPing",{
            body:text
        });
    }
}

setInterval(checkTime,1000);

if("Notification" in window){
    Notification.requestPermission();
}

render();
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered"));
}