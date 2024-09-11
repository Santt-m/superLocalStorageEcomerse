// src/modules/register.js
import { createAlert } from './modal.js';  // Importar la función de alert

export function initRegister() {
  const registerForm = document.getElementById('registerForm');
  
  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Verificar si ya existe un usuario con el mismo email
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        createAlert('El email ya está registrado', 3000, 'error');  // Alert de error si ya existe el email
        return;
      }

      const newUser = {
        id: users.length + 1,
        username,
        email,
        password,
        profileImage: '../img/profiles/user-solid.svg',
        empresas: []
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      createAlert('Registro exitoso', 3000, 'success');  // Alert de éxito
      setTimeout(() => {
        window.location.href = 'login.html';  // Redirigir tras el éxito
      }, 3000);
    });
  } else {
    console.error('El formulario de registro no fue encontrado');
  }
}
