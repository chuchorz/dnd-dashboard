// ══════ TAROT DE MADAM EVA — Lectura fija de campaña ══════
// Cartas elegidas por el Máster para esta campaña concreta

const READING = [
  {
    position: 1,
    posName:  'El Tomo de Strahd',
    posIcon:  '📖',
    posDesc:  'Esta carta informa de la historia. El conocimiento del pasado te ayudará a entender mejor a tu enemigo.',
    cardName: 'Maestro de Estrellas',
    cardSub:  'Mago — Baraja Común',
    suit:     '⭐',
    location: 'Torre de Van Richten (Cap. 11, Zona V7)',
    prophecy: 'Buscad la torre de un mago en un lago. Dad el nombre del mago y el sirviente os guiará a lo que buscáis.',
    dmNote:   'El tomo está en el último piso de la Torre de Van Richten.',
    color:    '#6040a0',
  },
  {
    position: 2,
    posName:  'El Símbolo Sagrado de Ravenkind',
    posIcon:  '✝️',
    posDesc:  'Esta carta habla de una fuerza poderosa para el bien y la protección, un símbolo sagrado de gran esperanza.',
    cardName: '1 de Espadas — Vengadora',
    cardSub:  'Baraja Común',
    suit:     '⚔️',
    location: 'Argynvostholt (Cap. 7, Zona P36)',
    prophecy: 'El tesoro se encuentra en casa de un dragón, en manos una vez limpias y ahora corrompidas.',
    dmNote:   'En posesión de Vladimir Hornosgaard en Argynvostholt.',
    color:    '#a04020',
  },
  {
    position: 3,
    posName:  'La Espada Solar',
    posIcon:  '☀️',
    posDesc:  'Esta es una carta de poder y fuerza. Habla de un arma de venganza hecha propia de luz solar.',
    cardName: '8 de Glifos — Obispo',
    cardSub:  'Baraja Común',
    suit:     '🔯',
    location: 'Templo del Ámbar (Cap. 13, Zona X40)',
    prophecy: 'Lo que buscas se encuentra en un montón de tesoros, más allá de un par de puertas de color ámbar.',
    dmNote:   'En la tesorería sellada del Templo Ámbar.',
    color:    '#a07820',
  },
  {
    position: 4,
    posName:  'El Enemigo de Strahd',
    posIcon:  '🗡️',
    posDesc:  'Esta carta arroja luz sobre uno que os ayudará en gran medida en la batalla contra la oscuridad.',
    cardName: 'Nieblas — Reina de Picas',
    cardSub:  'Baraja de Arcanos',
    suit:     '🌫️',
    location: 'Abadía de Saint Markovia y otros lugares (Apéndice D)',
    prophecy: 'Una Vistani vaga por esta tierra sola, en busca de su mentor. Ella no se queda en un único lugar por mucho tiempo. Buscadla.',
    dmNote:   'Ezmerelda d\'Avenir. Se mueve por Barovia. Posibles ubicaciones: Abadía (S19), Torre Van Richten, Vallaki.',
    color:    '#205080',
  },
  {
    position: 5,
    posName:  'Strahd',
    posIcon:  '⚰️',
    posDesc:  'Vuestro enemigo es una criatura de la oscuridad, cuyos poderes están más allá de la mortalidad.',
    cardName: 'Lord Oscuro — Rey de Espadas',
    cardSub:  'Baraja de Arcanos',
    suit:     '👑',
    location: 'Tumba de Strahd (Zona K86)',
    prophecy: 'Se esconde en las profundidades de la oscuridad, en el único lugar en el cual ha de volver.',
    dmNote:   'La batalla final ocurre en la Tumba de Strahd o la de Sergei. Zona K86 del Castillo Ravenloft.',
    color:    '#7a0000',
  },
];

let revealedCards = [false, false, false, false, false];

function revealCard(i) {
  revealedCards[i] = true;
  renderTarot();
  saveTarotToStorage();
}

function revealAll() {
  revealedCards = [true, true, true, true, true];
  renderTarot();
  saveTarotToStorage();
}

function hideAll() {
  revealedCards = [false, false, false, false, false];
  renderTarot();
  saveTarotToStorage();
}

function renderTarot() {
  const container = document.getElementById('tarot-cards');
  if (!container) return;

  // Layout en cruz: posición 2 arriba, 1-5-3 en medio, 4 abajo
  // Usamos grid con áreas nombradas
  container.innerHTML = `
    <div class="tarot-cross">
      <div class="tarot-cross-top">    ${buildCard(1)}</div>
      <div class="tarot-cross-middle">
        ${buildCard(0)}
        ${buildCard(4)}
        ${buildCard(2)}
      </div>
      <div class="tarot-cross-bottom"> ${buildCard(3)}</div>
    </div>
  `;
}

function buildCard(i) {
  const card = READING[i];
  const revealed = revealedCards[i];
  return `
    <div class="tarot-card ${revealed ? 'revealed' : 'hidden-card'}" onclick="${revealed ? '' : 'revealCard('+i+')'}" style="--card-color:${card.color}">
      <div class="tarot-pos-badge">${card.posIcon} Posición ${card.position}</div>
      <div class="tarot-pos-name">${card.posName}</div>
      ${revealed ? `
        <div class="tarot-suit-big">${card.suit}</div>
        <div class="tarot-card-title">${card.cardName}</div>
        <div class="tarot-card-sub">${card.cardSub}</div>
        <hr class="tarot-divider">
        <div class="tarot-prophecy">"${card.prophecy}"</div>
        <div class="tarot-location">📍 ${card.location}</div>
        <div class="tarot-dm-note">🔒 DM: ${card.dmNote}</div>
      ` : `
        <div class="tarot-card-back">🌙</div>
        <div class="tarot-card-back-hint">Clic para revelar</div>
        <div class="tarot-pos-desc-hint">${card.posDesc}</div>
      `}
    </div>`;
}

function saveTarotToStorage() {
  localStorage.setItem('strahd_tarot', JSON.stringify({ revealedCards }));
}

function loadTarotFromStorage() {
  try {
    const d = JSON.parse(localStorage.getItem('strahd_tarot') || 'null');
    if (d?.revealedCards) revealedCards = d.revealedCards;
  } catch(e) {}
}
