// Obtener referencias a los elementos
const button = document.getElementById('clickButton');
const input = document.getElementById('textInput');
const messageDiv = document.getElementById('message');

// Agregar un evento al botón
button.addEventListener('click', () => {
    messageDiv.textContent = '¡Has hecho clic en el botón!';
});

// Agregar un evento al input
input.addEventListener('change', (event) => {
    messageDiv.textContent = `Has escrito: ${event.target.value}`;
});
