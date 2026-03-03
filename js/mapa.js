// ══════ MAPA INTERACTIVO DE BAROVIA ══════
// Coordenadas calibradas sobre la imagen oficial (1440x810px → viewBox 1440 810)

const MAP_LOCATIONS = [
  // id, x, y (% del viewBox), icon, name, color, datos
  { id:'ravenloft', x:1255, y:290,  icon:'🏰', name:'Castillo Ravenloft',       color:'#c03020',
    chapter:'Cap. 4', tarot:'⚰️ Pos.5: Batalla final (K86)',
    desc:'El hogar eterno de Strahd. Domina el valle desde lo alto del Pillarstone. Zona K86 es la tumba — batalla final.',
    npcs:['Strahd von Zarovich','Rahadin (chambelán)','Novias: Anastrasya, Ludmilla, Volenta','Cyrus Belview'],
    threats:['Guardias vampiro por todas las zonas','Trampas arcanas','Las novias son independientes y traicioneras'],
    dmNote:'La tumba de Strahd (K86) es el lugar de la batalla final según la profecía. La de Sergei está en K85.' },

  { id:'vallaki',   x:635,  y:318,  icon:'🏘️', name:'Vallaki',                  color:'#806040',
    chapter:'Cap. 5', tarot:null,
    desc:'Ciudad amurallada bajo el yugo del Barón Vallakovich. Festivales obligatorios semanales so pena de prisión.',
    npcs:['Barón Vallakovich','Lady Fiona Wachter','Padre Lucian','Rictavio (Van Richten disfrazado)','Izek Strazni'],
    threats:['Guardia del Barón siempre presente','Culto de Lady Wachter bajo tierra'],
    dmNote:'Rictavio es Van Richten. Su carromato en el establo tiene un tigre dientes de sable. Lady Wachter quiere derrocar al Barón.' },

  { id:'aldea',     x:1310, y:530,  icon:'🏚️', name:'Aldea de Barovia',          color:'#604030',
    chapter:'Cap. 3', tarot:null,
    desc:'Primer asentamiento. Sumida en desesperación. Casi nadie sale a la calle. Los cuervos lo observan todo desde los tejados.',
    npcs:['Ismark el Menor (alcalde interino)','Ireena Kolyana','Mad Mary','Donavich (sacerdote)'],
    threats:['Strahd puede aparecer en carruaje negro','Doru (hijo vampirizado de Donavich) en el sótano'],
    dmNote:'Misión: escoltar a Ireena a Vallaki. Donavich tiene a su hijo Doru encadenado abajo — no puede destruirlo.' },

  { id:'krezk',     x:128,  y:222,  icon:'⛩️', name:'Krezk',                     color:'#506050',
    chapter:'Cap. 8', tarot:null,
    desc:'Villa tranquila con muralla y una abadía perturbadora en la cima. El manantial sagrado tiene agua que no se congela.',
    npcs:['Burgomaestre Dmitri Krezkov','El Abad (ángel corrompido)','Vasilka (criatura de la abadía)'],
    threats:['Los mongrelfolk de la Abadía','El Abad puede tornarse hostil si se le presiona'],
    dmNote:'Ezmerelda puede estar en la Abadía (zona S19). El Abad quiere presentar a Vasilka como novia a Strahd.' },

  { id:'torre',     x:330,  y:248,  icon:'🔭', name:'Torre de Van Richten',      color:'#6040a0',
    chapter:'Cap. 11', tarot:'📖 Pos.1: Tomo de Strahd (V7)',
    desc:'Torre mágica en el lago Baratok construida por el mago Khazan. Van Richten la usó como refugio secreto.',
    npcs:['Arrigal (espía Vistani, vigila los alrededores)','Ezmerelda (posiblemente en los carromatos)'],
    threats:['Golem de rayos en la cima si se pronuncia nombre incorrecto','Arrigal es peligroso si se siente amenazado'],
    dmNote:'📖 TOMO aquí. Zona V7. Para el ascensor decir: "Khazan". Van Richten dejó diarios con info crucial sobre Strahd.' },

  { id:'winery',    x:72,   y:390,  icon:'🍷', name:'Wizards of Wines',           color:'#607040',
    chapter:'Cap. 12', tarot:null,
    desc:'La única bodega de Barovia. Fuente de casi todo el vino del valle. Tomada por druidas del bosque y blights.',
    npcs:['Davian Martikov (patriarca wereraven)','Adrian Martikov','Familia Martikov'],
    threats:['Druidas y blights ocupan la bodega','Wintersplinter — árbol animado enorme'],
    dmNote:'Los Martikov son Guardianes del Amanecer (wereravens). Las 3 gemas mágicas robadas deben recuperarse. Sin ellas el vino escasea y Barovia muere.' },

  { id:'argyn',     x:490,  y:490,  icon:'🛡️', name:'Argynvostholt',              color:'#4060a0',
    chapter:'Cap. 7', tarot:'✝️ Pos.2: Símbolo Sagrado (P36)',
    desc:'Mansión en ruinas de la Orden del Dragón de Plata. El espíritu del dragón Argynvost ronda sus pasillos.',
    npcs:['Vladimir Hornosgaard (comandante espectral, hostil)','Sir Godfrey Gwilym (puede ser aliado)'],
    threats:['Revenants de los caballeros hostiles','Vladimir es extremadamente peligroso — puede matar PJs de nivel medio'],
    dmNote:'✝️ SÍMBOLO aquí. Zona P36, con Vladimir. Si llevan la calavera del dragón a la capilla, los caballeros descansan y conceden ventaja contra Strahd.' },

  { id:'amber',     x:580,  y:700,  icon:'🔶', name:'Templo del Ámbar',            color:'#c08020',
    chapter:'Cap. 13', tarot:'☀️ Pos.3: Espada Solar (X40)',
    desc:'Templo sellado en las montañas que encierra vestigios oscuros de poderes primordiales. Nivel 7+ recomendado.',
    npcs:['Exethanter (lich guardián, puede ser aliado)','Neferon (lich hostil)','Los Vestigios (entidades en sarcófagos)'],
    threats:['Vestigios ofrecen poder a cambio de corrupción permanente','Guardias no-muertos en todas las zonas'],
    dmNote:'☀️ ESPADA SOLAR. Zona X40 tesorería sellada. Los vestigios hablan y tienden trampas. Neferon fue quien empoderó originalmente a Strahd.' },

  { id:'mill',      x:738,  y:425,  icon:'⚙️', name:'Viejo Molino de los Huesos',  color:'#604040',
    chapter:'Cap. 6', tarot:null,
    desc:'Molino siniestro en la colina. Las brujas Morgantha y sus hijas fabrican los pasteles del sueño que esclavizan a los aldeanos.',
    npcs:['Morgantha (hag nocturna, disfrazada de vendedora)','Bella Sunbane','Offalia Wormwiggle'],
    threats:['Las tres forman un aquelarre de nivel 5','Pueden raptar niños para ingredientes'],
    dmNote:'Los pasteles producen sueños placenteros y adicción. Puede haber una niña prisionera. El aquelarre es muy peligroso para niveles bajos.' },

  { id:'tser',      x:960,  y:555,  icon:'🔮', name:'Tser Pool — Vistani',         color:'#605080',
    chapter:'Cap. 2', tarot:null,
    desc:'El campamento Vistani junto al río. Madam Eva reside aquí. Los Vistani son tolerados por Strahd — y leales a él.',
    npcs:['Madam Eva (adivina — identidad verdadera desconocida)','Stanimir','Eliza'],
    threats:['Los Vistani informarán a Strahd de los PJs','No atacan pero espían'],
    dmNote:'La lectura del Tarokka ocurre aquí. Madam Eva sabe mucho más de lo que dice. No es tan neutral como aparenta.' },

  { id:'berez',     x:378,  y:588,  icon:'🌿', name:'Ruinas de Berez',             color:'#405040',
    chapter:'Cap. 10', tarot:null,
    desc:'Pueblo destruido hace siglos por Strahd al morir Marina, su amada. Ahora un pantano infestado de muertos.',
    npcs:['Baba Lysaga (bruja, "madre" adoptiva de Strahd)','Espíritu de Marina (fantasma en el pozo)'],
    threats:['Baba Lysaga vuela en una olla de calavera gigante','Muertos vivientes por todo el pantano'],
    dmNote:'Baba Lysaga es CR 11 y extremadamente peligrosa. El fantasma de Marina puede revelar historia crucial sobre el pasado de Strahd.' },

  { id:'wolves',    x:300,  y:142,  icon:'🐺', name:'Guarida Hombres Lobo',        color:'#504030',
    chapter:'Cap. 15', tarot:null,
    desc:'Cueva al pie de las montañas del norte. Manada de hombres lobo liderada por Kiril Stoyanovich, fiel a Strahd.',
    npcs:['Kiril Stoyanovich (alfa actual, leal a Strahd)','Emil Toranescu (alfa anterior, prisionero)','Zuleika (chamán, puede ayudar)'],
    threats:['Manada completa muy peligrosa en combate','Niños humanos capturados en jaulas'],
    dmNote:'Zuleika puede ser aliada si los PJs liberan a Emil. Los niños de Barovia son prisioneros aquí. Misión secundaria importante.' },

  { id:'abadia',    x:134,  y:118,  icon:'🏛️', name:'Abadía de St. Markovia',      color:'#505060',
    chapter:'Cap. 8', tarot:null,
    desc:'Abadía en lo alto de la colina sobre Krezk. El Abad la dirige desde hace 100 años. Los mongrelfolk deambulan por sus pasillos.',
    npcs:['El Abad (deva corrompido)','Vasilka (novia artificial)','Ezmerelda d\'Avenir (posiblemente aquí)'],
    threats:['Mongrelfolk impredecibles','El Abad puede usar poderes angelicales corrompidos'],
    dmNote:'🌫️ Ezmerelda puede estar aquí (zona S19). El Abad fabrica a Vasilka para ofrecérsela a Strahd como novia — espera con eso obtener el perdón divino.' },
];

