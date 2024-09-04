// usuario.js

// Función para inicializar la sección de gestión del usuario
const initUsuario = () => {
  const section = document.getElementById("loadUsuario");

  if (section) {
    section.innerHTML = `
        <h2>Configuración de Usuario</h2>
        <form id="usuarioForm">
          <input type="text" id="nombreUsuario" placeholder="Nombre de usuario" required />
          <input type="email" id="emailUsuario" placeholder="Correo electrónico" required />
          <button type="submit">Guardar Cambios</button>
        </form>
        <button id="changePassword">Cambiar Contraseña</button>
      `;

    const usuarioForm = document.getElementById("usuarioForm");
    usuarioForm.addEventListener("submit", handleSaveUsuario);

    const changePasswordButton = document.getElementById("changePassword");
    changePasswordButton.addEventListener("click", handleChangePassword);
  }
};

// Función para manejar la actualización de los datos del usuario
const handleSaveUsuario = (event) => {
  event.preventDefault();
  console.log("Guardar cambios de usuario...");
  // Lógica para guardar los cambios del usuario
};

// Función para manejar el cambio de contraseña
const handleChangePassword = () => {
  console.log("Cambiar contraseña...");
  // Lógica para cambiar la contraseña
};

// Iniciar el módulo de gestión de usuario
initUsuario();
