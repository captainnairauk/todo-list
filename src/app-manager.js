import { TodoManager } from "./todo-manager.js";
import { Storage } from "./storage.js";
import { DOM } from "./dom-elements.js";

class AppManager {
  constructor() {
    this.storage = new Storage();
    this.todoManager = new TodoManager(this.storage);
    this.dom = new DOM();

    this.selectedProject = "default";
  }

  init() {
    this.dom.renderProjects(this.todoManager.getProjects());
    this.dom.renderTodos(
      this.todoManager.getTodosByProject(this.selectedProject),
      this.selectedProject
    );

    this.dom.on("add-project", (projectName) => {
      this.todoManager.addProject(projectName);
      this.dom.renderProjects(this.todoManager.getProjects());
    });

    this.dom.on("select-project", (projectName) => {
      this.selectedProject = projectName;
      this.dom.renderTodos(
        this.todoManager.getTodosByProject(this.selectedProject),
        this.selectedProject
      );
    });

    this.dom.on("add-todo", (todoData, projectName) => {
      this.todoManager.addTodo(todoData, projectName || this.selectedProject);
      this.dom.renderTodos(
        this.todoManager.getTodosByProject(this.selectedProject),
        this.selectedProject
      );
    });

    this.dom.on("toggle-todo", (projectName, todoId) => {
      this.todoManager.updateTodo(projectName, todoId, {
        completed: !this._getTodoCompleted(projectName, todoId),
      });
      this.dom.renderTodos(
        this.todoManager.getTodosByProject(this.selectedProject),
        this.selectedProject
      );
    });

    this.dom.on("delete-todo", (projectName, todoId) => {
      this.todoManager.removeTodo(projectName, todoId);
      this.dom.renderTodos(
        this.todoManager.getTodosByProject(this.selectedProject),
        this.selectedProject
      );
    });

    const addTodoForm = document.getElementById("add-todo-form");
    if (addTodoForm) {
      addTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = e.target.querySelector('[name="title"]').value;
        const description =
          e.target.querySelector('[name="description"]')?.value || "";
        this.dom.trigger(
          "add-todo",
          { title, description },
          this.selectedProject
        );
        addTodoForm.reset();
      });
    }

    const addBtn = document.getElementById("add-todo-btn");
    const addInput = document.getElementById("add-todo-input");
    if (addBtn && addInput) {
      addBtn.addEventListener("click", () => {
        const title = addInput.value.trim();
        if (!title) return;
        this.dom.trigger("add-todo", { title }, this.selectedProject);
        addInput.value = "";
      });
    }
  }

  _getTodoCompleted(projectName, todoId) {
    const todos = this.todoManager.getTodosByProject(projectName);
    const t = todos.find((x) => x.id === todoId);
    return t ? t.completed : false;
  }
}

export { AppManager };
