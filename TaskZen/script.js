const taskInput = document.querySelector('.taskzen-input');
const addBtn = document.querySelector('.taskzen-add-btn');
const form = document.querySelector('.taskzen-form');
const list = document.querySelector('.taskzen-list');

let tasks = [
  { text: 'Sample Task 1', completed: false },
  { text: 'Sample Task 2 (completed)', completed: true }
];

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'taskzen-item' + (task.completed ? ' completed' : '');
    li.setAttribute('data-index', idx);
    li.innerHTML = `
      <span class="taskzen-check">${task.completed ? '<i class=\"fa-solid fa-circle-check\"></i>' : '<i class=\"fa-regular fa-circle\"></i>'}</span>
      <span class="taskzen-task">${task.text}</span>
      <button class="taskzen-delete"><i class="fa-solid fa-trash"></i></button>
    `;
    list.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const value = taskInput.value.trim();
  if (!value) {
    taskInput.classList.add('input-error');
    setTimeout(() => taskInput.classList.remove('input-error'), 600);
    return;
  }
  tasks.push({ text: value, completed: false });
  taskInput.value = '';
  renderTasks();
}

function deleteTask(idx) {
  const li = list.querySelector(`[data-index='${idx}']`);
  if (li) {
    li.style.animation = 'fadeOut 0.4s';
    setTimeout(() => {
      tasks.splice(idx, 1);
      renderTasks();
    }, 350);
  }
}

function toggleTask(idx) {
  tasks[idx].completed = !tasks[idx].completed;
  renderTasks();
}

list.addEventListener('click', function(e) {
  const li = e.target.closest('.taskzen-item');
  if (!li) return;
  const idx = li.getAttribute('data-index');
  if (e.target.closest('.taskzen-delete')) {
    deleteTask(idx);
  } else if (e.target.closest('.taskzen-check')) {
    toggleTask(idx);
  }
});

form.addEventListener('submit', addTask);

renderTasks();
