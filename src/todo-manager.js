import { Project } from "./project-class.js";
import Todo from "./todo-class.js";

class TodoManager {
  constructor(storage) {
    this.storage = storage;
    const raw = this.storage.get("projects");
    this.projects = {}; 
    if (raw) {
      this._rehydrateProjects(raw);
    } else {
      this.projects = {};
    }
    this.initDefaultProject();
  }

  initDefaultProject() {
    if (!this.projects.default) {
      this.projects.default = new Project("default");
      this.save();
    }
  }

  _rehydrateProjects(rawProjects) {
    this.projects = {};
    Object.keys(rawProjects).forEach((key) => {
      const rawProject = rawProjects[key];
      const proj = new Project(rawProject.name || key);
      const rawTodos = Array.isArray(rawProject.todos) ? rawProject.todos : [];
      rawTodos.forEach((rt) => {
        const todoInstance = new Todo(
          rt.title || "",
          rt.description || "",
          rt.dueDate || null,
          rt.priority || null
        );
        if (rt.id) todoInstance.id = rt.id;
        else todoInstance.id = crypto?.randomUUID?.() ?? Date.now().toString();

        
        if (rt.completed) {
          todoInstance.toggleComplete();
        }
        proj.addTodo(todoInstance);
      });
      this.projects[key] = proj;
    });
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
    const project = this.projects[projectName];
    if (!project) return false;

    const todo = new Todo(
      todoData.title || "",
      todoData.description || "",
      todoData.dueDate || null,
      todoData.priority || null
    );
    todo.id = crypto?.randomUUID?.() ?? Date.now().toString();


    if (todoData.completed) todo.toggleComplete();

    project.addTodo(todo);
    this.save();
    return todo;
  }

  removeTodo(projectName, todoId) {
    const project = this.projects[projectName];
    if (!project) return false;
    project.removeTodo(todoId);
    this.save();
    return true;
  }

  updateTodo(projectName, todoId, updates = {}) {
    const project = this.projects[projectName];
    if (!project) return false;
    const todo = project.getTodos().find((t) => t.id === todoId);
    if (!todo) return false;

    
    if (updates.title !== undefined) todo.title = updates.title;
    if (updates.description !== undefined)
      todo.description = updates.description;
    if (updates.dueDate !== undefined) todo.dueDate = updates.dueDate;
    if (updates.priority !== undefined) todo.priority = updates.priority;
    if (updates.completed !== undefined) {
      if (todo.completed !== updates.completed) todo.toggleComplete();
    }
    this.save();
    return true;
  }

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
          completed: t.completed,
        })),
      };
    });
    this.storage.set("projects", serializable);
  }
}

export { TodoManager };
