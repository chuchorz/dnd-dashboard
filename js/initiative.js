// ══════ INITIATIVE ══════
const CONDITIONS = ['Asustado','Cegado','Paralizado','Envenenado','Aturdido','Inconsciente','Hechizado','Derribado','Atrapado','Maldito','Petrificado','Invisible'];
let combatants=[], currentTurn=0, round=1;
let combatTimerInterval=null, combatSeconds=0, combatRunning=false;

function startCombatTimer(){
  if(combatRunning)return;
  combatRunning=true;
  combatTimerInterval=setInterval(()=>{
    combatSeconds++;
    const m=String(Math.floor(combatSeconds/60)).padStart(2,'0');
    const s=String(combatSeconds%60).padStart(2,'0');
    document.getElementById('combat-timer').textContent=`${m}:${s}`;
  },1000);
}

function renderInit() {
  const el = document.getElementById('init-list');
  if (!combatants.length) { el.innerHTML='<div class="no-data">Añade combatientes para comenzar...</div>'; return; }
  el.innerHTML = combatants.map((c,i) => {
    const pct = Math.max(0,Math.min(100,c.hp/c.max*100));
    const col = pct>50?'#b06030':pct>25?'#c07020':'#7a3030';
    const condPills = CONDITIONS.map(cond => {
      const active = (c.conditions||[]).includes(cond);
      return `<span class="cond-pill ${active?'active':''}" onclick="toggleCond(${i},'${cond}')">${cond}</span>`;
    }).join('');
    return `<div class="combatant ${c.type} ${i===currentTurn?'current':''}">
      <span class="init-num" title="Clic para editar" onclick="editInit(${i})" style="cursor:pointer;">${c.init}</span>
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;">
          <span class="c-name">${c.name}</span>
          ${i===currentTurn?'<span class="badge-turn">TURNO</span>':''}
          ${c.concentration?'<span style="font-size:.6rem;padding:1px 6px;border:1px solid #4a6a9a;background:rgba(74,106,154,.2);color:#a0c0e8;border-radius:10px;">CON</span>':''}
        </div>
        <div class="hp-bar-wrap"><div class="hp-bar" style="width:${pct}%;background:${col}"></div></div>
        <div style="margin-top:4px;">${condPills}</div>
        ${c.note?`<div class="c-note">📝 ${c.note}</div>`:''}
      </div>
      <div style="display:flex;flex-direction:column;gap:3px;align-items:flex-end;">
        <div class="hp-col">
          <input type="number" value="${c.hp}" min="0" max="${c.max}" onchange="setHp(${i},this.value)" style="width:52px;">
          <span class="text-dim">/${c.max}</span>
        </div>
        <div style="display:flex;gap:3px;">
          <button class="icon-btn" onclick="adjHp(${i},-1)" title="-1">-1</button>
          <button class="icon-btn" onclick="adjHp(${i},-5)" title="-5">-5</button>
          <button class="icon-btn" onclick="adjHp(${i},5)"  title="+5">+5</button>
          <button class="icon-btn" onclick="toggleConc(${i})" title="Concentración" style="${c.concentration?'border-color:#4a6a9a;color:#a0c0e8;':''}">CON</button>
          <button class="icon-btn" onclick="editNote(${i})" title="Nota">📝</button>
          <button class="icon-btn del" onclick="remC(${i})" title="Eliminar">✕</button>
        </div>
      </div>
    </div>`;
  }).join('');
  document.getElementById('round-label').textContent = `Ronda ${round}`;
  saveToStorage();
}

function toggleCond(i, cond) {
  if(!combatants[i].conditions) combatants[i].conditions=[];
  const idx = combatants[i].conditions.indexOf(cond);
  if(idx>=0) combatants[i].conditions.splice(idx,1);
  else combatants[i].conditions.push(cond);
  renderInit();
}
function toggleConc(i){ combatants[i].concentration=!combatants[i].concentration; renderInit(); }
function editNote(i){
  const note = prompt(`Nota para ${combatants[i].name}:`, combatants[i].note||'');
  if(note!==null){ combatants[i].note=note; renderInit(); }
}
function editInit(i){
  const val = prompt(`Nueva iniciativa para ${combatants[i].name}:`, combatants[i].init);
  if(val!==null){ combatants[i].init=parseInt(val)||combatants[i].init; renderInit(); }
}
function rollAllInit(){
  combatants.forEach(c=>{ c.init=Math.floor(Math.random()*20)+1; });
  sortInit();
}
function addCombatant() {
  const name=document.getElementById('new-name').value.trim();
  const init=parseInt(document.getElementById('new-init').value)||(Math.floor(Math.random()*20)+1);
  const hp=parseInt(document.getElementById('new-hp').value)||10;
  const type=document.getElementById('new-type').value;
  if(!name)return;
  combatants.push({name,init,hp,max:hp,type,conditions:[],note:'',concentration:false});
  ['new-name','new-init','new-hp'].forEach(id=>document.getElementById(id).value='');
  startCombatTimer();
  renderInit();
}
function quickAdd(name,init,hp){
  combatants.push({name,init,hp,max:hp,type:'enemy',conditions:[],note:'',concentration:false});
  startCombatTimer();
  renderInit();
}
function setHp(i,v){combatants[i].hp=Math.max(0,Math.min(combatants[i].max,parseInt(v)||0));renderInit();}
function adjHp(i,d){setHp(i,combatants[i].hp+d);}
function remC(i){combatants.splice(i,1);if(currentTurn>=combatants.length)currentTurn=0;renderInit();}
function nextTurn(){
  if(!combatants.length)return;
  currentTurn=(currentTurn+1)%combatants.length;
  if(currentTurn===0)round++;
  renderInit();
}
function sortInit(){combatants.sort((a,b)=>b.init-a.init);currentTurn=0;renderInit();}
function resetCombat(){
  if(!confirm('¿Resetear el combate?'))return;
  combatants=[];currentTurn=0;round=1;
  combatSeconds=0;combatRunning=false;
  clearInterval(combatTimerInterval);
  document.getElementById('combat-timer').textContent='00:00';
  renderInit();
}

