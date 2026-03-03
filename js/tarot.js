// ══════ TAROT DE MADAM EVA — Lectura fija de campaña ══════

const READING = [
  {
    position: 1,
    posName:  'El Tomo de Strahd',
    posIcon:  '📖',
    posDesc:  'El conocimiento del pasado te ayudará a entender mejor a tu enemigo.',
    cardName: 'Maestro de Estrellas',
    cardSub:  'Mago — Baraja Común',
    suit:     '⭐',
    location: 'Torre de Van Richten (Cap. 11 — V7)',
    prophecy: 'Buscad la torre de un mago en un lago. Dad el nombre del mago y el sirviente os guiará a lo que buscáis.',
    dmNote:   'Último piso de la Torre de Van Richten. Nombre del ascensor: "Khazan".',
    color:    '#6040a0',
  },
  {
    position: 2,
    posName:  'El Símbolo Sagrado de Ravenkind',
    posIcon:  '✝️',
    posDesc:  'Un símbolo sagrado de gran esperanza y protección contra la oscuridad.',
    cardName: '1 de Espadas — Vengadora',
    cardSub:  'Baraja Común',
    suit:     '⚔️',
    location: 'Argynvostholt (Cap. 7 — P36)',
    prophecy: 'El tesoro se encuentra en casa de un dragón, en manos una vez limpias y ahora corrompidas.',
    dmNote:   'En posesión de Vladimir Hornosgaard. Zona P36.',
    color:    '#a04020',
  },
  {
    position: 3,
    posName:  'La Espada Solar',
    posIcon:  '☀️',
    posDesc:  'Un arma de venganza forjada con luz solar. Para gobernarlas a todas.',
    cardName: '8 de Glifos — Obispo',
    cardSub:  'Baraja Común',
    suit:     '🔯',
    location: 'Templo del Ámbar (Cap. 13 — X40)',
    prophecy: 'Lo que buscas se encuentra en un montón de tesoros, más allá de un par de puertas de color ámbar.',
    dmNote:   'Tesorería sellada del Templo Ámbar. Zona X40.',
    color:    '#a07820',
  },
  {
    position: 4,
    posName:  'El Enemigo de Strahd',
    posIcon:  '🗡️',
    posDesc:  'Uno que os ayudará en gran medida en la batalla contra la oscuridad.',
    cardName: 'Nieblas — Reina de Picas',
    cardSub:  'Baraja de Arcanos',
    suit:     '🌫️',
    location: 'Errante por Barovia (Apéndice D)',
    prophecy: 'Una Vistani vaga por esta tierra sola, en busca de su mentor. Ella no se queda en un único lugar por mucho tiempo. Buscadla.',
    dmNote:   'Ezmerelda d\'Avenir. Posibles ubicaciones: Abadía S19, Torre Van Richten, Vallaki.',
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
    location: 'Tumba de Strahd — Castillo Ravenloft (K86)',
    prophecy: 'Se esconde en las profundidades de la oscuridad, en el único lugar en el cual ha de volver.',
    dmNote:   'Batalla final en la Tumba de Strahd (K86) o la de Sergei (K85).',
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
  const el = document.getElementById('tarot-cards');
  if (!el) return;

  // Layout en cruz: [2] arriba, [1][5][3] en medio fila, [4] abajo
  // índices: pos1=idx0, pos2=idx1, pos3=idx2, pos4=idx3, pos5=idx4
  el.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">

      <div style="display:flex;justify-content:center;">
        ${card(1)}
      </div>

      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        ${card(0)}
        ${card(4)}
        ${card(2)}
      </div>

      <div style="display:flex;justify-content:center;">
        ${card(3)}
      </div>

    </div>
  `;
}

function card(i) {
  const c = READING[i];
  const rev = revealedCards[i];
  return `
    <div onclick="${rev ? '' : 'revealCard('+i+')'}"
         style="width:210px;min-height:260px;border:1px solid ${rev ? c.color : 'var(--border)'};
                border-style:${rev ? 'solid' : 'dashed'};
                background:${rev ? 'linear-gradient(160deg,rgba(232,200,122,.05),var(--bg2))' : 'var(--bg2)'};
                border-radius:3px;padding:14px;display:flex;flex-direction:column;gap:5px;
                cursor:${rev ? 'default' : 'pointer'};transition:all .25s;
                ${rev ? 'box-shadow:0 0 14px '+c.color+'33' : ''}">

      <div style="font-family:'Cinzel',serif;font-size:.55rem;letter-spacing:.15em;color:var(--text-dim);">
        Posición ${c.position}
      </div>
      <div style="font-family:'Cinzel',serif;font-size:.72rem;letter-spacing:.08em;color:${rev ? c.color : 'var(--gold)'};border-bottom:1px solid var(--border);padding-bottom:7px;margin-bottom:4px;">
        ${c.posIcon} ${c.posName}
      </div>

      ${rev ? `
        <div style="font-size:2rem;text-align:center;padding:6px 0;">${c.suit}</div>
        <div style="font-family:'UnifrakturMaguntia',cursive;font-size:1.1rem;color:var(--gold);text-align:center;text-shadow:0 0 12px var(--gold-glow);">${c.cardName}</div>
        <div style="font-family:'Cinzel',serif;font-size:.56rem;letter-spacing:.1em;color:var(--text-dim);text-align:center;margin-bottom:4px;">${c.cardSub}</div>
        <div style="border-top:1px solid var(--border);padding-top:7px;font-size:.78rem;color:var(--text);font-style:italic;line-height:1.65;">"${c.prophecy}"</div>
        <div style="font-size:.7rem;color:var(--gold-dim);margin-top:4px;">📍 ${c.location}</div>
        <div style="font-size:.68rem;color:var(--blood-bright);font-style:italic;padding:5px 7px;background:rgba(122,0,0,.1);border:1px solid rgba(176,48,32,.25);border-radius:2px;margin-top:4px;">🔒 ${c.dmNote}</div>
      ` : `
        <div style="font-size:2.8rem;text-align:center;padding:24px 0 10px;opacity:.2;">🌙</div>
        <div style="font-family:'Cinzel',serif;font-size:.6rem;letter-spacing:.12em;color:var(--text-dim);text-align:center;">— Clic para revelar —</div>
        <div style="font-size:.74rem;color:var(--text-dim);font-style:italic;line-height:1.6;text-align:center;margin-top:8px;">${c.posDesc}</div>
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
