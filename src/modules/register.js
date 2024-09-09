// src/modules/register.js
function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];

  if (users.find(user => user.email === email)) {
    alert('El usuario ya está registrado.');
  } else {
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuario registrado con éxito.');
    window.location.href = 'login.html';
  }
}

export function initRegister() {
  const form = document.getElementById('registerForm');
  if (form) {
    form.addEventListener('submit', handleRegister);
  }
  console.log("Módulo de registro cargado.");
}
