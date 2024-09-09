// src/modules/login.js
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    alert('Inicio de sesión exitoso');
    window.location.href = 'user.html';
  } else {
    alert('Usuario o contraseña incorrectos.');
  }
}

export function initLogin() {
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', handleLogin);
  }
  console.log("Módulo de login cargado.");
}
