// axios
import axios from 'axios';

// Pobieranie gatunków
export async function getGenres() {
  return axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=c2f18aa0c4ee94c87f87834077fd721a&language=en-EN`,
  );
}

// Pobieranie listy filmów z szukaną frazą
export async function fetchFilmsByQuery(query, page) {
  try {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {
        query: query,
        include_adult: 'false',
        language: 'en-US',
        page: `${page}`,
      },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjRiYzVmYTA0ZTcwZWUwNmI1YmZjZmZkZDAwMjhmZiIsInN1YiI6IjY1ZjFiYzIwZDY0YWMyMDBjYTVkMWU2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kSA66Srxuh9huCM-91QWv-1PAFYBxqjt-fFzzJb4bmg',
      },
    };

    const response = await axios.request(options);
    // console.log(`Szukamy: ${query} na stronie ${page}`);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Pobieranie danych na temat filmu o konkretnym ID
export async function fetchFilmsById(idFilm) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${idFilm}`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjRiYzVmYTA0ZTcwZWUwNmI1YmZjZmZkZDAwMjhmZiIsInN1YiI6IjY1ZjFiYzIwZDY0YWMyMDBjYTVkMWU2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kSA66Srxuh9huCM-91QWv-1PAFYBxqjt-fFzzJb4bmg',
    },
  };
  const res = await axios.request(options);
  return res;
}
