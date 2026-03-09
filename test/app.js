/**
 * app.js
 * Módulo principal de la Pantalla de DM — Maldición de Strahd
 * Gestiona la navegación entre vistas e inicializa todos los módulos
 */

'use strict';

(function () {
  /* ── Inicializar navegación entre vistas ── */
  function initNav() {
    const tabs  = document.querySelectorAll('.nav-tab');
    const views = document.querySelectorAll('.view');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetView = tab.dataset.view;

        // Actualizar tabs
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Actualizar vistas
        views.forEach(v => v.classList.remove('active'));
        const target = document.getElementById(`view-${targetView}`);
        if (target) target.classList.add('active');

        // Guardar última vista activa
        try {
          localStorage.setItem('strahd_active_view', targetView);
        } catch (e) {}
      });
    });

    // Restaurar última vista
    try {
      const lastView = localStorage.getItem('strahd_active_view');
      if (lastView) {
        const tab = document.querySelector(`.nav-tab[data-view="${lastView}"]`);
        if (tab) tab.click();
      }
    } catch (e) {}
  }

  /* ── Inicializar todos los módulos ── */
  function initModules() {
    if (window.Soundboard) Soundboard.init();
    if (window.Initiative) Initiative.init();
    if (window.MapModule)  MapModule.init();
  }

  /* ── Atajos de teclado globales ── */
  function initKeyboard() {
    document.addEventListener('keydown', e => {
      // Alt+1/2/3 para cambiar de vista
      if (e.altKey && !e.ctrlKey && !e.shiftKey) {
        const map = { '1': 'soundboard', '2': 'initiative', '3': 'map' };
        if (map[e.key]) {
          e.preventDefault();
          const tab = document.querySelector(`.nav-tab[data-view="${map[e.key]}"]`);
          if (tab) tab.click();
        }
      }

      // Espacio para siguiente turno (solo en vista de iniciativa)
      if (e.key === ' ' && !e.altKey && !e.ctrlKey) {
        const activeView = document.querySelector('.view.active');
        if (activeView && activeView.id === 'view-initiative') {
          const focused = document.activeElement;
          const isInput = focused && (
            focused.tagName === 'INPUT' ||
            focused.tagName === 'TEXTAREA' ||
            focused.tagName === 'SELECT'
          );
          if (!isInput) {
            e.preventDefault();
            const nextBtn = document.getElementById('btn-next-turn');
            if (nextBtn) nextBtn.click();
          }
        }
      }

      // Escape para detener sonido
      if (e.key === 'Escape') {
        const stopBtn = document.getElementById('mp-stop');
        if (stopBtn) stopBtn.click();
      }
    });
  }

  /* ── Indicador de carga ── */
  function showLoadingState() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
  }

  function hideLoadingState() {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  }

  /* ── Arranque ── */
  function boot() {
    showLoadingState();

    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initNav();
        initModules();
        initKeyboard();
        hideLoadingState();
      });
    } else {
      initNav();
      initModules();
      initKeyboard();
      hideLoadingState();
    }
  }

  boot();
})();
