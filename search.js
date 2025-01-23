document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '70c7e1'; // Remplacez par votre clé API OMDb
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const loadMoreBtn = document.getElementById('load-more-btn');
    let searchQuery = '';
    let currentPage = 1;
    let debounceTimeout;

    async function searchFilms(query, page = 1) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`);
            const data = await response.json();

            if (data.Response === "True") {
                data.Search.forEach(film => {
                    const filmElement = document.createElement('div');
                    filmElement.classList.add('film');
                    filmElement.innerHTML = `
                        <img src="${film.Poster}" alt="${film.Title}" class="film-poster">
                        <h3>${film.Title}</h3>
                        <p><a href="movie.html?imdbID=${film.imdbID}">En savoir plus</a></p>
                    `;
                    searchResults.appendChild(filmElement);
                });
                currentPage++;
            } else {
                if (page === 1) {
                    searchResults.innerHTML = `<p class="error">Aucun résultat trouvé pour "${query}".</p>`;
                }
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue. Vérifiez votre connexion ou réessayez plus tard.');
        }
    }

    // Gestion de la saisie avec délai
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(() => {
            searchQuery = searchInput.value.trim();

            // Vérifier que la recherche a au moins 3 caractères
            if (searchQuery.length >= 3) {
                searchResults.innerHTML = ''; // Réinitialiser les résultats
                currentPage = 1; // Réinitialiser la page
                searchFilms(searchQuery); // Lancer la recherche
            } else {
                searchResults.innerHTML = ''; // Effacer les résultats si la saisie est trop courte
            }
        }, 300); // Délai de 300ms
    });

    // Charger plus de films lorsque l'utilisateur clique sur "Charger plus"
    loadMoreBtn.addEventListener('click', () => {
        if (searchQuery.length >= 3) {
            searchFilms(searchQuery, currentPage);
        }
    });
});
