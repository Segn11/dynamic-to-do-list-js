// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim the task input

        if (taskText === "") {
            alert("Please enter a task."); // Alert if input is empty
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add click event to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(li); // Remove li element from the task list
        };

        li.appendChild(removeButton); // Append the remove button to the li
        taskList.appendChild(li); // Append the li to the task list

        taskInput.value = ""; // Clear the input field
    }

    // Event listener for adding task on button click
    addButton.addEventListener('click', addTask);

    // Event listener for adding task on Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
