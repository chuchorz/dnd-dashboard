// MAPA INTERACTIVO DE BAROVIA

const MAP_LOCS = [
  { id:'ravenloft', px:87.2, py:35.8, icon:'B', name:'Castillo Ravenloft',     color:'#c03020', tarot:'Pos.5 - Batalla final K86',
    chapter:'Cap. 4', desc:'El hogar eterno de Strahd. Domina el valle desde lo alto del Pillarstone.',
    npcs:['Strahd von Zarovich','Rahadin (chambel&aacute;n)','Novias: Anastrasya, Ludmilla, Volenta'],
    threats:['Guardias vampiro en todas las zonas','Trampas arcanas en pasillos'],
    dm:'Tumba de Strahd K86 = batalla final. Tumba de Sergei K85.' },

  { id:'vallaki', px:44.1, py:39.3, icon:'V', name:'Vallaki',                  color:'#806040', tarot:null,
    chapter:'Cap. 5', desc:'Ciudad amurallada con festivales obligatorios del Bar&oacute;n Vallakovich.',
    npcs:['Bar&oacute;n Vallakovich','Lady Fiona Wachter','Padre Lucian','Rictavio (Van Richten disfrazado)','Izek Strazni'],
    threats:['Guardia del Bar&oacute;n','Culto de Lady Wachter subterr&aacute;neo'],
    dm:'Rictavio ES Van Richten. Tigre dientes de sable en su carromato.' },

  { id:'aldea', px:91.0, py:65.4, icon:'A', name:'Aldea de Barovia',           color:'#604030', tarot:null,
    chapter:'Cap. 3', desc:'Primer asentamiento. Desesperaci&oacute;n total. Los cuervos observan desde los tejados.',
    npcs:['Ismark el Menor','Ireena Kolyana','Mad Mary','Donavich (sacerdote)'],
    threats:['Doru (vampirizado) en s&oacute;tano de la iglesia','Strahd puede aparecer en carruaje'],
    dm:'Misi&oacute;n: escoltar a Ireena a Vallaki. Donavich tiene a Doru encadenado abajo.' },

  { id:'krezk', px:8.9, py:27.2, icon:'K', name:'Krezk',                       color:'#506050', tarot:null,
    chapter:'Cap. 8', desc:'Villa tranquila con muralla y abad&iacute;a perturbadora en lo alto.',
    npcs:['Burgomaestre Dmitri Krezkov','El Abad (deva corrompido)','Vasilka'],
    threats:['Mongrelfolk de la Abad&iacute;a','El Abad puede tornarse hostil'],
    dm:'Ezmerelda puede estar en la Abad&iacute;a (zona S19). El Abad quiere dar Vasilka a Strahd como novia.' },

  { id:'torre', px:22.9, py:30.6, icon:'T', name:'Torre Van Richten',          color:'#6040a0', tarot:'Pos.1 - Tomo de Strahd V7',
    chapter:'Cap. 11', desc:'Torre m&aacute;gica sobre el Lago Baratok. Construida por Khazan.',
    npcs:['Arrigal (esp&iacute;a Vistani)','Ezmerelda (posiblemente en carromatos)'],
    threats:['Golem de rayos si se dice nombre incorrecto','Arrigal es peligroso'],
    dm:'TOMO en zona V7. Para el ascensor: &ldquo;Khazan&rdquo;. Diarios de Van Richten con info crucial.' },

  { id:'winery', px:5.0, py:48.1, icon:'W', name:'Wizards of Wines',           color:'#607040', tarot:null,
    chapter:'Cap. 12', desc:'La &uacute;nica bodega de Barovia. Tomada por druidas del bosque y blights.',
    npcs:['Davian Martikov (patriarca wereraven)','Familia Martikov'],
    threats:['Druidas y blights','Wintersplinter (arbol animado enorme)'],
    dm:'Los Martikov son Guardianes del Amanecer (wereravens). Recuperar las 3 gemas m&aacute;gicas.' },

  { id:'argyn', px:34.0, py:60.5, icon:'G', name:'Argynvostholt',              color:'#4060a0', tarot:'Pos.2 - S&iacute;mbolo Sagrado P36',
    chapter:'Cap. 7', desc:'Manse&oacute;n en ruinas de la Orden del Drag&oacute;n de Plata.',
    npcs:['Vladimir Hornosgaard (hostil)','Sir Godfrey Gwilym (posible aliado)'],
    threats:['Vladimir extremadamente peligroso','Revenants hostiles'],
    dm:'SIMBOLO en P36 con Vladimir. Calavera del drag&oacute;n en capilla = ventaja contra Strahd.' },

  { id:'amber', px:40.3, py:86.4, icon:'E', name:'Templo del &Aacute;mbar',   color:'#c08020', tarot:'Pos.3 - Espada Solar X40',
    chapter:'Cap. 13', desc:'Templo sellado con vestigios primordiales oscuros. Nivel 7+ recomendado.',
    npcs:['Exethanter (lich aliado potencial)','Neferon (lich hostil)'],
    threats:['Vestigios ofrecen poder a cambio de corrupci&oacute;n','No-muertos en todas las zonas'],
    dm:'ESPADA SOLAR en zona X40. Neferon empoader&oacute; originalmente a Strahd.' },

  { id:'mill', px:51.2, py:52.5, icon:'M', name:'Viejo Molino',               color:'#604040', tarot:null,
    chapter:'Cap. 6', desc:'Molino de las brujas. Fabrican pasteles del sue&ntilde;o.',
    npcs:['Morgantha (hag nocturna)','Bella Sunbane','Offalia Wormwiggle'],
    threats:['Aquelarre de nivel 5 muy peligroso','Raptan ni&ntilde;os para los pasteles'],
    dm:'Pasteles producen adicci&oacute;n. Peligroso para niveles bajos.' },

  { id:'tser', px:66.7, py:68.6, icon:'P', name:'Tser Pool Vistani',          color:'#605080', tarot:null,
    chapter:'Cap. 2', desc:'Campamento Vistani. Madam Eva reside aqu&iacute;.',
    npcs:['Madam Eva (adivina)','Stanimir','Eliza'],
    threats:['Los Vistani informan a Strahd'],
    dm:'La lectura del Tarokka ocurre aqu&iacute;. Madam Eva sabe m&aacute;s de lo que dice.' },

  { id:'berez', px:26.3, py:72.6, icon:'R', name:'Ruinas de Berez',            color:'#405040', tarot:null,
    chapter:'Cap. 10', desc:'Pantano sobre pueblo destruido por Strahd.',
    npcs:['Baba Lysaga (bruja)','Esp&iacute;ritu de Marina (fantasma)'],
    threats:['Baba Lysaga CR 11, vuela en olla de calavera','Muertos vivientes'],
    dm:'Marina puede revelar historia crucial sobre el pasado de Strahd.' },

  { id:'wolves', px:20.8, py:17.5, icon:'L', name:'Guarida Hombres Lobo',     color:'#504030', tarot:null,
    chapter:'Cap. 15', desc:'Cueva al norte. Manada de hombres lobo.',
    npcs:['Kiril Stoyanovich (alfa leal a Strahd)','Emil Toranescu (prisionero)','Zuleika (chaman)'],
    threats:['Manada completa peligrosa','Ni&ntilde;os prisioneros en jaulas'],
    dm:'Zuleika puede ser aliada si se libera a Emil.' },

  { id:'abadia', px:9.3, py:14.6, icon:'N', name:'Abad&iacute;a St. Markovia', color:'#505060', tarot:'Pos.4 - Ezmerelda puede estar en S19',
    chapter:'Cap. 8', desc:'Abad&iacute;a sobre Krezk. El Abad la dirige desde hace 100 a&ntilde;os.',
    npcs:['El Abad (deva corrompido)','Vasilka','Ezmerelda d\'Avenir (posiblemente)'],
    threats:['Mongrelfolk impredecibles','El Abad tiene poderes corrompidos'],
    dm:'Ezmerelda en zona S19. El Abad fabrica a Vasilka para ofrecerla a Strahd.' },
];

