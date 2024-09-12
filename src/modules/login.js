console.log('login.js está cargado correctamente');

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  // Asegurarnos de que el formulario esté encontrado
  if (loginForm) {
    console.log("Formulario de login encontrado.");

    // Verificar que el evento submit se esté registrando correctamente
    loginForm.addEventListener('submit', function (event) {
      console.log('Evento submit disparado');
      event.preventDefault();  // Evitar que la página se recargue

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      console.log(`Valores ingresados - Email: ${email}, Password: ${password}`);

      // Verificar si los campos están completos
      if (!email || !password) {
        console.log('Campos incompletos.');
        alert('Por favor, completa todos los campos');
        return;
      }

      // Obtener usuarios desde localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      console.log('Usuarios en localStorage:', users);

      // Verificar si hay usuarios almacenados
      if (users.length === 0) {
        console.log('No hay usuarios registrados.');
        alert('No hay usuarios registrados');
        return;
      }

      // Buscar el usuario por email
      const user = users.find(u => u.email === email);

      if (user) {
        console.log('Usuario encontrado:', user);

        // Verificar si la contraseña es correcta
        if (user.password === password) {
          console.log('Contraseña correcta.');
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          alert('Inicio de sesión exitoso');
          setTimeout(() => {
            window.location.href = 'user.html';  // Redirigir a la página del usuario
          }, 2000);
        } else {
          console.log(`Contraseña incorrecta. Esperado: ${user.password}, Recibido: ${password}`);
          alert('Contraseña incorrecta');
        }
      } else {
        console.log('Usuario no encontrado con el email:', email);
        alert('Usuario no encontrado');
      }
    });
  } else {
    console.log('Formulario de login no encontrado.');
  }
});
