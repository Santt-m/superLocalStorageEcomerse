// src/modules/register.js

document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
      console.log('Formulario de registro encontrado.');
      registerForm.addEventListener('submit', function (event) {
          event.preventDefault();

          const username = document.getElementById('username').value.trim();
          const email = document.getElementById('email').value.trim();
          const password = document.getElementById('password').value.trim();

          // Verificar que todos los campos estén completos
          if (!username || !email || !password) {
              alert('Por favor, completa todos los campos.');
              return;
          }

          // Obtener usuarios desde localStorage
          const users = JSON.parse(localStorage.getItem('users')) || [];

          // Verificar si el email ya está registrado
          const existingUser = users.find(user => user.email === email);
          if (existingUser) {
              alert('El email ya está registrado.');
              return;
          }

          // Crear nuevo usuario
          const newUser = {
              id: users.length + 1,
              username,
              email,
              password
          };

          // Guardar el nuevo usuario en localStorage
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));
          console.log('Nuevo usuario registrado:', newUser);

          alert('Registro exitoso. Redirigiendo a la página de inicio de sesión.');
          setTimeout(() => {
              window.location.href = 'login.html';
          }, 1000);
      });
  } else {
      console.log('Formulario de registro no encontrado.');
  }
});
