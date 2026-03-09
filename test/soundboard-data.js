/**
 * soundboard-data.js
 * Datos de todas las pistas de audio para Maldición de Strahd
 * Cada pista tiene: id, número, nombre, descripción, categoría, color CSS, videoId de YouTube
 */

'use strict';

const SOUNDBOARD_CATEGORIES = [
  { id: 'all',       label: 'Todas' },
  { id: 'areas',     label: 'Áreas de Barovia' },
  { id: 'ambiente',  label: 'Ambiente' },
  { id: 'efectos',   label: 'Efectos' },
  { id: 'epicas',    label: 'Épicas' },
  { id: 'batallas',  label: 'Batallas' },
];

/**
 * Color CSS por localización/categoría
 * Se asigna a la variable --sb-color de cada card
 */
const LOCATION_COLORS = {
  aldea:       '#8b1a1a',   // rojo sangre
  vallaki:     '#6b4c8b',   // púrpura oscuro
  krezk:       '#2a5c3a',   // verde bosque
  ravenloft:   '#c9a84c',   // dorado amenazante
  tser:        '#8b6020',   // ámbar gitano
  wizards:     '#4a7a4a',   // verde viñedo
  molino:      '#5a3a2a',   // marrón siniestro
  argynvostholt: '#7a8a9a', // gris plateado
  wachterhaus: '#4a3a6a',   // azul oscuro
  berez:       '#3a5a3a',   // verde pantano
  lobos:       '#6a4a2a',   // marrón lobo
  baratok:     '#4a5a6a',   // gris montaña
  zarovich:    '#2a4a6a',   // azul lago
  ambar:       '#c9a84c',   // dorado ámbar
  ambiente:    '#4a4a5a',   // gris neutro
  efectos:     '#8b3a1a',   // naranja oscuro
  epicas:      '#c9a84c',   // dorado épico
  batallas:    '#8b1a1a',   // rojo batalla
};

