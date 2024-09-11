import { createAlert } from './modal.js';  // Asegúrate de que esta importación esté funcionando

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  // Verificar si el formulario existe
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();  // Evitar que se recargue la página

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      // Verificar si los campos están completos
      if (!email || !password) {
        createAlert('Por favor, completa todos los campos', 3000, 'warning');
        return;
      }

      // Obtener usuarios desde localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);

      // Si encuentra al usuario
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        createAlert('Inicio de sesión exitoso', 3000, 'success');
        setTimeout(() => {
          window.location.href = 'user.html';  // Redirigir después del éxito
        }, 3000);
      } else {
        createAlert('Usuario o contraseña incorrectos', 3000, 'error');
      }
    });
  } else {
    console.error('El formulario de login no fue encontrado.');
  }
});
