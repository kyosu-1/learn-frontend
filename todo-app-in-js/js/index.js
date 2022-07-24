"use strict";

const inputTodo = document.getElementById("inputTodo");
const todoLists = document.getElementById("todoLists");
const addBtn = document.getElementById("addBtn");

// default 1
let currentNum = 1;
// box to keep todo
let todos = [];

// Todo class
class Todo {
    constructor(title) {
        this.id = currentNum;
        this.title = title;
    }
}

// add todo to todos
const addTodo = (title) => {
    todos.push(new Todo(title));
    currentNum++;
}

// delete todo from todos
const deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
}

//　input todo and add todo and render todos
addBtn.addEventListener("click", () => {
    if (inputTodo.value === "") {
        alert("タスクを入力してください");
        return;
    }

    // add todo to todos
    addTodo(inputTodo.value);

    createListView();

    inputTodo.value = "";
});

// タスクを描図する
const createListView = () => {
    // When drawing a task, if there is even one child element int the tbody,
    // delete it until there is only one child element.
    while (todoLists.firstChild) {
        todoLists.removeChild(todoLists.firstChild);
    }

    // draw todos
    todos.forEach((todo) => {
        // Generating the tr element
        let todoItem = document.createElement("tr");
        // Generation of th displaying the ID of todo
        const todoId = document.createElement("th");
        // Generation of th displaying todo title
        const todoTitle = document.createElement("th");
        // Generation of th displaying the delete button
        const todoDelete = document.createElement("th");
        // Generation of delete button
        const deleteBtn = document.createElement("button");

        todoId.textContent = todo.id;
        todoTitle.textContent = todo.title;
        deleteBtn.textContent = "削除";
        deleteBtn.addEventListener("click", () => {
            deleteTodo(todo.id);
            todoLists.removeChild(todoItem);
        });
        deleteBtn.classList.add("btn", "btn-secondary");
        todoDelete.appendChild(deleteBtn);

        todoItem.appendChild(todoId);
        todoItem.appendChild(todoTitle);
        todoItem.appendChild(todoDelete);
        todoLists.appendChild(todoItem);
    });
};