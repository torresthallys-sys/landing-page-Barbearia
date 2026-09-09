import { loadCatalog, getAvailability, createAppointment } from "./api.js";

const helmetSvg = `
<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
  <path d="M32 6 L50 20 L52 36 L40 54 L32 46 L24 54 L12 36 L14 20 Z" stroke="currentColor" stroke-width="1.6"/>
  <path d="M20 34 A14 12 0 0 0 44 34" stroke="currentColor" stroke-width="1.6"/>
  <path d="M32 6 V28" stroke="currentColor" stroke-width="1.6"/>
</svg>`;

const waSvg = `
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.33 4.94L2 22l5.4-1.41a10 10 0 0 0 4.64 1.18h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.76 14.12c-.24.68-1.4 1.3-1.94 1.34-.5.04-1.12.06-1.81-.11-.42-.11-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.92-4.35-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1.01-2.41.26-.28.58-.35.77-.35h.55c.17 0 .41-.07.64.49.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.2-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.56.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.61-.07.16-.2.7-.81.89-1.09.19-.28.37-.23.63-.14.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.36Z"/>
</svg>`;

function money(n) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function todayISO() {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
}

function stars() {
  return "★★★★★";
}

export async function createApp(root) {
  const data = await loadCatalog();
  const state = {
    step: 1,
    serviceId: "",
    barberId: "",
    date: todayISO(),
    time: "",
    client: { name: "", phone: "", notes: "" },
    slots: [],
    closed: false,
    loadingSlots: false,
    error: "",
    done: null,
    menu: false
  };

  const service = () => data.services.find((s) => s.id === state.serviceId);
  const barber = () => data.barbers.find((b) => b.id === state.barberId);

  async function refreshSlots() {
    if (!state.serviceId || !state.barberId || !state.date) {
      state.slots = [];
      renderBooking();
      return;
    }
    state.loadingSlots = true;
    state.error = "";
    renderBooking();
    try {
      const res = await getAvailability({
        date: state.date,
        barberId: state.barberId,
        serviceId: state.serviceId
      });
      state.closed = !!res.closed;
      state.slots = res.slots || [];
      if (state.time && !state.slots.some((s) => s.time === state.time && s.available)) {
        state.time = "";
      }
    } catch (err) {
      state.error = err.message;
      state.slots = [];
    } finally {
      state.loadingSlots = false;
      renderBooking();
    }
  }

  function nav() {
    return `
      <header class="nav" id="nav">
        <a class="brand" href="#inicio">${helmetSvg}<span>Vila do Cavaleiro</span></a>
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
      </header>`;
  }

  function page() {
    const shop = data.shop;
    const maps = `https://www.google.com/maps?q=${encodeURIComponent(shop.address)}&output=embed`;
    return `
      <div class="noise"></div>
      ${nav()}
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
          ${data.services
            .map(
              (s) => `
            <article class="card">
              <img src="${s.image}" alt="${s.name}" />
              <div class="card-body">
                <h3>${s.name}</h3>
                <p>${s.description}</p>
                <div class="price"><span>${s.duration} min</span><strong>${money(s.price)}</strong></div>
              </div>
            </article>`
            )
            .join("")}
        </div>
      </section>

      <section class="gallery" id="galeria">
        <div class="section-head">
          <p class="eyebrow">Atelie</p>
          <h2>Galeria</h2>
          <div class="gold-rule"></div>
        </div>
        <div class="gallery-grid">
          ${[
            ["Captura%20de%20tela%202026-09-06%20225648.png", "Corte classico"],
            ["Captura%20de%20tela%202026-09-06%20225704.png", "Degrade"],
            ["Captura%20de%20tela%202026-09-06%20225721.png", "Navalha"],
            ["Captura%20de%20tela%202026-09-06%20225730.png", "Social"],
            ["Captura%20de%20tela%202026-09-06%20225739.png", "Detalhe"],
            ["ambiete.png", "Ambiente"]
          ]
            .map(
              ([src, cap]) => `
            <figure>
              <img src="/images/${src}" alt="${cap}" />
              <figcaption>${cap}</figcaption>
            </figure>`
            )
            .join("")}
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
            <div class="stars">${stars()}</div>
            <p style="color:var(--muted)">${data.reviewCount} avaliações</p>
          </div>
        </div>
        <div class="review-grid">
          ${data.reviews
            .map(
              (r) => `
            <article class="review">
              <header><strong>${r.name}</strong><span>${stars()}</span></header>
              <p>${r.text}</p>
            </article>`
            )
            .join("")}
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
            <p style="margin-top:22px">Dúvidas: <a href="https://wa.me/${shop.whatsapp}" style="color:var(--gold)">${shop.phone}</a></p>
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
              <p><a href="tel:+5562994219965">${shop.phone}</a></p>
            </div>
            <div>
              <h3>Instagram</h3>
              <p><a href="https://instagram.com/${shop.instagram}" target="_blank" rel="noreferrer">@${shop.instagram}</a></p>
            </div>
            <div>
              <h3>Endereco</h3>
              <p>${shop.address}</p>
            </div>
            <div>
              <h3>Avaliacao</h3>
              <p>5,0 ${stars()} · ${shop.reviewCount} avaliacoes</p>
            </div>
            <a class="btn" href="https://wa.me/${shop.whatsapp}?text=${encodeURIComponent("Ola, quero agendar na Vila do Cavaleiro.")}" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <div class="map-frame">
            <iframe title="Mapa da barbearia" src="${maps}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>

      <footer>
        <span>Vila do Cavaleiro Barbearia</span>
        <span>Aparecida de Goiania-GO</span>
      </footer>

      <a class="wa" href="https://wa.me/${shop.whatsapp}?text=${encodeURIComponent("Ola, quero agendar na Vila do Cavaleiro.")}" target="_blank" rel="noreferrer" aria-label="WhatsApp">${waSvg}</a>
    `;
  }

  function stepContent() {
    if (state.done) {
      const s = service();
      const b = barber();
      return `
        <div class="success-box">
          <p class="eyebrow">Confirmado</p>
          <h3>Horario reservado</h3>
          <p>${s?.name} com ${b?.name}<br>${state.done.date} às ${state.done.time}</p>
          <p style="color:var(--muted);margin:16px 0">Horário reservado. Chegue 5 minutos antes.</p>
          <button class="btn" id="newBook">Novo agendamento</button>
        </div>`;
    }

        const dots = ["Serviço", "Barbeiro", "Agenda", "Dados", "Resumo"]
      .map((label, i) => `<div class="step-dot ${state.step === i + 1 ? "on" : ""}">${i + 1}. ${label}</div>`)
      .join("");

    let body = "";
    if (state.step === 1) {
      body = `<div class="choice-grid">${data.services
        .map(
          (s) => `
          <button class="choice ${state.serviceId === s.id ? "on" : ""}" data-pick="service" data-id="${s.id}">
            <img src="${s.image}" alt="" />
            <div><strong>${s.name}</strong><small>${s.duration} min</small></div>
            <span>${money(s.price)}</span>
          </button>`
        )
        .join("")}</div>`;
    } else if (state.step === 2) {
      body = `<div class="choice-grid">${data.barbers
        .map(
          (b) => `
          <button class="choice ${state.barberId === b.id ? "on" : ""}" data-pick="barber" data-id="${b.id}">
            <img src="${b.image}" alt="" />
            <div><strong>${b.name}</strong><small>${b.role}</small></div>
            <span></span>
          </button>`
        )
        .join("")}</div>`;
    } else if (state.step === 3) {
      const slots = state.closed
        ? `<p class="alert">Fechado nesta data.</p>`
        : state.loadingSlots
          ? `<p style="color:var(--muted)">Carregando horarios...</p>`
          : `<div class="slots">${state.slots
              .map(
                (s) =>
                  `<button class="slot ${state.time === s.time ? "on" : ""}" data-time="${s.time}" ${s.available ? "" : "disabled"}>${s.time}</button>`
              )
              .join("")}</div>`;
      body = `
        <div class="form-grid">
          <label>Data
            <input type="date" id="dateInput" min="${todayISO()}" value="${state.date}" />
          </label>
          <label>Horario</label>
          ${slots}
        </div>`;
    } else if (state.step === 4) {
      body = `
        <div class="form-grid">
          <label>Nome
            <input id="nameInput" value="${state.client.name}" placeholder="Seu nome completo" />
          </label>
          <label>Telefone / WhatsApp
            <input id="phoneInput" value="${state.client.phone}" placeholder="(62) 9xxxx-xxxx" />
          </label>
          <label>Observacao
            <textarea id="notesInput" rows="3" placeholder="Como prefere o corte?">${state.client.notes}</textarea>
          </label>
        </div>`;
    } else {
      const s = service();
      const b = barber();
      body = `
        <div class="summary">
          <div><span>Servico</span><br><strong>${s?.name} · ${money(s?.price || 0)}</strong></div>
          <div><span>Barbeiro</span><br><strong>${b?.name}</strong></div>
          <div><span>Data e horário</span><br><strong>${state.date} às ${state.time}</strong></div>
          <div><span>Cliente</span><br><strong>${state.client.name} · ${state.client.phone}</strong></div>
          ${state.client.notes ? `<div><span>Obs.</span><br>${state.client.notes}</div>` : ""}
        </div>
        <p style="color:var(--muted);margin-top:14px;font-size:13px">Confirme para reservar. O horário deixa de ficar disponível.</p>`;
    }

    const canNext =
      (state.step === 1 && state.serviceId) ||
      (state.step === 2 && state.barberId) ||
      (state.step === 3 && state.time) ||
      (state.step === 4 && state.client.name && state.client.phone) ||
      state.step === 5;

    return `
      <div class="steps">${dots}</div>
      ${body}
      ${state.error ? `<p class="alert">${state.error}</p>` : ""}
      <div class="wizard-nav">
        <button class="btn ghost" id="prevBtn" ${state.step === 1 ? "disabled" : ""}>Voltar</button>
        <button class="btn" id="nextBtn" ${canNext ? "" : "disabled"}>${state.step === 5 ? "Confirmar" : "Continuar"}</button>
      </div>`;
  }

  function renderBooking() {
    const el = document.getElementById("wizard");
    if (!el) return;
    el.innerHTML = stepContent();
    bindBooking();
  }

  function bindBooking() {
    document.querySelectorAll("[data-pick='service']").forEach((btn) => {
      btn.onclick = () => {
        state.serviceId = btn.dataset.id;
        state.time = "";
        renderBooking();
      };
    });
    document.querySelectorAll("[data-pick='barber']").forEach((btn) => {
      btn.onclick = () => {
        state.barberId = btn.dataset.id;
        state.time = "";
        renderBooking();
      };
    });
    const dateInput = document.getElementById("dateInput");
    if (dateInput) {
      dateInput.onchange = () => {
        state.date = dateInput.value;
        state.time = "";
        refreshSlots();
      };
    }
    document.querySelectorAll("[data-time]").forEach((btn) => {
      btn.onclick = () => {
        state.time = btn.dataset.time;
        renderBooking();
      };
    });
    const nameInput = document.getElementById("nameInput");
    const phoneInput = document.getElementById("phoneInput");
    const notesInput = document.getElementById("notesInput");
    if (nameInput) nameInput.oninput = () => (state.client.name = nameInput.value);
    if (phoneInput) phoneInput.oninput = () => (state.client.phone = phoneInput.value);
    if (notesInput) notesInput.oninput = () => (state.client.notes = notesInput.value);
    const prev = document.getElementById("prevBtn");
    const next = document.getElementById("nextBtn");
    if (prev) prev.onclick = () => {
      state.error = "";
      state.step = Math.max(1, state.step - 1);
      renderBooking();
    };
    if (next) next.onclick = async () => {
      state.error = "";
      if (state.step === 4) {
        state.client.name = document.getElementById("nameInput").value.trim();
        state.client.phone = document.getElementById("phoneInput").value.trim();
        state.client.notes = document.getElementById("notesInput").value.trim();
        if (!state.client.name || !state.client.phone) {
          state.error = "Informe nome e telefone.";
          renderBooking();
          return;
        }
      }
      if (state.step < 5) {
        state.step += 1;
        if (state.step === 3) await refreshSlots();
        else renderBooking();
        return;
      }
      try {
        next.disabled = true;
        const created = await createAppointment({
          serviceId: state.serviceId,
          barberId: state.barberId,
          date: state.date,
          time: state.time,
          client: state.client
        });
        state.done = created;
        renderBooking();
      } catch (err) {
        state.error = err.message;
        renderBooking();
      }
    };
    const neu = document.getElementById("newBook");
    if (neu) {
      neu.onclick = () => {
        state.step = 1;
        state.serviceId = "";
        state.barberId = "";
        state.time = "";
        state.done = null;
        state.client = { name: "", phone: "", notes: "" };
        renderBooking();
      };
    }
  }

  function bindChrome() {
    const navEl = document.getElementById("nav");
    const menuBtn = document.getElementById("menuBtn");
    menuBtn?.addEventListener("click", () => {
      state.menu = !state.menu;
      navEl.classList.toggle("open", state.menu);
    });
    document.querySelectorAll(".nav-links a, .nav-cta, .hero .btn").forEach((a) => {
      a.addEventListener("click", () => {
        state.menu = false;
        navEl.classList.remove("open");
      });
    });
    const onScroll = () => {
      navEl.classList.toggle("scrolled", window.scrollY > 24);
      document.querySelectorAll("[data-speed]").forEach((el) => {
        const speed = Number(el.dataset.speed);
        const rect = el.parentElement.getBoundingClientRect();
        const y = (rect.top * speed) * -0.35;
        el.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  root.innerHTML = page();
  renderBooking();
  bindChrome();
}
