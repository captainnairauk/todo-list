class DOM {
  constructor() {
    this.eventListeners = {};
    this.currentProjectKey = "default";
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

  renderProjects(projects, currentProjectKey) {
    const projectList = document.getElementById("project-list");
    if (!projectList) return;
    projectList.innerHTML = "";

    Object.keys(projects).forEach((key) => {
      const project = projects[key];
      const li = document.createElement("li");
      li.textContent = project.name || key;
      if (key === currentProjectKey) li.classList.add("active");

      li.addEventListener("click", () => {
        this.currentProjectKey = key;
        this.trigger("select-project", key);
      });

      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑️";
      delBtn.className = "btn";
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.trigger("delete-project", key);
      });

      li.appendChild(delBtn);
      projectList.appendChild(li);
    });
  }

  renderTodos(todos, currentProjectKey) {
    const todoList = document.getElementById("todo-list");
    if (!todoList) return;
    todoList.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      const left = document.createElement("div");
      left.style.flex = "1";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = !!todo.completed;
      checkbox.addEventListener("change", (e) => {
        e.stopPropagation();
        this.trigger("toggle-todo", currentProjectKey, todo.id);
      });

      const title = document.createElement("span");
      title.textContent = todo.title;
      if (todo.completed) title.style.textDecoration = "line-through";

      left.appendChild(checkbox);
      left.appendChild(title);

      const right = document.createElement("div");
      right.style.display = "flex";
      right.style.gap = "8px";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "btn";
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.trigger("edit-todo", currentProjectKey, todo.id);
      });

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "btn";
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.trigger("delete-todo", currentProjectKey, todo.id);
      });

      right.appendChild(editBtn);
      right.appendChild(delBtn);

      li.appendChild(left);
      li.appendChild(right);
      todoList.appendChild(li);
    });
  }

  setupAddProjectButton() {
    const addProjectBtn = document.getElementById("add-project-btn");
    if (!addProjectBtn) return;
    addProjectBtn.onclick = () => {
      const key = prompt("Enter project key (used as identifier):");
      if (!key) return;
      const name = prompt("Enter display name (optional):") || key;
      this.trigger("add-project", key);
    };
  }

  setupAddTodoButton() {
    const addTodoBtn = document.getElementById("add-todo-btn");
    if (!addTodoBtn) return;
    addTodoBtn.onclick = () => {
      const title = prompt("Todo title:");
      if (!title) return;
      const description = prompt("Description (optional):") || "";
      const dueDate = prompt("Due date (YYYY-MM-DD, optional):") || "";
      const priority = prompt("Priority (Low/Medium/High, optional):") || "";
      const todoData = { title, description, dueDate, priority };
      this.trigger("add-todo", todoData, this.currentProjectKey);
    };
  }
}

export { DOM };
