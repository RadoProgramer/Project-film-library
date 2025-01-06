var modal = document.getElementById('myModal');
var closeButton = modal.querySelector('.close');
let button = document.querySelector('#myBtn');

button.addEventListener('click', openModal);

function openModal() {
  modal.classList.add('show');
}

function closeModal() {
  modal.classList.remove('show');
}

closeButton.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    closeModal();
  }
});
