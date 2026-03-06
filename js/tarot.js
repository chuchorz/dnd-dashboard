// ══════ TAROT DE MADAM EVA — Lectura fija de campaña ══════

const READING = [
  {
    position: 1,
    posName:  'El Tomo de Strahd',
    posIcon:  '📖',
    posRole:  'Esta carta informa de la historia.',
    posDesc:  'El conocimiento del pasado te ayudará a entender mejor a tu enemigo. Representa los misterios y enigmas; lo desconocido; aquellos que desean tener un poder mágico y gran conocimiento.',
    cardName: 'Maestro de Estrellas',
    cardSub:  'Mago — Baraja Común',
    suit:     '⭐',
    location: 'Torre de Van Richten — Cap. 11, zona V7',
    prophecy: 'Buscad la torre de un mago en un lago. Dad el nombre del mago y el sirviente os guiará a lo que buscáis.',
    dmNote:   'El tesoro se encuentra en el último piso de la Torre de Van Richten. Nombre del ascensor: "Khazan".',
    color:    '#6040a0',
  },
  {
    position: 2,
    posName:  'El Símbolo Sagrado de Ravenkind',
    posIcon:  '✝️',
    posRole:  'Esta carta habla de una fuerza poderosa para el bien y la protección.',
    posDesc:  'Un símbolo sagrado de gran esperanza. Representa la justicia y la venganza a grandes males; aquellos en una búsqueda para liberar al mundo del gran mal.',
    cardName: '1 de Espadas — Vengadora',
    cardSub:  'Baraja Común',
    suit:     '⚔️',
    location: 'Argynvostholt — Cap. 7, zona P36',
    prophecy: 'El tesoro se encuentra en casa de un dragón, en manos una vez limpias y ahora corrompidas.',
    dmNote:   'El tesoro está en posesión de Vladimir Hornosgaard en Argynvostholt (zona P36).',
    color:    '#a04020',
  },
  {
    position: 3,
    posName:  'La Espada Solar',
    posIcon:  '☀️',
    posRole:  'Esta es una carta de poder y fuerza.',
    posDesc:  'Habla de un arma de venganza: un arma para gobernarlas a todas. Hecha propia de luz solar.',
    cardName: '8 de Glifos — Obispo',
    cardSub:  'Baraja Común',
    suit:     '🔯',
    location: 'Templo del Ámbar — Cap. 13, zona X40',
    prophecy: 'Lo que buscas se encuentra en un montón de tesoros, más allá de un par de puertas de color ámbar.',
    dmNote:   'El tesoro se encuentra en la tesorería sellada del Templo Ámbar (zona X40).',
    color:    '#a07820',
  },
  {
    position: 4,
    posName:  'El Enemigo de Strahd',
    posIcon:  '🗡️',
    posRole:  'Esta carta arroja luz sobre uno que os ayudará en gran medida.',
    posDesc:  'Representa algo inesperado o misterioso que no puede ser evitado; una gran búsqueda o viaje que va a tratar de una sola alma.',
    cardName: 'Nieblas — Reina de Picas',
    cardSub:  'Baraja de Arcanos',
    suit:     '🌫️',
    location: 'Abadía de Saint Markovia — Cap. 8, zona S19 (y otras ubicaciones)',
    prophecy: 'Una Vistani vaga por esta tierra sola, en busca de su mentor. Ella no se queda en un único lugar por mucho tiempo. Buscadla.',
    dmNote:   'Se refiere a Ezmerelda d\'Avenir (Apéndice D). Se encuentra en la Abadía de Saint Markovia (zona S19), así como en otras ubicaciones a lo largo de Barovia.',
    color:    '#205080',
  },
  {
    position: 5,
    posName:  'Strahd',
    posIcon:  '⚰️',
    posRole:  'Vuestro enemigo es una criatura de la oscuridad.',
    posDesc:  'Sus poderes están más allá de la mortalidad. Representa un único y poderoso individuo de naturaleza maligna, cuyos objetivos tienen enormes y trascendentales consecuencias.',
    cardName: 'Lord Oscuro — Rey de Espadas',
    cardSub:  'Baraja de Arcanos',
    suit:     '👑',
    location: 'Tumba de Strahd — Castillo Ravenloft, zona K86',
    prophecy: 'Se esconde en las profundidades de la oscuridad, en el único lugar en el cual ha de volver.',
    dmNote:   'Strahd se enfrenta a los personajes en su propia tumba (zona K86).',
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
         style="width:220px;min-height:270px;border:1px solid ${rev ? c.color : 'var(--edge2)'};
                border-style:${rev ? 'solid' : 'dashed'};
                background:${rev ? 'linear-gradient(160deg,rgba(212,168,71,.05),var(--ink3))' : 'var(--surface)'};
                border-radius:4px;padding:16px;display:flex;flex-direction:column;gap:6px;
                cursor:${rev ? 'default' : 'pointer'};transition:all .3s;
                ${rev ? 'box-shadow:0 0 20px '+c.color+'44,0 4px 20px rgba(0,0,0,.5)' : ''}">

      <div style="font-family:'Cinzel',serif;font-size:.52rem;letter-spacing:.2em;color:var(--vellum-dim);text-transform:uppercase;">
        Posición ${c.position}
      </div>
      <div style="font-family:'Cinzel',serif;font-size:.7rem;letter-spacing:.08em;color:${rev ? c.color : 'var(--gilt)'};
                  border-bottom:1px solid var(--edge);padding-bottom:8px;margin-bottom:2px;line-height:1.4;">
        ${c.posIcon} ${c.posName}
      </div>

      ${rev ? `
        <div style="font-size:2.2rem;text-align:center;padding:6px 0;filter:drop-shadow(0 0 8px ${c.color}88);">${c.suit}</div>
        <div style="font-family:'UnifrakturMaguntia',cursive;font-size:1.15rem;color:var(--gilt);text-align:center;
                    text-shadow:0 0 14px var(--gilt-glow);letter-spacing:1px;">${c.cardName}</div>
        <div style="font-family:'Cinzel',serif;font-size:.54rem;letter-spacing:.1em;color:var(--vellum-dim);
                    text-align:center;margin-bottom:6px;">${c.cardSub}</div>
        <div style="border-top:1px solid var(--edge);padding-top:8px;font-size:.82rem;color:var(--vellum);
                    font-style:italic;line-height:1.7;">"${c.prophecy}"</div>
        <div style="font-size:.74rem;color:var(--gilt-dim);margin-top:4px;font-family:'Cinzel',serif;
                    font-size:.58rem;letter-spacing:.08em;">📍 ${c.location}</div>
        <div style="font-size:.72rem;color:#e07060;font-style:italic;padding:6px 9px;
                    background:rgba(122,0,0,.12);border:1px solid rgba(180,50,40,.3);
                    border-radius:3px;margin-top:4px;line-height:1.55;">🔒 ${c.dmNote}</div>
      ` : `
        <div style="font-size:.78rem;color:var(--gilt-dim);font-style:italic;line-height:1.6;
                    margin-bottom:4px;">${c.posRole}</div>
        <div style="font-size:.8rem;color:var(--vellum-dim);font-style:italic;line-height:1.65;">${c.posDesc}</div>
        <div style="margin-top:auto;padding-top:16px;text-align:center;">
          <div style="font-size:2.5rem;opacity:.18;margin-bottom:6px;">🌙</div>
          <div style="font-family:'Cinzel',serif;font-size:.56rem;letter-spacing:.18em;
                      color:var(--edge3);text-transform:uppercase;">— Clic para revelar —</div>
        </div>
      `}
    </div>`;
}
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
