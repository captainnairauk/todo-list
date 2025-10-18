class DOM {
  constructor() {
    this.eventListeners = {};
  }

  on(event, callback) {
    if (!this.eventListeners[event]) this.eventListeners[event] = [];
    this.eventListeners[event].push(callback);
  }

  trigger(event, ...data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach((cb) => cb(...data));
    }
  }

  renderProjects(projects) {
    const projectList = document.getElementById("project-list");
    if (!projectList) return;

    projectList.innerHTML = "";

    const arr = Object.values(projects);

    arr.forEach((project) => {
      const li = document.createElement("li");
      li.className = "project-item";
      li.textContent = project.name || project;
      li.onclick = () => this.trigger("select-project", project.name);

      projectList.appendChild(li);
    });

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

  renderTodos(todos = [], projectName = "default") {
    const todoList = document.getElementById("todo-list");
    if (!todoList) return;

    todoList.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = "todo-item";

      const left = document.createElement("div");
      left.className = "todo-left";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = !!todo.completed;
      checkbox.addEventListener("change", () =>
        this.trigger("toggle-todo", projectName, todo.id)
      );

      const titleSpan = document.createElement("span");
      titleSpan.textContent = todo.title || "(no title)";
      if (todo.completed) titleSpan.classList.add("completed");

      left.appendChild(checkbox);
      left.appendChild(titleSpan);

      const right = document.createElement("div");
      right.className = "todo-right";

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () =>
        this.trigger("delete-todo", projectName, todo.id)
      );

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () =>
        this.trigger("edit-todo", projectName, todo.id)
      );

      right.appendChild(editBtn);
      right.appendChild(delBtn);

      li.appendChild(left);
      li.appendChild(right);

      todoList.appendChild(li);
    });
  }
}

export { DOM };
