// ══════ NAVEGACIÓN PRINCIPAL ══════
function switchMain(name) {
  const tabs = ['soundboard','initiative','notes','npcs','encounters'];
  document.querySelectorAll('.main-tab').forEach((t,i) => t.classList.toggle('active', tabs[i]===name));
  document.querySelectorAll('.main-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-'+name).classList.add('active');
}

// ══════ INIT ══════
window.onload=()=>{
  renderGrid();
  switchCat('areas');
  loadFromStorage();
  renderInit();
  renderQNotes();
  renderNpcs();
  renderEncTable('forest');
  refreshSessionSelect();
  // Autosave notes every 30s
  setInterval(()=>{ if(unsaved) saveSession(); }, 30000);
  // Restore combat timer if seconds > 0
  if(combatSeconds>0){
    const m=String(Math.floor(combatSeconds/60)).padStart(2,'0');
    const s=String(combatSeconds%60).padStart(2,'0');
    document.getElementById('combat-timer').textContent=`${m}:${s}`;
  }
};

