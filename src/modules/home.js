// home.js

const initHome = () => {
    const section = document.getElementById('loadHome');
  
    if (section) {
      section.innerHTML = `
        <h1>Bienvenido a la Aplicación</h1>
        <p>Por favor, utilice las opciones para gestionar el almacenamiento local o acceda a su cuenta si ya tiene datos instalados.</p>
      `;
    }
  };
  
  // Iniciar el módulo de la página de inicio
  initHome();
  