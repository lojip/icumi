let questions = [];

// Функция для добавления вопроса
function addQuestion() {
    const questionText = document.getElementById("question").value;
    const option1 = document.getElementById("option1").value;
    const option2 = document.getElementById("option2").value;
    const option3 = document.getElementById("option3").value;
    const option4 = document.getElementById("option4").value;
    const correctOption = document.querySelector('input[name="correct"]:checked');

    if (questionText && option1 && option2 && option3 && option4 && correctOption) {
        const correctAnswer = correctOption.value;

        const question = {
            text: questionText,
            options: [option1, option2, option3, option4],
            answer: correctAnswer
        };
        questions.push(question);

        // Очищаем поля для следующего вопроса
        document.getElementById("question").value = "";
        document.getElementById("option1").value = "";
        document.getElementById("option2").value = "";
        document.getElementById("option3").value = "";
        document.getElementById("option4").value = "";
        correctOption.checked = false;

        displayQuestions();
    } else {
        alert("Пожалуйста, заполните все поля и выберите правильный ответ.");
    }
}

// Функция для отображения вопросов
function displayQuestions() {
    const quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = "";

    questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.innerHTML = `<h3>${question.text}</h3>`;

        question.options.forEach(option => {
            const optionElement = document.createElement("label");
            optionElement.className = "option";
            optionElement.innerHTML = `<input type="radio" name="question${index}" value="${option}"> ${option}`;
            questionDiv.appendChild(optionElement);
        });

        quizDiv.appendChild(questionDiv);
    });
}

// Функция для начала квиза
function startQuiz() {
    if (questions.length === 0) {
        alert("Сначала добавьте хотя бы один вопрос для квиза.");
        return;
    }

    document.querySelector(".question-form").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.querySelector('button[onclick="startQuiz()"]').style.display = "none";
    document.querySelector('button[onclick="calculateResult()"]').style.display = "inline";
    document.querySelector('button[onclick="restartQuiz()"]').style.display = "none";
}

// Функция для подсчета результата
function calculateResult() {
    let score = 0;

    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === question.options[question.answer - 1]) {
            score++;
        }
    });

    document.getElementById("result").innerText = `Ваш результат: ${score} из ${questions.length}`;
    document.querySelector('button[onclick="restartQuiz()"]').style.display = "inline"; // Показать кнопку "Начать заново"
}

// Функция для перезапуска квиза
function restartQuiz() {
    questions = []; // Очистить массив вопросов
    document.getElementById("quiz").innerHTML = ""; // Очистить отображаемые вопросы
    document.getElementById("result").innerText = ""; // Очистить результат
    document.querySelector(".question-form").style.display = "block"; // Показать форму для ввода вопросов
    document.getElementById("quiz").style.display = "none"; // Скрыть квиз
    document.querySelector('button[onclick="startQuiz()"]').style.display = "inline"; // Показать кнопку "Начать квиз"
    document.querySelector('button[onclick="calculateResult()"]').style.display = "none"; // Скрыть кнопку "Подсчитать результат"
    document.querySelector('button[onclick="restartQuiz()"]').style.display = "none"; // Скрыть кнопку "Начать заново"
}