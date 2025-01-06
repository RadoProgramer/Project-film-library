'use strict';

import axios from 'axios';

let currentFilmIndex = 0;
const loader = document.querySelector('.loader-container');

// Funkcja wyszukująca filmy na podstawie listy identyfikatorów
async function fetchFilmsByIds(movieIds) {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie',
    params: {
      api_key: '5abbb3dbf9a78bf33887465dc33dbfa3', 
      language: 'en-US',
      append_to_response: 'credits', 
    },
    headers: {
      accept: 'application/json',
    },
  };
  loader.classList.remove('visually-hidden');

  // Mapowanie listy identyfikatorów na listę zapytań do API
  const requests = movieIds.map(movieId =>
    axios.request({
      ...options,
      url: `${options.url}/${movieId}`, 
    }),
  );

  // Wykonaj równoległe zapytania do API dla każdego identyfikatora filmu
  const responses = await Promise.all(requests);

  return responses.map(response => response.data);
}

// Funkcja renderująca bibliotekę filmów
function renderLibrary(libraryData) {
  const galleryLibrary = document.querySelector('.gallery-library');
  loader.classList.add('visually-hidden');
  // Wyczyszczenie zawartości galerii przed dodaniem nowych elementów
  galleryLibrary.innerHTML = '';

  // Sprawdzenie czy dane istnieją i czy nie są puste
  if (!libraryData || libraryData.length === 0) {
    galleryLibrary.innerHTML = `
          <div class="empty-library">
              <p>Brak filmów w bibliotece</p>
              <div class="lCatson"></div>
          </div>`;
    return;
  }

  // Iteracja po filmach z danych z API
  libraryData.forEach(movie => {
    // Wygenerowanie markupu filmu i dodanie go do galerii
    const movieMarkup = createMovieMarkup(movie);
    galleryLibrary.insertAdjacentHTML('beforeend', movieMarkup);
  });
}

// Funkcja tworząca markup filmu
function createMovieMarkup(movie) {
  // Tworzenie markupu dla gatunków filmowych
  const genresMarkup = movie.genres
    .map(genre => `<span class="home-film-genre">${genre.name}</span>`)
    .join(' | ');

  // Tworzenie markupu dla pojedynczego filmu
  return `
        <li class="home-film-item" data-index="${movie.id}" data-modal-open>
          <img class="home-film-image" src="https://image.tmdb.org/t/p/original/${
            movie.poster_path
          }" alt="${movie.title}">
          <div class="home-film-details">
            <h2 class="home-film-title">${movie.title}</h2>
            <p class="home-film-info">
              <span class="home-film-genres">${genresMarkup}</span> |
              <span class="home-film-year">${movie.release_date.slice(0, 4)}</span>
              <span class="home-film-rating">${movie.vote_average.toFixed(1)}</span>
            </p>
          </div>
        </li>`;
}

// Funkcja wywołująca renderowanie biblioteki filmów
async function loadLibraryOnPageLoad() {
  const buttonWatched = document.getElementById('btnWatched');
  const buttonQueue = document.getElementById('btnQueue');

  try {
    // Pobranie filmów obejrzanych z localStorage
    const watchedMovies = JSON.parse(localStorage.getItem('movies-watched')) || [];
    // Pobranie filmów w kolejce z localStorage
    const queueMovies = JSON.parse(localStorage.getItem('movies-queue')) || [];

    // Wybór, która biblioteka ma być wyświetlana na starcie
    if (buttonWatched.classList.contains('isActive')) {
      // Pobranie danych o filmach z API na podstawie identyfikatorów obejrzanych filmów
      const watchedMoviesData = await fetchFilmsByIds(watchedMovies.map(movie => movie.id));
      // Renderowanie biblioteki filmów obejrzanych
      renderLibrary(watchedMoviesData);
    } else if (buttonQueue.classList.contains('isActive')) {
      // Pobranie danych o filmach z API na podstawie identyfikatorów filmów w kolejce
      const queueMoviesData = await fetchFilmsByIds(queueMovies.map(movie => movie.id));
      // Renderowanie biblioteki filmów w kolejce
      renderLibrary(queueMoviesData);
    } else {
      // Domyślnie wyświetla bibliotekę obejrzanych filmów
      const watchedMoviesData = await fetchFilmsByIds(watchedMovies.map(movie => movie.id));
      renderLibrary(watchedMoviesData);
      buttonWatched.classList.add('isActive');
    }
  } catch (error) {
    console.error('Error rendering library:', error);
  }

  // Obsługa przycisku "Watched"
  buttonWatched.addEventListener('click', async () => {
    try {
      const watchedMovies = JSON.parse(localStorage.getItem('movies-watched')) || [];
      const watchedMoviesData = await fetchFilmsByIds(watchedMovies.map(movie => movie.id));
      renderLibrary(watchedMoviesData);
      buttonWatched.classList.add('isActive');
      buttonQueue.classList.remove('isActive');
    } catch (error) {
      console.error('Error rendering watched library:', error);
    }
  });

  // Obsługa przycisku "Queue"
  buttonQueue.addEventListener('click', async () => {
    try {
      const queueMovies = JSON.parse(localStorage.getItem('movies-queue')) || [];
      const queueMoviesData = await fetchFilmsByIds(queueMovies.map(movie => movie.id));
      renderLibrary(queueMoviesData);
      buttonQueue.classList.add('isActive');
      buttonWatched.classList.remove('isActive');
    } catch (error) {
      console.error('Error rendering queue library:', error);
    }
  });
}

// Nasłuchiwanie zdarzenia DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadLibraryOnPageLoad);
