/**
 * soundboard.js
 * Módulo Soundboard para Maldición de Strahd DM Screen
 * Reproductor de ambiente vía YouTube iframe API oculto
 */

'use strict';

const Soundboard = (() => {
  /* ── Estado interno ── */
  let state = {
    currentTrackId: null,
    currentCategory: 'all',
    player: null,
    playerReady: false,
    customUrl: null,
  };

  /* ── Elementos del DOM ── */
  let els = {};

  /* ── Inicialización ── */
  function init() {
    els = {
      view:       document.getElementById('view-soundboard'),
      categories: document.getElementById('sb-categories'),
      grid:       document.getElementById('sb-grid'),
      // Mini player
      eqBars:     document.querySelectorAll('.eq-bar'),
      nowName:    document.getElementById('now-playing-name'),
      urlInput:   document.getElementById('mp-url-input'),
      urlApply:   document.getElementById('mp-url-apply'),
      stopBtn:    document.getElementById('mp-stop'),
      ytContainer:document.getElementById('yt-player-container'),
    };

    _buildCategories();
    _buildGrid('all');
    _bindMiniPlayer();
    _loadYouTubeAPI();
  }

  /* ── Construir botones de categoría ── */
  function _buildCategories() {
    els.categories.innerHTML = '';
    SOUNDBOARD_CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'sb-cat-btn' + (cat.id === 'all' ? ' active' : '');
      btn.textContent = cat.label;
      btn.dataset.cat = cat.id;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sb-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentCategory = cat.id;
        _buildGrid(cat.id);
      });
      els.categories.appendChild(btn);
    });
  }

  /* ── Construir grid de cards ── */
  function _buildGrid(category) {
    const tracks = category === 'all'
      ? SOUNDBOARD_TRACKS
      : SOUNDBOARD_TRACKS.filter(t => t.category === category);

    els.grid.innerHTML = '';

    tracks.forEach((track, idx) => {
      const color = LOCATION_COLORS[track.location] || LOCATION_COLORS.ambiente;
      const card  = document.createElement('div');
      card.className = 'sb-card' + (state.currentTrackId === track.id ? ' playing' : '');
      card.dataset.id = track.id;
      card.style.setProperty('--sb-color', color);

      card.innerHTML = `
        <span class="sb-playing-dot"></span>
        <div class="sb-card-number">${track.num}</div>
        <div class="sb-card-name">${track.name}</div>
        <div class="sb-card-desc">${track.desc}</div>
      `;

      card.addEventListener('click', () => _playTrack(track));
      els.grid.appendChild(card);
    });
  }

  /* ── Reproducir pista ── */
  function _playTrack(track) {
    // Si ya está sonando, detener
    if (state.currentTrackId === track.id) {
      _stopPlayback();
      return;
    }

    state.currentTrackId = track.id;
    state.customUrl      = null;

    _updatePlayingUI(track.name);
    _loadVideo(track.videoId);
    _highlightCard(track.id);
  }

  /* ── Cargar video en el iframe ── */
  function _loadVideo(videoId) {
    if (state.player && state.playerReady) {
      state.player.loadVideoById(videoId);
      state.player.setVolume(80);
    } else {
      // Guardar para cuando esté listo
      state._pendingVideoId = videoId;
    }
  }

  /* ── Detener reproducción ── */
  function _stopPlayback() {
    state.currentTrackId = null;
    state.customUrl      = null;
    state._pendingVideoId = null;

    if (state.player && state.playerReady) {
      state.player.stopVideo();
    }

    _updatePlayingUI(null);
    _clearCardHighlights();
    _setEqPlaying(false);
  }

  /* ── Actualizar UI del mini player ── */
  function _updatePlayingUI(name) {
    if (name) {
      els.nowName.textContent = name;
      els.nowName.classList.remove('empty');
      _setEqPlaying(true);
    } else {
      els.nowName.textContent = 'Nada en reproducción';
      els.nowName.classList.add('empty');
      _setEqPlaying(false);
    }
  }

  /* ── Resaltar card activa ── */
  function _highlightCard(trackId) {
    _clearCardHighlights();
    const card = els.grid.querySelector(`[data-id="${trackId}"]`);
    if (card) card.classList.add('playing');
  }

  function _clearCardHighlights() {
    document.querySelectorAll('.sb-card.playing').forEach(c => c.classList.remove('playing'));
  }

  /* ── Animación del ecualizador ── */
  function _setEqPlaying(playing) {
    els.eqBars.forEach(bar => {
      bar.classList.toggle('playing', playing);
      bar.classList.toggle('paused', !playing);
    });
  }

  /* ── Mini player bindings ── */
  function _bindMiniPlayer() {
    // Botón stop
    els.stopBtn.addEventListener('click', _stopPlayback);

    // Aplicar URL personalizada
    els.urlApply.addEventListener('click', _applyCustomUrl);
    els.urlInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') _applyCustomUrl();
    });
  }

  /* ── Aplicar URL de YouTube personalizada ── */
  function _applyCustomUrl() {
    const url = els.urlInput.value.trim();
    if (!url) return;

    const videoId = _extractYouTubeId(url);
    if (!videoId) {
      _flashInput(els.urlInput, 'error');
      return;
    }

    // Detener pista actual
    _clearCardHighlights();
    state.currentTrackId = null;
    state.customUrl      = url;

    _updatePlayingUI('URL personalizada');
    _loadVideo(videoId);
    _flashInput(els.urlInput, 'ok');
  }

  /* ── Extraer ID de YouTube de una URL ── */
  function _extractYouTubeId(url) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m) return m[1];
    }
    return null;
  }

  /* ── Flash visual en input ── */
  function _flashInput(input, type) {
    const color = type === 'ok' ? 'var(--clr-green-2)' : 'var(--clr-crimson-2)';
    input.style.borderColor = color;
    input.style.boxShadow   = `0 0 0 2px ${color}40`;
    setTimeout(() => {
      input.style.borderColor = '';
      input.style.boxShadow   = '';
    }, 1200);
  }

  /* ── Cargar YouTube IFrame API ── */
  function _loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      _initPlayer();
      return;
    }

    const tag = document.createElement('script');
    tag.src   = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = _initPlayer;
  }

  /* ── Inicializar el player de YouTube ── */
  function _initPlayer() {
    // Crear contenedor oculto si no existe
    let container = document.getElementById('yt-player-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'yt-player-container';
      container.style.cssText = 'position:fixed;bottom:-200px;left:-200px;width:1px;height:1px;overflow:hidden;pointer-events:none;z-index:-1;';
      document.body.appendChild(container);
    }

    const playerDiv = document.createElement('div');
    playerDiv.id = 'yt-player';
    container.appendChild(playerDiv);

    state.player = new YT.Player('yt-player', {
      width:  '1',
      height: '1',
      playerVars: {
        autoplay:       1,
        controls:       0,
        disablekb:      1,
        fs:             0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel:            0,
        loop:           1,
      },
      events: {
        onReady:       _onPlayerReady,
        onStateChange: _onPlayerStateChange,
        onError:       _onPlayerError,
      },
    });
  }

  function _onPlayerReady(event) {
    state.playerReady = true;
    event.target.setVolume(80);

    // Reproducir pendiente si lo hay
    if (state._pendingVideoId) {
      event.target.loadVideoById(state._pendingVideoId);
      state._pendingVideoId = null;
    }
  }

  function _onPlayerStateChange(event) {
    // YT.PlayerState.ENDED = 0
    if (event.data === 0) {
      // Loop manual: volver a reproducir
      if (state.currentTrackId || state.customUrl) {
        event.target.playVideo();
      }
    }
    // YT.PlayerState.PLAYING = 1
    if (event.data === 1) {
      _setEqPlaying(true);
    }
    // YT.PlayerState.PAUSED = 2, BUFFERING = 3
    if (event.data === 2 || event.data === 3) {
      // Mantener EQ si hay pista activa
    }
  }

  function _onPlayerError(event) {
    console.warn('[Soundboard] Error de YouTube player:', event.data);
    // Intentar continuar
    _setEqPlaying(false);
  }

  /* ── API pública ── */
  return { init };
})();

window.Soundboard = Soundboard;
