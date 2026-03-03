// ══════ MAPA INTERACTIVO DE BAROVIA ══════

const LOCATIONS_DATA = {
  aldea: {
    name:    'Aldea de Barovia',
    icon:    '🏚️',
    chapter: 'Capítulo 3',
    desc:    'El primer asentamiento que encuentran los PJs. Sumida en la desesperación. Casi nadie sale a la calle. Los cuervos lo observan todo.',
    npcs:    ['Ismark el Menor (alcalde interino)', 'Ireena Kolyana (objetivo de Strahd)', 'Mad Mary (mujer llorando a Gertruda)', 'Donavich (sacerdote)'],
    threats: ['Strahd puede aparecer en carruaje', 'Muertos vivientes al anochecer'],
    notes:   'Misión principal: escoltar a Ireena a Vallaki. Donavich tiene a su hijo vampirizado en el sótano (Doru).',
    tarot:   null,
    color:   '#5a3020',
  },
  vallaki: {
    name:    'Vallaki',
    icon:    '🏘️',
    chapter: 'Capítulo 5',
    desc:    'Ciudad amurallada gobernada con mano de hierro por el Barón Vallakovich. Festivales obligatorios semanales bajo pena de prisión.',
    npcs:    ['Barón Vallakovich (gobernante paranoico)', 'Lady Wachter (conspiradora)', 'Padre Lucian (sacerdote preocupado)', 'Rictavio (Van Richten disfrazado)', 'Izek Strazni (esbirro del Barón)'],
    threats: ['Guardia del Barón patrulla constantemente', 'Culto de Lady Wachter bajo la ciudad'],
    notes:   'Hay una leyenda local que dice que nadie puede ser infeliz dentro de sus muros. Mentira.',
    tarot:   null,
    color:   '#5a3020',
  },
  ravenloft: {
    name:    'Castillo Ravenloft',
    icon:    '🏰',
    chapter: 'Capítulo 4',
    desc:    'El hogar eterno de Strahd. Domina el valle desde lo alto del Pillarstone. Sus salas están llenas de trampas, sirvientes no-muertos y secretos.',
    npcs:    ['Strahd von Zarovich', 'Rahadin (chambelán)', 'Novias de Strahd: Anastrasya, Ludmilla, Volenta', 'Cyrus Belview (criado desfigurado)'],
    threats: ['Zona K86: tumba de Strahd (batalla final)', 'Zona K15: sala del órgano', 'Guardias vampiro por todas partes'],
    notes:   'Strahd puede invitar a cenar a los PJs. Es un anfitrión "cordial" hasta que no lo es. La tumba de Sergei está en K85.',
    tarot:   { position: 5, text: '⚰️ Pos.5: Batalla final en la Tumba (K86)' },
    color:   '#8b0000',
  },
  krezk: {
    name:    'Krezk',
    icon:    '⛩️',
    chapter: 'Capítulo 8',
    desc:    'Villa tranquila con una abadía en lo alto de la colina. El agua del manantial tiene propiedades extrañas. La Abadía oculta horrores.',
    npcs:    ['Burgomaestre Dmitri Krezkov', 'Anna Krezkova (esposa)', 'El Abad (ángel corrompido)', 'Cygnet/Vasilka (criatura de la Abadía)'],
    threats: ['Los mongrelfolk de la Abadía', 'El Abad puede tornarse hostil'],
    notes:   'Ezmerelda puede estar aquí (zona S19). El manantial sagrado puede curar... o no.',
    tarot:   null,
    color:   '#5a3020',
  },
  tser: {
    name:    'Tser Pool — Campamento Vistani',
    icon:    '🔮',
    chapter: 'Capítulo 2',
    desc:    'El campamento de los Vistani junto al río. Madam Eva reside aquí y puede leer el Tarokka. Los Vistani son leales a Strahd.',
    npcs:    ['Madam Eva (adivina anciana, verdadera identidad desconocida)', 'Stanimir', 'Eliza'],
    threats: ['Los Vistani informarán a Strahd de los movimientos de los PJs'],
    notes:   'Madam Eva hace la lectura del Tarokka aquí. No es tan neutral como parece. Tener cuidado con lo que se dice en el campamento.',
    tarot:   null,
    color:   '#5a3020',
  },
  winery: {
    name:    'Wizards of Wines',
    icon:    '🍷',
    chapter: 'Capítulo 12',
    desc:    'La única bodega de Barovia, fuente de la mayor parte del vino del valle. Ha sido tomada por druidas y blights del bosque.',
    npcs:    ['Familia Martikov (licántropos guardiannes)', 'Davian Martikov (patriarca)', 'Adrian Martikov'],
    threats: ['Druidas del bosque', 'Needle blights, twig blights', 'Wintersplinter (árbol gigante)'],
    notes:   'Las tres gemas mágicas han sido robadas. Recuperarlas es la misión. Los Martikov son wereravens — Guardianes del Amanecer.',
    tarot:   null,
    color:   '#5a3020',
  },
  argyn: {
    name:    'Argynvostholt',
    icon:    '🛡️',
    chapter: 'Capítulo 7',
    desc:    'La mansión en ruinas de la Orden del Dragón de Plata. El fantasma de Argynvost aún ronda sus pasillos. Vladimir Hornosgaard y los espectros caballeros no descansan.',
    npcs:    ['Vladimir Hornosgaard (comandante espectral, hostil)', 'Sir Godfrey Gwilym (espectro, puede ser aliado)', 'Argynvost (el dragón, solo su espíritu)'],
    threats: ['Revenants de los caballeros (combate posible)', 'Vladimir es extremadamente peligroso'],
    notes:   '🔵 SÍMBOLO SAGRADO aquí. En posesión de Vladimir (zona P36). Si restauran la capucha del dragón, los caballeros descansan y otorgan ventaja contra Strahd.',
    tarot:   { position: 2, text: '✝️ Pos.2: Símbolo Sagrado de Ravenkind (P36)' },
    color:   '#4a6090',
  },
  torre: {
    name:    'Torre de Van Richten',
    icon:    '🔭',
    chapter: 'Capítulo 11',
    desc:    'Una torre mágica en el lago Baratok. Construida por el mago Khazan. Van Richten la usó como refugio. El nombre del mago activa el ascensor.',
    npcs:    ['Arrigal (Vistani espía, vigila la torre)', 'Esmerelda puede estar en los carromatos cercanos'],
    threats: ['Golem de rayos en la cima si se dice el nombre incorrecto', 'Arrigal es peligroso si detecta amenaza'],
    notes:   '📖 TOMO DE STRAHD aquí. Zona V7, último piso. Nombre del mago para el ascensor: "Khazan". Van Richten dejó sus diarios y notas.',
    tarot:   { position: 1, text: '📖 Pos.1: Tomo de Strahd (Zona V7)' },
    color:   '#8060c0',
  },
  mill: {
    name:    'Viejo Molino de los Huesos',
    icon:    '⚙️',
    chapter: 'Capítulo 6',
    desc:    'Un molino siniestro en la colina. Las brujas de Barovia Morgantha y sus hijas fabrican aquí los pasteles del sueño que venden por los pueblos.',
    npcs:    ['Morgantha (hag nocturna, disfrazada de vieja)', 'Bella Sunbane y Offalia Wormwiggle (hijas hag)'],
    threats: ['Las tres forman un aquelarre. Muy peligrosas juntas.', 'Pueden raptar niños para los pasteles'],
    notes:   'Los pasteles del sueño provocan sueños placenteros y adicción. La niña Ireena está prisionera aquí. Cuidado: el aquelarre tiene hechizos de nivel 5.',
    tarot:   null,
    color:   '#5a3020',
  },
  wachter: {
    name:    'Mansión Wachterhaus',
    icon:    '🕯️',
    chapter: 'Capítulo 5',
    desc:    'La mansión de la familia Wachter en Vallaki. Lady Fiona Wachter lidera en secreto un culto a Strahd y busca derrocar al Barón.',
    npcs:    ['Lady Fiona Wachter (conspiradora, neutral-aliada potencial)', 'Ernst Larnak (espía)', 'Miembros del culto'],
    threats: ['El culto puede activarse contra los PJs si amenazan sus planes', 'Lleva diablos menores invocados'],
    notes:   'Lady Wachter puede ser aliada táctica contra el Barón, pero su lealtad final es a Strahd. No confiar del todo.',
    tarot:   null,
    color:   '#5a3020',
  },
  amber: {
    name:    'Templo del Ámbar',
    icon:    '🔶',
    chapter: 'Capítulo 13',
    desc:    'Un templo antiguo sellado en las montañas que encierra vestigios oscuros de poderes primordiales. Extremadamente peligroso.',
    npcs:    ['Exethanter (lich guardián, puede ser aliado)', 'Neferon (lich hostil)', 'Los Vestigios (entidades en los sarcófagos)'],
    threats: ['Los vestigios ofrecen poder a cambio de corrupción permanente', 'Guardias no-muertos por todas las zonas'],
    notes:   '☀️ ESPADA SOLAR aquí. Zona X40, tesorería sellada. Cuidado: los vestigios hablan y tienden trampas. Neferon dio poder a Strahd.',
    tarot:   { position: 3, text: '☀️ Pos.3: Espada Solar (Zona X40)' },
    color:   '#c08020',
  },
  wolves: {
    name:    'Guarida de los Hombres Lobo',
    icon:    '🐺',
    chapter: 'Capítulo 15',
    desc:    'Una cueva al pie de las montañas donde vive la manada de hombres lobo liderada por Kiril Stoyanovich, fiel a Strahd.',
    npcs:    ['Kiril Stoyanovich (alfa, leal a Strahd)', 'Emil Toranescu (alfa anterior, prisionero)', 'Zuleika Toranescu (chaman, puede ayudar)'],
    threats: ['Manada completa: muy peligrosa', 'Niños humanos capturados en las jaulas'],
    notes:   'Zuleika puede ser aliada si se libera a Emil. La manada guarda niños de Barovia. Misión secundaria importante.',
    tarot:   null,
    color:   '#5a3020',
  },
  berez: {
    name:    'Ruinas de Berez',
    icon:    '🌿',
    chapter: 'Capítulo 10',
    desc:    'Un pueblo destruido hace siglos por Strahd cuando la mujer que amaba allí vivía. Ahora es un pantano infestado de muertos.',
    npcs:    ['Baba Lysaga (bruja anciana, madre adoptiva de Strahd)', 'El espíritu de Marina (fantasma)'],
    threats: ['Baba Lysaga vuela en su olla de calavera', 'Muertos vivientes por el pantano'],
    notes:   'Baba Lysaga es extremadamente peligrosa y obsesionada con Strahd. El pozo con el espíritu de Marina puede dar información sobre la historia del vampiro.',
    tarot:   null,
    color:   '#5a3020',
  },
};

