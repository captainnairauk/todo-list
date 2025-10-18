import { Todo } from "./todo-class.js";

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    if (todo instanceof Todo) {
      this.todos.push(todo);
    }
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id != todoId);
  }

  getTodos() {
    return this.todos;
  }
}

export { Project };
