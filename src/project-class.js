import Todo from "./todo-class.js";

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    if (todo instanceof Todo) {
      this.todos.push(todo);
    } else if (todo && typeof todo === "object") {
      const t = new Todo(
        todo.title || "",
        todo.description || "",
        todo.dueDate || null,
        todo.priority || null,
      );

      if (todo.id) t.id = todo.id;
      if (todo.completed) t.completed = !!todo.completed;
      this.todos.push(t);
    }
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  updateTodo(todoId, updatedData) {
    const todo = this.todos.find((t) => t.id === todoId);
    if (todo) {
      todo.title = updatedData.title ?? todo.title;
      todo.description = updatedData.description ?? todo.description;
      todo.dueDate = updatedData.dueDate ?? todo.dueDate;
      todo.priority = updatedData.priority ?? todo.priority;
      if (updatedData.completed !== undefined) {
        todo.completed = !!updatedData.completed;
      }
    }
  }

  getTodos() {
    return this.todos;
  }

  updateName(newName) {
    this.name = newName;
  }
}

export { Project };
