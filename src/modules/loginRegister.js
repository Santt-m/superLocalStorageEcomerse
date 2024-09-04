// loginRegister.js

// Función para inicializar la sección de login/registro
const initLoginRegister = () => {
    const section = document.getElementById('loadLoginRegister');
  
    if (section) {
      section.innerHTML = `
        <h2>Login</h2>
        <form id="loginForm">
          <input type="email" id="email" placeholder="Correo electrónico" required />
          <input type="password" id="password" placeholder="Contraseña" required />
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>¿No tienes una cuenta? <a href="#" id="registerLink">Regístrate aquí</a></p>
        <div id="registerFormContainer"></div>
      `;
  
      const loginForm = document.getElementById('loginForm');
      loginForm.addEventListener('submit', handleLogin);
  
      const registerLink = document.getElementById('registerLink');
      registerLink.addEventListener('click', showRegisterForm);
    }
  };
  
  // Función para manejar el login del usuario
  const handleLogin = (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
  
    const user = Object.values(usuarios).find(user => user.email === email && user.password === password);
  
    if (user) {
      console.log('Usuario autenticado:', user);
      alert('Inicio de sesión exitoso');
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.reloadApp();
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };
  
  // Función para mostrar el formulario de registro
  const showRegisterForm = () => {
    const registerFormContainer = document.getElementById('registerFormContainer');
    registerFormContainer.innerHTML = `
      <h2>Registro</h2>
      <form id="registerForm">
        <input type="text" id="newUsername" placeholder="Nombre de usuario" required />
        <input type="email" id="newEmail" placeholder="Correo electrónico" required />
        <input type="password" id="newPassword" placeholder="Contraseña" required />
        <button type="submit">Registrarse</button>
      </form>
    `;
  
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', handleRegister);
  };
  
  // Función para manejar el registro de un nuevo usuario
  const handleRegister = (event) => {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPassword = document.getElementById('newPassword').value;
  
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
  
    const newUserId = `usuarioID${Object.keys(usuarios).length + 1}`;
    usuarios[newUserId] = {
      id: newUserId,
      nombre: newUsername,
      email: newEmail,
      password: newPassword,
      empresas: [] // Inicializar con un array vacío de empresas
    };
  
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuario registrado exitosamente, ahora puede iniciar sesión');
    window.reloadApp(); // Recargar la aplicación para que el usuario pueda iniciar sesión
  };
  
  // Iniciar el módulo de login/registro
  initLoginRegister();
  