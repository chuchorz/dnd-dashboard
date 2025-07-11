// =================================================================
// --- ESTRUCTURA DE DATOS ---
// =================================================================
const arbolDeSonidos = [
    {
        categoria: 'Música de Ambiente 🎶',
        sonidos: [ { nombre: 'Taverna', tipo: 'youtube', videoId: 'hWP-iC2dO_g' }, { nombre: 'Bosque', tipo: 'youtube', videoId: '2H_534d5d-s' }, { nombre: 'Combate Épico', tipo: 'youtube', videoId: 'l-h28_f225E' }, { nombre: 'Tensión', tipo: 'youtube', videoId: 'YGOE_N2PLsY' }, { nombre: 'Ciudad', tipo: 'youtube', videoId: 'h-j7i-6G4sI' }, { nombre: 'Cueva Oscura', tipo: 'youtube', videoId: 'SA_kOR_iQyM' } ]
    },
    {
        categoria: 'Efectos de Combate ⚔️',
        sonidos: [ { nombre: 'Golpe Espada', tipo: 'local', archivo: 'sonidos/golpe_espada.mp3' }, { nombre: 'Parada (Metal)', tipo: 'local', archivo: 'sonidos/parada_metal.mp3' }, { nombre: 'Lanzar Flecha', tipo: 'local', archivo: 'sonidos/lanzar_flecha.mp3' }, { nombre: 'Impacto Carne', tipo: 'local', archivo: 'sonidos/impacto_carne.mp3' }, { nombre: 'Golpe Crítico', tipo: 'local', archivo: 'sonidos/golpe_critico.mp3' } ]
    },
    {
        categoria: 'Magia y Hechizos ✨',
        sonidos: [ { nombre: 'Bola de Fuego', tipo: 'local', archivo: 'sonidos/bola_de_fuego.mp3' }, { nombre: 'Rayo Eléctrico', tipo: 'local', archivo: 'sonidos/rayo.mp3' }, { nombre: 'Sanación', tipo: 'local', archivo: 'sonidos/sanacion.mp3' }, { nombre: 'Hechizo Hielo', tipo: 'local', archivo: 'sonidos/hechizo_hielo.mp3' }, { nombre: 'Teletransporte', tipo: 'local', archivo: 'sonidos/teletransporte.mp3' } ]
    },
    {
        categoria: 'Entorno y Exploración 🗺️',
        sonidos: [ { nombre: 'Abrir Puerta', tipo: 'local', archivo: 'sonidos/abrir_puerta.mp3' }, { nombre: 'Pasos en Cueva', tipo: 'local', archivo: 'sonidos/pasos_cueva.mp3' }, { nombre: 'Viento', tipo: 'local', archivo: 'sonidos/viento.mp3' }, { nombre: 'Lluvia', tipo: 'local', archivo: 'sonidos/lluvia.mp3' }, { nombre: 'Hoguera', tipo: 'local', archivo: 'sonidos/hoguera.mp3' } ]
    },
    {
        categoria: 'Criaturas y Monstruos 🐲',
        sonidos: [ { nombre: 'Rugido Dragón', tipo: 'local', archivo: 'sonidos/rugido_dragon.mp3' }, { nombre: 'Gruñido Orco', tipo: 'local', archivo: 'sonidos/grunido_orco.mp3' }, { nombre: 'Siseo Serpiente', tipo: 'local', archivo: 'sonidos/siseo_serpiente.mp3' }, { nombre: 'Aullido Lobo', tipo: 'local', archivo: 'sonidos/aullido_lobo.mp3' }, { nombre: 'Zombie', tipo: 'local', archivo: 'sonidos/zombie.mp3' } ]
    },
    {
        categoria: 'Social y Ciudades 🏘️',
        sonidos: [ { nombre: 'Multitud', tipo: 'local', archivo: 'sonidos/multitud.mp3' }, { nombre: 'Campanas Iglesia', tipo: 'local', archivo: 'sonidos/campanas.mp3' }, { nombre: 'Herrería', tipo: 'local', archivo: 'sonidos/herreria.mp3' }, { nombre: 'Monedas', tipo: 'local', archivo: 'sonidos/monedas.mp3' } ]
    },
    {
        categoria: 'Especiales 🌟',
        sonidos: [ { nombre: 'Subir Nivel', tipo: 'local', archivo: 'sonidos/level_up.mp3' }, { nombre: 'Abrir Cofre', tipo: 'local', archivo: 'sonidos/abrir_cofre.mp3' }, { nombre: 'Beber Poción', tipo: 'local', archivo: 'sonidos/beber_pocion.mp3' }, { nombre: 'Fallo Crítico', tipo: 'local', archivo: 'sonidos/fallo_critico.mp3' }, { nombre: 'Trampa Activada', tipo: 'local', archivo: 'sonidos/trampa.mp3' } ]
    }
];
const nombresPNJ = {
    humano: { nombres: ["Aelar", "Bram", "Caelan"], apellidos: ["Piedra gris", "Colina alta", "Mano de Hierro"] },
    elfo: { nombres: ["Lael", "Erion", "Galad"], apellidos: ["Susurro del Viento", "Hoja de Plata"] },
    enano: { nombres: ["Bror", "Dain", "Gimli"], apellidos: ["Barba de Hierro", "Martillo de Piedra"] }
};
const pifiasAleatorias = [ "Tu arma se te escapa de las manos y cae a 1d4 metros.", "Tropiezas y caes derribado.", "Te golpeas a ti mismo, recibiendo 1 punto de daño.", "Le das a un aliado adyacente en su lugar.", "Tu arma se queda atascada. Cuesta una acción liberarla.", "Provocas un ataque de oportunidad de un enemigo a tu alcance.", "La cuerda de tu arco se rompe.", "Se te caen 1d6 proyectiles al suelo.", "El hechizo se desvanece sin efecto, pero el espacio de conjuro se gasta.", "El hechizo te afecta a ti en lugar del objetivo." ];
const tablasDeTesoros = {
    insignificante: {
        monedas: { cobre: '5d6', plata: '3d6' },
    },
    menor: {
        monedas: { plata: '6d6*10', oro: '2d6*10' },
        gemas: { chance: 25, cantidad: '1d4', tabla: [ { nombre: 'Ágata', valor: '10 po' }, { nombre: 'Turquesa', valor: '10 po' } ] },
        magicos: { chance: 15, tabla: { comun: [ 'Poción de Curación', 'Pergamino de Protección' ] } }
    },
    moderado: {
        monedas: { oro: '4d6*100', platino: '1d6*10' },
        gemas: { chance: 50, cantidad: '2d4', tabla: [ { nombre: 'Ámbar', valor: '100 po' }, { nombre: 'Granate', valor: '100 po' } ] },
        magicos: { chance: 40, tabla: { pocoComun: [ 'Bolsa de Contención', 'Botas élficas' ], comun: [ 'Poción de Curación Superior' ] } }
    },
    mayor: {
        monedas: { oro: '4d6*1000', platino: '2d6*100' },
        gemas: { chance: 75, cantidad: '3d6', tabla: [ { nombre: 'Esmeralda', valor: '1000 po' }, { nombre: 'Zafiro', valor: '1000 po' } ] },
        magicos: { chance: 65, tabla: { raro: [ 'Espada +1', 'Armadura de Placas +1' ], pocoComun: [ 'Poción de Invisibilidad' ] } }
    },
    legendario: {
        monedas: { platino: '6d6*1000' },
        gemas: { chance: 100, cantidad: '4d8', tabla: [ { nombre: 'Diamante', valor: '5000 po' }, { nombre: 'Rubí Ojo de Gigante', valor: '5000 po' } ] },
        magicos: { chance: 90, tabla: { muyRaro: [ 'Anillo de Invisibilidad', 'Manual de Golems' ], raro: [ 'Varita de Bolas de Fuego' ] } }
    }
};

