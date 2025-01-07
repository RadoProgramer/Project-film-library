function showLoader() {
  const loaderContainer = document.getElementById('loader-container');
  loaderContainer.style.display = 'block';
}

function hideLoader() {
  const loaderContainer = document.getElementById('loader-container');
  loaderContainer.style.display = 'none';
}

export { showLoader, hideLoader };
