(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))p(l);new MutationObserver(l=>{for(const d of l)if(d.type==="childList")for(const v of d.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&p(v)}).observe(document,{childList:!0,subtree:!0});function e(l){const d={};return l.integrity&&(d.integrity=l.integrity),l.referrerPolicy&&(d.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?d.credentials="include":l.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function p(l){if(l.ep)return;l.ep=!0;const d=e(l);fetch(l.href,d)}})();const h={shop:{name:"Vila do Cavaleiro Barbearia",phone:"(62) 99421-9965",whatsapp:"5562994219965",instagram:"heryque_barbeiroo",address:"R. R-10, Quadra 4 lote 11, Lot. Porto das Pedras, Aparecida de Goiânia-GO",rating:5,reviewCount:7},services:[{id:"corte",name:"Corte de cabelo",duration:30,price:45,description:"Corte moderno alinhado ao seu estilo, com finalizacao precisa.",image:"/images/Captura%20de%20tela%202026-09-06%20225951.png"},{id:"navalha",name:"Corte com navalha",duration:60,price:60,description:"Acabamento classico na navalha, contornos nitidos e visual premium.",image:"/images/Captura%20de%20tela%202026-09-06%20225704.png"},{id:"social",name:"Corte social",duration:30,price:40,description:"Corte limpo e elegante para o dia a dia, reunioes e ocasioes.",image:"/images/Captura%20de%20tela%202026-09-06%20225739.png"}],barbers:[{id:"heryque",name:"Heryque",role:"Mestre barbeiro",bio:"Frente da Vila do Cavaleiro. Tecnica, estilo e atendimento de casa.",image:"/images/Captura%20de%20tela%202026-09-06%20225750.png"},{id:"rafael",name:"Rafael",role:"Barbeiro",bio:"Cortes sociais e degradas com acabamento alinhado ao padrao da casa.",image:"/images/Captura%20de%20tela%202026-09-06%20225839.png"}],reviews:[{id:"r1",name:"Lucas Andrade",rating:5,text:"Melhor corte que ja fiz em Aparecida. Atendimento de cavaleiro de verdade."},{id:"r2",name:"Bruno Ferreira",rating:5,text:"Navalha impecavel. Sai da cadeira outro homem. Recomendo demais."},{id:"r3",name:"Thiago Mendes",rating:5,text:"Ambiente top, pontualidade e acabamento fino. Virou minha barbearia."},{id:"r4",name:"Pedro Henrique",rating:5,text:"Heryque entende o que voce quer so de olhar. Corte social perfeito."},{id:"r5",name:"Rafael Souza",rating:5,text:"Cinco estrelas sem pensar. Preco justo e resultado de revista."},{id:"r6",name:"Gabriel Lima",rating:5,text:"Fui indicado por um amigo e agora eu que indico. Excelente."},{id:"r7",name:"Matheus Oliveira",rating:5,text:"Do agendamento ao cafezinho, tudo no nivel. Voltarei sempre."}]},B={corte:"/images/Captura%20de%20tela%202026-09-06%20225951.png",navalha:"/images/Captura%20de%20tela%202026-09-06%20225704.png",social:"/images/Captura%20de%20tela%202026-09-06%20225739.png"},E={heryque:"/images/Captura%20de%20tela%202026-09-06%20225750.png",rafael:"/images/Captura%20de%20tela%202026-09-06%20225839.png"};function $(n,i){return n.map(e=>({...e,image:i[e.id]||e.image}))}async function b(n){const i=await fetch(n);if(!i.ok)throw new Error("fail");return i.json()}async function S(){try{const[n,i,e,p]=await Promise.all([b("/api/shop"),b("/api/services"),b("/api/barbers"),b("/api/reviews")]);return{shop:n,services:$(i,B),barbers:$(e,E),reviews:p.items||h.reviews,rating:p.rating??n.rating,reviewCount:p.count??n.reviewCount}}catch{return{...h,rating:h.shop.rating,reviewCount:h.shop.reviewCount}}}async function k(n){const i=new URLSearchParams(n),e=await fetch(`/api/availability?${i}`),p=await e.json();if(!e.ok)throw new Error(p.error||"Falha ao carregar horarios");return p}async function L(n){const i=await fetch("/api/appointments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),e=await i.json();if(!i.ok)throw new Error(e.error||"Nao foi possivel confirmar");return e}const O=`
<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
  <path d="M32 6 L50 20 L52 36 L40 54 L32 46 L24 54 L12 36 L14 20 Z" stroke="currentColor" stroke-width="1.6"/>
  <path d="M20 34 A14 12 0 0 0 44 34" stroke="currentColor" stroke-width="1.6"/>
  <path d="M32 6 V28" stroke="currentColor" stroke-width="1.6"/>
</svg>`,q=`
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.33 4.94L2 22l5.4-1.41a10 10 0 0 0 4.64 1.18h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.76 14.12c-.24.68-1.4 1.3-1.94 1.34-.5.04-1.12.06-1.81-.11-.42-.11-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.92-4.35-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1.01-2.41.26-.28.58-.35.77-.35h.55c.17 0 .41-.07.64.49.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.2-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.56.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.61-.07.16-.2.7-.81.89-1.09.19-.28.37-.23.63-.14.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.36Z"/>
</svg>`;function f(n){return n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}function w(){const n=new Date,i=n.getTimezoneOffset();return new Date(n.getTime()-i*6e4).toISOString().slice(0,10)}function y(){return"★★★★★"}async function R(n){const i=await S(),e={step:1,serviceId:"",barberId:"",date:w(),time:"",client:{name:"",phone:"",notes:""},slots:[],closed:!1,loadingSlots:!1,error:"",done:null,menu:!1},p=()=>i.services.find(t=>t.id===e.serviceId),l=()=>i.barbers.find(t=>t.id===e.barberId);async function d(){if(!e.serviceId||!e.barberId||!e.date){e.slots=[],c();return}e.loadingSlots=!0,e.error="",c();try{const t=await k({date:e.date,barberId:e.barberId,serviceId:e.serviceId});e.closed=!!t.closed,e.slots=t.slots||[],e.time&&!e.slots.some(s=>s.time===e.time&&s.available)&&(e.time="")}catch(t){e.error=t.message,e.slots=[]}finally{e.loadingSlots=!1,c()}}function v(){return`
      <header class="nav" id="nav">
        <a class="brand" href="#inicio">${O}<span>Vila do Cavaleiro</span></a>
        <ul class="nav-links">
          <li><a href="#inicio">Início</a></li>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#servicos">Serviços</a></li>
          <li><a href="#galeria">Galeria</a></li>
          <li><a href="#avaliacoes">Avaliações</a></li>
          <li><a href="#agendamento">Agendamento</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
        <a class="nav-cta" href="#agendamento">AGENDAR HORÁRIO</a>
        <button class="menu-btn" id="menuBtn" aria-label="Abrir menu">☰</button>
      </header>`}function C(){const t=i.shop,s=`https://www.google.com/maps?q=${encodeURIComponent(t.address)}&output=embed`;return`
      <div class="noise"></div>
      ${v()}
      <section class="hero" id="inicio">
        <video class="hero-bg" data-speed="0.28" autoplay muted loop playsinline aria-hidden="true">
          <source src="/video/capa-barbearia.mp4/Transforme_esta_imagem_em_um_v.mp4" type="video/mp4" />
        </video>
        <div class="hero-overlay"></div>
        <div class="hero-frame"></div>
        <div class="hero-content reveal">
          <p class="eyebrow">Aparecida de Goiania</p>
          <h1>Vila do Cavaleiro<span>Barbearia</span></h1>
          <p class="hero-tag">Seu estilo começa aqui</p>
          <a class="btn" href="#agendamento">AGENDAR HORÁRIO</a>
        </div>
        <div class="scroll-hint">Scroll</div>
      </section>

      <section class="about" id="sobre">
        <div class="about-photo reveal">
          <img src="/images/ambiente.png" alt="Exterior da Vila do Cavaleiro Barbearia" />
        </div>
        <div>
          <p class="eyebrow">A casa</p>
          <h2>Tradicao, navalha e presenca</h2>
          <div class="gold-rule"></div>
          <p>Na Vila do Cavaleiro cada corte é uma cerimônia. Um espaço masculino, silencioso o bastante para o detalhe, intenso o bastante para o estilo.</p>
          <p>Em Aparecida de Goiânia, o mestre barbeiro Heryque e a equipe recebem quem busca um visual limpo, clássico ou contemporâneo — sempre com acabamento de cavaleiro.</p>
          <div class="stats">
            <div class="stat"><strong>5,0</strong><span>Avaliacao</span></div>
            <div class="stat"><strong>7</strong><span>Avaliacoes</span></div>
            <div class="stat"><strong>GO</strong><span>Aparecida</span></div>
          </div>
        </div>
      </section>

      <section class="highlight">
        <div class="highlight-bg" data-speed="0.42"></div>
        <div class="highlight-copy">
          <p class="eyebrow">Manifesto</p>
          <h2>O homem se reconhece no corte.</h2>
          <div class="gold-rule" style="margin-left:auto;margin-right:auto"></div>
          <p style="color:var(--muted)">Tesoura, maquina e navalha. Ritmo, silencio e ouro sobre grafite.</p>
        </div>
      </section>

      <section class="services" id="servicos">
        <div class="section-head">
          <p class="eyebrow">Oficio</p>
          <h2>Serviços</h2>
          <div class="gold-rule"></div>
        </div>
        <div class="service-grid">
          ${i.services.map(o=>`
            <article class="card">
              <img src="${o.image}" alt="${o.name}" />
              <div class="card-body">
                <h3>${o.name}</h3>
                <p>${o.description}</p>
                <div class="price"><span>${o.duration} min</span><strong>${f(o.price)}</strong></div>
              </div>
            </article>`).join("")}
        </div>
      </section>

      <section class="gallery" id="galeria">
        <div class="section-head">
          <p class="eyebrow">Atelie</p>
          <h2>Galeria</h2>
          <div class="gold-rule"></div>
        </div>
        <div class="gallery-grid">
          ${[["Captura%20de%20tela%202026-09-06%20225648.png","Corte classico"],["Captura%20de%20tela%202026-09-06%20225704.png","Degrade"],["Captura%20de%20tela%202026-09-06%20225721.png","Navalha"],["Captura%20de%20tela%202026-09-06%20225730.png","Social"],["Captura%20de%20tela%202026-09-06%20225739.png","Detalhe"],["ambiete.png","Ambiente"]].map(([o,a])=>`
            <figure>
              <img src="/images/${o}" alt="${a}" />
              <figcaption>${a}</figcaption>
            </figure>`).join("")}
        </div>
      </section>

      <section class="reviews" id="avaliacoes">
        <div class="section-head">
          <p class="eyebrow">Voz da casa</p>
          <h2>Avaliações</h2>
          <div class="gold-rule"></div>
        </div>
        <div class="rating-hero">
          <div class="score">5,0</div>
          <div>
            <div class="stars">${y()}</div>
            <p style="color:var(--muted)">${i.reviewCount} avaliações</p>
          </div>
        </div>
        <div class="review-grid">
          ${i.reviews.map(o=>`
            <article class="review">
              <header><strong>${o.name}</strong><span>${y()}</span></header>
              <p>${o.text}</p>
            </article>`).join("")}
        </div>
      </section>

      <section class="booking" id="agendamento">
        <div class="section-head">
          <p class="eyebrow">Reserva</p>
          <h2>Agendamento</h2>
          <div class="gold-rule"></div>
        </div>
        <div class="booking-wrap">
          <div class="wizard" id="wizard"></div>
          <aside class="aside-card">
            <h3>Como funciona</h3>
            <p>Escolha o serviço, o barbeiro, a data e o horário. Horários ocupados ficam indisponíveis.</p>
            <ul>
              <li>Terça a sexta: 09h às 19h</li>
              <li>Sábado: 08h às 18h</li>
              <li>Domingo: 08h às 13h</li>
              <li>Segunda: fechado</li>
            </ul>
            <p style="margin-top:22px">Dúvidas: <a href="https://wa.me/${t.whatsapp}" style="color:var(--gold)">${t.phone}</a></p>
          </aside>
        </div>
      </section>

      <section class="contact" id="contato">
        <div class="section-head">
          <p class="eyebrow">Presenca</p>
          <h2>Contato</h2>
          <div class="gold-rule"></div>
        </div>
        <div class="contact-grid">
          <div class="info-list">
            <div>
              <h3>Telefone</h3>
              <p><a href="tel:+5562994219965">${t.phone}</a></p>
            </div>
            <div>
              <h3>Instagram</h3>
              <p><a href="https://instagram.com/${t.instagram}" target="_blank" rel="noreferrer">@${t.instagram}</a></p>
            </div>
            <div>
              <h3>Endereco</h3>
              <p>${t.address}</p>
            </div>
            <div>
              <h3>Avaliacao</h3>
              <p>5,0 ${y()} · ${t.reviewCount} avaliacoes</p>
            </div>
            <a class="btn" href="https://wa.me/${t.whatsapp}?text=${encodeURIComponent("Ola, quero agendar na Vila do Cavaleiro.")}" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <div class="map-frame">
            <iframe title="Mapa da barbearia" src="${s}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>

      <footer>
        <span>Vila do Cavaleiro Barbearia</span>
        <span>Aparecida de Goiania-GO</span>
      </footer>

      <a class="wa" href="https://wa.me/${t.whatsapp}?text=${encodeURIComponent("Ola, quero agendar na Vila do Cavaleiro.")}" target="_blank" rel="noreferrer" aria-label="WhatsApp">${q}</a>
    `}function I(){if(e.done){const a=p(),r=l();return`
        <div class="success-box">
          <p class="eyebrow">Confirmado</p>
          <h3>Horario reservado</h3>
          <p>${a==null?void 0:a.name} com ${r==null?void 0:r.name}<br>${e.done.date} às ${e.done.time}</p>
          <p style="color:var(--muted);margin:16px 0">Horário reservado. Chegue 5 minutos antes.</p>
          <button class="btn" id="newBook">Novo agendamento</button>
        </div>`}const t=["Serviço","Barbeiro","Agenda","Dados","Resumo"].map((a,r)=>`<div class="step-dot ${e.step===r+1?"on":""}">${r+1}. ${a}</div>`).join("");let s="";if(e.step===1)s=`<div class="choice-grid">${i.services.map(a=>`
          <button class="choice ${e.serviceId===a.id?"on":""}" data-pick="service" data-id="${a.id}">
            <img src="${a.image}" alt="" />
            <div><strong>${a.name}</strong><small>${a.duration} min</small></div>
            <span>${f(a.price)}</span>
          </button>`).join("")}</div>`;else if(e.step===2)s=`<div class="choice-grid">${i.barbers.map(a=>`
          <button class="choice ${e.barberId===a.id?"on":""}" data-pick="barber" data-id="${a.id}">
            <img src="${a.image}" alt="" />
            <div><strong>${a.name}</strong><small>${a.role}</small></div>
            <span></span>
          </button>`).join("")}</div>`;else if(e.step===3){const a=e.closed?'<p class="alert">Fechado nesta data.</p>':e.loadingSlots?'<p style="color:var(--muted)">Carregando horarios...</p>':`<div class="slots">${e.slots.map(r=>`<button class="slot ${e.time===r.time?"on":""}" data-time="${r.time}" ${r.available?"":"disabled"}>${r.time}</button>`).join("")}</div>`;s=`
        <div class="form-grid">
          <label>Data
            <input type="date" id="dateInput" min="${w()}" value="${e.date}" />
          </label>
          <label>Horario</label>
          ${a}
        </div>`}else if(e.step===4)s=`
        <div class="form-grid">
          <label>Nome
            <input id="nameInput" value="${e.client.name}" placeholder="Seu nome completo" />
          </label>
          <label>Telefone / WhatsApp
            <input id="phoneInput" value="${e.client.phone}" placeholder="(62) 9xxxx-xxxx" />
          </label>
          <label>Observacao
            <textarea id="notesInput" rows="3" placeholder="Como prefere o corte?">${e.client.notes}</textarea>
          </label>
        </div>`;else{const a=p(),r=l();s=`
        <div class="summary">
          <div><span>Servico</span><br><strong>${a==null?void 0:a.name} · ${f((a==null?void 0:a.price)||0)}</strong></div>
          <div><span>Barbeiro</span><br><strong>${r==null?void 0:r.name}</strong></div>
          <div><span>Data e horário</span><br><strong>${e.date} às ${e.time}</strong></div>
          <div><span>Cliente</span><br><strong>${e.client.name} · ${e.client.phone}</strong></div>
          ${e.client.notes?`<div><span>Obs.</span><br>${e.client.notes}</div>`:""}
        </div>
        <p style="color:var(--muted);margin-top:14px;font-size:13px">Confirme para reservar. O horário deixa de ficar disponível.</p>`}const o=e.step===1&&e.serviceId||e.step===2&&e.barberId||e.step===3&&e.time||e.step===4&&e.client.name&&e.client.phone||e.step===5;return`
      <div class="steps">${t}</div>
      ${s}
      ${e.error?`<p class="alert">${e.error}</p>`:""}
      <div class="wizard-nav">
        <button class="btn ghost" id="prevBtn" ${e.step===1?"disabled":""}>Voltar</button>
        <button class="btn" id="nextBtn" ${o?"":"disabled"}>${e.step===5?"Confirmar":"Continuar"}</button>
      </div>`}function c(){const t=document.getElementById("wizard");t&&(t.innerHTML=I(),A())}function A(){document.querySelectorAll("[data-pick='service']").forEach(m=>{m.onclick=()=>{e.serviceId=m.dataset.id,e.time="",c()}}),document.querySelectorAll("[data-pick='barber']").forEach(m=>{m.onclick=()=>{e.barberId=m.dataset.id,e.time="",c()}});const t=document.getElementById("dateInput");t&&(t.onchange=()=>{e.date=t.value,e.time="",d()}),document.querySelectorAll("[data-time]").forEach(m=>{m.onclick=()=>{e.time=m.dataset.time,c()}});const s=document.getElementById("nameInput"),o=document.getElementById("phoneInput"),a=document.getElementById("notesInput");s&&(s.oninput=()=>e.client.name=s.value),o&&(o.oninput=()=>e.client.phone=o.value),a&&(a.oninput=()=>e.client.notes=a.value);const r=document.getElementById("prevBtn"),u=document.getElementById("nextBtn");r&&(r.onclick=()=>{e.error="",e.step=Math.max(1,e.step-1),c()}),u&&(u.onclick=async()=>{if(e.error="",e.step===4&&(e.client.name=document.getElementById("nameInput").value.trim(),e.client.phone=document.getElementById("phoneInput").value.trim(),e.client.notes=document.getElementById("notesInput").value.trim(),!e.client.name||!e.client.phone)){e.error="Informe nome e telefone.",c();return}if(e.step<5){e.step+=1,e.step===3?await d():c();return}try{u.disabled=!0;const m=await L({serviceId:e.serviceId,barberId:e.barberId,date:e.date,time:e.time,client:e.client});e.done=m,c()}catch(m){e.error=m.message,c()}});const g=document.getElementById("newBook");g&&(g.onclick=()=>{e.step=1,e.serviceId="",e.barberId="",e.time="",e.done=null,e.client={name:"",phone:"",notes:""},c()})}function x(){const t=document.getElementById("nav"),s=document.getElementById("menuBtn");s==null||s.addEventListener("click",()=>{e.menu=!e.menu,t.classList.toggle("open",e.menu)}),document.querySelectorAll(".nav-links a, .nav-cta, .hero .btn").forEach(a=>{a.addEventListener("click",()=>{e.menu=!1,t.classList.remove("open")})});const o=()=>{t.classList.toggle("scrolled",window.scrollY>24),document.querySelectorAll("[data-speed]").forEach(a=>{const r=Number(a.dataset.speed),g=a.parentElement.getBoundingClientRect().top*r*-.35;a.style.transform=`translate3d(0, ${g}px, 0) scale(1.08)`})};window.addEventListener("scroll",o,{passive:!0}),o()}n.innerHTML=C(),c(),x()}R(document.getElementById("app"));
