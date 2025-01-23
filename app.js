document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '70c7e1'; // Remplacez par votre clé API OMDb
    const filmsList = document.getElementById('films-list');
    const loadMoreBtn = document.getElementById('load-more-btn');
    let currentPage = 1;
    

    // Fonction pour récupérer les films tendances
    async function loadFilms() {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=2024&page=${currentPage}`);
            const data = await response.json();

            if (data.Response === "True") {
                // Parcours des films et ajout au DOM
                data.Search.forEach(film => {
                    const filmElement = document.createElement('div');
                    filmElement.classList.add('film');

                    filmElement.innerHTML = `
                        <img src="${film.Poster}" alt="${film.Title}" class="film-poster">
                        <h3>${film.Title}</h3>
                        <p><a href="movie.html?imdbID=${film.imdbID}">En savoir plus</a></p>
                    `;
                    
                    filmsList.appendChild(filmElement);
                });

                // Incrémenter le numéro de page pour les films suivants
                currentPage++;
            } else {
                alert('Erreur de récupération des films.');
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    // Charger les films au démarrage
    loadFilms();

    // Charger plus de films lorsque l'utilisateur clique sur le bouton
    loadMoreBtn.addEventListener('click', loadFilms);
});
