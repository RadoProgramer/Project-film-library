import { fetchData } from './popularFilms';
import { fetchFilmsByQuery } from './fetchFilms';
import { serchAndShowFilms } from './searchFormListener.js';

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const pagination = document.getElementById('pagination');
const searchForm = document.querySelector('#search-form');
let currPage = 1;
let totalPages = 1;
let query = '';

const fetchDataCallback = async page => {
  await fetchData(page);
  totalPages = 500;
  currPage = page;
  createPaginationButtons(currPage, totalPages);
};

const fetchFilmsByQueryCallback = async (query, page) => {
  await fetchFilmsByQuery(query, page);
  currPage = page;
  totalPages = 1;
  createPaginationButtons(currPage, totalPages);
};

// Funkcja tworząca przyciski paginacji
export function createPaginationButtons(currPage, totalPages) {
  pagination.innerHTML = '';

  const buttons = document.createDocumentFragment();

  // Przycisk dla pierwszej strony
  const firstPageButton = createButton('1', 1);
  if (currPage === 1) {
    firstPageButton.classList.add('active');
    prev.removeEventListener('click', handleNextButtonClick);
    prev.classList.add('disabled');
  } else {
    firstPageButton.classList.remove('active');
    prev.addEventListener('click', handlePrevButtonClick);
    prev.classList.remove('disabled');
  }
  firstPageButton.classList.add('pagination-button');
  buttons.appendChild(firstPageButton);

  // Dodaj trzy kropki po pierwszej stronie, jeśli więcej niż 3 strony
  if (totalPages > 3 && currPage > 2) {
    const dotsAfterFirstPage = document.createElement('span');
    dotsAfterFirstPage.textContent = '...';
    dotsAfterFirstPage.classList.add('dots');
    dotsAfterFirstPage.classList.add('pagination-span');
    buttons.appendChild(dotsAfterFirstPage);
  }

  // Wygeneruj przyciski dla poszczególnych stron - max 5
  for (let i = Math.max(2, currPage - 2); i <= Math.min(currPage + 2, totalPages - 1); i++) {
    const pageButton = createButton(i.toString(), i);
    if (i === currPage) {
      pageButton.classList.add('active');
    }
    buttons.appendChild(pageButton);
    pageButton.classList.add('pagination-button');
  }

  // Dodaj trzy kropki, jeśli nie jesteśmy na pierwszej stronie
  if (totalPages > 3 && currPage < totalPages - 1) {
    const dotsBeforeLastPage = document.createElement('span');
    dotsBeforeLastPage.textContent = '...';
    dotsBeforeLastPage.classList.add('dots');
    dotsBeforeLastPage.classList.add('pagination-span');
    buttons.appendChild(dotsBeforeLastPage);
  }

  // Przycisk dla ostatniej strony
  if (totalPages > 1) {
    const lastPageButton = createButton(totalPages.toString(), totalPages);
    if (currPage === totalPages) {
      lastPageButton.classList.add('active');
      next.removeEventListener('click', handleNextButtonClick);
      next.classList.add('disabled');
    } else {
      lastPageButton.classList.remove('active');
      next.addEventListener('click', handleNextButtonClick);
      next.classList.remove('disabled');
    }
    buttons.appendChild(lastPageButton);
    lastPageButton.classList.add('pagination-button');
  } else {
    next.removeEventListener('click', handleNextButtonClick);
    next.classList.add('disabled');
    prev.removeEventListener('click', handleNextButtonClick);
    prev.classList.add('disabled');
  }
  pagination.appendChild(buttons);

  // updatePaginationState();
}

function createButton(text, page) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', () => {
    handleButtonClick(page);
    window.scrollTo(0, 0);
  });
  return button;
}

function handleNextButtonClick() {
  if (currPage < totalPages) {
    handleButtonClick(currPage + 1);
    window.scrollTo(0, 0);
  }
}

function handlePrevButtonClick() {
  if (currPage > 1) {
    handleButtonClick(currPage - 1);
    window.scrollTo(0, 0);
  }
}

// Funkcja obsługująca kliknięcie na przycisk paginacji
function handleButtonClick(page) {
  currPage = page;
  query = searchForm.elements.searchQuery.value.trim().split(' ').join(`%20`);
  if (query === '') {
    // console.log(`Paginacja po popular films pade: ${page}`);
    fetchDataCallback(page);
  } else {
    console.log(`Paginacja po search films pade: ${page}`);
    serchAndShowFilms(searchForm.elements.searchQuery.value.trim().split(' ').join(`%20`), page);
  }
  window.scrollTo(0, 0);
}

fetchDataCallback(currPage);
