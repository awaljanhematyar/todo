//select DOM element
const input = document.getElementById("todo-input");
const addbtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// try to load saved todos from localstorage (if any)
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
  // save current array to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// create a dom node for a todo object  and append it to  the list
function createTodonode(todo, index) {
  const li = document.createElement("li");

  //cheacbox  to toggle completion
  const checkbox = document.createElement("input");

  checkbox.checked = !!todo.completed;
  checkbox.type ="checkbox";
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;

    //TODO: visual feedback: strike -throgh when completed
    saveTodos();
  });

  // text of the todo
  const textspan = document.createElement("span");
  textspan.textContent = todo.text;
  textspan.style.margin = "0 8px";
  if (todo.completed){
    textspan.style.textDecoration = "line-through";
}
    //add double -click event listener to edit todo
    textspan.addEventListener("dblclick", () => {
      const newText = prompt("Edit todo", todo.text);
      if (newText !== null) {
        todo.text = newText.trim();
        textspan.textContent = todo.text;
        saveTodos();
      }
    
    });
    // delete todo btn
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      render();
      saveTodos();
    });
    li.appendChild(checkbox);
    li.appendChild(textspan);
    li.appendChild(delBtn);
    return li
  
}
//render the whole todo list from todo arrays
function render() {
  list.innerHTML = "";
  // recreate each item
  todos.forEach((todo, index) => {
    const node = createTodonode(todo, index);
    list.appendChild(node);
  });
}
function addTodo(){
  const text = input.value.trim();
  if (!text) {
    return
  }
  //push a new todo object
  todos.push({text,completed:false});
  input.value = "";
  render();
  saveTodos();
}
addbtn.addEventListener("click", addTodo);
render();
