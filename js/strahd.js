// ══════ PANEL DE STRAHD ══════

const STRAHD_PHASES = {
  1: {
    name: 'El Señor de Ravenloft', icon: '🧛', color: '#c4a870',
    hp_range: '144 – 97 PV',
    desc: 'Aristocrático y calculador. Prefiere el diálogo y la manipulación. Usa Encantamiento y control de mente.',
    actions: [
      { name: 'Golpe Múltiple (×3)', roll: '+9', dmg: '1d8+5 contundente + 1d6 necrótico' },
      { name: 'Mordisco',            roll: '+9', dmg: '1d6+5 perforante + 3d6 necrótico (recupera PV iguales)' },
      { name: 'Encantamiento',       roll: 'CD 17 Sab', dmg: 'Hechizado hasta 24h. Obedece órdenes verbales.' },
      { name: 'Forma de Niebla',     roll: '—', dmg: 'Gaseoso. Inmune a todo daño no mágico. Velocidad vuelo 9m.' },
    ],
    legendary: [
      { name: 'Mover',          desc: 'Hasta velocidad completa sin provocar ataques de oportunidad.' },
      { name: 'Garras',         desc: '+9 impacto · 2d4+5 cortante.' },
      { name: 'Regenerar',      desc: 'Recupera 20 PV (requiere al menos 1 PV y no luz solar).' },
    ],
  },
  2: {
    name: 'El Soldado Inmortal', icon: '⚔️', color: '#b03020',
    hp_range: '96 – 49 PV',
    desc: 'Agresivo y directo. Lucha como el general de guerra que fue. Ataques múltiples y movimiento táctico.',
    actions: [
      { name: 'Ataque Múltiple (×4)', roll: '+9', dmg: '1d8+5 contundente + 1d6 necrótico cada uno' },
      { name: 'Carga Devastadora',    roll: '+9', dmg: '2d8+5 + empuja 3m y derriba (CD 17 Fue)' },
      { name: 'Desarme',              roll: '+9 vs CD Fue', dmg: 'El objetivo suelta su arma.' },
      { name: 'Mordisco',             roll: '+9', dmg: '1d6+5 perforante + 3d6 necrótico (recupera PV iguales)' },
    ],
    legendary: [
      { name: 'Mover',      desc: 'Hasta velocidad completa sin provocar ataques de oportunidad.' },
      { name: 'Tajo',       desc: '+9 impacto · 2d6+5 cortante en arco (todos en 1,5m).' },
      { name: 'Intimidar',  desc: 'CD 17 Sab o Asustado hasta fin del siguiente turno de Strahd.' },
    ],
  },
  3: {
    name: 'La Bestia de la Oscuridad', icon: '🐺', color: '#9060b0',
    hp_range: '48 – 0 PV',
    desc: 'Instintivo y salvaje. Transformación parcial. Ataques brutales. Prioriza la supervivencia a toda costa.',
    actions: [
      { name: 'Garras Furiosas (×3)',  roll: '+9', dmg: '2d6+5 cortante + 1d6 necrótico' },
      { name: 'Mordisco Devastador',   roll: '+9', dmg: '2d10+5 perforante + recupera PV = daño necrótico' },
      { name: 'Rugido Aterrador',      roll: 'CD 17 Sab', dmg: 'Todos en 9m: Asustados hasta fin del turno.' },
      { name: 'Forma de Lobo',         roll: '—', dmg: 'Transforma en lobo. Velocidad 18m. Mantiene estadísticas.' },
    ],
    legendary: [
      { name: 'Mover',       desc: 'Hasta velocidad completa sin provocar ataques de oportunidad.' },
      { name: 'Mordisco',    desc: '+9 impacto · 1d6+5 + recupera 7 PV.' },
      { name: 'Convocar',    desc: 'Aparecen 1d4 Lobos o 1d3 Vampiros Menores en 6m.' },
    ],
  },
};

