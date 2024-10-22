// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from local storage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(taskText => {
                createTaskElement(taskText);
            });
        }
    }

    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.firstChild.textContent); // Store task text
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to create a task element
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add click event to remove the task
        removeButton.onclick = function () {
            taskList.removeChild(li); // Remove li element from the task list
            saveTasks(); // Save the updated task list to local storage
        };

        li.appendChild(removeButton); // Append the remove button to the li
        taskList.appendChild(li); // Append the li to the task list
    }

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim the task input

        if (taskText === "") {
            alert("Please enter a task."); // Alert if input is empty
            return;
        }

        createTaskElement(taskText); // Create and append the new task
        taskInput.value = ""; // Clear the input field

        saveTasks(); // Save the updated task list to local storage
    }

    // Event listener for adding task on button click
    addButton.addEventListener('click', addTask);

    // Event listener for adding task on Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from local storage on page load
    loadTasks();
});
