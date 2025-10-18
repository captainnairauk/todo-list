import { TodoManager } from "./todo-manager.js";
import {Storage} from './storage.js';
import {DOM} from './dom-elements.js';

class AppManager{
    constructor(){
        const storage = new Storage();
        this.todoManager = new TodoManager(storage);
        this.dom = new DOM();
    }

    init(){
        const projects = this.todoManager.getProjects();
        this.dom.renderProjects(projects);

        this.dom.on('add-project', (projectName) => {
            this.todoManager.addProject(projectName);
            this.dom.renderProjects(this.todoManager.getProjects());
        });

        this.dom.on('add-todo', (todoData, projectName) => {
            this.todoManager.addTodo(todoData, projectName);
            this.dom.renderTodos(this.todoManager.getTodosByProject(projectName));
        });

        // ... set up other event handlers for deleting, editing, etc. 
    }
}

const app = new AppManager();
app.init();
