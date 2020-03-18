const container = document.querySelector('.container')
const todoInput = document.querySelector('.todoInput')
// const saveBtn = document.querySelector('.saveBtn')

const TODOLIST_KEY = 'myTodoList'
const todos = JSON.parse(localStorage.getItem(TODOLIST_KEY)) || []  

updateTodos(todos)

// saveBtn.addEventListener('click', addTodo)

todoInput.addEventListener('keyup', (e) => {
  if (e.keyCode == 13) {
    addTodo()
  } else {
    return
  }
})

container.addEventListener('dragover', e => {

  // get rid of not-allowed icon
  e.preventDefault()

  const afterElement = getDragAfterElement(container, e.clientY)

  const draggable = document.querySelector('.dragging')
  if (afterElement == null) {
    container.appendChild(draggable)
  } else {
    container.insertBefore(draggable, afterElement)
  }
})

