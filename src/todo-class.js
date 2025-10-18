class Todo{
    #completed = false;

    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    get completed(){
        return this.#completed;
    }

    toggleComplete(){
        this.#completed = !this.#completed;
    }
}

export default Todo;
