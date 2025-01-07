import axios from 'axios';
import { changeValue } from './home.js';
import { createModalTemplate, openModal } from './modal.js';
import { showLoader, hideLoader } from './loader.js';

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/search/movie',
  params: { include_adult: 'false', language: 'en-US', page: '1' },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTQ5ZjM1MTU2YjdiYzY3YTNkMTY1NWQxMDQ5NDExYSIsInN1YiI6IjY2NDI1MDE5OTdiOTNlNDk1OTg2YmE1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XjPqIT4Z3yZi0E_V-CScMwfs6f6w2Dx8qFPL-PNdQkw',
  },
};

async function searchMovies(query, page = 1) {
  try {
    options.params.query = query;
    options.params.page = page;

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Błąd podczas wyszukiwania filmów:', error);
    throw error;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.SearchForm');
  const searchInput = document.getElementById('search-input');
  const searchContainer = document.getElementById('movie-container');

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    showLoader();

    const query = searchInput.value;
    try {
      searchContainer.innerHTML = '';
      headerMessage.innerHTML = '';

      const searchData = await searchMovies(query);

      if (searchData.results.length === 0) {
        const notFoundMessage = document.createElement('p');
        notFoundMessage.textContent = 'Search result not found';
        notFoundMessage.classList.add('not-found-message');
        headerMessage.appendChild(notFoundMessage);
      } else {
        searchData.results.forEach(movie => {
          const { poster_path, title, release_date, genre_ids } = movie;
          if (poster_path && title && release_date && genre_ids && genre_ids.length > 0) {
            const card = document.createElement('div');
            card.classList.add('card');

            const details = document.createElement('div');
            details.classList.add('details');

            const img = document.createElement('img');
            const title = document.createElement('h1');
            const genre = document.createElement('p');
            const year = document.createElement('p');

            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            title.textContent = movie.title;
            year.textContent = movie.release_date.substring(0, 4);
            const genres = changeValue(movie.genre_ids).slice(0, 3);
            genre.textContent = genres.join(', ');

            card.appendChild(img);
            card.appendChild(title);
            details.appendChild(genre);
            details.appendChild(year);
            card.appendChild(details);

            card.addEventListener('click', () => {
              showLoader();

              const selectedMovie = {
                title: movie.title,
                image: img.src,
                genre: genre.textContent,
                year: year.textContent,
                originalTitle: movie.original_title,
                overview: movie.overview,
                popularity: movie.popularity,
                voteAverage: movie.vote_average,
                voteCount: movie.vote_count,
              };

              setTimeout(() => {
                createModalTemplate();
                openModal(selectedMovie);
                hideLoader();
              }, 500);
            });
            searchContainer.appendChild(card);
          }
        });
      }
      setTimeout(() => {
        hideLoader();
      }, 500);
    } catch (error) {
      console.error('Błąd wyszukiwania:', error);
      hideLoader();
    }
  });
});
