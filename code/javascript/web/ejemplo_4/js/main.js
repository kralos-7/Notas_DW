// URL de la API
const apiUrl = 'https://jsonplaceholder.typicode.com/users';

// Consumir la API con fetch
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Error en la solicitud');
    }
    return response.json(); // Convertir la respuesta a JSON
    })
    .then(data => {
        // Mostrar datos en el DOM
        const userList = document.getElementById('user-list');
		alert(JSON.stringify(data));
        data.forEach(user => {
        const userItem = document.createElement('p');
        userItem.textContent = `${user.name} (${user.email})`;
        userList.appendChild(userItem);
    });
    })
    .catch(error => {
        console.error('Error al consumir la API:', error);
    });
