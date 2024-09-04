// userDashboard.js

// Función para inicializar el dashboard del usuario
const initUserDashboard = () => {
    const section = document.getElementById('loadUserDashboard');
  
    if (section) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      section.innerHTML = `
        <h2>Bienvenido, ${currentUser.nombre}</h2>
        <button id="createCompany">Crear Nueva Empresa</button>
        <div id="companiesList" style="display: flex; flex-wrap: wrap; gap: 20px;">
          <h3>Mis Empresas</h3>
        </div>
        <div id="createCompanyFormContainer"></div>
      `;
  
      const createCompanyButton = document.getElementById('createCompany');
      createCompanyButton.addEventListener('click', showCreateCompanyForm);
  
      listUserCompanies(currentUser.empresas);
    }
  };
  
  // Función para listar las empresas del usuario logueado
  const listUserCompanies = (empresas) => {
    const companiesList = document.getElementById('companiesList');
    companiesList.innerHTML = ''; // Limpiar la lista antes de agregar
  
    empresas.forEach(empresa => {
      const empresaCard = document.createElement('div');
      empresaCard.classList.add('company-card');
      empresaCard.style.border = '1px solid #ccc';
      empresaCard.style.padding = '20px';
      empresaCard.style.borderRadius = '8px';
      empresaCard.style.cursor = 'pointer';
      empresaCard.innerHTML = `
        <h4>${empresa.nombre}</h4>
        <p>Dirección: ${empresa.direccion}</p>
      `;
      empresaCard.addEventListener('click', () => loadEditCompanySection(empresa.empresaID));
      companiesList.appendChild(empresaCard);
    });
  };
  
  // Función para cargar la sección de edición de la empresa
  const loadEditCompanySection = async (empresaId) => {
    console.log(`Cargando la sección de edición para la empresa con ID: ${empresaId}`);
    hideAllSections();
    createSection('loadEditCompany');
    await import('./editCompany.js')
      .then(module => module.initEditCompany(empresaId))
      .then(() => console.log('Módulo editCompany.js cargado correctamente'))
      .catch(err => console.error('Error al cargar editCompany.js:', err));
  };
  
  // Función para mostrar el formulario de creación de empresa
  const showCreateCompanyForm = () => {
    const createCompanyFormContainer = document.getElementById('createCompanyFormContainer');
    createCompanyFormContainer.innerHTML = `
      <h3>Crear Nueva Empresa</h3>
      <form id="createCompanyForm">
        <input type="text" id="companyName" placeholder="Nombre de la Empresa" required />
        <input type="text" id="companyAddress" placeholder="Dirección de la Empresa" required />
        <button type="submit">Crear Empresa</button>
      </form>
    `;
  
    const createCompanyForm = document.getElementById('createCompanyForm');
    createCompanyForm.addEventListener('submit', handleCreateCompany);
  };
  
  // Función para manejar la creación de una nueva empresa
  const handleCreateCompany = (event) => {
    event.preventDefault();
  
    const companyName = document.getElementById('companyName').value;
    const companyAddress = document.getElementById('companyAddress').value;
  
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
    const newCompanyId = `empresaID${Date.now()}`;
  
    // Crear la nueva empresa
    const newCompany = {
      empresaID: newCompanyId,
      nombre: companyName,
      direccion: companyAddress,
      logo: '',
      productos: []
    };
  
    // Actualizar la lista de empresas del usuario
    currentUser.empresas.push(newCompany);
  
    // Guardar en localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
    // Actualizar el listado de empresas en el dashboard
    listUserCompanies(currentUser.empresas);
  
    // Limpiar el formulario de creación de empresa
    document.getElementById('createCompanyFormContainer').innerHTML = '';
  
    alert('Empresa creada exitosamente');
  };
  
  // Iniciar el módulo del dashboard del usuario
  initUserDashboard();
  