import axios from 'axios';
import { getGenres } from './fetchFilms.js';

export async function showFilms(res) {
  const loader = document.querySelector('.loader-container');
  const filmList = document.querySelector('.home-film-list');
  let currentFilmIndex = 0;
  const movies = res.data.results;
  // console.log(movies);
  loader.classList.remove('visually-hidden');

  // Pobieranie gatunków filmowych
  let src_img;
  const genresResponse = await getGenres();
  const genresMap = {};
  genresResponse.data.genres.forEach(genre => {
    genresMap[genre.id] = genre.name;
  });

  // Tworzenie markupu dla każdego filmu
  const markupArray = movies.map(movie => {
    const genreNames = movie.genre_ids.map(genreId => genresMap[genreId]).slice(0, 2);
    const genresMarkup = genreNames.join(', ');
    if (movie.poster_path != null) {
      src_img = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    } else {
      src_img =
        'https://as2.ftcdn.net/v2/jpg/04/00/24/31/1000_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg';
    }
    return `
            <li class="home-film-item" data-index="${movie.id}" data-modal-open>
                <img class="home-film-image" src="${src_img}" alt="${
      movie.title
    }" width="200px" height="300px">
                <div class="home-film-details">
                    <h2 class="home-film-title">${movie.title}</h2>
                    <p class="home-film-info">
                        <span class="home-film-type">${genresMarkup}</span> |
                        <span class="home-film-year">${movie.release_date.slice(0, 4)}</span>
                        <span class="home-film-rating">${movie.vote_average.toFixed(1)}</span>
                    </p>
                </div>
            </li>`;
  });

  loader.classList.add('visually-hidden');
  // Wstawianie wygenerowanego markupu do elementu HTML
  filmList.innerHTML = markupArray.join('');
}
