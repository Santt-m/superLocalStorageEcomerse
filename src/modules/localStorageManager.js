// localStorageManager.js

// Función para inicializar la sección de gestión de localStorage
const initLocalStorageManager = () => {
    const section = document.getElementById('loadLocalStorageManager');
  
    if (section) {
      section.innerHTML = `
        <h2>Gestión de LocalStorage</h2>
        <button id="installData">Instalar Datos por Defecto</button>
        <button id="clearStorage">Borrar LocalStorage</button>
        <button id="consoleLocalStorage">Mostrar LocalStorage</button>
      `;
  
      const installDataButton = document.getElementById('installData');
      const clearStorageButton = document.getElementById('clearStorage');
      const consoleLocalStorageButton = document.getElementById('consoleLocalStorage');
  
      consoleLocalStorageButton.addEventListener('click', consoleLocalStorage);
      installDataButton.addEventListener('click', installDefaultData);
      clearStorageButton.addEventListener('click', clearLocalStorage);
    }
  };
    //
  // Función para instalar datos por defecto en localStorage
  const installDefaultData = () => {
    console.log('Instalando datos por defecto...');
  
    const usuarios = {
      "usuarioID1": {
        "nombre": "Juan",
        "email": "juan@example.com",
        "password": "encriptada",
        "empresas": [
          {
            "empresaID": "empresaID1",  // ID único para la empresa
            "nombre": "Tienda1",
            "direccion": "Calle 123",
            "logo": "url_logo",
            "productos": [
              {
                "productoID": "productoID1",  // ID único para el producto
                "nombre": "Producto 1",
                "descripcion": "Descripción del producto 1",
                "precio": 100.0,
                "imagenes": ["url_imagen1", "url_imagen2"]
              },
              {
                "productoID": "productoID2",  // ID único para el producto
                "nombre": "Producto 2",
                "descripcion": "Descripción del producto 2",
                "precio": 150.0,
                "imagenes": ["url_imagen1"]
              }
            ]
          },
          {
            "empresaID": "empresaID2",  // ID único para la empresa
            "nombre": "Tienda2",
            "direccion": "Calle 456",
            "logo": "url_logo",
            "productos": [
              {
                "productoID": "productoID3",  // ID único para el producto
                "nombre": "Producto 3",
                "descripcion": "Descripción del producto 3",
                "precio": 200.0,
                "imagenes": ["url_imagen1"]
              }
            ]
          }
        ]
      },
      "usuarioID2": {
        "nombre": "Maria",
        "email": "maria@example.com",
        "password": "encriptada",
        "empresas": [
          {
            "empresaID": "empresaID3",  // ID único para la empresa
            "nombre": "Tienda3",
            "direccion": "Avenida 789",
            "logo": "url_logo",
            "productos": []
          }
        ]
      }
    };
  
    const roles = {
      "adminID1": {
        "usuario": "usuarioID1",
        "rol": "admin",  // Este usuario tiene acceso a todas las empresas y productos
        "permisos": ["ver_todas_empresas", "ver_todos_productos", "editar_todos"]
      }
    };
  
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('roles', JSON.stringify(roles));
  
    console.log('Datos por defecto instalados:', {
      usuarios,
      roles
    });
    alert('Datos por defecto instalados en localStorage');
  };
  
  // Función para borrar el localStorage
  const clearLocalStorage = () => {
    console.log('Borrando localStorage...');
    localStorage.clear();
    reloadApp();
  };
  // funcion para mostrar por consola el localStorage
  const consoleLocalStorage = () => {
    console.log('Mostrando localStorage...', localStorage);
  }
  // Iniciar el módulo de gestión de localStorage
  initLocalStorageManager();
  