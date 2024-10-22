const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;  // Начальная ширина
canvas.height = 600; // Начальная высота

let drawing = false;
let color = '#000000';
let thickness = 2;
let history = []; // Массив для хранения истории действий

// Элементы управления
const colorInput = document.getElementById('color');
const thicknessInput = document.getElementById('thickness');

// Обновление цвета
colorInput.addEventListener('input', (e) => {
    color = e.target.value;
});

// Обработка изменения толщины
thicknessInput.addEventListener('input', (e) => {
    thickness = e.target.value;
});

// Начало рисования
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.lineWidth = thickness;
    ctx.strokeStyle = color;
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Процесс рисования
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});

// Остановка рисования
canvas.addEventListener('mouseup', () => {
    drawing = false;
    saveHistory(); // Сохраняем текущее состояние после завершения рисования
});

// Очистка холста
document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    history = []; // Очищаем историю при очистке холста
});

// Отмена последнего действия
document.getElementById('undo').addEventListener('click', undoLastAction);

function saveHistory() {
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // Сохраняем текущее состояние
}

function undoLastAction() {
    if (history.length > 0) {
        history.pop(); // Удаляем последнее сохраненное состояние
        redraw(); // Перерисовываем холст
    }
}

// Перерисовка холста
function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем холст
    if (history.length > 0) {
        ctx.putImageData(history[history.length - 1], 0, 0); // Восстанавливаем последнее состояние
    }
}