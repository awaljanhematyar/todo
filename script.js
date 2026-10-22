// Browser-local task list with resilient storage and immediate completion feedback.
const input = document.getElementById("todo-input");
const addbtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
let todos = [];
try {
  const saved = JSON.parse(localStorage.getItem("todos") || "[]");
  if (Array.isArray(saved)) todos = saved
    .filter((todo) => todo && typeof todo.text === "string" && todo.text.trim())
    .map((todo) => ({ text: todo.text.trim(), completed: Boolean(todo.completed) }));
} catch { /* Start with an empty list when stored JSON is invalid. */ }

function saveTodos() {
  try { localStorage.setItem("todos", JSON.stringify(todos)); }
  catch { /* The current session still works if browser storage is unavailable. */ }
}
function createTodonode(todo, index) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.setAttribute("aria-label", "Complete " + todo.text);
  const textspan = document.createElement("span");
  textspan.textContent = todo.text;
  textspan.style.margin = "0 8px";
  textspan.style.textDecoration = todo.completed ? "line-through" : "none";
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    textspan.style.textDecoration = todo.completed ? "line-through" : "none";
    saveTodos();
  });
  textspan.addEventListener("dblclick", () => {
    const value = prompt("Edit todo", todo.text);
    if (value !== null && value.trim()) {
      todo.text = value.trim();
      textspan.textContent = todo.text;
      checkbox.setAttribute("aria-label", "Complete " + todo.text);
      saveTodos();
    }
  });
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
  return li;
}
function render() {
  list.innerHTML = "";
  todos.forEach((todo, index) => list.appendChild(createTodonode(todo, index)));
}
function addTodo() {
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, completed: false });
  input.value = "";
  render();
  saveTodos();
}
addbtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTodo();
});
render();
