/**
 * initiative.js
 * Módulo de Tracker de Iniciativa para Maldición de Strahd DM Screen
 * Gestión de combate: iniciativa, HP, condiciones, persistencia localStorage
 */

'use strict';

const Initiative = (() => {
  /* ── Constantes ── */
  const STORAGE_KEY = 'strahd_initiative';

  const CONDITIONS = [
    {
      name: 'Cegado',
      desc: 'No puede ver. Falla chequeos que requieran vista. Las tiradas de ataque tienen desventaja; los ataques contra él tienen ventaja.',
    },
    {
      name: 'Encantado',
      desc: 'No puede atacar al encantador ni ser objetivo de sus habilidades dañinas. El encantador tiene ventaja en chequeos sociales contra él.',
    },
    {
      name: 'Asustado',
      desc: 'Desventaja en tiradas de ataque y chequeos mientras la fuente de miedo esté a la vista. No puede acercarse voluntariamente a ella.',
    },
    {
      name: 'Agarrado',
      desc: 'Velocidad 0. Termina si el agarrador queda incapacitado o si el efecto lo saca del alcance.',
    },
    {
      name: 'Incapacitado',
      desc: 'No puede realizar acciones ni reacciones.',
    },
    {
      name: 'Invisible',
      desc: 'Imposible de ver sin magia. Ventaja en ataques; ataques contra él con desventaja.',
    },
    {
      name: 'Paralizado',
      desc: 'Incapacitado y no puede moverse ni hablar. Falla automáticamente salvaciones de FUE y DES. Ataques con ventaja. Golpes a menos de 5 pies son críticos.',
    },
    {
      name: 'Petrificado',
      desc: 'Transformado en sustancia inerte. Incapacitado, no puede moverse ni hablar. Resistencia a todo daño. Inmune a veneno y enfermedad.',
    },
    {
      name: 'Envenenado',
      desc: 'Desventaja en tiradas de ataque y chequeos de característica.',
    },
    {
      name: 'Derribado',
      desc: 'Solo puede arrastrarse. Desventaja en ataques. Ataques a menos de 5 pies con ventaja; los demás con desventaja.',
    },
    {
      name: 'Restringido',
      desc: 'Velocidad 0. Desventaja en ataques y salvaciones de DES. Ataques contra él con ventaja.',
    },
    {
      name: 'Aturdido',
      desc: 'Incapacitado, no puede moverse, solo habla con dificultad. Falla salvaciones de FUE y DES. Ataques con ventaja.',
    },
    {
      name: 'Inconsciente',
      desc: 'Incapacitado, no puede moverse ni hablar. No sabe lo que pasa. Cae derribado. Falla FUE y DES. Ataques con ventaja. Golpes a menos de 5 pies son críticos.',
    },
    {
      name: 'Concentración',
      desc: 'Manteniendo un hechizo de concentración. Pierde la concentración si recibe daño (CD = mitad del daño, mín. 10), si lanza otro hechizo de concentración, o si queda incapacitado.',
    },
    {
      name: 'Maldito',
      desc: 'Bajo los efectos de una maldición. Los efectos específicos dependen de la fuente de la maldición.',
    },
  ];

  /* ── Estado ── */
  let state = {
    combatants: [],
    activeIndex: -1,
    round: 1,
    inCombat: false,
  };

  /* ── Elementos DOM ── */
  let els = {};

  /* ── Inicialización ── */
  function init() {
    els = {
      form:          document.getElementById('combatant-form'),
      nameInput:     document.getElementById('c-name'),
      initInput:     document.getElementById('c-init'),
      hpInput:       document.getElementById('c-hp'),
      typeSelect:    document.getElementById('c-type'),
      addBtn:        document.getElementById('c-add-btn'),
      list:          document.getElementById('combatant-list'),
      roundDisplay:  document.getElementById('round-number'),
      nextBtn:       document.getElementById('btn-next-turn'),
      resetBtn:      document.getElementById('btn-reset-combat'),
      clearBtn:      document.getElementById('btn-clear-all'),
      conditionsList:document.getElementById('conditions-list'),
    };

    _buildConditions();
    _loadFromStorage();
    _bindEvents();
    _render();
  }

  /* ── Construir lista de condiciones ── */
  function _buildConditions() {
    els.conditionsList.innerHTML = '';
    CONDITIONS.forEach(cond => {
      const item = document.createElement('div');
      item.className = 'condition-item';
      item.innerHTML = `
        <div class="condition-name">${cond.name}</div>
        <div class="condition-desc">${cond.desc}</div>
      `;
      item.addEventListener('click', () => {
        item.classList.toggle('expanded');
      });
      els.conditionsList.appendChild(item);
    });
  }

  /* ── Vincular eventos ── */
  function _bindEvents() {
    // Añadir combatiente
    els.addBtn.addEventListener('click', _addCombatant);
    els.form.addEventListener('keydown', e => {
      if (e.key === 'Enter') _addCombatant();
    });

    // Siguiente turno
    els.nextBtn.addEventListener('click', _nextTurn);

    // Reset combate (mantiene combatientes, resetea ronda)
    els.resetBtn.addEventListener('click', () => {
      if (!confirm('¿Reiniciar el combate? Se mantendrán los combatientes pero se reseteará la ronda y el turno activo.')) return;
      state.round       = 1;
      state.activeIndex = -1;
      state.inCombat    = false;
      _saveToStorage();
      _render();
    });

    // Limpiar todo
    els.clearBtn.addEventListener('click', () => {
      if (!confirm('¿Eliminar todos los combatientes?')) return;
      state.combatants  = [];
      state.activeIndex = -1;
      state.round       = 1;
      state.inCombat    = false;
      _saveToStorage();
      _render();
    });
  }

  /* ── Añadir combatiente ── */
  function _addCombatant() {
    const name = els.nameInput.value.trim();
    const init = parseInt(els.initInput.value, 10);
    const hp   = parseInt(els.hpInput.value, 10);
    const type = els.typeSelect.value;

    if (!name) { _flashInput(els.nameInput); return; }
    if (isNaN(init)) { _flashInput(els.initInput); return; }
    if (isNaN(hp) || hp < 1) { _flashInput(els.hpInput); return; }

    const combatant = {
      id:      `c-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,
      name,
      init,
      hpMax:  hp,
      hpCur:  hp,
      type,
      dead:   false,
    };

    state.combatants.push(combatant);
    _sortCombatants();

    // Si había un activo, recalcular su índice
    if (state.inCombat && state.activeIndex >= 0) {
      const activeId = state.combatants[state.activeIndex]?.id;
      if (activeId) {
        state.activeIndex = state.combatants.findIndex(c => c.id === activeId);
      }
    }

    _saveToStorage();
    _render();

    // Limpiar form
    els.nameInput.value = '';
    els.initInput.value = '';
    els.hpInput.value   = '';
    els.nameInput.focus();
  }

  /* ── Ordenar por iniciativa descendente ── */
  function _sortCombatants() {
    state.combatants.sort((a, b) => b.init - a.init);
  }

  /* ── Siguiente turno ── */
  function _nextTurn() {
    if (state.combatants.length === 0) return;

    const alive = state.combatants.filter(c => !c.dead);
    if (alive.length === 0) return;

    state.inCombat = true;

    // Primer turno
    if (state.activeIndex < 0) {
      state.activeIndex = 0;
      // Saltar muertos al inicio
      while (state.activeIndex < state.combatants.length && state.combatants[state.activeIndex].dead) {
        state.activeIndex++;
      }
      if (state.activeIndex >= state.combatants.length) state.activeIndex = 0;
    } else {
      // Avanzar al siguiente vivo
      let next = state.activeIndex + 1;
      let looped = false;

      while (true) {
        if (next >= state.combatants.length) {
          next = 0;
          if (!looped) {
            state.round++;
            looped = true;
          } else break;
        }
        if (!state.combatants[next].dead) break;
        next++;
      }
      state.activeIndex = next;
    }

    _saveToStorage();
    _render();
    _scrollToActive();
  }

  /* ── Scroll al combatiente activo ── */
  function _scrollToActive() {
    const activeRow = els.list.querySelector('.combatant-row.active');
    if (activeRow) {
      activeRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /* ── Modificar HP ── */
  function _modifyHp(id, delta) {
    const c = state.combatants.find(x => x.id === id);
    if (!c) return;

    c.hpCur = Math.max(0, Math.min(c.hpMax, c.hpCur + delta));

    // Marcar muerto automáticamente si HP = 0
    if (c.hpCur === 0) c.dead = true;

    _saveToStorage();
    _renderRow(id);
  }

  /* ── Marcar muerto/vivo ── */
  function _toggleDead(id) {
    const c = state.combatants.find(x => x.id === id);
    if (!c) return;
    c.dead = !c.dead;
    if (!c.dead && c.hpCur === 0) c.hpCur = 1;
    _saveToStorage();
    _render();
  }

  /* ── Eliminar combatiente ── */
  function _removeCombatant(id) {
    const idx = state.combatants.findIndex(x => x.id === id);
    if (idx < 0) return;

    state.combatants.splice(idx, 1);

    // Ajustar activeIndex
    if (state.activeIndex >= state.combatants.length) {
      state.activeIndex = state.combatants.length - 1;
    }

    _saveToStorage();
    _render();
  }

  /* ── Renderizado completo ── */
  function _render() {
    // Ronda
    els.roundDisplay.textContent = state.round;

    // Lista
    els.list.innerHTML = '';

    if (state.combatants.length === 0) {
      els.list.innerHTML = `
        <div style="text-align:center;padding:2rem;color:var(--clr-text-muted);font-style:italic;font-size:0.9rem;">
          No hay combatientes. Añade personajes y enemigos para comenzar.
        </div>`;
      return;
    }

    state.combatants.forEach((c, idx) => {
      const row = _createRow(c, idx === state.activeIndex);
      els.list.appendChild(row);
    });
  }

  /* ── Renderizar solo una fila (actualización parcial) ── */
  function _renderRow(id) {
    const idx = state.combatants.findIndex(x => x.id === id);
    if (idx < 0) return;

    const c       = state.combatants[idx];
    const isActive = idx === state.activeIndex;
    const oldRow  = els.list.querySelector(`[data-id="${id}"]`);
    if (!oldRow) { _render(); return; }

    const newRow = _createRow(c, isActive);
    oldRow.replaceWith(newRow);
  }

  /* ── Crear elemento de fila ── */
  function _createRow(c, isActive) {
    const pct    = c.hpMax > 0 ? (c.hpCur / c.hpMax) * 100 : 0;
    const hpClass = pct > 50 ? 'high' : pct > 25 ? 'mid' : pct > 10 ? 'low' : 'crit';

    const row = document.createElement('div');
    row.className = `combatant-row type-${c.type}${isActive ? ' active' : ''}${c.dead ? ' dead' : ''}`;
    row.dataset.id = c.id;

    row.innerHTML = `
      <div class="init-badge">${c.init}</div>

      <div class="combatant-info">
        <div class="combatant-name">${_escHtml(c.name)}</div>
        <span class="badge badge-${c.type}">${_typeLabel(c.type)}</span>
      </div>

      <div class="hp-section">
        <div class="hp-label">
          <span>HP</span>
          <span class="hp-values">${c.hpCur} / ${c.hpMax}</span>
        </div>
        <div class="hp-bar-track">
          <div class="hp-bar-fill" data-pct="${hpClass}" style="width:${pct}%"></div>
        </div>
        <div class="hp-controls">
          <button class="btn btn-sm btn-danger hp-dmg-btn" data-id="${c.id}" title="Aplicar daño">−</button>
          <input type="number" class="hp-input" value="1" min="1" max="999" data-id="${c.id}" aria-label="Cantidad">
          <button class="btn btn-sm hp-heal-btn" data-id="${c.id}" title="Curar" style="border-color:var(--clr-green-2);color:#80ff90;">+</button>
        </div>
      </div>

      <div class="combatant-actions">
        <button class="btn btn-icon btn-sm ${c.dead ? '' : 'btn-danger'} toggle-dead-btn"
          data-id="${c.id}"
          data-tooltip="${c.dead ? 'Revivir' : 'Marcar muerto'}"
          style="font-size:0.9rem;">
          ${c.dead ? '♻' : '✝'}
        </button>
        <button class="btn btn-icon btn-sm remove-btn"
          data-id="${c.id}"
          data-tooltip="Eliminar"
          style="font-size:0.85rem;">
          ✕
        </button>
      </div>
    `;

    // Eventos inline
    row.querySelector('.hp-dmg-btn').addEventListener('click', e => {
      const input = row.querySelector(`.hp-input[data-id="${c.id}"]`);
      const val   = parseInt(input.value, 10) || 1;
      _modifyHp(c.id, -val);
    });

    row.querySelector('.hp-heal-btn').addEventListener('click', e => {
      const input = row.querySelector(`.hp-input[data-id="${c.id}"]`);
      const val   = parseInt(input.value, 10) || 1;
      _modifyHp(c.id, +val);
    });

    row.querySelector('.toggle-dead-btn').addEventListener('click', () => _toggleDead(c.id));
    row.querySelector('.remove-btn').addEventListener('click', () => _removeCombatant(c.id));

    return row;
  }

  /* ── Helpers ── */
  function _typeLabel(type) {
    return { enemy: 'Enemigo', ally: 'Aliado', neutral: 'Neutral' }[type] || type;
  }

  function _escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function _flashInput(input) {
    input.style.borderColor = 'var(--clr-crimson-2)';
    input.style.boxShadow   = '0 0 0 2px rgba(176,32,32,0.3)';
    input.focus();
    setTimeout(() => {
      input.style.borderColor = '';
      input.style.boxShadow   = '';
    }, 1000);
  }

  /* ── Persistencia localStorage ── */
  function _saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('[Initiative] Error al guardar en localStorage:', e);
    }
  }

  function _loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      state.combatants  = saved.combatants  || [];
      state.activeIndex = saved.activeIndex ?? -1;
      state.round       = saved.round       || 1;
      state.inCombat    = saved.inCombat    || false;
    } catch (e) {
      console.warn('[Initiative] Error al cargar de localStorage:', e);
    }
  }

  /* ── API pública ── */
  return { init };
})();

window.Initiative = Initiative;
