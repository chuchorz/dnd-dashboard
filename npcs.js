// ══════ NPCs ══════
let npcs=[
  {name:'Ireena Kolyana',     role:'Aliada — Hija de Kolyan',      notes:'Sangre especial. Obsesión de Strahd. Reencarnación de Tatyana.'},
  {name:'Ismark el Menor',    role:'Alcalde interino de Barovia',   notes:'Quiere proteger a Ireena. Puede acompañar a los PJs.'},
  {name:'Madam Eva',          role:'Adivina Vistani — Tser Pool',  notes:'Lectura de Tarot clave. No es lo que parece. Neutral peligrosa.'},
  {name:'Strahd von Zarovich',role:'El Antagonista',                notes:'144 PV. Resistencia a no-mágico. Regeneración. Encantamiento.'},
  {name:'Rahadin',            role:'Chambelán de Strahd',           notes:'Muy peligroso. Oído de muerte. Ejecutor implacable.'},
];
const NAMES={
  barovian:{m:['Alek','Alexei','Boris','Dmitri','Gregor','Igor','Ivan','Kolyan','Mikhail','Nikolai','Pavel','Piotr','Sergei','Vasili','Viktor','Vladislav'],f:['Anya','Darya','Elena','Galena','Irina','Katya','Ludmila','Marta','Natasha','Olga','Petra','Sofia','Tatiana','Vasilka','Yeva','Zora']},
  noble:   {m:['Argynvost','Azalin','Erasmus','Fidatov','Godfrey','Kasimir','Lief','Ludmil','Marek','Rahadin','Strahd','Vasili'],f:['Anastrasya','Bridgette','Helga','Ludmilla','Meredith','Volenta','Zuleika']},
  vistani: {m:['Arrigal','Baratok','Bildrath','Luvash','Rictavio','Stanimir'],f:['Arabelle','Ezmerelda','Madame Eva','Tara','Zsofia']},
  werewolf:{m:['Bray','Feral','Grolk','Kiril','Skennis','Szoldar','Yevgeni'],f:['Bianca','Helwa','Mala','Mirela','Zula']},
};
const TRAITS={
  ap:['Ojos grises hundidos','Cicatriz en la mejilla','Cabello blanco prematuro','Manos siempre frías','Cojera leve','Ropa muy remendada','Piel casi traslúcida'],
  pe:['Desconfía de extranjeros','Habla en susurros','Obsesionado con el vino','Fatalista: "Strahd siempre gana"','Ríe nervioso cuando miente','Siempre mira la puerta'],
  de:['Bebe en exceso','Delata a cambio de protección','Cobarde en el momento clave','Adicto al juego','Miente compulsivamente'],
  mo:['Proteger a su familia','Encontrar a un ser querido','Escapar de Barovia','Vengar una injusticia antigua','Simplemente sobrevivir'],
};
const pick=arr=>arr[Math.floor(Math.random()*arr.length)];
function renderNpcs(){
  document.getElementById('npc-list').innerHTML=npcs.map((n,i)=>`
    <div class="npc-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <strong>${n.name}</strong><button class="icon-btn del" onclick="remNpc(${i})">✕</button>
      </div>
      <em>${n.role}</em><p>${n.notes}</p>
    </div>`).join('');
}
function addNpc(){
  const name=document.getElementById('npc-name').value.trim();
  const role=document.getElementById('npc-role').value.trim();
  const notes=document.getElementById('npc-notes').value.trim();
  if(!name)return;
  npcs.push({name,role,notes});
  ['npc-name','npc-role','npc-notes'].forEach(id=>document.getElementById(id).value='');
  renderNpcs();
}
function remNpc(i){npcs.splice(i,1);renderNpcs();}
function genName(){
  const o=document.getElementById('name-origin').value;
  const g=document.getElementById('name-gender').value;
  const pool=g==='any'?[...NAMES[o].m,...NAMES[o].f]:NAMES[o][g]||NAMES[o].m;
  const el=document.getElementById('name-result');
  el.textContent=pick(pool);
  el.style.animation='none';el.offsetHeight;el.style.animation='rollAnim .3s ease';
}
function genMultiple(){
  const o=document.getElementById('name-origin').value;
  const g=document.getElementById('name-gender').value;
  const pool=g==='any'?[...NAMES[o].m,...NAMES[o].f]:NAMES[o][g]||NAMES[o].m;
  const five=[...pool].sort(()=>Math.random()-.5).slice(0,5);
  document.getElementById('name-list').innerHTML=five.map(n=>`<span class="name-chip" onclick="document.getElementById('name-result').textContent=this.textContent">${n}</span>`).join('');
}
function genTraits(){
  [TRAITS.ap,TRAITS.pe,TRAITS.de,TRAITS.mo].forEach((arr,i)=>{
    const el=document.getElementById('t'+i);
    el.textContent=pick(arr); el.style.color='var(--text)';
    el.style.animation='none';el.offsetHeight;el.style.animation='rollAnim .3s ease';
  });
}

