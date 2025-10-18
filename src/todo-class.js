class Todo {
  constructor(title = "", description = "", dueDate = null, priority = null) {
    // create an id suitable for local dev; if crypto.randomUUID exists use it
    this.id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false; // public so JSON.stringify includes it
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

export default Todo;
