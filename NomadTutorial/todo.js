const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
const toDos = [];

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newID = toDos.length + 1;
  delBtn.innerText = "❌";
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newID
  };
  toDos.push(toDoObj);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
