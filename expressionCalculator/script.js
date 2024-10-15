document.addEventListener("DOMContentLoaded", () => {
	const expressionInput = document.getElementById('expressionInput');
	const calculateBtn = document.getElementById('calculateBtn');
	const resultDiv = document.getElementById('result');
	const errorDiv = document.getElementById('error');
	const historyList = document.getElementById('history');
	const toggleHistoryBtn = document.getElementById('toggleHistoryBtn');
	const historyContainer = document.getElementById('historyContainer');
	
	let variables = {}; // Объект для хранения пользовательских переменных
	let hasCalculations = false; // Флаг для отслеживания, были ли вычисления
  
	calculateBtn.addEventListener('click', () => {
	  const expression = expressionInput.value.trim(); // Убираем пробелы
  
	  // Проверка на пустой ввод
	  if (expression === '') {
		errorDiv.textContent = 'Ошибка: Введите выражение для вычисления';
		return; // Прерываем выполнение, если выражение пустое
	  }
  
	  errorDiv.textContent = ''; // Очищаем сообщения об ошибках
	  resultDiv.textContent = ''; // Очищаем результат
  
	  try {
		const processedExpression = processExpression(expression);
		const result = eval(processedExpression);
		resultDiv.textContent = `Результат: ${result}`;
		
		// Добавляем выражение и результат в историю
		const historyItem = document.createElement('li');
		historyItem.textContent = `${expression} = ${result}`;
		historyList.appendChild(historyItem);
  
		// Активируем кнопку истории
		if (!hasCalculations) {
		  toggleHistoryBtn.disabled = false;
		  toggleHistoryBtn.classList.remove('error');
		  hasCalculations = true;
		}
		
	  } catch (error) {
		errorDiv.textContent = 'Ошибка: ' + error.message;
	  }
	});
  
	// Обработка выражения с заменой переменных и функций
	function processExpression(expr) {
	  // Разделяем выражение на части, если это присвоение переменной
	  if (expr.includes('=')) {
		const [varName, valueExpr] = expr.split('=').map(part => part.trim());
		
		// Проверяем, что переменная - это валидное имя
		if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(varName)) {
		  throw new Error('Некорректное имя переменной');
		}
  
		// Вычисляем значение выражения
		const value = eval(valueExpr);
		variables[varName] = value; // Сохраняем переменную
		return value;
	  }
  
	  // Заменяем переменные в выражении
	  for (let varName in variables) {
		const varValue = variables[varName];
		expr = expr.replace(new RegExp(`\\b${varName}\\b`, 'g'), varValue);
	  }
  
	  // Поддержка математических функций
	  expr = expr.replace(/\bsqrt\(/g, 'Math.sqrt(');
	  expr = expr.replace(/\bpow\(/g, 'Math.pow(');
	  expr = expr.replace(/\bsin\(/g, 'Math.sin(');
	  expr = expr.replace(/\bcos\(/g, 'Math.cos(');
	  expr = expr.replace(/\btan\(/g, 'Math.tan(');
	  expr = expr.replace(/\blog\(/g, 'Math.log(');
  
	  return expr;
	}
  
	// Обработка нажатия на кнопку "Показать/Скрыть историю"
	toggleHistoryBtn.addEventListener('click', () => {
	  if (hasCalculations) {
		// Переключаем видимость блока истории
		if (historyContainer.style.display === 'none') {
		  historyContainer.style.display = 'block';
		} else {
		  historyContainer.style.display = 'none';
		}
	  }
	});
	
	// Изначально делаем кнопку неактивной и красим ее в ошибочный цвет
	toggleHistoryBtn.classList.add('error');
  });