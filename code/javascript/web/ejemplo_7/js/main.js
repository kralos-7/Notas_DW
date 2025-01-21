const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

async function fetchPosts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const posts = await response.json();

        // Mostrar datos en el DOM
        const postList = document.getElementById('post-list');
        posts.slice(0, 5).forEach(post => { // Mostrar solo los primeros 5 posts
        const postItem = document.createElement('div');
        postItem.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        postList.appendChild(postItem);
        });
    } catch (error) {
        console.error('Error al consumir la API:', error);
    }
}

fetchPosts();
