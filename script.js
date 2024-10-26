document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load tasks without saving again to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Create a new 'li' element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button element to remove the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';

        // Add the 'remove-btn' class to the button
        removeButton.classList.add('remove-btn');

        // Attach an onclick event to the remove button to remove the task
        removeButton.onclick = function () {
            taskList.removeChild(li);
            removeTask(taskText); // Remove from Local Storage
        };

        // Append the remove button to the 'li' element
        li.appendChild(removeButton);

        // Append the 'li' element to the task list (ul)
        taskList.appendChild(li);

        // Clear the task input field after adding the task
        taskInput.value = '';

        // Save the task to Local Storage if `save` is true
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to remove a task from Local Storage
    function removeTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText); // Remove the specific task
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        addTask(taskText); // Save by default
    });

    // Add event listener to the task input field to allow adding tasks using the "Enter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
            addTask(taskText); // Save by default
        }
    });

    // Load tasks when the page is fully loaded
    loadTasks();
});
