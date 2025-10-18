import Todo from "./todo-class.js";
import { Project } from "./project-class.js";

class TodoManager {
  constructor(storage) {
    this.storage = storage;
    // load raw stored object (plain JSON)
    const saved = this.storage.get("projects") || {};
    this.projects = {};

    // Recreate Project/Todo instances
    Object.keys(saved).forEach((key) => {
      const rawProj = saved[key];
      const project = new Project(rawProj.name || key);
      const rawTodos = Array.isArray(rawProj.todos) ? rawProj.todos : [];
      rawTodos.forEach((rt) => {
        project.addTodo(rt); // project.addTodo handles plain object -> Todo instance
      });
      this.projects[key] = project;
    });

    this.initDefaultProject();
  }

  initDefaultProject() {
    if (!this.projects.default) {
      this.projects.default = new Project("Default");
      this.save();
    }
  }

  getProjects() {
    return this.projects;
  }

  getTodosByProject(projectKey = "default") {
    const project = this.projects[projectKey];
    return project ? project.getTodos() : [];
  }

  addProject(projectKey) {
    if (!this.projects[projectKey]) {
      this.projects[projectKey] = new Project(projectKey);
      this.save();
      return true;
    }
    return false;
  }

  removeProject(projectKey) {
    if (projectKey !== "default" && this.projects[projectKey]) {
      delete this.projects[projectKey];
      this.save();
      return true;
    }
    return false;
  }

  addTodo(todoData, projectKey = "default") {
    const project = this.projects[projectKey];
    if (!project) return null;
    const todo = new Todo(
      todoData.title || "",
      todoData.description || "",
      todoData.dueDate || null,
      todoData.priority || null
    );
    if (todoData.completed) todo.completed = !!todoData.completed;
    project.addTodo(todo);
    this.save();
    return todo;
  }

  removeTodo(projectKey, todoId) {
    const project = this.projects[projectKey];
    if (!project) return false;
    project.removeTodo(todoId);
    this.save();
    return true;
  }

  updateTodo(projectKey, todoId, updatedData) {
    const project = this.projects[projectKey];
    if (!project) return false;
    project.updateTodo(todoId, updatedData);
    this.save();
    return true;
  }

  toggleTodo(projectKey, todoId) {
    const project = this.projects[projectKey];
    if (!project) return false;
    const todo = project.getTodos().find((t) => t.id === todoId);
    if (!todo) return false;
    todo.toggleComplete();
    this.save();
    return true;
  }

  // Save only plain serializable data (not class instances) so rehydration works reliably
  save() {
    const serializable = {};
    Object.keys(this.projects).forEach((key) => {
      const proj = this.projects[key];
      serializable[key] = {
        name: proj.name,
        todos: proj.getTodos().map((t) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          dueDate: t.dueDate,
          priority: t.priority,
          completed: !!t.completed,
        })),
      };
    });
    this.storage.set("projects", serializable);
  }
}

export { TodoManager };
