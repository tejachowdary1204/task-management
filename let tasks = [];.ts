let tasks = [];
let filter = "pending";

function setUserName() {
  const username = document.getElementById("username").value;
  document.getElementById("greeting").innerText = `Hello, ${username}!`;
}

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskName = taskInput.value.trim();
  if (taskName) {
    tasks.push({ name: taskName, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function filterTasks(status) {
  filter = status;
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter((task) =>
    filter === "pending" ? !task.completed : task.completed
  );

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
    taskItem.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button onclick="toggleTaskStatus(${tasks.indexOf(task)})">${
      task.completed ? "Undo" : "Complete"
    }</button>
                <button onclick="deleteTask(${tasks.indexOf(
                  task
                )})">Delete</button>
            </div>
        `;
    taskList.appendChild(taskItem);
  });

  updateProgressBar();
}

function updateProgressBar() {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  document.getElementById("progress").style.width = `${progress}%`;
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}
