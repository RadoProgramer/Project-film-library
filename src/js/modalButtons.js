import Notiflix from 'notiflix';

export function locStorage(film) {
  const addQueueRef = document.querySelector('.button-queue');
  const addWatchedRef = document.querySelector('.button-watched');

  function addToQueue() {
    Notiflix.Notify.info(`The movie: "${film.data.title}" has been added to the queue`);
  }

  function infoRemoveFromQueue() {
    Notiflix.Report.info(
      'Removing the movie',
      `You delete "${film.data.title}" from the queue`,
      'Okay',
      removeFromQueue,
    );
  }

  function removeFromQueue() {
    Notiflix.Notify.info(`The movie: "${film.data.title}" has been removed from the queue`);
  }

  function addToWatched() {
    Notiflix.Notify.info(`The movie: "${film.data.title}" has been added to watched`);
  }

  function infoRemoveFromWatched() {
    Notiflix.Report.info(
      'Removing the movie',
      `You delete "${film.data.title}" from the watched`,
      'Okay',
      removeFromWatched,
    );
  }

  function removeFromWatched() {
    Notiflix.Notify.info(`The movie: "${film.data.title}" has been removed from watched`);
  }

  const moviesWatched = JSON.parse(localStorage.getItem('movies-watched')) || [];
  const moviesQueue = JSON.parse(localStorage.getItem('movies-queue')) || [];

  // Buttons
  // Listener "Add to Watched" "Add to Queue"
  addWatchedRef.addEventListener('click', onWatchedClick);
  addQueueRef.addEventListener('click', onQueueClick);

  // Zmiana nazwy przycisku
  if (localStorage.length > 0) {
    if (moviesWatched.find(item => item.id === film.data.id)) {
      addWatchedRef.classList.add('js-remove-from');
      addWatchedRef.textContent = 'remove from watched';
    }
  }
  if (localStorage.length > 0) {
    if (moviesQueue.find(item => item.id === film.data.id)) {
      addQueueRef.classList.add('js-remove-from');
      addQueueRef.textContent = 'remove from queue';
    }
  }

  // Funkcja dodawania do localstorage 'Watched'
  function onWatchedClick() {
    if (!moviesWatched.find(item => item.id === film.data.id)) {
      moviesWatched.push(film.data);
      localStorage.setItem('movies-watched', JSON.stringify(moviesWatched));
      const res = addWatchedRef.classList.toggle('js-remove-from');
      addWatchedRef.textContent = `${res ? 'remove from' : 'add to'} watched `;
      addToWatched();
      return;
    }
    let index = moviesWatched.findIndex(object => object.id === film.data.id);
    moviesWatched.splice(index, 1);
    localStorage.setItem('movies-watched', JSON.stringify(moviesWatched));
    const res = addWatchedRef.classList.toggle('js-remove-from');
    addWatchedRef.textContent = `${res ? 'remove from' : 'add to'} watched `;
    infoRemoveFromWatched();
  }

  // Funkcja dodawania do lokalstorage 'Queue'
  function onQueueClick() {
    if (!moviesQueue.find(item => item.id === film.data.id)) {
      moviesQueue.push(film.data);
      localStorage.setItem('movies-queue', JSON.stringify(moviesQueue));
      const res = addQueueRef.classList.toggle('js-remove-from');
      addQueueRef.textContent = `${res ? 'remove from' : 'add to'} queue `;
      addToQueue();
      return;
    }
    let index = moviesQueue.findIndex(object => object.id === film.data.id);
    moviesQueue.splice(index, 1);
    localStorage.setItem('movies-queue', JSON.stringify(moviesQueue));
    const res = addQueueRef.classList.toggle('js-remove-from');
    addQueueRef.textContent = `${res ? 'remove from' : 'add to'} queue `;
    infoRemoveFromQueue();
  }

  // --------------------------Trailer ----------------------------------------

  const apiKey = 'c2f18aa0c4ee94c87f87834077fd721a';

  const trailerButton = document.querySelector('.btn-youtube');

  trailerButton.addEventListener('click', async () => {
    const movieId = film.data.id;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
    );
    const data = await response.json();

    if (data.results.length === 0) {
      // Jeśli nie ma dostępnego trailera
      Notiflix.Notify.info(`The movie: "${film.data.title}" does not have a trailer`);
    } else {
      const trailerKey = data.results[0].key;

      window.open(`https://www.youtube.com/watch?v=${trailerKey}`);
    }
  });
}
