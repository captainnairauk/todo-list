import { TodoManager } from "./todo-manager.js";
import { DOM } from "./dom-elements.js";
import { Storage } from "./storage.js";

class AppManager {
  constructor() {
    this.storage = new Storage();
    this.todoManager = new TodoManager(this.storage);
    this.dom = new DOM();
    this.currentProject = "default";
  }

  init() {
    // initial render
    this.renderProjects();
    this.renderTodosForCurrentProject();

    // wire buttons
    this.dom.setupAddProjectButton();
    this.dom.setupAddTodoButton();

    // project events
    this.dom.on("add-project", (projectKey) => {
      this.todoManager.addProject(projectKey);
      this.renderProjects();
    });

    this.dom.on("select-project", (projectKey) => {
      this.currentProject = projectKey;
      this.renderProjects();
      this.renderTodosForCurrentProject();
    });

    this.dom.on("delete-project", (projectKey) => {
      this.todoManager.removeProject(projectKey);
      if (this.currentProject === projectKey) this.currentProject = "default";
      this.renderProjects();
      this.renderTodosForCurrentProject();
    });

    // todo events
    this.dom.on("add-todo", (todoData, projectKey) => {
      this.todoManager.addTodo(todoData, projectKey || this.currentProject);
      this.renderTodosForCurrentProject();
    });

    this.dom.on("toggle-todo", (projectKey, todoId) => {
      this.todoManager.toggleTodo(projectKey, todoId);
      this.renderTodosForCurrentProject();
    });

    this.dom.on("delete-todo", (projectKey, todoId) => {
      this.todoManager.removeTodo(projectKey, todoId);
      this.renderTodosForCurrentProject();
    });

    this.dom.on("edit-todo", (projectKey, todoId) => {
      // simple edit flow using prompt (keeps minimal)
      const todos = this.todoManager.getTodosByProject(projectKey);
      const todo = todos.find((t) => t.id === todoId);
      if (!todo) return;
      const title = prompt("Title:", todo.title);
      const description = prompt("Description:", todo.description);
      const dueDate = prompt("Due date (YYYY-MM-DD):", todo.dueDate);
      const priority = prompt("Priority:", todo.priority);
      const completed = confirm("Mark completed?");
      this.todoManager.updateTodo(projectKey, todoId, { title, description, dueDate, priority, completed });
      this.renderTodosForCurrentProject();
    });
  }

  renderProjects() {
    const projects = this.todoManager.getProjects();
    this.dom.renderProjects(projects, this.currentProject);
  }

  renderTodosForCurrentProject() {
    const todos = this.todoManager.getTodosByProject(this.currentProject);
    this.dom.renderTodos(todos, this.currentProject);
  }
}

export { AppManager };
