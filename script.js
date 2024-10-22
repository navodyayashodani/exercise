const todoCreateButton = document.querySelector(".todo__create__button");
const todoInput = document.querySelector(".todo__input");
const todoContainer = document.querySelector(".todo__container");

let todoValues = [];

// Function to render the TODO list
const renderTodos = () => {
  todoContainer.innerHTML = todoValues.map((val, index) => {
    return `
      <div class="todo__item" data-index="${index}">
        <div class="todo__item__left">
          <input type="checkbox" class="todo-checkbox" id="completed-${index}" />
          <span class="todo-text">${val}</span>
        </div>
        <div class="todo__item__right">
          <svg
            class="todo__delete__button"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-trash"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </div>
      </div>`;
  }).join("");
};

// Handle the creation of new TODOs
todoCreateButton.addEventListener("click", () => {
  const value = todoInput.value;
  if (value === "") {
    return;
  }
  todoValues.push(value);
  todoInput.value = "";
  renderTodos();
});

// Event delegation for handling the deletion of TODOs and checkbox changes
todoContainer.addEventListener("click", (event) => {
  // Handle checkbox toggle for marking TODO as completed
  if (event.target.classList.contains("todo-checkbox")) {
    const todoItem = event.target.closest(".todo__item");
    const todoText = todoItem.querySelector(".todo-text");
    
    // Toggle the 'completed' class for strikethrough effect
    todoText.classList.toggle("completed");
  }

  // Handle delete button click
  if (event.target.closest(".todo__delete__button")) {
    const todoItem = event.target.closest(".todo__item");
    const index = todoItem.dataset.index;
    todoValues.splice(index, 1); // Remove the clicked TODO from the list
    renderTodos(); // Re-render the TODO list
  }
});
