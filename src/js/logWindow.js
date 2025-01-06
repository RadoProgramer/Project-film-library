import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDrsw02tJfVOg5942KrmMQDgPqT2tORfaM',
  authDomain: 'goit-filmoteka-group6.firebaseapp.com',
  projectId: 'goit-filmoteka-group6',
  storageBucket: 'goit-filmoteka-group6.appspot.com',
  messagingSenderId: '259145174211',
  appId: '1:259145174211:web:3abb6bd76e9ef12b746676',
  measurementId: 'G-7R0DRVYQHE',
};

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Rejestracja użytkownika //
document.getElementById('signup-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log('Rejestracja udana', userCredential);
    })
    .catch(error => {
      console.error('Błąd rejestracji', error);
    });
});

// Logowanie użytkownika //
document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log('Logowanie udane', userCredential);
    })
    .catch(error => {
      console.error('Błąd logowania', error);
    });
});

// Wylogowywanie użytkownika //
document.getElementById('logout-btn').addEventListener('click', function () {
  signOut(auth)
    .then(() => {
      console.log('Użytkownik wylogowany');
    })
    .catch(error => {
      console.error('Błąd wylogowywania', error);
    });
});

// Status użytkownika //
onAuthStateChanged(auth, user => {
  if (user) {
    console.log('Użytkownik zalogowany', user);
    document.getElementById('logout-btn').style.display = 'block';
  } else {
    console.log('Użytkownik wylogowany');
    document.getElementById('logout-btn').style.display = 'none';
  }
});

const logRegBtn = document.querySelector('.icon-user');
const modalRegLog = document.querySelector('.log-reg');
const logRegCloseBtn = document.querySelector('.log-window-close-btn');
const logBackdrop = document.querySelector('.log-window-backdrop');

logRegBtn.addEventListener('click', () => {
  modalRegLog.classList.toggle('show-log-reg-window');
});

logRegBtn.onclick = function () {
  modalRegLog.style.display = 'block';
  logBackdrop.style.display = 'block';
};
logRegCloseBtn.onclick = function () {
  modalRegLog.style.display = 'none';
  logBackdrop.style.display = 'none';
  modalRegLog.classList.remove('right-panel-active');
};

window.onclick = function (event) {
  if (event.target === logBackdrop) {
    modalRegLog.style.display = 'none';
    logBackdrop.style.display = 'none';
    modalRegLog.classList.remove('right-panel-active');
  }
};