const STRAHD_LOCATIONS = [
  { id: 'unknown',   icon: '❓', name: 'Desconocida',         desc: 'Los PJs no saben dónde está.' },
  { id: 'ravenloft', icon: '🏰', name: 'Castillo Ravenloft',  desc: 'Trono, catafalco o deambulando por los pasillos.' },
  { id: 'crypt',     icon: '⚰️', name: 'Cripta K84',          desc: 'Descansando en su ataúd. Momentáneamente vulnerable.' },
  { id: 'road',      icon: '🌫️', name: 'Caminos de Barovia',  desc: 'Viajando en carruaje negro o como niebla.' },
  { id: 'village',   icon: '🏚️', name: 'Aldea de Barovia',    desc: 'Visitando o aterrorizando a los aldeanos.' },
  { id: 'tser',      icon: '🔮', name: 'Tser Pool',           desc: 'Con los Vistani. Observando a los PJs desde lejos.' },
  { id: 'watching',  icon: '👁️', name: 'Observando (Cuervo)', desc: 'Presente en espíritu a través de un familiar. No en cuerpo.' },
  { id: 'absent',    icon: '🌑', name: 'Ausente',             desc: 'Ocupado con otros asuntos. No aparecerá esta sesión.' },
];

const STRAHD_MOODS = {
  curious:    { label: 'Curioso',      icon: '🔍', color: '#a8c8e8', desc: 'Fascinado por los PJs. Dialoga y observa. No ataca salvo provocación directa.' },
  obsessed:   { label: 'Obsesionado',  icon: '🌹', color: '#e890a0', desc: 'Centrado en Ireena/Tatyana. Ignora el resto salvo que interfieran con ella.' },
  wrathful:   { label: 'Colérico',     icon: '🔥', color: '#e07030', desc: 'Ofendido o traicionado. Ataca para matar. No hay negociación posible.' },
  playful:    { label: 'Juguetón',     icon: '😈', color: '#b080d0', desc: 'Disfruta el juego. Deja escapar, tiende trampas, prolonga el sufrimiento.' },
  melancholy: { label: 'Melancólico',  icon: '🌑', color: '#7090a8', desc: 'Reflexivo, casi humano. Habla de Tatyana, del pasado, de su condena eterna.' },
  absent:     { label: 'Ausente',      icon: '🌫️', color: '#8a7050', desc: 'No aparece. Está ocupado con otros asuntos en Barovia esta noche.' },
};

let strahdHp = 144;
const STRAHD_MAX_HP = 144;
let strahdHpLog = [];

function getPhase(hp) {
  if (hp >= 97) return 1;
  if (hp >= 49) return 2;
  return 3;
}

function renderStrahdPanel() {
  const phase = getPhase(strahdHp);
  const pd = STRAHD_PHASES[phase];
  const pct = Math.max(0, strahdHp / STRAHD_MAX_HP * 100);
  const hpColor = pct > 67 ? '#5a9a5a' : pct > 33 ? '#c07020' : '#b03020';

  document.getElementById('strahd-hp-bar').style.cssText = `width:${pct}%;background:${hpColor};`;
  document.getElementById('strahd-hp-val').textContent = strahdHp;
  document.getElementById('strahd-phase-badge').innerHTML = `${pd.icon} Fase ${phase} &mdash; ${pd.name}`;
  document.getElementById('strahd-phase-badge').style.color = pd.color;
  document.getElementById('strahd-phase-range').textContent = pd.hp_range;
  document.getElementById('strahd-phase-desc').textContent = pd.desc;

  document.getElementById('strahd-actions').innerHTML = pd.actions.map(a => `
    <tr>
      <td class="strahd-act-name">${a.name}</td>
      <td class="strahd-act-roll">${a.roll}</td>
      <td class="strahd-act-dmg">${a.dmg}</td>
    </tr>`).join('');

  document.getElementById('strahd-legendary').innerHTML = pd.legendary.map(l => `
    <div class="strahd-leg"><strong>${l.name}</strong> — ${l.desc}</div>`).join('');

  renderStrahdLog();
  updateMoodDisplay();
}

