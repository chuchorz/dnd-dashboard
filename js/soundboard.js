// ══════ SOUNDBOARD DATA ══════
const SB = {
  areas: [
    {id:'aldea',    icon:'🏚️', name:'Aldea de Barovia',          desc:'Silencio sepulcral, cuervos'},
    {id:'vallaki',  icon:'🏘️', name:'Vallaki',                   desc:'Ciudad amurallada, tensión'},
    {id:'krezk',    icon:'⛩️', name:'Krezk',                     desc:'Villa tranquila, Abadía'},
    {id:'ravenloft',icon:'🏰', name:'Castillo Ravenloft',         desc:'Órgano lejano, oscuridad'},
    {id:'tser',     icon:'🔮', name:'Tser Pool — Vistani',        desc:'Fuego, violines vistani'},
    {id:'winery',   icon:'🍷', name:'Wizards of Wines',           desc:'Campo, viñedos, misterio'},
    {id:'mill',     icon:'⚙️', name:'Viejo Molino de los Huesos', desc:'Crujidos, viento, horror'},
    {id:'argyn',    icon:'🛡️', name:'Mansión Argynvostholt',      desc:'Gloria pasada, espectros'},
    {id:'wachter',  icon:'🕯️', name:'Mansión Wachterhaus',        desc:'Conspiración, culto, velas'},
    {id:'berez',    icon:'🌿', name:'Ruinas de Berez',            desc:'Pantano, bruja, desolación'},
    {id:'wolves',   icon:'🐺', name:'Guarida Hombres Lobo',       desc:'Cueva, gruñidos, huesos'},
    {id:'baratok',  icon:'⛰️', name:'Monte Baratok',              desc:'Viento helado, altura'},
    {id:'lake',     icon:'🌊', name:'Lago Zarovich',              desc:'Agua oscura, barcas podridas'},
    {id:'amber',    icon:'🔶', name:'Templo de Ámbar',            desc:'Oscuridad antigua, poder'},
  ],
  ambiente: [
    {id:'bosque',   icon:'🌲', name:'Bosque',          desc:'Hojas, crujidos, animales'},
    {id:'cueva',    icon:'🕳️', name:'Cueva / Mazmorra', desc:'Gotas, ecos, oscuridad'},
    {id:'rio',      icon:'🌊', name:'Río / Agua',       desc:'Corriente suave'},
    {id:'ciudad',   icon:'🏙️', name:'Ciudad medieval',  desc:'Mercado, gente, vida'},
    {id:'taberna',  icon:'🍺', name:'Taberna',           desc:'Fuego, charlas, vino'},
    {id:'lluvia',   icon:'🌧️', name:'Lluvia',            desc:'Lluvia suave y constante'},
    {id:'tormenta', icon:'⛈️', name:'Tormenta',          desc:'Truenos y relámpagos'},
    {id:'niebla',   icon:'🌫️', name:'Niebla',            desc:'Silencio, desorientación'},
    {id:'noche',    icon:'🌙', name:'Noche',             desc:'Grillos, silencio'},
    {id:'nieve',    icon:'❄️', name:'Nieve / Frío',      desc:'Viento helado, blancura'},
    {id:'iglesia',  icon:'⛪', name:'Iglesia / Templo',  desc:'Coro, órgano, quietud'},
    {id:'pantano',  icon:'🌾', name:'Pantano',           desc:'Ranas, barro, misterio'},
  ],
  efectos: [
    {id:'horses',   icon:'🐎', name:'Caballos'},
    {id:'carriage', icon:'🪨', name:'Carruaje'},
    {id:'door_c',   icon:'🚪', name:'Puerta (crujido)'},
    {id:'door_b',   icon:'🚪', name:'Puerta (golpe)'},
    {id:'window',   icon:'🪟', name:'Ventana rota'},
    {id:'swords',   icon:'⚔️', name:'Lucha espadas'},
    {id:'arrows',   icon:'🏹', name:'Flechazos'},
    {id:'explosion',icon:'💥', name:'Explosión'},
    {id:'chains',   icon:'⛓️', name:'Cadenas'},
    {id:'thunder',  icon:'⚡', name:'Trueno'},
    {id:'wolves2',  icon:'🐺', name:'Aullido lobos'},
    {id:'ravens',   icon:'🦅', name:'Cuervos'},
    {id:'scream',   icon:'😱', name:'Grito'},
    {id:'bell',     icon:'🔔', name:'Campana'},
    {id:'fire',     icon:'🔥', name:'Fuego'},
    {id:'magic',    icon:'✨', name:'Magia / Hechizo'},
    {id:'coffin',   icon:'⚰️', name:'Ataúd abriendo'},
    {id:'laugh',    icon:'😈', name:'Risa malévola'},
  ],
  epicas: [
    {id:'ep1',icon:'🎼',name:'Épica 1',         desc:'[ Añade tu URL ]',              url:''},
    {id:'ep2',icon:'🎼',name:'Épica 2',         desc:'[ Añade tu URL ]',              url:''},
    {id:'ep3',icon:'🎼',name:'Épica 3',         desc:'[ Añade tu URL ]',              url:''},
    {id:'ep4',icon:'🎶',name:'Sugerencia: Dark Souls OST',  desc:'Ambient épico oscuro', url:'https://www.youtube.com/embed/videoseries?list=PLAy7CPlUkfnfKVUEZiaMFjZgEYAV5XMAO&autoplay=1'},
    {id:'ep5',icon:'🎶',name:'Sugerencia: Bloodborne OST',  desc:'Gótico orquestal',     url:'https://www.youtube.com/embed/videoseries?list=PLAy7CPlUkfnfKVUEZiaMFjZgEYAV5XMAO&autoplay=1'},
    {id:'ep6',icon:'🎶',name:'Sugerencia: The Witcher OST', desc:'Eslavo, épico, oscuro', url:'https://www.youtube.com/embed/videoseries?list=PLAy7CPlUkfnfKVUEZiaMFjZgEYAV5XMAO&autoplay=1'},
  ],
  batallas: [
    {id:'bat1',icon:'🔥',name:'Batalla 1',      desc:'[ Añade tu URL ]',              url:''},
    {id:'bat2',icon:'🔥',name:'Batalla 2',      desc:'[ Añade tu URL ]',              url:''},
    {id:'bat3',icon:'🔥',name:'Batalla 3',      desc:'[ Añade tu URL ]',              url:''},
    {id:'bat4',icon:'⚔️',name:'Sugerencia: Two Steps From Hell', desc:'Épico orquestal intenso',url:'https://www.youtube.com/embed/videoseries?list=PLAy7CPlUkfnfKVUEZiaMFjZgEYAV5XMAO&autoplay=1'},
    {id:'bat5',icon:'⚔️',name:'Sugerencia: Nier Automata Combat',desc:'Urgente, percusivo',      url:'https://www.youtube.com/embed/videoseries?list=PLAy7CPlUkfnfKVUEZiaMFjZgEYAV5XMAO&autoplay=1'},
    {id:'bat6',icon:'⚔️',name:'Sugerencia: God of War OST',      desc:'Percusión brutal',        url:'https://www.youtube.com/embed/videoseries?list=PLAy7CPlUkfnfKVUEZiaMFjZgEYAV5XMAO&autoplay=1'},
  ],
};

