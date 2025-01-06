import axios from 'axios';
import { showFilms } from './showFilms';
import { createPaginationButtons } from './pagination';

let itemsPerPage = 20;
let totalPages = 1;

export const fetchData = async (page = 1) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=c2f18aa0c4ee94c87f87834077fd721a&language=en-EN&per_page=${itemsPerPage}&page=${page}`,
    );
    showFilms(response);
    // const data = response.data;
    totalPages = 500;

    createPaginationButtons(page, totalPages, fetchData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Wywołanie funkcji fetchData, aby pobrać dane i wygenerować markup filmów
fetchData();
