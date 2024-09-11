export function renderSection(mainContent) {
    const localesSection = document.createElement('section');
    localesSection.id = 'locales-section';
    localesSection.classList.add('service-section');
    localesSection.innerHTML = `
      <h3>Locales</h3>
      <p>Aquí se gestionan los locales.</p>
    `;
    mainContent.appendChild(localesSection);
  }
  