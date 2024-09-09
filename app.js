const addTaskModal = document.querySelector('#addTaskModal');
const editTaskModal = document.querySelector('#editTaskModal');
const addTaskForm = document.querySelector('#addTaskForm');
const editTaskForm = document.querySelector('#editTaskForm');
const addTaskButton = document.querySelector('.submit-button');

// abre el modal de agregar una nueva tarea
addTaskButton.addEventListener('click', () => {
    addTaskModal.classList.add('is-active');
    addTaskForm.reset(); // Limpia todos los campos del formulario
});


// cerrrar modal
const closeModal = (modal) => {
    modal.classList.remove('is-active');
};

// listar tareas 
async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// renderizar tareas en sus columnas correspondientes
function renderTasks(tasks) {
    const columns = {
        backlog: document.querySelector('[data-state="backlog"]'),
        toDo: document.querySelector('[data-state="toDo"]'),
        inProgress: document.querySelector('[data-state="inProgress"]'),
        blocked: document.querySelector('[data-state="blocked"]'),
        done: document.querySelector('[data-state="done"]')
    };

    // Limpiar todas las columnas
    Object.values(columns).forEach(column => column.innerHTML = '');

    // Insertar tareas en sus columnas correspondientes
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'box task';
        taskElement.draggable = true;
        taskElement.dataset.id = task.id;

        // Solo mostrar el título de la tarea
        taskElement.innerHTML = `<h3 class="title is-6">${task.title}</h3>`;

        taskElement.addEventListener('dragstart', dragStart);
        taskElement.addEventListener('dragend', dragEnd);

        // Verifica si el estado de la tarea es correcto
        if (columns[task.status]) {
            taskElement.addEventListener('click', () => showTaskDetails(task));
            columns[task.status].appendChild(taskElement);
        } else {
            console.error(`Error: ${task.status} para la tarea:`, task);
        }
    });

    // Configurar las columnas como zonas de drop
    Object.values(columns).forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('drop', dropTask);
    });
}


let draggedTaskId = null;

function dragStart(e) {
    draggedTaskId = e.target.dataset.id; // Guarda el ID de la tarea arrastrada
    setTimeout(() => {
        e.target.classList.add('hidden'); // Esconde la tarea mientras se arrastra
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove('hidden'); // Muestra la tarea nuevamente cuando se suelta
    draggedTaskId = null;
}

function dragOver(e) {
    e.preventDefault(); 
}

async function dropTask(e) {
    const targetColumn = e.currentTarget.dataset.state; // Columna destino
    const taskElement = document.querySelector(`[data-id="${draggedTaskId}"]`);

    // Actualizar el estado de la tarea en el servidor
    if (taskElement) {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${draggedTaskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: targetColumn })
            });
            
            // Si la respuesta es ok, mover la tarea a la nueva columna
            if (response.ok) {
                e.currentTarget.appendChild(taskElement); 
            }
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    }
}

// Mostrar detalles tarea edición
function showTaskDetails(task) {
    document.querySelector('#edit-title').value = task.title;
    document.querySelector('#edit-description').value = task.description;
    document.querySelector('#edit-assigned').value = task.assigned;
    document.querySelector('#edit-priority').value = task.priority;
    document.querySelector('#edit-status').value = task.status;
    document.querySelector('#edit-fecha-limite').value = task['fecha-limite'];

    editTaskModal.classList.add('is-active');

    // Listener para guardar cambios
    editTaskForm.onsubmit = (e) => {
        e.preventDefault();
        const updatedTask = {
            title: document.querySelector('#edit-title').value,
            description: document.querySelector('#edit-description').value,
            assigned: document.querySelector('#edit-assigned').value,
            priority: document.querySelector('#edit-priority').value,
            status: document.querySelector('#edit-status').value,
            "fecha-limite": document.querySelector('#edit-fecha-limite').value
        };
        updateTask(task.id, updatedTask);
        closeModal(editTaskModal); 
    };
}

// Actualizar una tarea 
async function updateTask(taskId, updatedTask) {
    try {
        await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        });
        fetchTasks(); // Actualiza la lista de tareas
    } catch (error) {
        console.error('Error updating task:', error);
    }
}


addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newTask = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        assigned: document.querySelector('#assigned').value,
        priority: document.querySelector('#priority').value,
        status: document.querySelector('#status').value,
        "fecha-limite": document.querySelector('#fecha-limite').value
    };

    addTask(newTask);
    closeModal(addTaskModal); 
});

// Agregar una tarea al servidor
async function addTask(task) {
    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });

        const newTask = await response.json();
        fetchTasks(); // Actualiza la lista de tareas
    } catch (error) {
        console.error('Error adding task:', error);
    }
}


async function deleteTask(taskId) {
    try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            fetchTasks(); // ActualizaR lista de tareas después de eliminar
        } else {
            console.error('Error eliminando la tarea:', response.statusText);
        }
    } catch (error) {
        console.error('Error eliminando la tarea:', error);
    }
}



// Cancelar o cerrar modales
document.querySelectorAll('.modal-close, .cancel-button, .modal-background').forEach(button => {
    button.addEventListener('click', () => {
        closeModal(addTaskModal);
        closeModal(editTaskModal);
    });
});


fetchTasks();