const SOUNDBOARD_TRACKS = [
  // ── ÁREAS DE BAROVIA ──────────────────────────────────────
  {
    id: 'sb-01',
    num: '01',
    name: 'Aldea de Barovia',
    desc: 'Viento frío entre casas abandonadas. Llantos lejanos y puertas que chirrían.',
    category: 'areas',
    location: 'aldea',
    videoId: 'Vy4gJXEVRpI',
  },
  {
    id: 'sb-02',
    num: '02',
    name: 'Castillo Ravenloft',
    desc: 'Ecos en piedra antigua. Órgano distante y el viento aullando entre torreones.',
    category: 'areas',
    location: 'ravenloft',
    videoId: 'YgIQaX8BXIM',
  },
  {
    id: 'sb-03',
    num: '03',
    name: 'Vallaki — Calles',
    desc: 'Bullicio de mercado tenso. Guardias patrullando, murmullos de miedo.',
    category: 'areas',
    location: 'vallaki',
    videoId: 'nGp5GNrgO6Q',
  },
  {
    id: 'sb-04',
    num: '04',
    name: 'Krezk — Aldea Sagrada',
    desc: 'Silencio casi sagrado. Agua del manantial y cantos lejanos del monasterio.',
    category: 'areas',
    location: 'krezk',
    videoId: 'qYAv8iiYLG4',
  },
  {
    id: 'sb-05',
    num: '05',
    name: 'Tser Pool',
    desc: 'Campamento gitano. Violines vivos, fuego crepitante y risas de los Vistani.',
    category: 'areas',
    location: 'tser',
    videoId: 'f_RFkGFJbgM',
  },
  {
    id: 'sb-06',
    num: '06',
    name: 'Wizards of Wines',
    desc: 'Bodega en ruinas. Viento entre viñas marchitas y goteo de barriles.',
    category: 'areas',
    location: 'wizards',
    videoId: 'iFDe5jBbFtU',
  },
  {
    id: 'sb-07',
    num: '07',
    name: 'Molino de los Huesos',
    desc: 'Aspas que giran con crujidos. Olor a algo dulce y podrido en el aire.',
    category: 'areas',
    location: 'molino',
    videoId: 'ZqFbFAMCiKo',
  },
  {
    id: 'sb-08',
    num: '08',
    name: 'Argynvostholt',
    desc: 'Mansión de caballeros caídos. Armaduras que se mueven solas, viento espectral.',
    category: 'areas',
    location: 'argynvostholt',
    videoId: 'WTiIH8PTBPE',
  },
  {
    id: 'sb-09',
    num: '09',
    name: 'Wachterhaus',
    desc: 'Salón aristocrático decadente. Música de clavicémbalo y susurros conspiradores.',
    category: 'areas',
    location: 'wachterhaus',
    videoId: 'iFDe5jBbFtU',
  },
  {
    id: 'sb-10',
    num: '10',
    name: 'Ruinas de Berez',
    desc: 'Pantano brumoso. Ranas, insectos y el lamento de Baba Lysaga en la distancia.',
    category: 'areas',
    location: 'berez',
    videoId: 'qYAv8iiYLG4',
  },
  {
    id: 'sb-11',
    num: '11',
    name: 'Guarida de Lobos',
    desc: 'Cueva profunda. Gruñidos bajos, garras sobre piedra y aullidos en el exterior.',
    category: 'areas',
    location: 'lobos',
    videoId: 'ZqFbFAMCiKo',
  },
  {
    id: 'sb-12',
    num: '12',
    name: 'Monte Baratok',
    desc: 'Cima ventosa y desolada. Truenos lejanos y el crujir de pinos centenarios.',
    category: 'areas',
    location: 'baratok',
    videoId: 'nGp5GNrgO6Q',
  },
  {
    id: 'sb-13',
    num: '13',
    name: 'Lago Zarovich',
    desc: 'Orillas de niebla densa. Agua negra que apenas se mueve. Silencio opresivo.',
    category: 'areas',
    location: 'zarovich',
    videoId: 'Vy4gJXEVRpI',
  },
  {
    id: 'sb-14',
    num: '14',
    name: 'Templo del Ámbar',
    desc: 'Cámara sellada de sarcófagos. Susurros de entidades oscuras. Frío antinatural.',
    category: 'areas',
    location: 'ambar',
    videoId: 'YgIQaX8BXIM',
  },

  // ── AMBIENTE ──────────────────────────────────────────────
  {
    id: 'sb-15',
    num: '15',
    name: 'Bosque de Barovia',
    desc: 'Árboles retorcidos y niebla baja. Crujidos de ramas y ojos en la oscuridad.',
    category: 'ambiente',
    location: 'ambiente',
    videoId: 'iFDe5jBbFtU',
  },
  {
    id: 'sb-16',
    num: '16',
    name: 'Tormenta de Barovia',
    desc: 'Lluvia intensa, truenos y relámpagos. El cielo nunca despeja en estas tierras.',
    category: 'ambiente',
    location: 'ambiente',
    videoId: 'nGp5GNrgO6Q',
  },
  {
    id: 'sb-17',
    num: '17',
    name: 'Taberna Sangre de la Vid',
    desc: 'Fuego de chimenea, murmullos de clientes asustados y vino derramado.',
    category: 'ambiente',
    location: 'ambiente',
    videoId: 'f_RFkGFJbgM',
  },
  {
    id: 'sb-18',
    num: '18',
    name: 'Niebla Perpetua',
    desc: 'Ambiente opresivo de niebla que todo lo envuelve. Desorientación y silencio.',
    category: 'ambiente',
    location: 'ambiente',
    videoId: 'Vy4gJXEVRpI',
  },
  {
    id: 'sb-19',
    num: '19',
    name: 'Cementerio',
    desc: 'Lápidas antiguas y tierra removida. Grillos y el ulular de un búho.',
    category: 'ambiente',
    location: 'ambiente',
    videoId: 'ZqFbFAMCiKo',
  },
  {
    id: 'sb-20',
    num: '20',
    name: 'Catacumbas',
    desc: 'Pasillos subterráneos. Goteo de agua, antorchas que parpadean y ecos lejanos.',
    category: 'ambiente',
    location: 'ambiente',
    videoId: 'YgIQaX8BXIM',
  },

  // ── EFECTOS ───────────────────────────────────────────────
  {
    id: 'sb-21',
    num: '21',
    name: 'Relámpago',
    desc: 'Trueno ensordecedor que sacude las paredes del castillo.',
    category: 'efectos',
    location: 'efectos',
    videoId: 'nGp5GNrgO6Q',
  },
  {
    id: 'sb-22',
    num: '22',
    name: 'Aullido de Lobo',
    desc: 'Aullido cercano y amenazante que hiela la sangre.',
    category: 'efectos',
    location: 'efectos',
    videoId: 'ZqFbFAMCiKo',
  },
  {
    id: 'sb-23',
    num: '23',
    name: 'Puerta Crujiente',
    desc: 'Bisagras oxidadas de una puerta de madera maciza.',
    category: 'efectos',
    location: 'efectos',
    videoId: 'Vy4gJXEVRpI',
  },
  {
    id: 'sb-24',
    num: '24',
    name: 'Risa de Strahd',
    desc: 'Carcajada grave y resonante que parece venir de todas partes a la vez.',
    category: 'efectos',
    location: 'efectos',
    videoId: 'YgIQaX8BXIM',
  },
  {
    id: 'sb-25',
    num: '25',
    name: 'Campanas de Iglesia',
    desc: 'Tañido lento y solemne de campanas de bronce en la noche.',
    category: 'efectos',
    location: 'efectos',
    videoId: 'f_RFkGFJbgM',
  },
  {
    id: 'sb-26',
    num: '26',
    name: 'Susurros Oscuros',
    desc: 'Voces que no deberían existir. Tentación y promesas de poder.',
    category: 'efectos',
    location: 'efectos',
    videoId: 'iFDe5jBbFtU',
  },

  // ── ÉPICAS ────────────────────────────────────────────────
  {
    id: 'sb-27',
    num: '27',
    name: 'Llegada a Barovia',
    desc: 'Tema de apertura. Cuerdas sombrías y el peso del destino inevitable.',
    category: 'epicas',
    location: 'epicas',
    videoId: 'YgIQaX8BXIM',
  },
  {
    id: 'sb-28',
    num: '28',
    name: 'El Conde Strahd',
    desc: 'Leitmotif del vampiro. Grandiosidad oscura y poder absoluto.',
    category: 'epicas',
    location: 'epicas',
    videoId: 'Vy4gJXEVRpI',
  },
  {
    id: 'sb-29',
    num: '29',
    name: 'Profecía del Tarot',
    desc: 'Música mística mientras las cartas revelan el destino de los héroes.',
    category: 'epicas',
    location: 'epicas',
    videoId: 'f_RFkGFJbgM',
  },
  {
    id: 'sb-30',
    num: '30',
    name: 'Esperanza en la Oscuridad',
    desc: 'Momento de triunfo frágil. Una llama que se niega a apagarse.',
    category: 'epicas',
    location: 'epicas',
    videoId: 'qYAv8iiYLG4',
  },
  {
    id: 'sb-31',
    num: '31',
    name: 'El Sol de Barovia',
    desc: 'Tema de liberación. Luz que finalmente rompe la niebla eterna.',
    category: 'epicas',
    location: 'epicas',
    videoId: 'nGp5GNrgO6Q',
  },

  // ── BATALLAS ──────────────────────────────────────────────
  {
    id: 'sb-32',
    num: '32',
    name: 'Combate en el Castillo',
    desc: 'Percusión intensa y cuerdas frenéticas. Lucha desesperada entre piedras antiguas.',
    category: 'batallas',
    location: 'batallas',
    videoId: 'WTiIH8PTBPE',
  },
  {
    id: 'sb-33',
    num: '33',
    name: 'Horda de No-Muertos',
    desc: 'Ritmo implacable y crescendo de horror. Los muertos no paran de llegar.',
    category: 'batallas',
    location: 'batallas',
    videoId: 'ZqFbFAMCiKo',
  },
  {
    id: 'sb-34',
    num: '34',
    name: 'Duelo con Strahd',
    desc: 'El enfrentamiento final. Órgano de guerra y el destino en la balanza.',
    category: 'batallas',
    location: 'batallas',
    videoId: 'YgIQaX8BXIM',
  },
  {
    id: 'sb-35',
    num: '35',
    name: 'Manada de Hombres Lobo',
    desc: 'Ritmo salvaje y primitivo. Garras y colmillos en la oscuridad del bosque.',
    category: 'batallas',
    location: 'batallas',
    videoId: 'iFDe5jBbFtU',
  },
  {
    id: 'sb-36',
    num: '36',
    name: 'Batalla Épica',
    desc: 'Música de combate heroico para los momentos más intensos de la campaña.',
    category: 'batallas',
    location: 'batallas',
    videoId: 'nGp5GNrgO6Q',
  },
];

// Exportar para uso en otros módulos
window.SOUNDBOARD_CATEGORIES = SOUNDBOARD_CATEGORIES;
window.SOUNDBOARD_TRACKS     = SOUNDBOARD_TRACKS;
window.LOCATION_COLORS       = LOCATION_COLORS;
