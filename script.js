const LOGO="logo.png";
const app=document.getElementById("app");
const EXP=["Jogos de robótica","Jogos maker","Tecnologia","Feira de brindes","Campeonatos","Outras atividades"];
const YN=[["sim","Sim"],["nao","Não"]];
const Q=[
{k:"vem",t:"Você vem para o Vieira Games?",type:"radio",o:[["sim","Sim, com certeza"],["talvez","Ainda não sei"],["nao","Não vou conseguir"]]},
{k:"espera",t:"O que você espera encontrar?",type:"multi",o:EXP,txt:"esperaTxt",lab:"Quer contar mais? (opcional)"},
{k:"fantasia",t:"Você vem fantasiado? Se sim, qual fantasia irá usar?",type:"radio",o:[["sim","Sim"],["nao","Não dessa vez"]],fw:"sim",fk:"qual",fl:"Qual fantasia?",inp:1},
{k:"primeira",t:"Esta será a sua primeira vez no Vieira Games? Se já participou de alguma edição, o que mais gostou?",type:"radio",o:[["sim","Sim, é a minha primeira vez"],["nao","Não, já participei de uma edição"]],fw:"nao",fk:"gostou",fl:"O que você mais gostou?"},
{k:"interesse",t:"O que mais desperta seu interesse em participar do Vieira Games? (pode marcar mais de uma)",type:"multi",o:["Jogos de robótica","Jogos maker","Tecnologia","Feira de brindes","Encontrar os amigos","Campeonatos"],txt:"interesseTxt",lab:"Outro motivo? (opcional)"},
{k:"ja",t:"Você já participou alguma vez do Vieira Games?",type:"radio",o:YN}
];
const N=Q.length;
const A={};
const reset=()=>{Q.forEach(q=>{A[q.k]=q.type==="multi"?[]:"";if(q.txt)A[q.txt]="";if(q.fk)A[q.fk]=""})};reset();
const COL=["#2f9be0","#ffd21f","#e0352b"];
const fx=document.getElementById("fx");
for(let i=0;i<16;i++){const e=document.createElement("i"),s=8+Math.random()*14;e.style.cssText=`left:${Math.random()*100}%;width:${s}px;height:${s}px;background:${COL[i%3]};animation-duration:${10+Math.random()*14}s;animation-delay:-${Math.random()*20}s`;fx.appendChild(e)}
const h=(s,back)=>{app.innerHTML=s;if(back){const c=app.querySelector(".card");if(c)c.classList.add("back")}};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
function beep(f,d){try{const c=beep.c||(beep.c=new (window.AudioContext||window.webkitAudioContext)()),o=c.createOscillator(),g=c.createGain();o.type="square";o.frequency.value=f;g.gain.value=.04;o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+d)}catch(e){}}
function type(el,t){let i=0;el.textContent="";const iv=setInterval(()=>{el.textContent=t.slice(0,++i);if(i>=t.length)clearInterval(iv)},55)}
function menu(){last=0;document.body.classList.add("menu");startTetris();h(`<img class="logo" src="${LOGO}" alt="Logo Vieira Games" draggable="false"><h1 id="tt"></h1><p class="sub">Jogos criados na robótica e no maker, tecnologia, feira de brindes e muito mais.</p><div class="menu"><button class="btn start" id="go">Iniciar pesquisa</button></div>`);
type(document.getElementById("tt"),"PESQUISA PRÉ-EVENTO");
document.getElementById("go").onclick=()=>{beep(880,.12);transition()}}
const valid=d=>{if(d.type==="multi")return A[d.k].length||A[d.txt].trim();if(!A[d.k])return false;return !d.fw||A[d.k]!==d.fw||A[d.fk].trim()};
function pop(b){b.classList.remove("pop");void b.offsetWidth;b.classList.add("pop");beep(520,.06)}
let last=0;
function q(i){document.body.classList.remove("menu");stopTetris();const d=Q[i],back=i<last;last=i;
const bar=`<div class="prog">${Q.map((_,j)=>`<i class="${j<=i?"on":""}"></i>`).join("")}</div>`;
let body=`<h2>${d.t}</h2><div class="opts">${d.o.map(x=>{const v=Array.isArray(x)?x[0]:x,l=Array.isArray(x)?x[1]:x,on=d.type==="multi"?A[d.k].includes(v):A[d.k]===v;return `<button class="opt ${d.type==="radio"?"rad":""} ${on?"on":""}" data-v="${esc(v)}">${l}</button>`}).join("")}</div>`;
if(d.type==="multi")body+=`<label>${d.lab}<textarea id="t" rows="3">${esc(A[d.txt])}</textarea></label>`;
if(d.fw)body+=`<label id="fl" class="${A[d.k]===d.fw?"":"hid"}">${d.fl}${d.inp?`<input id="f" maxlength="80" value="${esc(A[d.fk])}">`:`<textarea id="f" rows="3">${esc(A[d.fk])}</textarea>`}</label>`;
h(`${bar}<div class="card"><div class="tag">Pergunta ${i+1}/${N}</div>${body}<div class="nav"><button class="btn g" id="back">Voltar</button><button class="btn b" id="next" ${valid(d)?"":"disabled"}>${i===N-1?"Enviar":"Próxima"}</button></div></div>`,back);
const nx=document.getElementById("next"),upd=()=>nx.disabled=!valid(d);
document.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const v=b.dataset.v;
if(d.type==="multi"){if(A[d.k].includes(v)){A[d.k]=A[d.k].filter(x=>x!==v);b.classList.remove("on","pop")}else{A[d.k].push(v);b.classList.add("on");pop(b)}}
else{A[d.k]=v;document.querySelectorAll(".opt").forEach(x=>x.classList.remove("on","pop"));b.classList.add("on");pop(b);
if(d.fw){const fl=document.getElementById("fl"),f=document.getElementById("f");if(v!==d.fw){A[d.fk]="";f.value=""}fl.classList.toggle("hid",v!==d.fw);if(v===d.fw)f.focus()}}
upd()});
const t=document.getElementById("t");if(t)t.oninput=()=>{A[d.txt]=t.value;upd()};
const f=document.getElementById("f");if(f)f.oninput=()=>{A[d.fk]=f.value;upd()};
document.getElementById("back").onclick=()=>{beep(300,.06);i===0?menu():q(i-1)};
nx.onclick=()=>{beep(760,.08);i===N-1?send():q(i+1)}}
const ENDPOINT="https://script.google.com/macros/s/AKfycbzUN0dCqTGs5u5dUjsjulmSnTtxLj6FmkUZriQPHyrIf8YTOGGC8xVbXCMPt6LC1iWUSQ/exec";
const HDR={vem:"Vem para o Vieira Games?",espera:"O que espera encontrar?",esperaTxt:"Detalhes do que espera encontrar",fantasia:"Vem fantasiado?",qual:"Qual fantasia?",primeira:"Primeira vez no Vieira Games?",gostou:"O que mais gostou nas edições anteriores?",interesse:"O que mais desperta o interesse em participar?",interesseTxt:"Outro motivo de interesse",ja:"Já participou alguma vez?"};
const KB="vg_respostas",KP="vg_pendentes";
const rd=k=>{try{return JSON.parse(localStorage.getItem(k)||"[]")}catch(e){return[]}};
const wr=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
function buildAnswers(){
const lab=(d,v)=>{const x=d.o.find(o=>(Array.isArray(o)?o[0]:o)===v);return x?(Array.isArray(x)?x[1]:x):v};
const a={};
Q.forEach(d=>{
a[HDR[d.k]]=d.type==="multi"?A[d.k].slice():lab(d,A[d.k]);
if(d.txt)a[HDR[d.txt]]=A[d.txt];
if(d.fk)a[HDR[d.fk]]=A[d.fk]});
return a}
let sending=false;
async function flush(){
if(sending)return;sending=true;
let p=rd(KP);
while(p.length){
try{await fetch(ENDPOINT,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({answers:p[0]})});p.shift();wr(KP,p)}
catch(e){break}}
sending=false}
function send(){
const a=buildAnswers();
wr(KB,[...rd(KB),{...a,quando:new Date().toLocaleString("pt-BR")}]);
wr(KP,[...rd(KP),a]);
done();flush()}
function done(){last=0;const vem=A.vem;h(`<img class="logo" src="${LOGO}" alt="Logo Vieira Games" draggable="false"><div class="card" style="margin-top:14px;text-align:center"><div class="ok">OK!</div><h2>Resposta enviada</h2><p>${vem==="sim"?"Te esperamos no Vieira Games!":"Obrigado pela sua opinião!"}</p><div class="menu"><button class="btn" id="m">Nova resposta</button></div></div>`);
reset();document.getElementById("m").onclick=menu;
[523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,.12),i*110));
for(let i=0;i<60;i++){const e=document.createElement("i");e.className="cf";const s=6+Math.random()*10;e.style.cssText=`left:${Math.random()*100}vw;width:${s}px;height:${s}px;background:${COL[i%3]};animation-duration:${2+Math.random()*2.5}s;animation-delay:${Math.random()*.8}s`;document.body.appendChild(e);setTimeout(()=>e.remove(),6000)}}
const RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
const TC=["#2f9be0","#ffd21f","#e0352b","#4cd44c","#e83e9c","#ff9f1c","#8e6bff"];
const SH=[[[0,0],[0,1],[0,2],[0,3]],[[0,0],[1,0],[1,1],[1,2]],[[0,2],[1,0],[1,1],[1,2]],[[0,0],[0,1],[1,0],[1,1]],[[0,1],[0,2],[1,0],[1,1]],[[0,1],[1,0],[1,1],[1,2]],[[0,0],[0,1],[1,1],[1,2]]];
const rotC=c=>{const r=c.map(([a,b])=>[b,-a]),m=Math.min(...r.map(x=>x[0])),n=Math.min(...r.map(x=>x[1]));return r.map(([a,b])=>[a-m,b-n])};
const T={on:false,raf:0};
function makeBoard(ctx,cell,rows,cols,ox,delay,gv){
let grid=Array.from({length:rows},()=>Array(cols).fill(0)),p=null,flash=null,drain=false,gA=0,hA=0,fA=0,dA=0,wait=delay;
const fits=(cs,r,c)=>cs.every(([a,b])=>{const y=r+a,x=c+b;return x>=0&&x<cols&&y<rows&&(y<0||!grid[y][x])});
function evalPlace(cs,c){let r=-3;if(!fits(cs,r,c))return null;while(fits(cs,r+1,c))r++;
const g=grid.map(x=>x.slice());let top=false;cs.forEach(([a,b])=>{if(r+a<0)top=true;else g[r+a][c+b]=1});if(top)return null;
let lines=0,holes=0,agg=0,bump=0,hs=[];
g.forEach(row=>{if(row.every(v=>v))lines++});
for(let x=0;x<cols;x++){let y=0;while(y<rows&&!g[y][x])y++;hs.push(rows-y);agg+=rows-y;for(let k=y+1;k<rows;k++)if(!g[k][x])holes++}
for(let x=1;x<cols;x++)bump+=Math.abs(hs[x]-hs[x-1]);
return lines*6-holes*5-agg*.35-bump*.25}
function spawn(){
const i=Math.floor(Math.random()*7);let cs=SH[i].map(x=>x.slice()),opts=[];
for(let k=0;k<4;k++){for(let c=0;c<cols;c++){const s=evalPlace(cs,c);if(s!==null)opts.push({s,cs,c})}cs=rotC(cs)}
if(!opts.length){drain=true;return}
opts.sort((a,b)=>b.s-a.s);const o=Math.random()<.3?opts[Math.min(opts.length-1,Math.floor(Math.random()*3))]:opts[0];
p={cs:o.cs,c:Math.floor(cols/2)-1,r:-2,tc:o.c,col:TC[i]};
if(!fits(p.cs,p.r,p.c)){drain=true;p=null}}
function lock(){p.cs.forEach(([a,b])=>{const y=p.r+a;if(y>=0)grid[y][p.c+b]=p.col});p=null;
const full=[];grid.forEach((row,y)=>{if(row.every(v=>v))full.push(y)});if(full.length){flash=full;fA=0}
const h=grid.findIndex(r=>r.some(v=>v));if(h>=0&&rows-h>rows*.6)drain=true}
function blk(x,y,col){ctx.fillStyle=col;ctx.fillRect(x,y,cell,cell);ctx.fillStyle="rgba(255,255,255,.35)";ctx.fillRect(x,y,cell,3);ctx.fillRect(x,y,3,cell);ctx.fillStyle="rgba(0,0,0,.3)";ctx.fillRect(x,y+cell-3,cell,3);ctx.fillRect(x+cell-3,y,3,cell);ctx.strokeStyle="#05091f";ctx.lineWidth=2;ctx.strokeRect(x+1,y+1,cell-2,cell-2)}
return{
update(dt){
if(wait>0){wait-=dt;return}
if(drain){dA+=dt;if(dA>70){dA=0;grid.pop();grid.unshift(Array(cols).fill(0));const h=grid.findIndex(r=>r.some(v=>v));if(h<0||rows-h<rows*.2)drain=false}}
else if(flash){fA+=dt;if(fA>260){flash.forEach(y=>{grid.splice(y,1);grid.unshift(Array(cols).fill(0))});flash=null}}
else if(!p)spawn();
else{hA+=dt;gA+=dt;
if(hA>85){hA=0;if(p.c!==p.tc){const d=p.tc>p.c?1:-1;if(fits(p.cs,p.r,p.c+d))p.c+=d}}
if(gA>gv){gA=0;if(fits(p.cs,p.r+1,p.c))p.r++;else lock()}}},
draw(){
ctx.strokeStyle="rgba(170,182,230,.18)";ctx.lineWidth=2;ctx.strokeRect(ox-1,0,cols*cell+2,rows*cell+2);
grid.forEach((row,y)=>row.forEach((v,x)=>{if(v)blk(ox+x*cell,y*cell,flash&&flash.includes(y)&&Math.floor(fA/65)%2===0?"#fff":v)}));
if(p)p.cs.forEach(([a,b])=>{if(p.r+a>=0)blk(ox+(p.c+b)*cell,(p.r+a)*cell,p.col)})}}}
function startTetris(){
if(RM)return;stopTetris();
const cv=document.getElementById("tc"),ctx=cv.getContext("2d");
cv.width=innerWidth;cv.height=innerHeight;
const narrow=innerWidth<700,cell=narrow?22:Math.round(Math.max(24,Math.min(32,innerWidth/45))),wc=narrow?7:9,rows=Math.ceil(innerHeight/cell);
const n=Math.min(5,Math.max(2,Math.floor(innerWidth/(cell*(wc+4))))),pitch=innerWidth/n;
const bs=[];for(let i=0;i<n;i++)bs.push(makeBoard(ctx,cell,rows,wc,Math.round(pitch*i+(pitch-wc*cell)/2),Math.random()*2500,120+Math.random()*100));
let last=performance.now();
function frame(t){if(!T.on)return;const dt=Math.min(100,t-last);last=t;
ctx.clearRect(0,0,cv.width,cv.height);bs.forEach(b=>{b.update(dt);b.draw()});
T.raf=requestAnimationFrame(frame)}
T.on=true;T.raf=requestAnimationFrame(frame)}
function stopTetris(){T.on=false;cancelAnimationFrame(T.raf);const cv=document.getElementById("tc");if(cv)cv.getContext("2d").clearRect(0,0,cv.width,cv.height)}
let rz;addEventListener("resize",()=>{clearTimeout(rz);rz=setTimeout(()=>{if(T.on)startTetris()},300)});
let going=false;
async function transition(){
if(going)return;going=true;
if(RM){document.body.classList.remove("menu");going=false;q(0);return}
const S=Math.round(Math.min(innerWidth,innerHeight)*.2),ov=document.createElement("div");ov.className="tr";
const pc=document.createElement("div");pc.className="pc3";
const sh=document.createElement("div");sh.className="sh3";sh.style.cssText=`left:${-1.5*S}px;top:${-S}px`;
[[0,1],[0,2],[1,0],[1,1]].forEach(([r,c])=>{const cu=document.createElement("div");cu.className="cu";cu.style.cssText=`width:${S}px;height:${S}px;transform:translate3d(${c*S}px,${r*S}px,0)`;
for(let f=1;f<=6;f++){const fe=document.createElement("i");fe.className="f"+f;fe.style.transform=["","translateZ("+S/2+"px)","rotateY(180deg) translateZ("+S/2+"px)","rotateY(90deg) translateZ("+S/2+"px)","rotateY(-90deg) translateZ("+S/2+"px)","rotateX(90deg) translateZ("+S/2+"px)","rotateX(-90deg) translateZ("+S/2+"px)"][f];cu.appendChild(fe)}
sh.appendChild(cu)});
pc.appendChild(sh);ov.appendChild(pc);document.body.appendChild(ov);
const D=1800;
const anim=pc.animate([
{transform:"translate3d(-45vw,-35vh,-3200px) rotateX(70deg) rotateY(-50deg) rotateZ(0deg)",offset:0},
{transform:"translate3d(-12vw,-5vh,-900px) rotateX(220deg) rotateY(110deg) rotateZ(100deg)",offset:.42},
{transform:"translate3d(0,0,780px) rotateX(340deg) rotateY(200deg) rotateZ(210deg)",offset:.7},
{transform:"translate3d(6vw,3vh,950px) rotateX(400deg) rotateY(250deg) rotateZ(260deg)",offset:.86},
{transform:"translate3d(10vw,6vh,1300px) rotateX(440deg) rotateY(290deg) rotateZ(300deg)",offset:1}
],{duration:D,easing:"cubic-bezier(.45,.05,.55,.95)",fill:"forwards"});
beep(180,.12);setTimeout(()=>beep(300,.12),D*.35);
setTimeout(()=>{beep(520,.14);document.body.classList.remove("menu");going=false;q(0)},D*.72);
await anim.finished;
ov.remove()}
flush();addEventListener("online",flush);
menu();
