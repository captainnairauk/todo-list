// modules/todo-class.js
export class Todo {
  constructor(title) {
    this.id = Date.now().toString();
    this.title = title.trim();
    this.completed = false;
  }

  toggle() {
    this.completed = !this.completed;
  }
}
