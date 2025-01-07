import axios from 'axios';
import { createModalTemplate, openModal, closeModal } from './modal.js';
import { showLoader, hideLoader } from './loader.js';

const container = document.getElementById('movie-container');
const basicImage = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/movie/popular?api_key=b942b8bf626a04f48b07153a95ee51a0';
let array = [];
let globalNumber = 1;
const buttons = document.querySelector('.buttons');
changeValueButton(Array.from(buttons.children)[8]);
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');

const arrayMoves = [
  { 28: 'Action' },
  { 12: 'Adventure' },
  { 16: 'Animation' },
  { 35: 'Comedy' },
  { 80: 'Crime' },
  { 99: 'Documentary' },
  { 18: 'Drama' },
  { 10751: 'Family' },
  { 14: 'Fantasy' },
  { 36: 'History' },
  { 27: 'Horror' },
  { 10402: 'Music' },
  { 9648: 'Mystery' },
  { 10749: 'Romance' },
  { 878: 'Science Fiction' },
  { 10770: 'TV Movie' },
  { 53: 'Thriller' },
  { 10752: 'War' },
  { 37: 'Western' },
];

function changeValue(array) {
  const keys = [];
  const values = [];
  const response = [];

  arrayMoves.map(element => {
    keys.push(Object.keys(element)[0]);
    values.push(Object.values(element)[0]);
  });

  array.map(element => {
    const value = keys.indexOf(element.toString());
    response.push(values[value]);
  });
  return response;
}

async function fetchMove(number = 1) {
  globalNumber = number;
  try {
    array = [];
    let response = await axios.get(`${url}&page=${number}`);
    response.data['results'].forEach(element => {
      let obj = {};
      obj.key = element['title'];
      obj.value = [
        basicImage + element['poster_path'],
        element['release_date'].substring(0, 4),
        changeValue(element['genre_ids']),
        element['original_title'],
        element['overview'],
        element['popularity'],
        element['vote_average'],
        element['vote_count'],
      ];

      array.push(obj);
    });
    array.forEach(element => {
      const card = document.createElement('div');
      card.classList.add('card');
      const details = document.createElement('div');
      details.classList.add('details');
      let img = document.createElement('img');
      let title = document.createElement('h1');
      let genre = document.createElement('p');
      let year = document.createElement('p');

      img.src = Object.values(element)[1][0];
      title.textContent = element.key;
      genre.textContent = Object.values(element)[1][2];
      year.textContent = Object.values(element)[1][1];

      card.appendChild(img);
      card.appendChild(title);
      details.appendChild(genre);
      details.appendChild(year);
      card.appendChild(details);

      container.appendChild(card);
      card.addEventListener('click', () => {
        showLoader();
        const selectedMovie = {
          title: element.key,
          image: Object.values(element)[1][0],
          genre: Object.values(element)[1][2].join(', '),
          year: Object.values(element)[1][1],
          originalTitle: Object.values(element)[1][3],
          overview: Object.values(element)[1][4],
          popularity: Object.values(element)[1][5],
          voteAverage: Object.values(element)[1][6],
          voteCount: Object.values(element)[1][7],
        };
        setTimeout(() => {
          createModalTemplate();
          openModal(selectedMovie);
          hideLoader();
        }, 500);
      });
    });
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
}
fetchMove();

buttons.addEventListener('click', event => {
  const values = Array.from(buttons.children);

  const element0 = values[0];
  const element1 = values[2];
  const element2 = values[3];
  const element3 = values[4];
  const element4 = values[5];
  const element5 = values[6];
  const element6 = values[10];
  const element7 = values[7];
  const elementVoid1 = values[1];
  const elementVoid20 = values[9];

  container.innerHTML = '';
  //Przycisk <-
  if (event.target === element0 || event.target === arrowLeft) {
    if (values[5].textContent === '6') {
      buttons.children[2].innerHTML = '';
      buttons.children[2].textContent = '3';
    }
    if (element1.textContent !== '1') {
      values.map(element => {
        if (parseInt(element.textContent)) {
          if (globalNumber > 6) {
            element.textContent = parseInt(element.textContent) - 1;
          }
        } else {
          return;
        }
      });
    }
    if (globalNumber < 6) {
      values[globalNumber].classList.remove('current-page');
      values[globalNumber].classList.add('page-button');
      values[globalNumber - 1].classList.remove('page-button');
      values[globalNumber - 1].classList.add('current-page');
    }
    fetchMove(globalNumber - 1);
  }
  //przycisk ->
  else if (event.target === element6 || event.target === arrowRight) {
    if (element5.textContent !== '20' && globalNumber > 5) {
      values.map(element => {
        if (parseInt(element.textContent)) {
          element.textContent = parseInt(element.textContent) + 1;
        } else {
          return;
        }
      });
      changeValueButton(element1);
    }
    if (globalNumber < 5) {
      values[globalNumber].classList.remove('current-page');
      values[globalNumber].classList.add('page-button');
      values[globalNumber + 1].classList.remove('page-button');
      values[globalNumber + 1].classList.add('current-page');
    }
    if (globalNumber === 17) {
      values[8].textContent = '19';
    }
    fetchMove(globalNumber + 1);
  } else if (event.target === elementVoid1) {
    fetchMove(1);
  } else if (event.target === elementVoid20) {
    fetchMove(20);
    element1.textContent = '16';
    element2.textContent = '17';
    element3.textContent = '18';
    element4.textContent = '19';
    element5.textContent = '20';
  }

  elementVoid1.textContent = '1';
  elementVoid20.textContent = '20';
});

function changeValueButton(value) {
  value.innerHTML =
    '<svg width="11" height="16" viewBox="0 0 11 16"><circle cx="2" cy="8" r="1" fill="black" /><circle cx="5.5" cy="8" r="1" fill="black" /><circle cx="9" cy="8" r="1" fill="black" /></svg>';
}
