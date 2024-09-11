export function initFooter() {
    const footer = document.querySelector('footer');
  
    const footerHTML = `
      <div class="footer-panel">
        <h3>Gestión de LocalStorage</h3>
        <button id="view-storage-btn" class="btn">Ver LocalStorage</button>
        <button id="clear-storage-btn" class="btn">Borrar LocalStorage</button>
        <button id="install-defaults-btn" class="btn">Instalar Datos Predeterminados</button>
        <pre id="storage-output" style="display:none;"></pre>
      </div>
    `;
  
    footer.innerHTML = footerHTML;
  
    // Mostrar el contenido de localStorage
    document.getElementById('view-storage-btn').addEventListener('click', () => {
      const storageOutput = document.getElementById('storage-output');
      storageOutput.style.display = 'block';
      storageOutput.textContent = JSON.stringify(localStorage, null, 2);
    });
  
    // Borrar localStorage
    document.getElementById('clear-storage-btn').addEventListener('click', () => {
      localStorage.clear();
      alert('LocalStorage borrado');
      document.getElementById('storage-output').textContent = '';
    });
  
    // Instalar datos predeterminados
    document.getElementById('install-defaults-btn').addEventListener('click', () => {
      const defaultUsers = [
        {
          id: 1,
          username: "usuario1",
          email: "usuario1@correo.com",
          password: "password1",
          profileImage: "./path-to-default-profile-image.jpg",
          empresas: []
        },
        {
          id: 2,
          username: "usuario2",
          email: "usuario2@correo.com",
          password: "password2",
          profileImage: "./path-to-default-profile-image.jpg",
          empresas: []
        }
      ];
  
      localStorage.setItem('users', JSON.stringify(defaultUsers));
      alert('Datos predeterminados instalados');
    });
  }
  