const CAT_INFO = {
  areas:    ['🗺️ Áreas de Barovia',  'Ambientes específicos para cada zona de la campaña. Haz clic en un área para cargarla en el reproductor. Puedes editar las URLs en el código para apuntar a tus playlists favoritas.'],
  ambiente: ['🌿 Ambiente',          'Sonidos de entorno genéricos para cualquier escena. Úsalos como capa base antes de añadir música encima.'],
  efectos:  ['⚡ Efectos de Sonido', 'Disparos puntuales para momentos concretos de la sesión. Haz clic en cualquier botón para "simular" el efecto. Próximamente: asignar URLs propias.'],
  epicas:   ['🎼 Músicas Épicas',    'Para revelaciones dramáticas, escenas intensas y clímax narrativos. Los 3 primeros slots son tuyos — sustituye las URLs vacías por tus playlists.'],
  batallas: ['🔥 Músicas de Batalla','Para combates. Los 3 primeros slots están listos para tus URLs. Las sugerencias apuntan a ejemplos — cámbialas por lo que uses en sesión.'],
};

// ══════ SOUNDBOARD STATE ══════
let currentCat = 'areas';
let playingId  = null;


function switchCat(cat) {
  currentCat = cat;
  document.querySelectorAll('.sb-cat').forEach(el => el.classList.toggle('active', el.dataset.cat===cat));
  renderGrid();
  const [title, text] = CAT_INFO[cat];
  document.getElementById('cat-info-title').textContent = title;
  document.getElementById('cat-info-text').textContent  = text;
}

