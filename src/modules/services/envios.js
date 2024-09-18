export function renderSection(mainContent) {
    const enviosSection = document.createElement('section');
    enviosSection.id = 'envios-section';
    enviosSection.classList.add('service-section');
    enviosSection.innerHTML = `
      <h3>Envíos</h3>
      <p>Aquí se gestionan los envíos.</p>
    `;
    mainContent.appendChild(enviosSection);
  }
  