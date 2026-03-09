/**
 * map.js
 * Módulo de Mapa Interactivo para Maldición de Strahd DM Screen
 * 13 pins clicables con panel lateral de información y sistema de cartas del Tarot
 */

'use strict';

const MapModule = (() => {
  /* ── Datos de localizaciones ── */
  const LOCATIONS = [
    {
      id: 'aldea',
      name: 'Aldea de Barovia',
      level: 'Niveles 1–3',
      x: 68,   // % horizontal
      y: 72,   // % vertical
      tarot: 'El Sol — Posición de Strahd',
      hasTarot: true,
      desc: 'El corazón marchito de Barovia. Las calles están vacías salvo por los llantos de Ireena Kolyana y los gemidos de los lugareños aterrorizados. La iglesia de Donavich guarda un oscuro secreto en su sótano.',
      dmNotes: 'Ireena Kolyana es el gancho principal. Dositej Kolyanovich ha muerto. Doru, el hijo del sacerdote, está encerrado como vampiro en las catacumbas. Los jugadores pueden encontrar la carta de Strahd en la posada Sangre de la Vid.',
    },
    {
      id: 'ravenloft',
      name: 'Castillo Ravenloft',
      level: 'Niveles 9–10',
      x: 50,
      y: 28,
      tarot: 'El Diablo — Posición de Strahd',
      hasTarot: true,
      desc: 'Fortaleza ancestral de Strahd von Zarovich, señor de Barovia. Sus torres se alzan sobre el Río Ivlis como garras de piedra. Cada sala guarda siglos de traición, amor perdido y magia oscura.',
      dmNotes: 'El castillo tiene múltiples niveles. Strahd puede aparecer en cualquier momento. Las catacumbas contienen los restos de los antepasados von Zarovich. El órgano del salón de baile toca solo. Cuidado con el corazón de la oscuridad en el sótano.',
    },
    {
      id: 'vallaki',
      name: 'Vallaki',
      level: 'Niveles 4–6',
      x: 35,
      y: 48,
      tarot: 'El Colgado — Posición de un aliado',
      hasTarot: true,
      desc: 'Ciudad amurallada gobernada por el Barón Vargas Vallakovich con mano de hierro. Los festivales obligatorios son su intento de mantener a Strahd alejado. La tensión bajo la superficie es palpable.',
      dmNotes: 'El Barón es un tirano bien intencionado. Izek Strazni, su capitán, tiene un brazo demoníaco. Lady Wachter conspira para derrocar al Barón. La iglesia de San Andral tiene reliquias importantes. Rictavio es el Cazador de Vampiros Rudolph van Richten disfrazado.',
    },
    {
      id: 'krezk',
      name: 'Krezk',
      level: 'Niveles 5–7',
      x: 18,
      y: 38,
      tarot: 'La Luna — Posición de un objeto sagrado',
      hasTarot: true,
      desc: 'Aldea tranquila y amurallada al pie del Monte Baratok. El manantial sagrado en su interior tiene propiedades curativas. El abad del monasterio cercano guarda secretos perturbadores.',
      dmNotes: 'El Burgomaestre Dmitri Krezkov no deja entrar a extraños sin razón. El Abad es un deva caído que construye una novia para Strahd. Vasilika von Holtz, la hija del Abad, es una abominación de carne cosida. El manantial puede restaurar la cordura.',
    },
    {
      id: 'argynvostholt',
      name: 'Argynvostholt',
      level: 'Niveles 7–9',
      x: 25,
      y: 60,
      tarot: 'La Justicia — Posición de un aliado',
      hasTarot: false,
      desc: 'Mansión en ruinas de la Orden del Dragón de Plata. El espíritu del caballero Vladimir Horngaard y sus compañeros caídos vagan por sus salones, atrapados entre la vida y la muerte.',
      dmNotes: 'Vladimir Horngaard odia a Strahd pero también odia a quienes quieren destruirlo, pues su odio es lo que lo mantiene vivo. Si los jugadores restauran la cabeza del dragón Argynvost, el faro iluminará Barovia y dará esperanza. Godfrey Gwilym puede ser aliado.',
    },
    {
      id: 'wachterhaus',
      name: 'Wachterhaus',
      level: 'Niveles 4–6',
      x: 38,
      y: 44,
      tarot: 'El Ermitaño — Posición de un traidor',
      hasTarot: false,
      desc: 'Mansión de la familia Wachter en Vallaki. Lady Fiona Wachter conspira para derrocar al Barón y entregar Vallaki a Strahd, creyendo que su señorío traería estabilidad.',
      dmNotes: 'Lady Wachter tiene un libro de culto diabólico. Sus hijos son problemáticos: Ernst es su espía, y los otros están mentalmente perturbados. Ella puede ser aliada si los jugadores la convencen de que Strahd no es un protector sino un tirano.',
    },
    {
      id: 'wizards',
      name: 'Wizards of Wines',
      level: 'Niveles 5–7',
      x: 22,
      y: 55,
      tarot: 'La Estrella — Posición de un objeto',
      hasTarot: true,
      desc: 'Bodega familiar de los Martikov, en realidad una familia de licántropos-cuervo. Druidas del bosque han robado las gemas mágicas que hacen crecer las uvas, amenazando el único vino de Barovia.',
      dmNotes: 'Los Martikov son wereravens aliados. Davian Martikov es el patriarca. Las tres gemas mágicas han sido robadas: una está en Yester Hill, otra en el Molino de los Huesos. Recuperarlas es una misión secundaria importante para ganarse a los Guardianes del Plumaje.',
    },
    {
      id: 'molino',
      name: 'Molino de los Huesos',
      level: 'Niveles 6–8',
      x: 45,
      y: 55,
      tarot: 'La Torre — Posición de un enemigo',
      hasTarot: false,
      desc: 'Molino de aspas crujientes en la cima de una colina. Las brujas Morgantha y sus hijas venden "pasteles del sueño" que adormecen la voluntad. El olor dulce que emana es perturbador.',
      dmNotes: 'Las brujas son Noches (Night Hags). Los pasteles están hechos con los sueños de niños raptados. Hay niños encerrados en el sótano. Una de las gemas de Wizards of Wines está aquí. Las brujas tienen un pacto con Strahd y no deben ser subestimadas.',
    },
    {
      id: 'berez',
      name: 'Ruinas de Berez',
      level: 'Niveles 7–9',
      x: 55,
      y: 78,
      tarot: 'El Mundo — Posición de un objeto',
      hasTarot: false,
      desc: 'Antigua aldea inundada, ahora un pantano putrefacto. Baba Lysaga, la "madre" de Strahd, vive aquí en una cabaña que camina sobre raíces de árbol, rodeada de cuervos y magia oscura.',
      dmNotes: 'Baba Lysaga es una bruja de nivel 9. Tiene una calavera voladora como montura. Odia a Ireena porque cree que distrae a Strahd. La gema de Wizards of Wines puede estar aquí. El espíritu de Marina, el primer amor de Strahd, puede aparecer.',
    },
    {
      id: 'lobos',
      name: 'Guarida Hombres Lobo',
      level: 'Niveles 5–7',
      x: 30,
      y: 70,
      tarot: 'La Fuerza — Posición de un aliado',
      hasTarot: false,
      desc: 'Cueva profunda en el bosque donde la manada de hombres lobo de Kiril Stoyanovich mantiene cautivos a niños de los pueblos cercanos. Kiril sirve a Strahd pero tiene sus propias ambiciones.',
      dmNotes: 'Kiril Stoyanovich es el alfa actual, pero Emil Toranescu, el alfa anterior, está prisionero. Emil puede convertirse en aliado si es liberado. Los niños cautivos son de Barovia y Vallaki. La cueva tiene múltiples cámaras y una piscina subterránea.',
    },
    {
      id: 'baratok',
      name: 'Monte Baratok',
      level: 'Niveles 5–8',
      x: 15,
      y: 28,
      tarot: 'El Mago — Posición de un aliado',
      hasTarot: true,
      desc: 'Pico volcánico dormido que domina el norte de Barovia. En su ladera, el mago Van Richten tiene una torre protegida por un escudo antimagia. El Lago Baratok se extiende a sus pies.',
      dmNotes: 'La Torre de Van Richten está en el Lago Baratok. El escudo antimagia desactiva la magia en su interior. Ezmerelda d\'Avenir, cazadora de monstruos, puede estar aquí. La torre tiene notas de investigación valiosas sobre Strahd y sus debilidades.',
    },
    {
      id: 'zarovich',
      name: 'Lago Zarovich',
      level: 'Niveles 3–5',
      x: 20,
      y: 35,
      tarot: 'El Carro — Posición de un objeto',
      hasTarot: false,
      desc: 'Lago negro y silencioso al pie del Monte Baratok. Sus aguas no reflejan la luz correctamente. Una barca vieja descansa en la orilla. Se dice que algo antiguo duerme en sus profundidades.',
      dmNotes: 'Bluto Krogarov, un pescador, tiene a Arabelle (niña Vistani) secuestrada en su barca. Arabelle es la nieta de Madam Eva. El lago tiene una criatura acuática en sus profundidades. La Torre de Van Richten está en la orilla norte.',
    },
    {
      id: 'ambar',
      name: 'Templo del Ámbar',
      level: 'Niveles 9–10',
      x: 48,
      y: 15,
      tarot: 'El Juicio — Posición de un objeto sagrado',
      hasTarot: true,
      desc: 'Templo sellado en las cimas nevadas del Monte Ghakis. Sus cámaras de ámbar contienen los vestigios de dioses oscuros olvidados, cada uno ofreciendo dones oscuros a cambio de una parte del alma.',
      dmNotes: 'Los vestigios son entidades de alineamiento maligno. Cada sarcófago ofrece un don oscuro con un defecto permanente. Strahd obtuvo su poder aquí. El Símbolo Sagrado de Ravenkind y el Sunsword pueden estar aquí según el Tarot. Exethanter, un lich amnésico, custodia el templo.',
    },
  ];

  /* ── Estado ── */
  let state = {
    activeLocationId: null,
  };

  /* ── Elementos DOM ── */
  let els = {};

  /* ── Inicialización ── */
  function init() {
    els = {
      mapContainer: document.getElementById('map-container'),
      mapImage:     document.getElementById('map-image'),
      pinsLayer:    document.getElementById('map-pins'),
      sidePanel:    document.getElementById('map-side-panel'),
    };

    _buildPins();
    _renderSidePanel(null);
  }

  /* ── Construir pins ── */
  function _buildPins() {
    els.pinsLayer.innerHTML = '';

    LOCATIONS.forEach(loc => {
      const pin = document.createElement('div');
      pin.className = `map-pin${loc.hasTarot ? ' has-tarot' : ''}`;
      pin.dataset.id = loc.id;
      pin.style.left = `${loc.x}%`;
      pin.style.top  = `${loc.y}%`;

      pin.innerHTML = `
        <div class="map-pin-icon">
          <svg viewBox="0 0 24 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C7.58 0 4 3.58 4 8c0 5.5 8 22 8 22s8-16.5 8-22c0-4.42-3.58-8-8-8z"/>
            <circle cx="12" cy="8" r="3" fill="rgba(0,0,0,0.4)" stroke="none"/>
          </svg>
          <div class="pin-tarot-dot"></div>
        </div>
        <div class="pin-tooltip">${loc.name}</div>
      `;

      pin.addEventListener('click', () => _selectLocation(loc.id));

      els.pinsLayer.appendChild(pin);
    });
  }

  /* ── Seleccionar localización ── */
  function _selectLocation(id) {
    // Toggle: si ya está activo, deseleccionar
    if (state.activeLocationId === id) {
      state.activeLocationId = null;
      _clearActivePin();
      _renderSidePanel(null);
      return;
    }

    state.activeLocationId = id;

    // Actualizar pins
    _clearActivePin();
    const pin = els.pinsLayer.querySelector(`[data-id="${id}"]`);
    if (pin) pin.classList.add('active');

    // Renderizar panel
    const loc = LOCATIONS.find(l => l.id === id);
    _renderSidePanel(loc);
  }

  /* ── Limpiar pin activo ── */
  function _clearActivePin() {
    els.pinsLayer.querySelectorAll('.map-pin.active').forEach(p => p.classList.remove('active'));
  }

  /* ── Renderizar panel lateral ── */
  function _renderSidePanel(loc) {
    if (!loc) {
      els.sidePanel.innerHTML = `
        <div class="map-empty-state">
          <span class="empty-icon">🗺</span>
          <p>Selecciona una localización en el mapa para ver su información.</p>
          <div class="ornament" style="margin-top:1.5rem;">✦ ✦ ✦</div>
        </div>
      `;
      return;
    }

    els.sidePanel.innerHTML = `
      <div class="location-panel">
        <div class="location-panel-header">
          <h3>${_escHtml(loc.name)}</h3>
          <div class="location-level">${loc.level}</div>
          ${loc.hasTarot ? `<div class="tarot-badge">${_escHtml(loc.tarot)}</div>` : ''}
        </div>
        <div class="location-panel-body">
          <p class="location-desc">${_escHtml(loc.desc)}</p>
          <div class="location-dm-notes">
            <strong>Notas del DM</strong>
            ${_escHtml(loc.dmNotes)}
          </div>
        </div>
      </div>
    `;
  }

  /* ── Helper ── */
  function _escHtml(str) {
    return str
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  /* ── API pública ── */
  return { init, LOCATIONS };
})();

window.MapModule = MapModule;
