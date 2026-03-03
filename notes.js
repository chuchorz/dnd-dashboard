// ══════ SESSION MANAGEMENT (localStorage) ══════
let unsaved = false;
let currentSessionKey = null;

function getSessions(){ try{ return JSON.parse(localStorage.getItem('strahd_sessions')||'{}'); }catch(e){ return {}; } }
function saveSessions(obj){ localStorage.setItem('strahd_sessions',JSON.stringify(obj)); }

function markUnsaved(){ unsaved=true; document.getElementById('save-indicator').textContent='● Sin guardar'; document.getElementById('save-indicator').style.color='#f0a080'; }

function refreshSessionSelect(){
  const sel = document.getElementById('session-select');
  const sessions = getSessions();
  const current = sel.value;
  sel.innerHTML = '<option value="">— Nueva sesión —</option>';
  Object.entries(sessions).sort((a,b)=>b[1].date.localeCompare(a[1].date)).forEach(([key,s])=>{
    const opt = document.createElement('option');
    opt.value=key; opt.textContent=`${s.title||'Sin título'} (${s.date})`;
    sel.appendChild(opt);
  });
  if(current) sel.value=current;
}

function saveSession(){
  const title = document.getElementById('session-title').value.trim() || 'Sesión sin título';
  const key = currentSessionKey || 'session_'+Date.now();
  currentSessionKey = key;
  const sessions = getSessions();
  const date = new Date().toLocaleDateString('es-ES');
  sessions[key] = {
    title, date,
    sessionNotes: document.getElementById('session-notes').value,
    locationNotes: document.getElementById('location-notes').value,
    qnotes: JSON.stringify(qnotes),
    npcs: JSON.stringify(npcs),
  };
  saveSessions(sessions);
  document.getElementById('session-select').value = key;
  document.getElementById('session-date').textContent = date;
  document.getElementById('save-indicator').textContent = '✓ Guardado';
  document.getElementById('save-indicator').style.color = 'var(--gold)';
  unsaved = false;
  refreshSessionSelect();
  document.getElementById('session-select').value = key;
}

function loadSession(key){
  if(!key){ newSession(); return; }
  if(unsaved && !confirm('Tienes cambios sin guardar. ¿Continuar?'))return;
  const sessions = getSessions();
  const s = sessions[key];
  if(!s)return;
  currentSessionKey = key;
  document.getElementById('session-title').value = s.title||'';
  document.getElementById('session-notes').value = s.sessionNotes||'';
  document.getElementById('location-notes').value = s.locationNotes||'';
  document.getElementById('session-date').textContent = s.date||'';
  try{ qnotes=JSON.parse(s.qnotes||'[]'); }catch(e){ qnotes=[]; }
  try{ const loaded=JSON.parse(s.npcs||'[]'); if(loaded.length) npcs=loaded; }catch(e){}
  renderQNotes(); renderNpcs();
  document.getElementById('save-indicator').textContent='✓ Cargado';
  document.getElementById('save-indicator').style.color='var(--gold)';
  unsaved=false;
}

function newSession(){
  if(unsaved && !confirm('Tienes cambios sin guardar. ¿Continuar?'))return;
  currentSessionKey=null;
  document.getElementById('session-title').value='';
  document.getElementById('session-notes').value='';
  document.getElementById('location-notes').value='';
  document.getElementById('session-date').textContent='';
  document.getElementById('session-select').value='';
  qnotes=[]; renderQNotes();
  document.getElementById('save-indicator').textContent='';
  unsaved=false;
}

function deleteSession(){
  const key = document.getElementById('session-select').value;
  if(!key||!confirm('¿Borrar esta sesión permanentemente?'))return;
  const sessions=getSessions(); delete sessions[key];
  saveSessions(sessions); newSession(); refreshSessionSelect();
}

function saveToStorage(){
  // Autosave combat state
  localStorage.setItem('strahd_combat', JSON.stringify({combatants,currentTurn,round,combatSeconds}));
}

function loadFromStorage(){
  try{
    const c=JSON.parse(localStorage.getItem('strahd_combat')||'null');
    if(c&&c.combatants?.length){ combatants=c.combatants; currentTurn=c.currentTurn||0; round=c.round||1; combatSeconds=c.combatSeconds||0; }
  }catch(e){}
}

// ══════ NOTES ══════
let qnotes=[];
function clearTA(id){if(confirm('¿Borrar estas notas?')){ document.getElementById(id).value=''; markUnsaved(); }}
function addQNote(){
  const input=document.getElementById('qnote-input');
  const txt=input.value.trim(); if(!txt)return;
  qnotes.unshift({txt,t:new Date().toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'})});
  input.value=''; markUnsaved(); renderQNotes();
}
function remQNote(i){qnotes.splice(i,1);renderQNotes();}
function renderQNotes(){
  const el=document.getElementById('qnotes-list');
  if(!qnotes.length){el.innerHTML='<div class="no-data" style="padding:10px;">Sin notas rápidas...</div>';return;}
  el.innerHTML=qnotes.map((n,i)=>`<div class="qnote"><span>${n.txt}</span><time>${n.t}</time><button class="icon-btn del" onclick="remQNote(${i})">✕</button></div>`).join('');
}