let selectedLocation = null;

function selectLocation(id) {
  selectedLocation = id;
  const loc = LOCATIONS_DATA[id];
  if (!loc) return;

  // Highlight selected on map
  document.querySelectorAll('.map-loc .loc-circle').forEach(c => {
    c.setAttribute('stroke-width', '2');
    c.setAttribute('filter', '');
  });
  const circle = document.querySelector(`#loc-${id} .loc-circle`);
  if (circle) {
    circle.setAttribute('stroke-width', '3.5');
    circle.setAttribute('filter', 'url(#glow)');
    circle.setAttribute('stroke', loc.color);
  }

  document.getElementById('map-selected-name').textContent = `${loc.icon} ${loc.name}`;

  const tarotBadge = loc.tarot
    ? `<div style="display:inline-block;padding:4px 12px;background:rgba(232,200,122,.1);border:1px solid var(--gold-dim);border-radius:2px;font-family:'Cinzel',serif;font-size:.65rem;color:var(--gold);margin-bottom:10px;">
        🔮 PROFECÍA: ${loc.tarot.text}
       </div>`
    : '';

  const npcsHtml = loc.npcs.map(n =>
    `<span style="display:inline-block;padding:2px 8px;background:var(--bg2);border:1px solid var(--border);border-radius:10px;font-size:.75rem;color:var(--text-mid);margin:2px;">${n}</span>`
  ).join('');

  const threatsHtml = loc.threats.map(t =>
    `<li style="font-size:.8rem;color:var(--text);line-height:1.6;margin-bottom:3px;">${t}</li>`
  ).join('');

  document.getElementById('map-info-panel').style.display = 'block';
  document.getElementById('map-info-panel').innerHTML = `
    <div class="card" style="border-color:${loc.color};">
      <div class="card-title" style="justify-content:space-between;border-color:${loc.color}40;">
        <span>${loc.icon} ${loc.name}</span>
        <span style="font-family:'Cinzel',serif;font-size:.6rem;color:var(--text-dim);">${loc.chapter}</span>
      </div>
      ${tarotBadge}
      <p style="font-size:.86rem;color:var(--text-mid);font-style:italic;line-height:1.65;margin-bottom:12px;">${loc.desc}</p>
      <div class="grid-2" style="gap:10px;">
        <div>
          <div style="font-family:'Cinzel',serif;font-size:.6rem;letter-spacing:.12em;color:var(--gold);margin-bottom:6px;text-transform:uppercase;">👤 NPCs Clave</div>
          <div>${npcsHtml}</div>
        </div>
        <div>
          <div style="font-family:'Cinzel',serif;font-size:.6rem;letter-spacing:.12em;color:var(--blood-bright);margin-bottom:6px;text-transform:uppercase;">⚠️ Amenazas</div>
          <ul style="padding-left:14px;">${threatsHtml}</ul>
        </div>
      </div>
      <hr class="divider">
      <div style="font-family:'Cinzel',serif;font-size:.6rem;letter-spacing:.12em;color:var(--text-dim);margin-bottom:5px;text-transform:uppercase;">🔒 Notas del DM</div>
      <p style="font-size:.82rem;color:var(--text);line-height:1.6;">${loc.notes}</p>
    </div>
  `;
}

function clearMapSelection() {
  selectedLocation = null;
  document.getElementById('map-selected-name').textContent = '';
  document.getElementById('map-info-panel').style.display = 'none';
  document.querySelectorAll('.map-loc .loc-circle').forEach(c => {
    c.setAttribute('stroke-width', '2');
    c.setAttribute('filter', '');
  });
}
