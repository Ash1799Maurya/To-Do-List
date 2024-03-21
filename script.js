const mainTodoElem = document.getElementById("todoItemsContainer");
const inputValue = document.getElementById("input-task");

const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("projectTodoList"));
};

let localTodoList = getTodoListFromLocal() || [];

const addTodoListLocalStorage = (localTodoList) => {
    return localStorage.setItem("projectTodoList", JSON.stringify(localTodoList));
};

const addTodoDynamically = (curElem) => {
    const divElement = document.createElement("div");
    divElement.classList.add("main-todo-div");
    divElement.innerHTML = `<li>${curElem}</li><button class="deleteBtn">Delete</button>`;
    mainTodoElem.append(divElement);
    inputValue.value = '';
};

const addTodoList = () => {
    const todoListValue = inputValue.value.trim();

    inputValue.value = "";
    if (todoListValue != "" && !localTodoList.includes(todoListValue)) {
        localTodoList.push(todoListValue);
        localTodoList = [...new Set(localTodoList)];
        localStorage.setItem("projectTodoList", JSON.stringify(localTodoList));

        console.log(todoListValue);

        addTodoDynamically(todoListValue);
    }
};

const showTodoList = () => {
    console.log(localTodoList);

    mainTodoElem.innerHTML= "";
    
    localTodoList.forEach((curElem) => {
        addTodoDynamically(curElem);
    });
};
showTodoList();

const removeTodoElem = (e) => {
    console.log(e.target);
    const todoToRemove = e.target;
    let todoListContent = todoToRemove.previousElementSibling.innerText;
    let parentElem = todoToRemove.parentElement;
    console.log(todoListContent);

    localTodoList = localTodoList.filter((curTodo) => {
        return curTodo != todoListContent;
    });

    addTodoListLocalStorage(localTodoList);
    parentElem.remove();
    console.log(localTodoList);
};


mainTodoElem.addEventListener("click", (e) => {
  if(e.target.classList.contains("deleteBtn")) {
     removeTodoElem(e);
    }
});
document.addEventListener("DOMContentLoaded", showTodoList);
document.querySelector(".btn").addEventListener("click", addTodoList);




