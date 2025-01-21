const pokemonList = document.getElementById('pokemon-list');
const loadMoreButton = document.getElementById('load-more');
let offset = 0; // Controla el número inicial de Pokémon que cargamos
const limit = 10; // Número de Pokémon por página

// Función para obtener Pokémon de la API
async function fetchPokemon(offset, limit) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const promises = data.results.map(async (pokemon) => {
        const pokemonData = await fetch(pokemon.url);
        return pokemonData.json();
    });
    const detailedPokemon = await Promise.all(promises);
    displayPokemon(detailedPokemon);
    } catch (error) {
        console.error('Error al consumir la API:', error);
    }
}

// Función para mostrar Pokémon en el DOM
function displayPokemon(pokemonArray) {
    pokemonArray.forEach((pokemon) => {
        const pokemonItem = document.createElement('li');
        pokemonItem.classList.add('pokemon-item');
        pokemonItem.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        `;
        pokemonList.appendChild(pokemonItem);
    });
}

// Evento para cargar más Pokémon
loadMoreButton.addEventListener('click', () => {
    offset += limit;
    fetchPokemon(offset, limit);
});

// Cargar los primeros Pokémon al cargar la página
fetchPokemon(offset, limit);
