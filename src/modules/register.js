console.log('register.js está cargado correctamente');

export function initRegister() {
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    console.log("Formulario de registro encontrado.");
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log('Formulario de registro enviado');

      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      // Obtener usuarios desde localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      console.log('Usuarios actuales en localStorage:', users);

      // Verificar si el email ya está registrado
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        console.log('El email ya está registrado.');
        alert('El email ya está registrado');
        return;
      }

      // Crear el nuevo usuario
      const newUser = {
        id: users.length + 1,
        username,
        email,
        password
      };

      // Agregar el nuevo usuario al array de usuarios
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      console.log('Registro exitoso, usuarios actualizados:', users);
      alert('Registro exitoso');
      setTimeout(() => {
        window.location.href = 'login.html';  // Redirigir al login
      }, 2000);
    });
  } else {
    console.log('Formulario de registro no encontrado.');
  }
}