let selectedLoc = null;

function renderMapa() {
  const wrap = document.getElementById('mapa-wrap');
  if (!wrap) return;

  const pins = MAP_LOCATIONS.map(loc => {
    const isSelected = selectedLoc === loc.id;
    const hasTarot = !!loc.tarot;
    return `
      <div class="map-pin ${isSelected ? 'map-pin-active' : ''} ${hasTarot ? 'map-pin-prophecy' : ''}"
           id="pin-${loc.id}"
           onclick="selectLoc('${loc.id}')"
           style="left:${(loc.x/1440*100).toFixed(2)}%;top:${(loc.y/810*100).toFixed(2)}%;"
           title="${loc.name}">
        <span class="map-pin-icon">${loc.icon}</span>
        <span class="map-pin-label">${loc.name}</span>
        ${hasTarot ? '<span class="map-pin-tarot-dot"></span>' : ''}
      </div>`;
  }).join('');

  wrap.innerHTML = `
    <div style="position:relative;width:100%;user-select:none;">
      <img src="mapa-barovia.png" alt="Mapa de Barovia"
           style="width:100%;display:block;border-radius:2px;border:1px solid var(--border);">
      ${pins}
    </div>
  `;
}

function selectLoc(id) {
  selectedLoc = id;
  const loc = MAP_LOCATIONS.find(l => l.id === id);
  if (!loc) return;

  // Update pin highlights
  document.querySelectorAll('.map-pin').forEach(p => p.classList.remove('map-pin-active'));
  const pin = document.getElementById('pin-' + id);
  if (pin) pin.classList.add('map-pin-active');

  const tarotBadge = loc.tarot
    ? `<div style="display:inline-block;margin-bottom:10px;padding:5px 12px;background:rgba(232,200,122,.1);border:1px solid var(--gold-dim);border-radius:2px;font-family:'Cinzel',serif;font-size:.65rem;color:var(--gold);">🔮 ${loc.tarot}</div>`
    : '';

  const npcsHtml = loc.npcs.map(n =>
    `<span style="display:inline-block;padding:2px 8px;background:var(--bg2);border:1px solid var(--border);border-radius:10px;font-size:.74rem;color:var(--text-mid);margin:2px 2px 2px 0;">${n}</span>`
  ).join('');

  const threatsHtml = loc.threats.map(t =>
    `<li style="font-size:.79rem;color:var(--text);line-height:1.6;margin-bottom:3px;">${t}</li>`
  ).join('');

  document.getElementById('map-info').style.display = 'block';
  document.getElementById('map-info').innerHTML = `
    <div class="card" style="border-color:${loc.color};margin-top:12px;">
      <div class="card-title" style="justify-content:space-between;border-color:${loc.color}55;">
        <span>${loc.icon} ${loc.name}</span>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-family:'Cinzel',serif;font-size:.6rem;color:var(--text-dim);">${loc.chapter}</span>
          <button class="btn btn-ghost btn-sm" onclick="clearLocSelection()" style="padding:2px 8px;font-size:.58rem;">✕</button>
        </div>
      </div>
      ${tarotBadge}
      <p style="font-size:.85rem;color:var(--text-mid);font-style:italic;line-height:1.65;margin-bottom:12px;">${loc.desc}</p>
      <div class="grid-2" style="gap:10px;margin-bottom:10px;">
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
      <p style="font-size:.82rem;color:var(--text);line-height:1.6;">${loc.dmNote}</p>
    </div>
  `;
}

function clearLocSelection() {
  selectedLoc = null;
  document.querySelectorAll('.map-pin').forEach(p => p.classList.remove('map-pin-active'));
  document.getElementById('map-info').style.display = 'none';
  document.getElementById('map-info').innerHTML = '';
}
