document.addEventListener('DOMContentLoaded', () => {
    const taskH = document.querySelector("#taskH");
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('searchInput');

    let editMode = false;
    let editingElement = null;

    // New Task
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.style.background = '#5a094f';
        li.style.border = '1px solid #582762';
        li.innerHTML = `
            <div class="d-flex">
                <span class="me-auto p-2 text-light">${taskText}</span>
                <i class="btn btn-success bi bi-pencil-square p-2 mx-1 edit"></i>
                <i class="btn btn-danger bi bi-trash p-2 delete"></i>
            </div>
        `;

        attachEventListeners(li);

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        return li;
    }

    function attachEventListeners(taskElement) {
        const editButton = taskElement.querySelector('.edit');
        const deleteButton = taskElement.querySelector('.delete');

        editButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            const taskText = taskElement.querySelector('span').textContent;
            taskInput.value = taskText;
            editMode = true;
            editingElement = taskElement;
            taskH.textContent = 'Edit your todo...';
        });

        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            taskList.removeChild(taskElement);
        });
    }

    Array.from(taskList.getElementsByTagName('li')).forEach(task => {
        attachEventListeners(task);
    });

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            if (editMode && editingElement) {
                editingElement.querySelector('span').textContent = taskText;
                taskH.textContent = 'Add a new todo...';
                editMode = false; // Reset edit mode
                editingElement = null; // Clear reference
            } else {
                const taskElement = createTaskElement(taskText);
                taskList.appendChild(taskElement);
            }
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    // Search Task
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const tasks = taskList.getElementsByTagName('li');
        let anyTaskVisible = false;

        Array.from(tasks).forEach(task => {
            const text = task.textContent.toLowerCase();
            if (text.includes(filter)) {
                task.style.display = ''; // Show task
                anyTaskVisible = true;
            } else {
                task.style.display = 'none'; // Hide task
            }
        });

        let noTask = document.querySelector("#Task");
        if (!anyTaskVisible) {
            if (!noTask) {
                noTask = document.createElement('div');
                noTask.id = 'Task';
                noTask.classList.add('text-center', 'text-light', 'mt-1');
                noTask.textContent = 'No task found';
                taskList.appendChild(noTask);
            }
        } else {
            if (noTask) {
                noTask.remove();
            }
        }
    });

});
