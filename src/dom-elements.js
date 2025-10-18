class DOM {
  constructor() {
    this.eventListeners = {};
  }

  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  trigger(event, ...data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach((callback) => callback(...data));
    }
  }

  renderProjects(projects) {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";
    projectList.forEach((project) => {
      const li = document.createElement("li");
      li.textContent = project.name;
      //Add other project elements and event handling here
      projectList.appendChild(li);
    });

    //Add event listener for adding a project
    const addProjectBtn = document.getElementById("add-project-btn");
    if (addProjectBtn) {
      addProjectBtn.onclick = () => {
        const projectName = prompt("Enter new project name:");
        if (projectName) {
          this.trigger("add-project", projectName);
        }
      };
    }
  }

  renderTodos(todos) {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    todos.forEach((todos) => {
      const li = document.createElement("li");
      li.textContent = todo.title;
      //Add other todo elements and event handling here
      todoList.appendChild(li);
    });
  }
}

export { DOM };
