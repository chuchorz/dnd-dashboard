// ══════ STRAHD — PANEL DE COMBATE ══════

const STRAHD_PHASES = {
  mago: {
    id: 'mago',
    name: 'El Mago',
    icon: '✨',
    color: '#7050c0',
    hp: 331,
    maxHp: 331,
    ca: 16,
    vel: '40 pies / trepar 40 pies',
    saves: 'Des +11, Sab +8, Car +11',
    skills: 'Arcanos +17, Atletismo +11, Engaño +17, Percepción +14, Religión +11, Sigilo +17',
    stats: [{s:'FUE',v:'20 (+5)'},{s:'DES',v:'20 (+5)'},{s:'CON',v:'18 (+4)'},{s:'INT',v:'20 (+5)'},{s:'SAB',v:'15 (+2)'},{s:'CAR',v:'20 (+5)'}],
    traits: [
      { name:'Lanzamiento Complejo', desc:'Si lanza un conjuro con acción adicional, también puede usar su acción para lanzar un cantrip.' },
      { name:'Resistencia Legendaria (1/Día)', desc:'Si falla una salvación, puede elegir tener éxito.' },
      { name:'Regeneración', desc:'Recupera 20 PG al inicio de su turno si tiene ≥1 PG y no está en luz solar.' },
    ],
    actions: [
      { name:'Multiataque', type:'Acción', desc:'Usa Toque Vampírico dos veces, o Toque Vampírico + Telequinesis una vez cada uno.' },
      { name:'Toque Vampírico', type:'Acción', desc:'Ataque. Impacto: CD 19 Con o queda aturdido hasta inicio del siguiente turno de Strahd.' },
      { name:'Agarre Telekinético', type:'Acción', desc:'Un objetivo a 18m: CD 19 Fue o se eleva 6m, 28 (7d6) necrótico, inmovilizado hasta fin turno.' },
      { name:'Círculo de Enfermedad', type:'Adicional', desc:'Radio 3m: CD 19 Con o 28 (8d6) necrótico + desventaja en siguiente ataque.' },
      { name:'Rayo de Relámpago', type:'Adicional', desc:'Lanza rayo de relámpago.' },
      { name:'Paso Brumoso', type:'Reacción', desc:'En respuesta a recibir daño, lanza paso brumoso.' },
      { name:'Ceguera/Sordera', type:'Reacción', desc:'En respuesta a daño cuerpo a cuerpo: CD 19 Con o el atacante queda cegado/sordo + 12 (2d6) necrótico.' },
    ],
    lair: [
      { name:'Dispersión', desc:'Hasta 3 criaturas a 18m: CD 19 Sab o teletransportadas a espacio en el suelo elegido por Strahd.' },
      { name:'Esfera Ígnea', desc:'Esfera de fuego (5m diám.) en espacio visible. Criaturas a 1.5m: CD 19 Des o 14 (4d6) fuego por turno.' },
    ],
    innate: [
      '3/día: detectar pensamientos, animar a los muertos',
      '1/día: clarividencia',
    ],
    transition: 'Strahd vacila un momento, pero su mirada se endurece. Desenfunda su espada larga — la magia se desvanece. Una nueva fuerza se apodera de él.',
  },

  soldado: {
    id: 'soldado',
    name: 'El Soldado',
    icon: '⚔️',
    color: '#b03020',
    hp: 331,
    maxHp: 331,
    ca: 16,
    vel: '40 pies / trepar 40 pies',
    saves: 'Des +11, Fue +8, Car +11',
    skills: 'Arcanos +17, Atletismo +11, Engaño +17, Percepción +14, Religión +11, Sigilo +17',
    stats: [{s:'FUE',v:'20 (+5)'},{s:'DES',v:'20 (+5)'},{s:'CON',v:'18 (+4)'},{s:'INT',v:'20 (+5)'},{s:'SAB',v:'15 (+2)'},{s:'CAR',v:'20 (+5)'}],
    traits: [
      { name:'Conciencia de Campo de Batalla', desc:'Ventaja en salvaciones de Fue y Des contra efectos que pueda ver o escuchar.' },
      { name:'Resistencia Legendaria (1/Día)', desc:'Si falla una salvación, puede elegir tener éxito.' },
      { name:'Regeneración', desc:'Recupera 20 PG al inicio de su turno si tiene ≥1 PG y no está en luz solar.' },
    ],
    actions: [
      { name:'Multiataque', type:'Acción', desc:'Dos ataques, solo uno puede ser con Red Umbral.' },
      { name:'Espada Larga', type:'Acción', desc:'+11, 5 pies. Impacto: 11 (1d10+5) cortante + 7 (2d6) necrótico. CD 19 Fue o empujado 5 pies y derribado.' },
      { name:'Red Umbral', type:'Acción', desc:'+11, alcance 9m/18m. Impacto: 7 (2d6) necrótico + inmovilizado hasta fin del turno.' },
      { name:'Ola de Trueno', type:'Adicional', desc:'Radio 1.5m: CD 19 Fue o 14 (3d8) trueno + empujado 5 pies.' },
      { name:'Descarga Oscura', type:'Adicional', desc:'Punto a 36m, radio 3m: CD 19 Des o 18 (4d8) necrótico.' },
      { name:'Retirada del Comandante', type:'Reacción', desc:'Al recibir daño cuerpo a cuerpo: CD 19 Fue o atacante empujado 5 pies. Luego Strahd mueve hasta su velocidad sin oportunidad.' },
      { name:'Golpe Vengativo', type:'Reacción', desc:'Al recibir daño a distancia: mueve hasta vel. hacia el atacante y puede atacar con espada larga. Sin oportunidad.' },
    ],
    lair: [
      { name:'Manos Fantasmales', desc:'No muertas en cuadrado 3m a 18m: CD 19 Fue o inmovilizadas hasta iniciativa 20 del siguiente turno.' },
      { name:'Banco de Niebla', desc:'Niebla radio 12m a 18m, muy oscurecida. Strahd puede esconderse como reacción y mover hasta vel.' },
    ],
    innate: [],
    transition: 'Un corte profundo atraviesa la armadura de Strahd — sus colmillos crecen y sus ojos arden en rojo bestial. Sus uñas se alargan como garras. La verdadera naturaleza del vampiro despierta.',
  },

  vampiro: {
    id: 'vampiro',
    name: 'El Vampiro',
    icon: '🩸',
    color: '#8b0000',
    hp: 331,
    maxHp: 331,
    ca: 16,
    vel: '40 pies / trepar 40 pies',
    saves: 'Des +11, Sab +8, Car +11',
    skills: 'Arcanos +17, Atletismo +11, Engaño +17, Percepción +14, Religión +11, Sigilo +17',
    stats: [{s:'FUE',v:'20 (+5)'},{s:'DES',v:'20 (+5)'},{s:'CON',v:'18 (+4)'},{s:'INT',v:'20 (+5)'},{s:'SAB',v:'15 (+2)'},{s:'CAR',v:'20 (+5)'}],
    traits: [
      { name:'Padre de la Noche', desc:'Humanoide muerto por su mordida resucita como vástago vampírico bajo su control al inicio de su siguiente turno.' },
      { name:'Resistencia Legendaria (1/Día)', desc:'Si falla una salvación, puede elegir tener éxito.' },
      { name:'Regeneración', desc:'Recupera 20 PG al inicio de su turno si tiene ≥1 PG y no está en luz solar.' },
    ],
    actions: [
      { name:'Multiataque', type:'Acción', desc:'Dos ataques, puede reemplazar uno con Encanto.' },
      { name:'Ataque Desarmado', type:'Acción', desc:'+11, 5 pies. Impacto: 10 (1d8+5) contundente. CD 19 Des o agarrado (escapar DC 19).' },
      { name:'Mordida', type:'Acción', desc:'+11, 5 pies (criatura dispuesta/agarrada/incapacitada). Impacto: 7 (1d6+4) perforante + 10 (3d6) necrótico. Reduce PG máx. Strahd recupera esos PG.' },
      { name:'Encanto', type:'Acción', desc:'Humanoide a 9m: CD 19 Sab o encantado 1 min/1 h/24 h. Considera a Strahd un amigo de confianza.' },
      { name:'Frenesí de Murciélagos', type:'Adicional', desc:'Radio 3m: CD 19 Des o 15 (6d4) necrótico + desventaja en siguiente ataque.' },
      { name:'Furia del Depredador', type:'Adicional', desc:'Dos criaturas a 18m (a 1.5m entre sí): CD 19 Des o 16 (2d10+5) contundente + derribadas.' },
      { name:'Retiro Nocturno', type:'Reacción', desc:'Al recibir daño: vuela hasta su velocidad sin provocar ataques de oportunidad.' },
      { name:'Frenesí de Sangre', type:'Reacción', desc:'Al recibir daño: mueve hasta vel. hacia el atacante y realiza un Ataque Desarmado.' },
    ],
    lair: [
      { name:'Diluvio de Sangre', desc:'Radio 3m a 18m: CD 19 Fue o 7 (2d6) contundente + empujado 3m + derribado + cegado hasta iniciativa 20.' },
      { name:'Lamentos de los Condenados', desc:'Radio 1.5m a 18m: CD 19 Sab o asustado hasta iniciativa 20 (paralizado + pierde concentración).' },
    ],
    innate: [],
    transition: 'El cuerpo de Strahd se tambalea — pero se disuelve en niebla oscura antes de caer. Susurrando una promesa de venganza, la niebla se desliza hacia las sombras.',
  },
};