// Colores temáticos por localización
const SB_COLORS = {
  aldea:'#c03828', vallaki:'#8a6820', krezk:'#2a6a50', ravenloft:'#8a1820',
  tser:'#6040a0', winery:'#4a6a2a', mill:'#6a4820', argyn:'#3a4880',
  wachter:'#6a3a50', berez:'#3a5820', wolves:'#5a4020', baratok:'#4a5870',
  lake:'#2a5878', amber:'#8a6820',
  bosque:'#3a5820', cueva:'#4a3a50', rio:'#2a5878', ciudad:'#5a4020',
  taberna:'#6a3820', lluvia:'#3a4868', tormenta:'#4a3868', niebla:'#4a4858',
  noche:'#2a2848', nieve:'#4a5868', iglesia:'#5a4068', pantano:'#3a5820',
  ep1:'#8a6820', ep2:'#8a6820', ep3:'#8a6820', ep4:'#8a6820', ep5:'#8a6820', ep6:'#8a6820',
};

function renderGrid() {
  const sg = document.getElementById('sb-stream-grid');
  const sl = document.getElementById('sb-sfx-layout');
  if (currentCat === 'efectos') {
    sg.style.display = 'none'; sl.style.display = 'block';
    document.getElementById('sfx-grid').innerHTML = SB.efectos.map(s => `
      <div class="sfx-btn" onclick="triggerSfx('${s.name}')">
        <span class="sfx-icon">${s.icon}</span>
        <span class="sfx-name">${s.name}</span>
      </div>`).join('');
    return;
  }
  sg.style.display = ''; sl.style.display = 'none';
  sg.innerHTML = SB[currentCat].map((item, idx) => {
    const col = SB_COLORS[item.id] || '#524030';
    const num = String(idx + 1).padStart(2, '0');
    const isPlaying = playingId === item.id;
    return `<div class="sb-item ${isPlaying ? 'playing' : ''}"
         style="--sb-color:${col};--sb-warm:${col}18;"
         onclick="playItem('${item.id}')">
      ${isPlaying ? '<div class="playing-dot"></div>' : ''}
      <div class="sb-item-num" style="--sb-color:${col};">${num}</div>
      <span class="sb-item-name">${item.name}</span>
      <span class="sb-item-desc">${item.desc || ''}</span>
    </div>`;
  }).join('');
}


function playItem(id) {
  const item = SB[currentCat].find(i=>i.id===id);
  if (!item) return;
  playingId = id;
  document.getElementById('mp-icon').textContent = item.icon;
  document.getElementById('mp-name').textContent = item.name;
  document.getElementById('mp-sub').textContent  = item.desc || '';
  document.getElementById('mp-info').classList.remove('mp-idle');

  let url = item.url || '';
  // Si pegaron un iframe entero, extraer el src
  const srcMatch = url.match(/src="([^"]+)"/);
  if (srcMatch) url = srcMatch[1];
  // Añadir autoplay automáticamente
  if (url && !url.includes('autoplay')) url += (url.includes('?') ? '&' : '?') + 'autoplay=1';

  const frame = document.getElementById('yt-frame');
  if (url) { frame.src = url; }
  else { frame.src=''; document.getElementById('mp-sub').textContent = '⚠ Asigna una URL en el código'; }
  renderGrid();
}

function stopPlayer() {
  playingId = null;
  document.getElementById('yt-frame').src = '';
  document.getElementById('mp-icon').textContent = '🎵';
  document.getElementById('mp-name').textContent = 'Sin reproducción activa';
  document.getElementById('mp-sub').textContent  = 'Selecciona una escena del soundboard';
  document.getElementById('mp-info').classList.add('mp-idle');
  renderGrid();
}

function loadCustom() {
  let url = document.getElementById('custom-url').value.trim();
  if (!url) return;
  url = url.replace('watch?v=','embed/').replace('youtu.be/','www.youtube.com/embed/');
  if (!url.includes('autoplay')) url += (url.includes('?')?'&':'?') + 'autoplay=1';
  playingId = null;
  document.getElementById('mp-icon').textContent = '🎵';
  document.getElementById('mp-name').textContent = 'URL personalizada';
  document.getElementById('mp-sub').textContent  = url.substring(0,50)+'...';
  document.getElementById('mp-info').classList.remove('mp-idle');
  document.getElementById('yt-frame').src = url;
  renderGrid();
}

function triggerSfx(name) {
  const log = document.getElementById('sfx-log');
  const t = new Date().toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  log.innerHTML = `<span style="color:var(--gilt)">${name}</span> — ${t}`;
}