var selectedMapLoc = null;

function renderMapa() {
  var wrap = document.getElementById('mapa-wrap');
  if (!wrap) return;

  var pins = MAP_LOCS.map(function(loc) {
    var isSel = selectedMapLoc === loc.id;
    var hasTarot = !!loc.tarot;
    var dot = hasTarot ? '<span class="map-pin-tarot-dot"></span>' : '';
    var cls = 'map-pin' + (isSel ? ' map-pin-active' : '');
    return '<div class="' + cls + '" id="mpin-' + loc.id + '"' +
           ' onclick="selectMapLoc(\'' + loc.id + '\')"' +
           ' style="left:' + loc.px + '%;top:' + loc.py + '%"' +
           ' title="' + loc.name + '">' +
           '<span class="map-pin-icon" style="font-size:.85rem;font-family:Cinzel,serif;font-weight:bold;color:#f0ddb8;background:rgba(14,11,7,.75);padding:1px 4px;border-radius:2px;border:1px solid rgba(232,200,122,.4);">' + loc.icon + '</span>' +
           '<span class="map-pin-label">' + loc.name + '</span>' + dot + '</div>';
  }).join('');

  wrap.innerHTML =
    '<div style="position:relative;line-height:0;width:100%;">' +
    '<img src="img/mapa-barovia.png"' +
    ' style="width:100%;display:block;border-radius:2px;border:1px solid var(--edge);"' +
    ' alt="Mapa de Barovia">' +
    pins + '</div>';
}