// =================================================================
// --- INICIALIZACIÓN Y LÓGICA PRINCIPAL ---
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    // --- REFERENCIAS AL DOM ---
    const panelPrincipal = document.getElementById('panel-principal');
    const buscador = document.getElementById('buscador');
    const stopGlobalBtn = document.getElementById('stop-global');
    const volumenGlobalSlider = document.getElementById('volumen-global');
    const resultadoDadoDisplay = document.getElementById('resultado-dado');
    const formIniciativa = document.getElementById('form-iniciativa');
    const listaIniciativa = document.getElementById('lista-iniciativa');
    const comenzarCombateBtn = document.getElementById('comenzar-combate');
    const siguienteTurnoBtn = document.getElementById('siguiente-turno');
    const finalizarCombateBtn = document.getElementById('finalizar-combate');
    const displayFecha = document.getElementById('display-fecha');
    const displayHora = document.getElementById('display-hora');
    const btnAdd1h = document.getElementById('btn-add-1h');
    const btnAdd8h = document.getElementById('btn-add-8h');
    const btnAdd1d = document.getElementById('btn-add-1d');
    const btnResetReloj = document.getElementById('btn-reset-reloj');
    const displayCronometro = document.getElementById('display-cronometro');
    const btnStartStopCronometro = document.getElementById('btn-start-stop-cronometro');
    const btnResetCronometro = document.getElementById('btn-reset-cronometro');
    const selectorTesoro = document.getElementById('selector-tesoro');
    const btnGenerarTesoro = document.getElementById('btn-generar-tesoro');
    const resultadoTesoro = document.getElementById('resultado-tesoro');
    const inputImagen = document.getElementById('input-imagen');
    const galeriaImagenes = document.getElementById('galeria-imagenes');
    
    // --- VARIABLES DE ESTADO ---
    let reproductorYoutube;
    let sonidosLocalesActivos = [];
    let combatientes = [];
    let turnoActualIndex = -1;
    let tiempoCampaña = { dia: 1, hora: 8 };
    const valoresDefectoTiempo = { dia: 1, hora: 8 };
    let cronometroIntervalo;
    let segundosCronometro = 0;
    let cronometroCorriendo = false;
    let imagenesGuardadas = [];

    // --- LÓGICA DEL SOUNDBOARD ---
    function construirSoundboard() {
        panelPrincipal.innerHTML = '';
        arbolDeSonidos.forEach(cat => {
            const contenedor = document.createElement('div');
            contenedor.className = 'categoria-contenedor';
            const titulo = document.createElement('h2');
            titulo.className = 'categoria-titulo';
            titulo.textContent = cat.categoria;
            titulo.addEventListener('click', () => contenedor.classList.toggle('activo'));
            const grid = document.createElement('div');
            grid.className = 'sonidos-grid';
            cat.sonidos.forEach(sonido => {
                const wrapper = document.createElement('div');
                wrapper.className = 'boton-sonido-wrapper';
                const boton = document.createElement('button');
                boton.className = 'boton-sonido';
                boton.innerText = sonido.nombre;
                boton.dataset.nombre = sonido.nombre;
                if (sonido.tipo === 'local') {
                    const audio = new Audio(sonido.archivo);
                    sonidosLocalesActivos.push({ nombre: sonido.nombre, elemento: audio });
                    const controles = document.createElement('div');
                    controles.className = 'controles-individuales';
                    const loopBtn = document.createElement('button');
                    loopBtn.className = 'loop-btn';
                    loopBtn.innerText = '⥀';
                    loopBtn.addEventListener('click', e => { e.stopPropagation(); audio.loop = !audio.loop; loopBtn.classList.toggle('activo'); });
                    const volumenIndividual = document.createElement('input');
                    volumenIndividual.type = 'range';
                    volumenIndividual.min = "0";
                    volumenIndividual.max = "1";
                    volumenIndividual.step = "0.1";
                    volumenIndividual.value = "1";
                    volumenIndividual.className = 'volumen-individual';
                    volumenIndividual.addEventListener('input', e => { e.stopPropagation(); audio.volume = e.target.value; });
                    controles.appendChild(volumenIndividual);
                    controles.appendChild(loopBtn);
                    boton.addEventListener('click', () => { audio.currentTime = 0; audio.play().catch(console.error); });
                    audio.addEventListener('play', () => boton.classList.add('reproduciendo'));
                    audio.addEventListener('pause', () => boton.classList.remove('reproduciendo'));
                    audio.addEventListener('ended', () => boton.classList.remove('reproduciendo'));
                    wrapper.appendChild(boton);
                    wrapper.appendChild(controles);
                } else if (sonido.tipo === 'youtube') {
                    boton.classList.add('youtube-btn');
                    boton.addEventListener('click', () => {
                        if (reproductorYoutube) {
                            reproductorYoutube.loadVideoById(sonido.videoId);
                            document.querySelectorAll('.youtube-btn.reproduciendo').forEach(b => b.classList.remove('reproduciendo'));
                            boton.classList.add('reproduciendo');
                        }
                    });
                    wrapper.appendChild(boton);
                }
                grid.appendChild(wrapper);
            });
            contenedor.appendChild(titulo);
            contenedor.appendChild(grid);
            panelPrincipal.appendChild(contenedor);
        });
    }

    // --- LÓGICA DE CONTROLES GLOBALES ---
    stopGlobalBtn.addEventListener('click', () => {
        if (reproductorYoutube) { reproductorYoutube.stopVideo(); }
        document.querySelectorAll('.youtube-btn.reproduciendo').forEach(b => b.classList.remove('reproduciendo'));
        sonidosLocalesActivos.forEach(s => { s.elemento.pause(); s.elemento.currentTime = 0; });
    });
    volumenGlobalSlider.addEventListener('input', e => { if (reproductorYoutube) { reproductorYoutube.setVolume(e.target.value * 100); } });
    buscador.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase();
        document.querySelectorAll('.boton-sonido').forEach(boton => {
            const wrapper = boton.closest('.boton-sonido-wrapper');
            const nombre = boton.dataset.nombre.toLowerCase();
            wrapper.style.display = nombre.includes(termino) ? 'flex' : 'none';
        });
    });

    // --- LÓGICA DE PESTAÑAS ---
    document.querySelectorAll('.pestaña-btn').forEach(boton => {
        boton.addEventListener('click', () => {
            document.querySelectorAll('.contenido-pestaña, .pestaña-btn').forEach(el => el.classList.remove('activo'));
            document.getElementById(boton.dataset.pestaña).classList.add('activo');
            boton.classList.add('activo');
        });
    });

    // --- LÓGICA DEL LANZADOR DE DADOS ---
    document.querySelectorAll('.dado-btn').forEach(boton => {
        boton.addEventListener('click', () => {
            const max = parseInt(boton.dataset.dado);
            resultadoDadoDisplay.innerText = Math.floor(Math.random() * max) + 1;
        });
    });

    // --- LÓGICA DE GENERADORES ---
    const btnGenerarNombre = document.getElementById('btn-generar-nombre');
    const selectorRaza = document.getElementById('selector-raza');
    const resultadoNombre = document.getElementById('resultado-nombre');
    btnGenerarNombre.addEventListener('click', () => {
        const raza = selectorRaza.value;
        const nombres = nombresPNJ[raza].nombres;
        const apellidos = nombresPNJ[raza].apellidos;
        resultadoNombre.textContent = `${nombres[Math.floor(Math.random() * nombres.length)]} ${apellidos[Math.floor(Math.random() * apellidos.length)]}`;
    });
    const btnGenerarPifia = document.getElementById('btn-generar-pifia');
    const resultadoPifia = document.getElementById('resultado-pifia');
    btnGenerarPifia.addEventListener('click', () => {
        resultadoPifia.textContent = pifiasAleatorias[Math.floor(Math.random() * pifiasAleatorias.length)];
    });
    function lanzarDados(notacion) {
        const match = notacion.match(/(\d+)d(\d+)([\*\+]\d+)?/);
        if (!match) return 0;
        const [_, numDados, caras, modificador] = match;
        let total = 0;
        for (let i = 0; i < parseInt(numDados); i++) {
            total += Math.floor(Math.random() * parseInt(caras)) + 1;
        }
        if (modificador) {
            const op = modificador[0];
            const val = parseInt(modificador.substring(1));
            if (op === '*') total *= val;
            if (op === '+') total += val;
        }
        return total;
    }
    btnGenerarTesoro.addEventListener('click', () => {
        const nivel = selectorTesoro.value;
        const tabla = tablasDeTesoros[nivel];
        let botinHTML = '<ul>';
        if (tabla.monedas) {
            for (const [tipo, dados] of Object.entries(tabla.monedas)) {
                const cantidad = lanzarDados(dados);
                if (cantidad > 0) {
                    botinHTML += `<li class="monedas">${cantidad} piezas de ${tipo}</li>`;
                }
            }
        }
        if (tabla.gemas && (Math.random() * 100) < tabla.gemas.chance) {
            const cantidad = lanzarDados(tabla.gemas.cantidad || '1d1');
            for (let i = 0; i < cantidad; i++) {
                const gema = tabla.gemas.tabla[Math.floor(Math.random() * tabla.gemas.tabla.length)];
                botinHTML += `<li class="gemas">${gema.nombre} (valorado en ${gema.valor})</li>`;
            }
        }
        if (tabla.magicos && (Math.random() * 100) < tabla.magicos.chance) {
            const tablaMagica = tabla.magicos.tabla;
            const rarezas = Object.keys(tablaMagica);
            const rarezaElegida = rarezas[Math.floor(Math.random() * rarezas.length)];
            const objetos = tablaMagica[rarezaElegida];
            const objetoElegido = objetos[Math.floor(Math.random() * objetos.length)];
            botinHTML += `<li class="magico"><strong>Objeto Mágico (${rarezaElegida}):</strong> ${objetoElegido}</li>`;
        }
        if (botinHTML === '<ul>') {
            botinHTML += '<li>Nada de valor...</li>';
        }
        botinHTML += '</ul>';
        resultadoTesoro.innerHTML = botinHTML;
    });

    // --- LÓGICA DEL TRACKER DE INICIATIVA ---
    function renderizarListaIniciativa() {
        listaIniciativa.innerHTML = '';
        combatientes.forEach((c, index) => {
            const item = document.createElement('li');
            item.className = `combatiente-item ${c.esJugador ? 'es-jugador' : ''}`;
            item.dataset.id = c.id;
            if (index === turnoActualIndex) { item.classList.add('turno-actual'); }
            item.innerHTML = `<div class="combatiente-iniciativa">${c.iniciativa}</div><div class="combatiente-nombre">${c.nombre}</div><input type="text" class="combatiente-estado" placeholder="Estado" value="${c.estado}"><button class="btn-eliminar-combatiente">×</button>`;
            listaIniciativa.appendChild(item);
        });
    }
    formIniciativa.addEventListener('submit', e => {
        e.preventDefault();
        combatientes.push({ id: Date.now(), nombre: document.getElementById('nombre-combatiente').value, iniciativa: parseInt(document.getElementById('iniciativa-combatiente').value), estado: '', esJugador: document.getElementById('es-jugador').checked });
        formIniciativa.reset();
        document.getElementById('nombre-combatiente').focus();
        renderizarListaIniciativa();
    });
    listaIniciativa.addEventListener('change', e => {
        if (e.target.classList.contains('combatiente-estado')) {
            const id = parseInt(e.target.closest('.combatiente-item').dataset.id);
            const combatiente = combatientes.find(c => c.id === id);
            if(combatiente) combatiente.estado = e.target.value;
        }
    });
    listaIniciativa.addEventListener('click', e => {
        if (e.target.classList.contains('btn-eliminar-combatiente')) {
            const id = parseInt(e.target.closest('.combatiente-item').dataset.id);
            combatientes = combatientes.filter(c => c.id !== id);
            renderizarListaIniciativa();
        }
    });
    comenzarCombateBtn.addEventListener('click', () => {
        combatientes.sort((a, b) => b.iniciativa - a.iniciativa);
        turnoActualIndex = combatientes.length > 0 ? 0 : -1;
        renderizarListaIniciativa();
    });
    siguienteTurnoBtn.addEventListener('click', () => {
        if (combatientes.length > 0) {
            turnoActualIndex = (turnoActualIndex + 1) % combatientes.length;
            renderizarListaIniciativa();
        }
    });
    finalizarCombateBtn.addEventListener('click', () => {
        combatientes = [];
        turnoActualIndex = -1;
        renderizarListaIniciativa();
    });

    // --- LÓGICA DEL RELOJ DE CAMPAÑA ---
    function guardarTiempo() { localStorage.setItem('dndDashboardTiempo', JSON.stringify(tiempoCampaña)); }
    function cargarTiempo() {
        const tiempoGuardado = localStorage.getItem('dndDashboardTiempo');
        tiempoCampaña = tiempoGuardado ? JSON.parse(tiempoGuardado) : { ...valoresDefectoTiempo };
    }
    function actualizarDisplayTiempo() {
        displayFecha.textContent = `Día ${tiempoCampaña.dia}`;
        const hora = tiempoCampaña.hora;
        let periodo = 'Noche', icono = '🌙';
        if (hora >= 6 && hora < 12) { periodo = 'Mañana'; icono = '☀️'; } 
        else if (hora >= 12 && hora < 18) { periodo = 'Tarde'; icono = '🌤️'; } 
        else if (hora >= 18 && hora < 21) { periodo = 'Atardecer'; icono = '🌅'; }
        displayHora.innerHTML = `<span>${icono}</span> ${periodo} (${hora.toString().padStart(2, '0')}:00)`;
    }
    function avanzarHoras(horas) {
        tiempoCampaña.hora += horas;
        if (tiempoCampaña.hora >= 24) {
            tiempoCampaña.dia += Math.floor(tiempoCampaña.hora / 24);
            tiempoCampaña.hora = tiempoCampaña.hora % 24;
        }
        actualizarDisplayTiempo();
        guardarTiempo();
    }
    btnAdd1h.addEventListener('click', () => avanzarHoras(1));
    btnAdd8h.addEventListener('click', () => avanzarHoras(8));
    btnAdd1d.addEventListener('click', () => { tiempoCampaña.dia += 1; actualizarDisplayTiempo(); guardarTiempo(); });
    btnResetReloj.addEventListener('click', () => {
        if (confirm('¿Seguro que quieres resetear el reloj de la campaña al Día 1?')) {
            tiempoCampaña = { ...valoresDefectoTiempo };
            actualizarDisplayTiempo();
            guardarTiempo();
        }
    });

    // --- LÓGICA DEL CRONÓMETRO ---
    function actualizarDisplayCronometro() {
        const minutos = Math.floor(segundosCronometro / 60);
        const segundos = segundosCronometro % 60;
        displayCronometro.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }
    btnStartStopCronometro.addEventListener('click', () => {
        if (cronometroCorriendo) {
            clearInterval(cronometroIntervalo);
            btnStartStopCronometro.textContent = 'Reanudar';
        } else {
            cronometroIntervalo = setInterval(() => {
                segundosCronometro++;
                actualizarDisplayCronometro();
            }, 1000);
            btnStartStopCronometro.textContent = 'Pausar';
        }
        cronometroCorriendo = !cronometroCorriendo;
    });
    btnResetCronometro.addEventListener('click', () => {
        clearInterval(cronometroIntervalo);
        cronometroCorriendo = false;
        segundosCronometro = 0;
        actualizarDisplayCronometro();
        btnStartStopCronometro.textContent = 'Empezar';
    });
    
    // --- LÓGICA DEL VISOR DE IMÁGENES ---
    function guardarImagenes() {
        localStorage.setItem('dndDashboardImagenes', JSON.stringify(imagenesGuardadas));
    }
    function cargarImagenes() {
        const imagenesEnStorage = localStorage.getItem('dndDashboardImagenes');
        if (imagenesEnStorage) {
            imagenesGuardadas = JSON.parse(imagenesEnStorage);
        }
    }
    function renderizarGaleria() {
        galeriaImagenes.innerHTML = '';
        imagenesGuardadas.forEach((imgData, index) => {
            const div = document.createElement('div');
            div.className = 'miniatura-contenedor';
            div.innerHTML = `
                <img src="${imgData}" alt="miniatura" class="miniatura-img">
                <div class="miniatura-overlay">
                    <button class="btn-mostrar-img" data-index="${index}">Mostrar</button>
                    <button class="btn-eliminar-img" data-index="${index}">Borrar</button>
                </div>
            `;
            galeriaImagenes.appendChild(div);
        });
    }
    inputImagen.addEventListener('change', (e) => {
        const archivos = e.target.files;
        for (const archivo of archivos) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imagenesGuardadas.push(event.target.result);
                guardarImagenes();
                renderizarGaleria();
            };
            reader.readAsDataURL(archivo);
        }
        e.target.value = ''; // Resetear el input para poder subir la misma imagen de nuevo
    });
    galeriaImagenes.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('btn-mostrar-img')) {
            const ventanaImagen = window.open("", "_blank");
            ventanaImagen.document.write(`<style>body{margin:0; background:black; display:flex; justify-content:center; align-items:center; height:100vh;}</style><img src="${imagenesGuardadas[index]}" style="max-width:100%; max-height:100%;">`);
        }
        if (e.target.classList.contains('btn-eliminar-img')) {
            if (confirm('¿Seguro que quieres eliminar esta imagen?')) {
                imagenesGuardadas.splice(index, 1);
                guardarImagenes();
                renderizarGaleria();
            }
        }
    });

    // --- INICIALIZAR TODO AL CARGAR LA PÁGINA ---
    construirSoundboard();
    cargarTiempo();
    actualizarDisplayTiempo();
    actualizarDisplayCronometro();
    cargarImagenes();
    renderizarGaleria();
    window.onYouTubeIframeAPIReady = function() {
        reproductorYoutube = new YT.Player('reproductor-youtube', {
            height: '0', width: '0',
            playerVars: { 'autoplay': 1, 'loop': 1, 'list':'' },
            events: { 'onReady': () => reproductorYoutube.setVolume(volumenGlobalSlider.value * 100) }
        });
    };
});