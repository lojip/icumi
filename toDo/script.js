document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskList = document.getElementById('taskList');

        const li = document.createElement('li');
        li.textContent = taskText;

        // Добавление возможности отмечать задачу как выполненную
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
        });

        // Создание кнопки удаления
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
        taskInput.value = ''; // Очищаем поле ввода
    } else {
        alert('Введите задачу!');
    }
});