function selectMapLoc(id) {
  selectedMapLoc = id;
  var loc = null;
  for (var i = 0; i < MAP_LOCS.length; i++) {
    if (MAP_LOCS[i].id === id) { loc = MAP_LOCS[i]; break; }
  }
  if (!loc) return;

  document.querySelectorAll('.map-pin').forEach(function(p) { p.classList.remove('map-pin-active'); });
  var pin = document.getElementById('mpin-' + id);
  if (pin) pin.classList.add('map-pin-active');

  var tarotBadge = loc.tarot
    ? '<div style="display:inline-block;margin-bottom:10px;padding:5px 12px;background:rgba(232,200,122,.1);border:1px solid var(--gilt-dim);border-radius:2px;font-family:Cinzel,serif;font-size:.65rem;color:var(--gilt);">Profeica: ' + loc.tarot + '</div>'
    : '';

  var npcsHtml = loc.npcs.map(function(n) {
    return '<span style="display:inline-block;padding:2px 8px;background:var(--ink3);border:1px solid var(--edge);border-radius:10px;font-size:.74rem;color:var(--vellum-mid);margin:2px;">' + n + '</span>';
  }).join('');

  var threatsHtml = loc.threats.map(function(t) {
    return '<li style="font-size:.79rem;color:var(--vellum);line-height:1.6;">' + t + '</li>';
  }).join('');

  var info = document.getElementById('map-info');
  info.style.display = 'block';
  info.innerHTML =
    '<div class="card" style="margin-top:12px;border-color:' + loc.color + ';">' +
    '<div class="card-title" style="justify-content:space-between;">' +
    '<span>' + loc.name + '</span>' +
    '<div style="display:flex;align-items:center;gap:8px;">' +
    '<span style="font-family:Cinzel,serif;font-size:.6rem;color:var(--vellum-dim);">' + loc.chapter + '</span>' +
    '<button class="btn btn-ghost btn-sm" onclick="clearMapLoc()" style="padding:2px 8px;font-size:.6rem;">X Cerrar</button>' +
    '</div></div>' +
    tarotBadge +
    '<p style="font-size:.85rem;color:var(--vellum-mid);font-style:italic;line-height:1.65;margin-bottom:12px;">' + loc.desc + '</p>' +
    '<div class="grid-2" style="gap:10px;margin-bottom:10px;">' +
    '<div><div style="font-family:Cinzel,serif;font-size:.6rem;color:var(--gilt);margin-bottom:6px;">NPCs CLAVE</div>' + npcsHtml + '</div>' +
    '<div><div style="font-family:Cinzel,serif;font-size:.6rem;color:var(--crimson3);margin-bottom:6px;">AMENAZAS</div>' +
    '<ul style="padding-left:14px;">' + threatsHtml + '</ul></div>' +
    '</div>' +
    '<hr class="divider">' +
    '<div style="font-family:Cinzel,serif;font-size:.6rem;color:var(--vellum-dim);margin-bottom:5px;">NOTAS DM</div>' +
    '<p style="font-size:.82rem;color:var(--vellum);line-height:1.6;">' + loc.dm + '</p>' +
    '</div>';
}

function clearMapLoc() {
  selectedMapLoc = null;
  document.querySelectorAll('.map-pin').forEach(function(p) { p.classList.remove('map-pin-active'); });
  var info = document.getElementById('map-info');
  if (info) { info.style.display = 'none'; info.innerHTML = ''; }
}
