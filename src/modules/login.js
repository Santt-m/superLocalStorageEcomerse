// src/modules/login.js

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
      console.log('Formulario de login encontrado.');
      loginForm.addEventListener('submit', function (event) {
          event.preventDefault();

          const email = document.getElementById('email').value.trim();
          const password = document.getElementById('password').value.trim();

          if (!email || !password) {
              alert('Por favor, completa todos los campos.');
              return;
          }

          // Obtener usuarios desde localStorage
          const users = JSON.parse(localStorage.getItem('users')) || [];

          // Buscar el usuario por email
          const user = users.find(u => u.email === email);

          if (user && user.password === password) {
              // Guardar el usuario logueado en localStorage
              localStorage.setItem('loggedInUser', JSON.stringify(user));
              alert('Inicio de sesión exitoso.');
              setTimeout(() => {
                  window.location.href = 'user.html';
              }, 1000);
          } else {
              alert('Email o contraseña incorrectos.');
          }
      });
  } else {
      console.log('Formulario de login no encontrado.');
  }
});
