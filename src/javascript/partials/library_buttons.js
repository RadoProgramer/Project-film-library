import { createModalTemplate, openModal } from './modal.js';
import { showLoader, hideLoader } from './loader.js';

document.addEventListener('DOMContentLoaded', () => {
  const watchedButton = document.querySelector('[data-watched]');
  const queueButton = document.querySelector('[data-queue]');
  const watchedContainer = document.getElementById('watched-movies-container');
  const queueContainer = document.getElementById('queue-container');
  const watchedSection = document.querySelector('.watched-movies-section');
  const queueSection = document.querySelector('.queue-section');

  function renderMovies(movies, container) {
    container.innerHTML = '';
    movies.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('card');
      const img = document.createElement('img');
      const title = document.createElement('h1');
      const genre = document.createElement('p');
      const year = document.createElement('p');

      img.src = movie.image;
      title.textContent = movie.title;
      genre.textContent = movie.genre;
      year.textContent = movie.year;

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(genre);
      card.appendChild(year);
      container.appendChild(card);

      card.addEventListener('click', () => {
        showLoader();
        const selectedMovie = {
          title: movie.title,
          image: movie.image,
          genre: movie.genre,
          year: movie.year,
          originalTitle: movie.originalTitle,
          overview: movie.overview,
          popularity: movie.popularity,
          voteAverage: movie.voteAverage,
          voteCount: movie.voteCount,
        };
        setTimeout(() => {
          createModalTemplate();
          openModal(selectedMovie);
          hideLoader();
        }, 500);
      });
    });
  }

  function displayMovies(key, container) {
    const movies = JSON.parse(localStorage.getItem(key)) || [];
    renderMovies(movies, container);
  }

  function setActiveSection(section) {
    localStorage.setItem('activeSection', section);
  }

  function getActiveSection() {
    return localStorage.getItem('activeSection') || 'watched';
  }

  function initializeSections() {
    const activeSection = getActiveSection();
    if (activeSection === 'watched') {
      watchedButton.classList.add('SelectedButton');
      queueButton.classList.remove('SelectedButton');
      watchedSection.classList.add('active');
      queueSection.classList.remove('active');
      displayMovies('watchedMovies', watchedContainer);
      queueContainer.innerHTML = '';
    } else {
      queueButton.classList.add('SelectedButton');
      watchedButton.classList.remove('SelectedButton');
      queueSection.classList.add('active');
      watchedSection.classList.remove('active');
      displayMovies('queueMovies', queueContainer);
      watchedContainer.innerHTML = '';
    }
  }

  watchedButton.addEventListener('click', e => {
    if (!watchedButton.classList.contains('SelectedButton')) {
      e.target.classList.add('SelectedButton');
      queueButton.classList.remove('SelectedButton');
      watchedSection.classList.add('active');
      queueSection.classList.remove('active');
      displayMovies('watchedMovies', watchedContainer);
      queueContainer.innerHTML = '';
      setActiveSection('watched');
    }
  });

  queueButton.addEventListener('click', e => {
    if (!queueButton.classList.contains('SelectedButton')) {
      e.target.classList.add('SelectedButton');
      watchedButton.classList.remove('SelectedButton');
      queueSection.classList.add('active');
      watchedSection.classList.remove('active');
      displayMovies('queueMovies', queueContainer);
      watchedContainer.innerHTML = '';
      setActiveSection('queue');
    }
  });

  const backToHomeButton = document.querySelector('.LogoWraper');
  backToHomeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  initializeSections();
});
