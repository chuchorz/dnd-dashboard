// ══════ NAVEGACIÓN PRINCIPAL ══════
function switchMain(name) {
  const tabs = ['soundboard','initiative','notes','npcs','encounters','strahd','tarot','mapa'];
  document.querySelectorAll('.main-tab').forEach((t,i) => t.classList.toggle('active', tabs[i]===name));
  document.querySelectorAll('.main-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-'+name).classList.add('active');
}

// ══════ INIT ══════
window.onload = () => {
  renderGrid();
  switchCat('areas');
  loadFromStorage();
  renderInit();
  renderQNotes();
  refreshSessionSelect();
  renderNpcs();
  renderEncTable('forest');
  loadFromStorageStrahd();
  buildStrahdPanel();
  renderStrahd();
  loadTarotFromStorage();
  renderTarot();
  renderMapa();
  setInterval(() => { if (unsaved) saveSession(); }, 30000);
  if (combatSeconds > 0) {
    const m = String(Math.floor(combatSeconds / 60)).padStart(2, '0');
    const s = String(combatSeconds % 60).padStart(2, '0');
    document.getElementById('combat-timer').textContent = `${m}:${s}`;
  }
};
