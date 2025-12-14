/**
 * Objeto que mapea los IDs de sección a las rutas de URL (paths)
 */
const routes = {
  main: "/",
  terms: "/terminos",
  privacy: "/privacidad",
};

/**
 * Función central para mostrar la sección y actualizar la URL
 * @param {string} sectionId - El ID de la sección que se desea mostrar ('main', 'terms', o 'privacy').
 * @param {boolean} pushState - Indica si se debe actualizar el historial del navegador (true para navegación normal, false para botones de back/forward).
 */
function showSection(sectionId, pushState = true) {
  const mainContent = document.getElementById("main-content");
  const termsContent = document.getElementById("terms-content");
  const privacyContent = document.getElementById("privacy-content");

  // 1. Actualizar la URL si es necesario (solo si es una navegación directa)
  if (pushState) {
    const path = routes[sectionId] || "/";
    // history.pushState(data, title, url)
    history.pushState({ section: sectionId }, document.title, path);
  }

  window.scrollTo(0, 0);
}

// 2. Mapear la URL actual a la sección al cargar la página o usar el botón Back/Forward

/**
 * Determina la sección a mostrar basándose en la URL (path) actual
 */
function getCurrentSectionFromPath() {
  const currentPath = window.location.pathname;

  // Buscar en el objeto 'routes' qué ID de sección corresponde al path actual
  for (const id in routes) {
    if (routes[id] === currentPath) {
      return id;
    }
  }
  // Si el path no se encuentra (ej: mapagino.com/ o un path desconocido), vuelve a la principal
  return "main";
}

// 3. Manejar Eventos del Navegador

// A. Manejar la carga inicial de la página
document.addEventListener("DOMContentLoaded", () => {
  // Verifica la URL y carga la sección correcta, pero no usa pushState (ya estamos en esa URL)
  const initialSection = getCurrentSectionFromPath();
  // history.replaceState asegura que el historial inicial tenga el estado correcto
  history.replaceState(
    { section: initialSection },
    document.title,
    window.location.pathname
  );
  showSection(initialSection, false); // false para evitar añadir un nuevo historial
});

// 4. Manejar los botones de Atrás/Adelante del navegador
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.section) {
    // Si el evento tiene un estado (section), lo usamos para mostrar la página
    showSection(event.state.section, false); // false para no añadir un nuevo historial
  } else {
    // Si no hay estado (ej: primera carga o navegación antigua), usamos la URL
    showSection(getCurrentSectionFromPath(), false);
  }
});

// C. Sobreescribir los onclicks para usar la nueva función
// IMPORTANTE: Asegúrate de que todos tus enlaces llamen a showSection(id)
// Por ejemplo: onclick="showSection('privacy')"

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("navbarLinks");

  toggleButton.addEventListener("click", () => {
    // Alterna la clase 'active' para mostrar/ocultar los enlaces
    navLinks.classList.toggle("active");

    // Alterna el atributo aria-expanded para accesibilidad
    const isExpanded =
      toggleButton.getAttribute("aria-expanded") === "true" || false;
    toggleButton.setAttribute("aria-expanded", !isExpanded);
  });
});