// Estado runtime
let strahdState = {
  phase: 'mago',
  hp: { mago: 331, soldado: 331, vampiro: 331 },
  mood: 2,   // 0=Amistoso 1=Indiferente 2=Hostil 3=Rabioso
  location: 'Castillo Ravenloft',
  legendRes: { mago: true, soldado: true, vampiro: true },
  fanes: { mountain: true, swamp: true, forest: true },
};

const MOODS = [
  { label:'Amistoso',    color:'#4a9a4a', icon:'😌', desc:'Curioso por los PJs. Podría negociar. Invitación a cenar.' },
  { label:'Indiferente', color:'#8a7050', icon:'😐', desc:'Los observa desde lejos. Prueba su valía sin atacar.' },
  { label:'Hostil',      color:'#b03020', icon:'😠', desc:'Obstaculiza activamente. Envía siervos.' },
  { label:'Rabioso',     color:'#7a0000', icon:'😤', desc:'Ataque directo. Sin piedad. Mata o captura.' },
];

const ACTION_TYPE_COLORS = {
  'Acción':    '#c4a870',
  'Adicional': '#80a0c0',
  'Reacción':  '#c08060',
  'Guarida':   '#907070',
};

function buildStrahdPanel() {
  const el = document.getElementById('strahd-panel-inner');
  if (!el) return;

  const phase = STRAHD_PHASES[strahdState.phase];
  const hp = strahdState.hp[strahdState.phase];
  const pct = Math.max(0, Math.min(100, hp / phase.maxHp * 100));
  const hpColor = pct > 60 ? '#5a9a5a' : pct > 30 ? '#c07020' : '#b03020';
  const mood = MOODS[strahdState.mood];

  // Phase buttons
  const phaseBtns = Object.values(STRAHD_PHASES).map(p => `
    <button onclick="setPhase('${p.id}')"
      style="font-family:'Cinzel',serif;font-size:.62rem;letter-spacing:.08em;padding:8px 14px;
             border:1px solid ${strahdState.phase===p.id ? p.color : 'var(--border)'};
             background:${strahdState.phase===p.id ? 'rgba(100,50,150,.15)' : 'transparent'};
             color:${strahdState.phase===p.id ? p.color : 'var(--text-dim)'};
             cursor:pointer;border-radius:1px;transition:all .2s;">
      ${p.icon} ${p.name}
    </button>`).join('');

  // Stats row
  const statsRow = phase.stats.map(s => `
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:2px;padding:7px 10px;text-align:center;min-width:58px;">
      <div style="font-family:'Cinzel',serif;font-size:.55rem;letter-spacing:.1em;color:var(--text-dim);">${s.s}</div>
      <div style="font-family:'UnifrakturMaguntia',cursive;font-size:1.3rem;color:var(--gold);">${s.v}</div>
    </div>`).join('');

  // Actions table
  const actionsHtml = phase.actions.map(a => {
    const tc = ACTION_TYPE_COLORS[a.type] || 'var(--text-dim)';
    return `<tr style="border-bottom:1px solid var(--border);">
      <td style="padding:7px 10px;font-family:'Cinzel',serif;font-size:.65rem;color:var(--gold);white-space:nowrap;">${a.name}</td>
      <td style="padding:7px 6px;"><span style="font-size:.58rem;padding:1px 6px;border:1px solid ${tc}44;color:${tc};border-radius:8px;">${a.type}</span></td>
      <td style="padding:7px 10px;font-size:.78rem;color:var(--text);line-height:1.5;">${a.desc}</td>
    </tr>`;
  }).join('');

  // Lair actions
  const lairHtml = phase.lair.map(a => `
    <div style="padding:8px 10px;background:var(--bg2);border:1px solid var(--border);border-radius:1px;margin-bottom:6px;">
      <div style="font-family:'Cinzel',serif;font-size:.63rem;color:var(--text-mid);margin-bottom:3px;">${a.name}</div>
      <div style="font-size:.78rem;color:var(--text);line-height:1.5;">${a.desc}</div>
    </div>`).join('');

  // Traits
  const traitsHtml = phase.traits.map(t => `
    <div style="padding:8px 10px;background:var(--bg2);border-left:3px solid ${phase.color};border-radius:1px;margin-bottom:6px;">
      <span style="font-family:'Cinzel',serif;font-size:.63rem;color:var(--gold);">${t.name}.</span>
      <span style="font-size:.79rem;color:var(--text);line-height:1.55;"> ${t.desc}</span>
    </div>`).join('');

  // Innate spells
  const innateHtml = phase.innate.length ? `
    <div class="card" style="border-color:${phase.color}44;">
      <div class="card-title">🔮 Conjuros Innatos (Inteligencia)</div>
      ${phase.innate.map(s => `<div style="font-size:.8rem;color:var(--text-mid);padding:3px 0;">• ${s}</div>`).join('')}
    </div>` : '';

  // Fanes
  const fanesHtml = `
    <div class="card">
      <div class="card-title">🌑 Poderes de los Fanes de Barovia</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">
        ${['mountain','swamp','forest'].map(f => {
          const labels = {mountain:'⛰️ Montaña',swamp:'🌿 Pantano',forest:'🌲 Bosque'};
          const active = strahdState.fanes[f];
          return `<button onclick="toggleFane('${f}')"
            style="font-family:'Cinzel',serif;font-size:.6rem;padding:5px 10px;
                   border:1px solid ${active?'var(--gold-dim)':'var(--border)'};
                   background:${active?'rgba(232,200,122,.1)':'transparent'};
                   color:${active?'var(--gold)':'var(--text-dim)'};cursor:pointer;border-radius:1px;">
            ${labels[f]} ${active?'✓':'✗'}
          </button>`;
        }).join('')}
      </div>
      <div style="font-size:.77rem;color:var(--text-dim);line-height:1.6;">
        ${strahdState.fanes.mountain?'<div>⛰️ <strong>Montaña:</strong> Controla el clima. Puede lanzar <em>controlar el clima</em> sin recursos.</div>':''}
        ${strahdState.fanes.swamp?'<div>🌿 <strong>Pantano:</strong> Puede lanzar <em>imagen mayor</em> y <em>mover tierra</em> sin recursos.</div>':''}
        ${strahdState.fanes.forest?'<div>🌲 <strong>Bosque:</strong> Puede lanzar <em>sentir bestias</em>, <em>localizar criaturas</em> y <em>formas animales</em> sin recursos.</div>':''}
        ${Object.values(strahdState.fanes).some(v=>v)?'<div style="margin-top:6px;color:var(--blood-bright);">⚠️ <strong>Rejuvenecimiento:</strong> Si es destruido con al menos un Fane, resucita en 24h en su ataúd con todos sus PG y fases.</div>':'<div style="color:var(--text-dim);font-style:italic;">Sin Fanes activos — puede ser destruido permanentemente.</div>'}
      </div>
    </div>`;

  // Transition text
  const transHtml = phase.transition ? `
    <div style="padding:10px 14px;background:rgba(${phase.id==='mago'?'112,80,192':'phase.id==="soldado"?'176,48,32':'139,0,0'},0.08);border:1px solid ${phase.color}44;border-radius:2px;margin-top:10px;">
      <div style="font-family:'Cinzel',serif;font-size:.6rem;letter-spacing:.12em;color:var(--text-dim);margin-bottom:5px;">TRANSICIÓN DE FASE</div>
      <p style="font-size:.8rem;color:var(--text);font-style:italic;line-height:1.65;">"${phase.transition}"</p>
    </div>` : '';

  el.innerHTML = `
    <!-- Selector de fase -->
    <div class="card" style="margin-bottom:12px;border-color:${phase.color};">
      <div class="card-title" style="justify-content:space-between;border-color:${phase.color}44;">
        <span>${phase.icon} Fase Activa: ${phase.name}</span>
        <span style="font-family:'Cinzel',serif;font-size:.6rem;color:var(--text-dim);">CR 21 · 33.000 PX · Prof. +6</span>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">${phaseBtns}</div>

      <!-- Stats -->
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">${statsRow}</div>
      <div style="font-size:.76rem;color:var(--text-dim);line-height:1.7;margin-bottom:10px;">
        <strong>CA:</strong> ${phase.ca} &nbsp;·&nbsp;
        <strong>Velocidad:</strong> ${phase.vel} &nbsp;·&nbsp;
        <strong>Resistencias Leg.:</strong> 1/día<br>
        <strong>Salvaciones:</strong> ${phase.saves}<br>
        <strong>Resistencias:</strong> Necrótico; contundente, perforante y cortante (no mágico)<br>
        <strong>Sentidos:</strong> Visión en oscuridad 120 pies · Percepción pasiva 24
      </div>

      <!-- HP -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <span style="font-family:'Cinzel',serif;font-size:.65rem;letter-spacing:.1em;color:var(--text-dim);">PUNTOS DE VIDA</span>
        <span id="strahd-hp-display" style="font-size:1rem;color:${hpColor};font-family:'Cinzel',serif;">${hp} / ${phase.maxHp}</span>
      </div>
      <div style="width:100%;height:10px;background:var(--bg3);border-radius:2px;margin-bottom:10px;overflow:hidden;">
        <div id="strahd-hp-bar" style="height:100%;width:${pct}%;background:${hpColor};transition:all .3s;border-radius:2px;"></div>
      </div>
      <div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center;margin-bottom:6px;">
        <button class="btn btn-blood btn-sm" onclick="adjHp(-20)">−20</button>
        <button class="btn btn-blood btn-sm" onclick="adjHp(-10)">−10</button>
        <button class="btn btn-blood btn-sm" onclick="adjHp(-5)">−5</button>
        <button class="btn btn-blood btn-sm" onclick="adjHp(-1)">−1</button>
        <button class="btn btn-ghost btn-sm" onclick="adjHp(20)">+20 Reg.</button>
        <button class="btn btn-ghost btn-sm" onclick="adjHp(331)">↺ Reset fase</button>
        <span style="margin-left:6px;">
          <input type="number" id="hp-manual" placeholder="PV exactos" style="width:100px;">
          <button class="btn btn-gold btn-sm" onclick="setHpManual()">Aplicar</button>
        </span>
      </div>

      <!-- Leyenda Resistencia Legendaria -->
      <div style="display:flex;gap:8px;align-items:center;">
        <span style="font-family:'Cinzel',serif;font-size:.6rem;color:var(--text-dim);">RES. LEGENDARIA:</span>
        <button onclick="toggleLegRes()" style="font-family:'Cinzel',serif;font-size:.65rem;padding:4px 10px;
          border:1px solid ${strahdState.legendRes[strahdState.phase]?'var(--gold-dim)':'var(--border)'};
          background:${strahdState.legendRes[strahdState.phase]?'rgba(232,200,122,.1)':'transparent'};
          color:${strahdState.legendRes[strahdState.phase]?'var(--gold)':'var(--text-dim)'};cursor:pointer;border-radius:1px;">
          ${strahdState.legendRes[strahdState.phase]?'✓ Disponible':'✗ Usada'}
        </button>
      </div>

      ${transHtml}
    </div>

    <!-- Rasgos -->
    <div class="card" style="margin-bottom:12px;">
      <div class="card-title">🔱 Rasgos Especiales</div>
      ${traitsHtml}
      <div style="margin-top:6px;padding:8px 10px;background:var(--bg2);border-left:3px solid var(--border-bright);border-radius:1px;">
        <span style="font-family:'Cinzel',serif;font-size:.63rem;color:var(--gold);">Hipersensibilidad a la Luz Solar.</span>
        <span style="font-size:.79rem;color:var(--text);"> Al inicio de su turno bajo luz solar: 20 daño radiante. Desventaja en ataques y habilidades.</span>
      </div>
      <div style="margin-top:6px;padding:8px 10px;background:var(--bg2);border-left:3px solid var(--border-bright);border-radius:1px;">
        <span style="font-family:'Cinzel',serif;font-size:.63rem;color:var(--gold);">Cambiar de Forma.</span>
        <span style="font-size:.79rem;color:var(--text);"> Si no está en agua corriente o luz solar, puede transformarse en murciélago diminuto, lobo mediano o nube de niebla. En niebla: inmune a todo daño salvo solar, no puede actuar.</span>
      </div>
    </div>

    <!-- Acciones -->
    <div class="card" style="margin-bottom:12px;">
      <div class="card-title">⚔️ Acciones</div>
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr>
          <th style="text-align:left;font-family:'Cinzel',serif;font-size:.56rem;color:var(--text-dim);padding:4px 10px;border-bottom:1px solid var(--border);">Nombre</th>
          <th style="text-align:left;font-family:'Cinzel',serif;font-size:.56rem;color:var(--text-dim);padding:4px 6px;border-bottom:1px solid var(--border);">Tipo</th>
          <th style="text-align:left;font-family:'Cinzel',serif;font-size:.56rem;color:var(--text-dim);padding:4px 10px;border-bottom:1px solid var(--border);">Descripción</th>
        </tr></thead>
        <tbody>${actionsHtml}</tbody>
      </table>
    </div>

    ${innateHtml}

    <!-- Acciones de Guarida -->
    <div class="card" style="margin-bottom:12px;">
      <div class="card-title">🏰 Acciones en la Guarida <span style="font-size:.65rem;color:var(--text-dim);font-weight:normal;">(solo en Castillo Ravenloft)</span></div>
      ${lairHtml}
    </div>

    <!-- Humor y Fanes -->
    <div class="grid-2" style="gap:12px;margin-bottom:12px;">
      <div class="card">
        <div class="card-title">🎭 Estado Actual</div>
        <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:8px;">
          ${MOODS.map((m,i) => `<button onclick="setMood(${i})"
            style="font-family:'Cinzel',serif;font-size:.58rem;padding:5px 9px;
                   border:1px solid ${strahdState.mood===i?m.color:'var(--border)'};
                   background:${strahdState.mood===i?'rgba(176,48,32,.1)':'transparent'};
                   color:${strahdState.mood===i?m.color:'var(--text-dim)'};cursor:pointer;border-radius:1px;">
            ${m.icon} ${m.label}
          </button>`).join('')}
        </div>
        <div style="display:flex;gap:10px;align-items:flex-start;padding:8px;background:var(--bg2);border:1px solid var(--border);border-radius:1px;">
          <span style="font-size:1.4rem;">${mood.icon}</span>
          <div>
            <div style="font-family:'Cinzel',serif;font-size:.65rem;color:${mood.color};">${mood.label}</div>
            <div style="font-size:.78rem;color:var(--text-dim);font-style:italic;margin-top:2px;">${mood.desc}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">⚠️ Debilidades</div>
        <div style="font-size:.79rem;color:var(--text);line-height:1.7;">
          <div>☀️ <strong>Luz solar:</strong> 20 radiante al inicio de turno. Desventaja en todo.</div>
          <div>💧 <strong>Agua corriente:</strong> 20 ácido al inicio de turno si atraviesa.</div>
          <div>🥩 <strong>Estaca en corazón:</strong> Paralizado (no destruido).</div>
          <div>🧄 <strong>Ajo:</strong> No le agrada. Rango de 1.5m le resulta hostil.</div>
          <div>🚪 <strong>Prohibición:</strong> No puede entrar en residencia sin invitación.</div>
          <div>☀️ <strong>Descanso:</strong> Solo en su ataúd, entre amanecer y anochecer.</div>
        </div>
      </div>
    </div>

    ${fanesHtml}
  `;
}

