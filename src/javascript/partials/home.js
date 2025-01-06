const backToHomeButton = document.querySelector('.LogoWrapper');
backToHomeButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});

const array = [];

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

export { array, changeValue, arrayMoves };
