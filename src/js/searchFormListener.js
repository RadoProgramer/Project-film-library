import Notiflix from 'notiflix';
import { showFilms } from './showFilms';
import { fetchFilmsByQuery } from "./fetchFilms.js"
import { createPaginationButtons } from './pagination';

const searchForm = document.querySelector('#search-form');
const errorText = document.querySelector('.errorText');

searchForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const query = searchForm.elements.searchQuery.value.trim().split(' ').join(`%20`);
    serchAndShowFilms(query, 1);
});

export function serchAndShowFilms(query, page) {
    if (query === '') {
        Notiflix.Notify.warning('Enter some text...');
    } else {
        fetchFilmsByQuery(query, page)
            .then(res => {
                if (res.data.total_results === 0) {
                    errorText.classList.remove('hiddenVisibility');
                } else {
                    errorText.classList.add('hiddenVisibility');
                    Notiflix.Notify.success(`Znaleziono: ${res.data.total_results}`);
                    const data = res.data;
                    const totalPages = data.total_pages;
                    showFilms(res);
                    createPaginationButtons(page, totalPages);
                }
            })
            .catch(error => {});
    }
}
