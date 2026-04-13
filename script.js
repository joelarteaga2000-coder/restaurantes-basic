(function(){
'use strict';
const dot=document.getElementById('cur-dot'),ring=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
(function ar(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(ar)})();
document.querySelectorAll('a,button,.menu-card,.hb-card,.gg-item').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'))});

const navbar=document.getElementById('navbar');
const waBtn=document.getElementById('waBtn');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled',window.scrollY>60);
  if(waBtn)waBtn.classList.toggle('show',window.scrollY>200);
},{passive:true});

const burger=document.getElementById('burger'),mob=document.getElementById('mobMenu');
let open=false;
if(burger){burger.addEventListener('click',()=>{open=!open;mob.classList.toggle('open',open);const s=burger.querySelectorAll('span');s[0].style.transform=open?'rotate(45deg) translate(4px,4px)':'';s[1].style.transform=open?'rotate(-45deg) translate(4px,-4px)':'';});document.querySelectorAll('.mml').forEach(l=>l.addEventListener('click',()=>{open=false;mob.classList.remove('open');burger.querySelectorAll('span').forEach(s=>s.style.transform='')}))}

const obs=new IntersectionObserver((entries)=>{entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('in'),(i%5)*80);obs.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

const MENU={
  entrantes:[
    {name:'Ceviche de Camarón',price:'$280',desc:'Camarón Pacífico, leche de tigre, pepino, aguacate y tostada de maíz azul.',tag:'Signature'},
    {name:'Tartar de Atún',price:'$320',desc:'Atún de aleta amarilla, aguacate Hass, wasabi japonés y crocante de arroz.',tag:'Chef\'s pick'},
    {name:'Burrata Italiana',price:'$260',desc:'Burrata DOP, tomates San Marzano, albahaca fresca y aceite de oliva extra virgen.',tag:'Vegetariano'},
    {name:'Ostiones Frescos',price:'$340',desc:'Ostión del Pacífico, mignonette de vino tinto y limón Meyer.',tag:'Temporada'},
  ],
  principales:[
    {name:'Lomo de Res Wagyu',price:'$980',desc:'Lomo A5, mantequilla de hierbas, papas ahumadas y jugo de carne.',tag:'Premium'},
    {name:'Corvina en Costra',price:'$680',desc:'Corvina fresca, costra de hierbas, puré de apio nabo y vinagreta de alcaparras.',tag:'Del Mar'},
    {name:'Risotto de Trufa',price:'$580',desc:'Arborio Carnaroli, trufa negra, parmesano 36 meses y mantequilla de noisette.',tag:'Vegetariano'},
    {name:'Pato Confit',price:'$720',desc:'Muslo de pato, lenteja verde, naranja sanguina y mostaza antiga.',tag:'Clásico'},
  ],
  postres:[
    {name:'Tarta de Chocolate',price:'$185',desc:'Ganache 70%, sablé de cacao, helado de vainilla Madagascar.',tag:'Signature'},
    {name:'Crème Brûlée',price:'$165',desc:'Vainilla Tahití, caramelo crujiente, flores de temporada.',tag:'Clásico'},
    {name:'Sorbete de Yuzu',price:'$145',desc:'Yuzu japonés, merengue italiano, caviar de frutas.',tag:'Ligero'},
  ],
  maridaje:[
    {name:'Vino Blanco Borgona',price:'$380/copa',desc:'Puligny-Montrachet Premier Cru. Fresco, mineral, notas de manzana verde.',tag:'Blanco'},
    {name:'Vino Tinto Rioja',price:'$420/copa',desc:'Marqués de Murrieta Reserva. Complejo, taninos suaves, frutos rojos.',tag:'Tinto'},
    {name:'Champagne Rosé',price:'$520/copa',desc:'Laurent-Perrier Rosé. Burbuja fina, fresas, elegancia clásica.',tag:'Burbujas'},
  ]
};

function renderMenu(cat){
  const grid=document.getElementById('menuGrid');
  grid.innerHTML='';
  (MENU[cat]||[]).forEach(item=>{
    const d=document.createElement('div');
    d.className='menu-card';
    d.innerHTML=`<div class="mc-top"><span class="mc-name">${item.name}</span><span class="mc-price">${item.price}</span></div><p class="mc-desc">${item.desc}</p><span class="mc-tag">${item.tag}</span>`;
    grid.appendChild(d);
  });
}

document.querySelectorAll('.mtab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.mtab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    renderMenu(tab.dataset.cat);
  });
});
renderMenu('entrantes');

const form=document.getElementById('resForm');
if(form){form.addEventListener('submit',e=>{e.preventDefault();const b=form.querySelector('button');const o=b.textContent;b.textContent='Reserva confirmada ✓';b.style.background='#4ade80';setTimeout(()=>{b.textContent=o;b.style.background='';form.reset()},3500)})}

document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-80,behavior:'smooth'})}})});
})();
