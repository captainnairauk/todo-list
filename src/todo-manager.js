import { Project } from "./project-class.js";
import { Todo } from "./todo-class.js";

class TodoManager {
  constructor(storage) {
    this.storage = storage;
    this.projects = this.storage.loadData("projects") || {};
    this.initDefaultProject();
  }

  initDefaultProject() {
    if (!this.projects.default) {
      const defaultProject = new Project("Default");
      this.projects.default = defaultProject;
      this.save();
    }
  }

  getProjects() {
    return this.projects;
  }

  getTodosByProject(projectName) {
    const project = this.projects[projectName];
    return project ? project.getTodos() : [];
  }

  addProject(projectName) {
    if (!this.projects[projectName]) {
      this.projects[projectName] = new Project(projectName);
      this.save();
      return true;
    }
    return false;
  }

  addTodo(todoData, projectName = "default") {
    const todo = new Todo(
      todoData.title,
      todoData.description,
      todoData.dueDate,
      todoData.priority
    );
    const project = this.projects[projectName];
    if (project) {
      project.addTodo(todo);
      this.save();
    }
  }

  // ... other methods like 'removeTodo', 'updateTodo'

  save() {
    this.storage.saveData("projects", this.projects);
  }
}

export { TodoManager };