function adjHp(d) {
  const p = strahdState.phase;
  const max = STRAHD_PHASES[p].maxHp;
  strahdState.hp[p] = Math.max(0, Math.min(max, strahdState.hp[p] + d));
  buildStrahdPanel();
  saveStrahd();
}

function setHpManual() {
  const v = parseInt(document.getElementById('hp-manual')?.value);
  if (!isNaN(v)) {
    const p = strahdState.phase;
    strahdState.hp[p] = Math.max(0, Math.min(STRAHD_PHASES[p].maxHp, v));
    buildStrahdPanel();
    saveStrahd();
  }
}

function setPhase(id) {
  strahdState.phase = id;
  buildStrahdPanel();
  saveStrahd();
}

function setMood(i) {
  strahdState.mood = i;
  buildStrahdPanel();
  saveStrahd();
}

function toggleLegRes() {
  strahdState.legendRes[strahdState.phase] = !strahdState.legendRes[strahdState.phase];
  buildStrahdPanel();
  saveStrahd();
}

function toggleFane(f) {
  strahdState.fanes[f] = !strahdState.fanes[f];
  buildStrahdPanel();
  saveStrahd();
}

function saveStrahd() {
  try { localStorage.setItem('strahd_state', JSON.stringify(strahdState)); } catch(e) {}
}

function loadFromStorageStrahd() {
  try {
    const d = JSON.parse(localStorage.getItem('strahd_state') || 'null');
    if (d) strahdState = { ...strahdState, ...d };
  } catch(e) {}
}

// renderStrahd alias for main.js compatibility
function renderStrahd() { buildStrahdPanel(); }
