import Todo  from "./todo-class.js";

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    if (todo instanceof Todo) {
      this.todos.push(todo);
    }else if (todo && typeof todo === "object"){
        const t = new Todo(
            todo.title || "",
            todo.description || "",
            todo.dueDate || null,
            todo.priority || null
        );

        if(todo.id) t.id = todo.id;

        if(todo.completed) t.toggleComplete();
        this.todos.push(t);
    }
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  getTodos() {
    return this.todos;
  }
}

export { Project };
