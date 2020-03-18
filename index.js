// const draggables = document.querySelectorAll('.draggable')
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

function updateTodos(array) {
  let str = ''
  todos.forEach((todo, i) => {
    str += `
      <li class="draggable" draggable="true">
        ${i+1}. ${todo.title}
        <div class="control">
          <i class="fas fa-trash"></i>
          <i class="fas fa-edit"></i>
        </div>
      </li>
    `
    
  })
  container.innerHTML = str
  
  const delBtns = document.querySelectorAll('.fa-trash');
  const editBtns = document.querySelectorAll('.fa-edit')

  delBtns.forEach((delBtn, i) => {
    delBtn.addEventListener('click', removeTodo)
  })

  editBtns.forEach(editBtn => {
    editBtn.addEventListener('click', editTodo)
  })

  function removeTodo(i) {
    alert(`Are you sure to remove this item ?`)
    todos.splice(i, 1)
    updateTodos(todos)
  }

  function editTodo() {
    alert(`you are in edit mode !`)
  }

  const draggables = document.querySelectorAll('.draggable')
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
  
      // 拖拉的時候改變元件的透明度
      draggable.classList.add('dragging')
    })
  
    draggable.addEventListener('dragend', () => {
  
      // 放開的時候恢復元件的透明度
      draggable.classList.remove('dragging')
    })
  })  
}

function addTodo(e) {
  if (todoInput.value == '') return

  let todo = {
    id: Date.now(),
    title: todoInput.value
  }
  
  todos.unshift(todo)
  saveTodos(todos)
  updateTodos(todos)
  todoInput.value = ''    
}

function saveTodos(todoList) {
  localStorage.setItem(TODOLIST_KEY, JSON.stringify(todoList))
}

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


// y : position of the mouse
function getDragAfterElement(container, y) {

  // 隱藏被拖拉物件  
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging')]

  return draggableElements.reduce((closest, child) => {

    // determine the actual position of the element on the screen in relation to mouse
    const box = child.getBoundingClientRect()

    // distance between center of the box and the mouse cursor
    const offset = y - box.top - box.height / 2

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}