function adjStrahdHp(delta) {
  const prev = strahdHp;
  strahdHp = Math.max(0, Math.min(STRAHD_MAX_HP, strahdHp + delta));
  if (strahdHp === prev) return;
  const sign = delta > 0 ? '+' : '';
  strahdHpLog.unshift({ txt: `${sign}${delta} PV → ${strahdHp} PV`, t: new Date().toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'}) });
  if (strahdHpLog.length > 8) strahdHpLog.pop();
  checkPhaseAlert(prev, strahdHp);
  renderStrahdPanel();
}

function setStrahdHpManual() {
  const val = parseInt(document.getElementById('strahd-hp-input').value);
  if (isNaN(val)) return;
  const prev = strahdHp;
  strahdHp = Math.max(0, Math.min(STRAHD_MAX_HP, val));
  strahdHpLog.unshift({ txt: `→ ${strahdHp} PV (manual)`, t: new Date().toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'}) });
  if (strahdHpLog.length > 8) strahdHpLog.pop();
  checkPhaseAlert(prev, strahdHp);
  renderStrahdPanel();
  document.getElementById('strahd-hp-input').value = '';
}

function checkPhaseAlert(prev, curr) {
  const p1 = getPhase(prev), p2 = getPhase(curr);
  if (p1 !== p2) {
    const pd = STRAHD_PHASES[p2];
    setTimeout(() => alert(`⚠️ ¡CAMBIO DE FASE!\n\n${pd.icon} Strahd entra en Fase ${p2}: ${pd.name}\n\n${pd.desc}`), 50);
  }
}

function renderStrahdLog() {
  const el = document.getElementById('strahd-hp-log');
  if (!el) return;
  el.innerHTML = strahdHpLog.length
    ? strahdHpLog.map(h => `<div class="strahd-log-row"><span>${h.txt}</span><time>${h.t}</time></div>`).join('')
    : '<div class="no-data" style="padding:8px;">Sin cambios aún...</div>';
}

function setStrahdLocation(id) {
  document.querySelectorAll('.strahd-loc-btn').forEach(b => b.classList.toggle('active', b.dataset.loc === id));
  const loc = STRAHD_LOCATIONS.find(l => l.id === id);
  if (loc) document.getElementById('strahd-loc-desc').textContent = `${loc.icon} ${loc.name} — ${loc.desc}`;
}

function updateMoodDisplay() {
  const val = document.getElementById('strahd-mood-select')?.value || 'curious';
  const mood = STRAHD_MOODS[val];
  if (!mood) return;
  document.getElementById('strahd-mood-icon').textContent  = mood.icon;
  document.getElementById('strahd-mood-label').textContent = mood.label;
  document.getElementById('strahd-mood-label').style.color = mood.color;
  document.getElementById('strahd-mood-desc').textContent  = mood.desc;
}

function resetStrahd() {
  if (!confirm('¿Resetear los PV de Strahd a 144?')) return;
  strahdHp = STRAHD_MAX_HP;
  strahdHpLog = [];
  renderStrahdPanel();
}


// ══════ TAROT DE MADAM EVA ══════

const TAROT_POSITIONS = [
  { id: 'p1', icon: '💎', name: 'El Tesoro',    role: 'Dónde se halla el Símbolo Sagrado de Ravenloft' },
  { id: 'p2', icon: '🤝', name: 'El Aliado',    role: 'Un poderoso aliado que ayudará a los PJs' },
  { id: 'p3', icon: '⚰️', name: 'La Tumba',     role: 'El lugar donde duerme el poder de Strahd' },
  { id: 'p4', icon: '🏰', name: 'La Fortaleza', role: 'Dónde en Ravenloft encontrarán a Strahd' },
  { id: 'p5', icon: '🌟', name: 'El Lector',    role: 'El héroe de la profecía — quien puede vencer a Strahd' },
];

const TAROT_DECKS = {
  p1: [
    { card: 'El Sol',       suit: '☀️ Espadas', desc: 'En la taberna de Arasek, Vallaki. Bajo el escenario del juglar Rictavio.' },
    { card: 'La Luna',      suit: '🌙 Copas',   desc: 'En el cofre de Ireena Kolyana, envuelto en tela negra.' },
    { card: 'La Estrella',  suit: '⭐ Espadas', desc: 'En las catacumbas del Templo de Ámbar, sala K85.' },
    { card: 'El Ermitaño',  suit: '🕯️ Bastos',  desc: 'Con el Padre Donavich en la Aldea de Barovia. Enterrado bajo el altar.' },
    { card: 'La Justicia',  suit: '⚖️ Espadas', desc: 'En el altar de la Abadía de Sant Markovia, Krezk.' },
    { card: 'La Fuerza',    suit: '💪 Oros',    desc: 'Colgado al cuello de una de las novias de Strahd en Ravenloft.' },
    { card: 'El Mundo',     suit: '🌍 Bastos',  desc: 'En el pajar de la granja de la familia Martikov, entre la paja.' },
  ],
  p2: [
    { card: 'El Loco',        suit: '🃏 Bastos',  desc: 'Ezmerelda d\'Avenir, cazadora de monstruos. Su carro está en el bosque al norte.' },
    { card: 'El Mago',        suit: '✨ Oros',    desc: 'El espíritu de Sergei von Zarovich. Puede manifestarse en la capilla de Ravenloft.' },
    { card: 'La Sacerdotisa', suit: '🔮 Copas',   desc: 'Madam Eva en persona, si los PJs se ganan su confianza y respetan a los Vistani.' },
    { card: 'La Emperatriz',  suit: '👑 Oros',    desc: 'El Abate de Krezk, si los PJs consiguen purificar su locura.' },
    { card: 'El Hierofante',  suit: '⛪ Espadas', desc: 'Godfrey Gwilym, espectro del Caballero de la Orden del Dragón de Plata.' },
    { card: 'El Carro',       suit: '🐎 Bastos',  desc: 'Kasimir Velikov, el elfo drow, si supera su rencor y une su causa a la de los PJs.' },
    { card: 'La Rueda',       suit: '🎡 Oros',    desc: 'Los Guardianes del Bosque — los cuervos de la familia Martikov.' },
  ],
  p3: [
    { card: 'La Torre',      suit: '🗼 Bastos', desc: 'En el lago Zarovich, dentro de un bote hundido. Bajo 6m de agua helada.' },
    { card: 'El Diablo',     suit: '😈 Oros',   desc: 'Cripta del rey Barov von Zarovich (K85, cripta 39). Protegida por no-muertos.' },
    { card: 'El Juicio',     suit: '🔔 Copas',  desc: 'En el órgano de la sala de baile de Ravenloft. Entre los tubos metálicos.' },
    { card: 'La Muerte',     suit: '💀 Espadas', desc: 'Bajo el altar mayor del Templo de Ámbar. Guardado por las Sombras.' },
    { card: 'La Templanza',  suit: '⚗️ Bastos', desc: 'En el Molino de los Huesos. Dentro de una de las muñecas de trapo.' },
    { card: 'El Colgado',    suit: '🪢 Oros',   desc: 'En la Torre de Van Richten, sala superior. Tras el espejo mágico.' },
  ],
  p4: [
    { card: 'El Diablo',      suit: '😈 Oros',   desc: 'La sala del trono (K16). Os espera sentado, sereno, como si os invitara.' },
    { card: 'El Hierofante',  suit: '⛪ Espadas', desc: 'Los jardines del castillo (K6). Bajo la luna llena, entre las estatuas.' },
    { card: 'La Luna',        suit: '🌙 Copas',   desc: 'El estudio (K37). Entre sus mapas de Barovia y sus libros de magia negra.' },
    { card: 'El Ermitaño',    suit: '🕯️ Bastos',  desc: 'La capilla (K15). Junto a los restos de Sergei, su hermano asesinado.' },
    { card: 'La Torre',       suit: '🗼 Bastos',  desc: 'La sala de baile (K28). Bailando solo al ritmo de música invisible.' },
    { card: 'El Sol',         suit: '☀️ Espadas', desc: 'Las catacumbas (K84). En su propio ataúd. Descansando.' },
  ],
  p5: [
    { card: 'El Loco',       suit: '🃏 Bastos',  desc: 'El PJ que ha perdido algo irreemplazable desde que llegó a Barovia.' },
    { card: 'El Mago',       suit: '✨ Oros',    desc: 'El PJ que posee el mayor poder arcano o mágico del grupo.' },
    { card: 'El Carro',      suit: '🐎 Bastos',  desc: 'El PJ más obstinado — el que nunca ha contemplado rendirse.' },
    { card: 'La Fuerza',     suit: '💪 Oros',    desc: 'El PJ que ha sobrevivido más situaciones de muerte inminente.' },
    { card: 'La Justicia',   suit: '⚖️ Espadas', desc: 'El PJ que más ha sufrido una injusticia profunda durante la campaña.' },
    { card: 'La Sacerdotisa',suit: '🔮 Copas',   desc: 'El PJ con mayor conexión divina, espiritual o con los muertos.' },
  ],
};

let tarotReading = {};

function drawAllTarot() {
  TAROT_POSITIONS.forEach(pos => {
    const deck = TAROT_DECKS[pos.id];
    tarotReading[pos.id] = deck[Math.floor(Math.random() * deck.length)];
  });
  renderTarot();
  saveTarotToStorage();
}

function drawSingleCard(posId) {
  const deck = TAROT_DECKS[posId];
  tarotReading[posId] = deck[Math.floor(Math.random() * deck.length)];
  renderTarot();
  saveTarotToStorage();
}

function resetTarot() {
  if (!confirm('¿Limpiar la tirada de tarot?')) return;
  tarotReading = {};
  renderTarot();
  localStorage.removeItem('strahd_tarot');
}

function renderTarot() {
  const container = document.getElementById('tarot-cards');
  if (!container) return;
  container.innerHTML = TAROT_POSITIONS.map(pos => {
    const card = tarotReading[pos.id];
    if (!card) return `
      <div class="tarot-card tarot-empty" onclick="drawSingleCard('${pos.id}')">
        <div class="tarot-pos-icon">${pos.icon}</div>
        <div class="tarot-pos-name">${pos.name}</div>
        <div class="tarot-pos-role">${pos.role}</div>
        <div class="tarot-draw-hint">Clic para tirar esta carta</div>
      </div>`;
    return `
      <div class="tarot-card tarot-drawn" onclick="drawSingleCard('${pos.id}')">
        <div class="tarot-pos-icon">${pos.icon}</div>
        <div class="tarot-pos-name">${pos.name}</div>
        <div class="tarot-card-name">${card.card}</div>
        <div class="tarot-suit">${card.suit}</div>
        <hr style="border-color:var(--border);margin:8px 0;">
        <div class="tarot-card-desc">${card.desc}</div>
        <div class="tarot-draw-hint">Clic para redibujar</div>
      </div>`;
  }).join('');
}

function saveTarotToStorage() {
  localStorage.setItem('strahd_tarot', JSON.stringify(tarotReading));
}

function loadTarotFromStorage() {
  try {
    const saved = JSON.parse(localStorage.getItem('strahd_tarot') || 'null');
    if (saved && Object.keys(saved).length) { tarotReading = saved; renderTarot(); }
  } catch(e) {}
}
