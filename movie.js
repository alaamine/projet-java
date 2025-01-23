document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '70c7e1'; // Remplacez par votre clé API OMDb
    const movieDetailsContainer = document.getElementById('movie-details');
    
    // Récupérer l'ID IMDb du film à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('imdbID');
    
    if (!imdbID) {
        movieDetailsContainer.innerHTML = '<p>Film introuvable. Veuillez revenir en arrière et réessayer.</p>';
        return;
    }

    // Fonction pour récupérer les détails d'un film
    async function fetchMovieDetails(imdbID) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
            const data = await response.json();

            if (data.Response === "True") {
                // Créer le contenu du film
                const movieHTML = `
                    <div class="movie">
                        <img src="${data.Poster}" alt="${data.Title}" class="movie-poster">
                        <h2>${data.Title}</h2>
                        <p><strong>Genre :</strong> ${data.Genre}</p>
                        <p><strong>Acteurs :</strong> ${data.Actors}</p>
                        <p><strong>Résumé :</strong> ${data.Plot}</p>
                        <p><strong>Note :</strong> ${data.imdbRating}</p>
                        <p><strong>Date de sortie DVD :</strong> ${data.Released ? formatDate(data.Released) : 'Non disponible'}</p>
                    </div>
                ` ;
                movieDetailsContainer.innerHTML = movieHTML;
            } else {
                movieDetailsContainer.innerHTML = '<p>Informations non disponibles pour ce film.</p>';
            }
        } catch (error) {
            console.error('Erreur de récupération des détails du film :', error);
            movieDetailsContainer.innerHTML = '<p>Erreur lors de la récupération des détails du film.</p>';
        }
    }

    // Fonction pour formater la date de sortie en DVD (si disponible)
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Appel de la fonction pour récupérer et afficher les détails du film
    fetchMovieDetails(imdbID);
});
