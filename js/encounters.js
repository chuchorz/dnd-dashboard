// ══════ ENCOUNTERS ══════
const ENCS={
  forest: [{d:'1-2',t:'3d6 Lobos atacan desde el bosque'},{d:'3-4',t:'1d4 Zombis emergen del barro'},{d:'5',t:'Carromato Vistani volcado. Sangre reciente.'},{d:'6',t:'Lobo solitario os observa. No ataca.'},{d:'7',t:'2 Esqueletos montados bloquean el camino'},{d:'8',t:'Anciana con cesta — espía de Strahd'},{d:'9',t:'Niebla densa: CD 12 Sabiduría o perderse (2h)'},{d:'10',t:'Silencio. Solo la sensación de ser observados.'}],
  village:[{d:'1-2',t:'Aldeanos huyen gritando sin explicación'},{d:'3-4',t:'Niño busca a sus padres (3 días desaparecidos)'},{d:'5',t:'Guardia borracho exige documentos y soborno'},{d:'6',t:'Vistani en las afueras: comercian o traicionan'},{d:'7',t:'Cuervos caídos — mensajeros de los Guardianes'},{d:'8',t:'Strahd pasa en carruaje. Os mira fijamente.'},{d:'9',t:'Funeral — el ataúd está vacío'},{d:'10',t:'Ismark busca aventureros con una oferta urgente.'}],
  vallaki: [{d:'1-2',t:'Patrulla del Barón — papeles en orden'},{d:'3-4',t:'Miembros del culto de Wachterhaus os siguen'},{d:'5',t:'Mensaje cifrado de la Mansión Wachter'},{d:'6',t:'Festival del Sol Alegre en preparación'},{d:'7',t:'Preso escapado pide ayuda'},{d:'8',t:'Incendio en el mercado — sospechoso conveniente'},{d:'9',t:'Padre Lucian busca ayuda con los muertos'},{d:'10',t:'Rictavio os observa desde la sombra de la taberna'}],
  castle:  [{d:'1-2',t:'2 Guardias Vampiro patrullan'},{d:'3-4',t:'Novia de Strahd os sigue invisible'},{d:'5',t:'Trampa arcana: CD 15 Percepción o 2d10 necrótico'},{d:'6',t:'El órgano toca solo. Nadie en la sala.'},{d:'7',t:'Puerta secreta (CD 16 Investigación)'},{d:'8',t:'Strahd aparece e invita a cenar cortésmente.'},{d:'9',t:'3 Zombis Nobles desde un armario'},{d:'10',t:'El castillo susurra el nombre de un PJ.'}],
  road:    [{d:'1-2',t:'Supervivientes heridos junto a un carromato volcado'},{d:'3-4',t:'Guardia fronterizo exige tributo'},{d:'5',t:'Pasos en la niebla. Nadie visible.'},{d:'6',t:'Viejo señala el castillo y ríe. Desaparece.'},{d:'7',t:'Lobo herido — si curáis, os sigue (espía)'},{d:'8',t:'Tormenta repentina. Refugio: cabaña abandonada.'},{d:'9',t:'Niños jugando que huyen al veros'},{d:'10',t:'El tiempo se detiene 1 minuto. Silencio total.'}],
  tavern:  [{d:'1-2',t:'Borracho dice haber visto a Strahd esa noche'},{d:'3-4',t:'Pelea involucra a un PJ (1d6 contundente)'},{d:'5',t:'Vistani canta una canción sobre los aventureros'},{d:'6',t:'Alguien anota vuestra conversación'},{d:'7',t:'Oferta de misión urgente'},{d:'8',t:'Vino raro: CD 14 Con. o Veneno 1h'},{d:'9',t:'Strahd entra y pide una copa. Silencio.'},{d:'10',t:'Noche tranquila. Por ahora.'}],
};
function renderEncTable(zone){
  document.getElementById('enc-table').innerHTML=
    '<thead><tr><th>d10</th><th>Encuentro</th></tr></thead><tbody>'+
    (ENCS[zone]||[]).map(r=>`<tr><td style="color:var(--blood-bright);font-weight:bold;">${r.d}</td><td>${r.t}</td></tr>`).join('')+
    '</tbody>';
}
function rollEncounter(){
  const zone=document.getElementById('enc-zone').value;
  const rows=ENCS[zone]||[];
  const roll=Math.floor(Math.random()*10)+1;
  let res=rows[rows.length-1];
  for(const r of rows){if(r.d.includes('-')){const[lo,hi]=r.d.split('-').map(Number);if(roll>=lo&&roll<=hi){res=r;break;}}else if(parseInt(r.d)===roll){res=r;break;}}
  const el=document.getElementById('enc-result');
  el.innerHTML=`<div class="enc-result"><div style="font-size:.73rem;color:var(--text-dim);margin-bottom:5px;">d10 → <span style="color:var(--blood-bright);font-weight:bold;">${roll}</span></div>${res.t}</div>`;
  el.style.animation='none';el.offsetHeight;el.style.animation='rollAnim .3s ease';
}

// ══════ DICE ══════
let diceHist=[];
function rollDie(s){showDice(`d${s}`,Math.floor(Math.random()*s)+1,s);}
function rollCustom(){
  const n=parseInt(document.getElementById('d-num').value)||1;
  const s=parseInt(document.getElementById('d-sides').value)||20;
  const m=parseInt(document.getElementById('d-mod').value)||0;
  let total=0,rolls=[];
  for(let i=0;i<n;i++){const r=Math.floor(Math.random()*s)+1;rolls.push(r);total+=r;}
  total+=m;
  showDice(`${n}d${s}${m>=0?'+'+m:m}`,total,null,`(${rolls.join('+')})`);
}
function showDice(label,value,sides,note=''){
  const el=document.getElementById('dice-result');
  el.className='dice-big roll-anim'; el.textContent=value;
  const crit=sides&&value===sides?' ⭐ ¡Crítico!':sides&&value===1?' 💀 Pifia':'';
  diceHist.unshift({label,value,note:note+crit,t:new Date().toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit',second:'2-digit'})});
  if(diceHist.length>8)diceHist.pop();
  document.getElementById('dice-history').innerHTML=diceHist.map(d=>`
    <div style="font-size:.74rem;color:var(--text-dim);padding:3px 0;border-bottom:1px solid var(--border);">
      <span style="color:var(--gold)">${d.label}</span> → <span style="color:var(--text)">${d.value}</span>
      <span style="float:right;font-size:.62rem;">${d.t}</span>
      ${d.note?`<span style="color:var(--blood-bright);font-style:italic;"> ${d.note}</span>`:''}
    </div>`).join('');
}

