// src/modules/login.js
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  // Verificar si el formulario existe
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
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
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
});
