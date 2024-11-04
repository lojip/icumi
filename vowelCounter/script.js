function countVowels(str) {
	const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
	let count = 0;
  
	for (let char of str.toLowerCase()) {
	  if (vowels.includes(char)) {
		count++;
	  }
	}
  
	return count;
  }
  
  function calculateVowels() {
	const inputText = document.getElementById('inputText').value;
	const vowelCount = countVowels(inputText);
	document.getElementById('result').innerText = `Количество гласных: ${vowelCount}`;
  }