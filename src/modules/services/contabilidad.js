export function renderSection(mainContent) {
    const contabilidadSection = document.createElement('section');
    contabilidadSection.id = 'contabilidad-section';
    contabilidadSection.classList.add('service-section');
    contabilidadSection.innerHTML = `
      <h3>Contabilidad</h3>
      <p>Aquí se gestionan los datos contables.</p>
    `;
    mainContent.appendChild(contabilidadSection);
  }
  