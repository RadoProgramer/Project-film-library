const toTop = document.querySelector('.to-top');

window.addEventListener('scroll', () => {
  const modal = document.querySelector('[data-modal]:not(.film-details-is-hidden)');

  if (modal) {
    toTop.classList.remove('active');
    return;
  }

  if (window.scrollY > 215) {
    toTop.classList.add('active');
  } else {
    toTop.classList.remove('active'); 
  }
});

// Nasłuchiwanie kliknięcia otwierającego okno modalne
document.body.addEventListener('click', (event) => {
  if (event.target.closest('[data-modal-open]')) {
    toTop.classList.remove('active'); //
  }
});

// Nasłuchiwanie zdarzenia zamknięcia okna modalnego
document.addEventListener('click', (event) => {
  const modalCloseButton = event.target.closest('.film-details-close');
  const modal = document.querySelector('[data-modal]');
  
  if (modalCloseButton || event.target === modal) {
    if (window.scrollY > 215) {
      toTop.classList.add('active');
    }
  }
});