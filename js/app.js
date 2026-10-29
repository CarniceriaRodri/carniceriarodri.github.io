(function () {
  const TELEFONO = '34677228251';
  const STORAGE_KEY = 'rodri-encargo';
  // ⚡ URL NUEVA ACTUALIZADA
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxEdMdBsmVPB2eIb2IVkzxhdkckcU6SZdK1qAtBlUEEJ7crK2U0264TJc6Si1RyHwdz/exec";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const img = (name, w, h) => `img/productos/${name}.jpg`;

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  // ——— Estado del encargo ———
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { cart = []; }
  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

  // ——— Catálogo ———
  function renderCatalogo() {
    $('#chips').innerHTML =
      `<button type="button" class="chip is-active" data-chip="todo">Todo</button>` +
      CATEGORIAS.map((c) => `<button type="button" class="chip" data-chip="${c.id}">${c.nombre}</button>`).join('');

    $('#secciones').innerHTML = CATEGORIAS.map((c, i) => {
      const productos = PRODUCTOS.filter((p) => p.cat === c.id);
      return `
        <section class="cat" id="cat-${c.id}" data-cat="${c.id}">
          <header class="cat-head">
            <span class="cat-n">${String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>${c.nombre}</h3>
              <p>${c.lema}</p>
            </div>
          </header>
          <div class="grid">${productos.map(card).join('')}</div>
        </section>`;
    }).join('');
  }

  function card(p) {
    const keywords = [p.nombre, p.desc, ...p.opciones].join(' ').toLowerCase();
    return `
      <article class="card" data-id="${p.id}" data-search="${escapeHtml(normalize(keywords))}">
        <div class="card-img">
          <img src="${img(p.img, 600, 450)}" srcset="${img(p.img, 400, 300)} 400w, ${img(p.img, 800, 600)} 800w"
               sizes="(max-width: 640px) 100vw, 360px" alt="${escapeHtml(p.nombre)}" loading="lazy" width="600" height="450"
               onerror="this.onerror=null;this.removeAttribute('srcset');this.src='img/productos/${p.img}.jpg'">
          ${p.etiqueta ? `<span class="tag">${p.etiqueta}</span>` : ''}
        </div>
        <div class="card-body">
          <h4>${p.nombre}</h4>
          <p class="card-desc">${p.desc}</p>
          ${p.precio ? `<p class="card-precio">${p.precio} <small>orientativo</small></p>` : ''}
          <div class="card-fields">
            <label>
              <span>Cantidad</span>
              <select data-field="cantidad">${p.cantidades.map((o) => `<option>${o}</option>`).join('')}</select>
            </label>
            <label>
              <span>${p.opcionLabel}</span>
              <select data-field="opcion">${p.opciones.map((o) => `<option>${o}</option>`).join('')}</select>
            </label>
          </div>
          <button type="button" class="btn btn-add" data-add>
            <span class="plus" aria-hidden="true">+</span> Añadir al encargo
          </button>
        </div>
      </article>`;
  }

  function normalize(s) {
    return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  // ——— Filtros: categorías y búsqueda ———
  function filtrar() {
    const q = normalize($('#buscar').value.trim());
    const activa = $('.chip.is-active')?.dataset.chip || 'todo';
    let visibles = 0;
    $$('.cat').forEach((sec) => {
      const catOk = activa === 'todo' || sec.dataset.cat === activa;
      let enSeccion = 0;
      $$('.card', sec).forEach((c) => {
        const ok = catOk && (!q || c.dataset.search.includes(q));
        c.hidden = !ok;
        if (ok) enSeccion++;
      });
      sec.hidden = enSeccion === 0;
      visibles += enSeccion;
    });
    const sin = $('#sinResultados');
    sin.hidden = visibles > 0;
    $('[data-query]', sin).textContent = $('#buscar').value.trim();
  }

  // ——— Panel del encargo ———
  function renderCart() {
    const total = cart.reduce((n, l) => n + l.uds, 0);
    $$('[data-cart-count]').forEach((el) => (el.textContent = total));
    $('.float-bar').hidden = total === 0;
    $('#cartEmpty').hidden = cart.length > 0;
    $('#checkout').hidden = cart.length === 0;

    $('#cartList').innerHTML = cart.map((l, i) => {
      const p = PRODUCTOS.find((x) => x.id === l.id);
      if (!p) return '';
      return `
        <li class="line">
          <img src="${img(p.img, 120, 120)}" alt="" width="60" height="60">
          <div class="line-info">
            <strong>${escapeHtml(p.nombre)}</strong>
            <span>${escapeHtml(l.cantidad)} · ${escapeHtml(l.opcion)}</span>
          </div>
          <div class="stepper" aria-label="Unidades">
            <button type="button" data-dec="${i}" aria-label="Quitar uno">−</button>
            <b>${l.uds}</b>
            <button type="button" data-inc="${i}" aria-label="Añadir uno">+</button>
          </div>
        </li>`;
    }).join('');
  }

  function addToCart(id, cantidad, opcion) {
    const existing = cart.find((l) => l.id === id && l.cantidad === cantidad && l.opcion === opcion);
    if (existing) existing.uds++;
    else cart.push({ id, cantidad, opcion, uds: 1 });
    save();
    renderCart();
    const btn = $('.cart-btn');
    btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump');
  }

  const drawer = $('#drawer');
  const backdrop = $('.drawer-backdrop');

  function openCart() {
    backdrop.hidden = false;
    drawer.removeAttribute('inert');
    requestAnimationFrame(() => { 
      drawer.classList.add('open'); 
      backdrop.classList.add('open');
    });
    document.body.classList.add('no-scroll');
  }

  function closeCart() {
    drawer.classList.remove('open'); 
    backdrop.classList.remove('open');
    document.body.classList.remove('no-scroll');
    setTimeout(() => { 
      if (!drawer.classList.contains('open')) {
        backdrop.hidden = true;
        drawer.setAttribute('inert', '');
      }
    }, 300);
  }

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  let enlaceWhatsAppPendiente = "";

  // ——— Envío por Google Sheets y WhatsApp ———
  async function enviar(e) {
    e.preventDefault();
  const nombre = $('#nombre').value.trim();
const telefono = $('#telefono').value.trim(); // 👈 NUEVO: Capturamos el teléfono
const hora = $('#hora').value;
const dia = $('#dia').value;
const notas = $('#observaciones').value.trim();

$('[data-err="nombre"]').classList.toggle('show', !nombre);
$('[data-err="telefono"]').classList.toggle('show', !telefono); // 👈 NUEVO: Validación
$('[data-err="hora"]').classList.toggle('show', !hora);

if (!nombre || !telefono || !hora) return; // 👈 NUEVO: Requerir teléfono para enviar
    if (!nombre || !hora) return;

    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const idMostrar = `rod-${dd}${mm}-${Math.floor(10 + Math.random() * 90)}`;

    let totalPedido = 0;
    const productosParaSheets = cart.map((l) => {
      const p = PRODUCTOS.find((x) => x.id === l.id);
      const nombreProd = p ? p.nombre : l.id;
      
      const matchNum = l.cantidad.replace(',', '.').match(/[\d.]+/);
      const cantidadNum = matchNum ? parseFloat(matchNum[0]) * l.uds : l.uds;
      const unidadStr = l.cantidad.replace(/[\d.,]/g, '').trim() || 'ud';

      let precioNum = 0;
      if (p && p.precio) {
        const matchPrecio = p.precio.replace(',', '.').match(/[\d.]+/);
        if (matchPrecio) precioNum = parseFloat(matchPrecio[0]);
      }

      const subtotalNum = Number((precioNum * (matchNum ? parseFloat(matchNum[0]) : 1) * l.uds).toFixed(2));
      totalPedido += subtotalNum;

      // ⚙️ Nombres ajustados exactamente a lo que espera Apps Script
      return {
        nombre: nombreProd,
        cantidad: cantidadNum,
        unidad: unidadStr,
        precioUnitario: precioNum,
        subtotal: subtotalNum
      };
    });

    const lineas = cart.map((l) => {
      const p = PRODUCTOS.find((x) => x.id === l.id);
      const uds = l.uds > 1 ? `${l.uds} × ` : '';
      return `• ${uds}*${p ? p.nombre : l.id}* — ${l.cantidad} (${l.opcion})`;
    });

    const submitBtn = checkoutForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Registrando pedido...";

    const textoWA = [
      '*🥩 NUEVO ENCARGO - CARNICERÍA RODRI*',
      `*ID Referencia:* ${idMostrar}`,
      `*Cliente:* ${nombre}`,
      `*Recogida:* ${dia} a las ${hora}`,
      notas ? `*Notas:* ${notas}` : null,
      '',
      '*Productos:*',
      ...lineas,
      '',
      '¡Gracias por confiar en Carnicería Rodri! 🍖',
    ].filter((x) => x !== null).join('\n');

    enlaceWhatsAppPendiente = `https://wa.me/${TELEFONO}?text=${encodeURIComponent(textoWA)}`;

    try {
      // 🚀 Envío del Payload adaptado a las columnas de tu hoja de cálculo
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigoPedido: idMostrar,
          cliente: nombre,
          telefono: '', // Puedes mapear un input de teléfono si lo añades al HTML
          total: Number(totalPedido.toFixed(2)),
          estado: 'Pendiente',
          productos: productosParaSheets
        })
      });
    } catch (error) {
      console.warn("Error background sheets:", error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar encargo por WhatsApp";

      closeCart();
      const modal = document.getElementById('modalConfirmacion');
      if (modal) {
        const modalId = document.getElementById('confirmacionIdPedido');
        if (modalId) modalId.textContent = idMostrar;
        modal.removeAttribute('hidden');
        backdrop.hidden = false;
      }
    }
  }

  // ——— Eventos ———
  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) {
      const c = add.closest('.card');
      const p = PRODUCTOS.find((x) => x.id === c.dataset.id);
      const cantidad = $('[data-field="cantidad"]', c).value;
      const opcion = $('[data-field="opcion"]', c).value;
      addToCart(p.id, cantidad, opcion);
      add.classList.add('added');
      setTimeout(() => add.classList.remove('added'), 900);
      toast(`Añadido: ${p.nombre} · ${cantidad}`);
      return;
    }
    const chip = e.target.closest('[data-chip]');
    if (chip) {
      $$('.chip').forEach((c) => c.classList.toggle('is-active', c === chip));
      filtrar();
      $('#catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const inc = e.target.closest('[data-inc]');
    const dec = e.target.closest('[data-dec]');
    if (inc || dec) {
      const i = Number((inc || dec).dataset.inc ?? (inc || dec).dataset.dec);
      cart[i].uds += inc ? 1 : -1;
      if (cart[i].uds <= 0) cart.splice(i, 1);
      save(); renderCart();
      return;
    }
    if (e.target.closest('[data-open-cart]')) return openCart();
    if (e.target.closest('[data-close-cart]')) return closeCart();
  });

  const btnWhatsAppModal = document.getElementById('btnEnviarWhatsApp');
  if (btnWhatsAppModal) {
    btnWhatsAppModal.addEventListener('click', () => {
      if (enlaceWhatsAppPendiente) {
        window.open(enlaceWhatsAppPendiente, '_blank');
      }
      const modal = document.getElementById('modalConfirmacion');
      if (modal) modal.setAttribute('hidden', 'true');
      backdrop.hidden = true;
      cart = []; save(); renderCart();
    });
  }

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCart(); });
  $('#buscar').addEventListener('input', filtrar);
  const checkoutForm = $('#checkout');
  if (checkoutForm) checkoutForm.addEventListener('submit', enviar);
  $('#vaciar').addEventListener('click', () => { cart = []; save(); renderCart(); });
  $$('#nombre, #hora').forEach((el) =>
    el.addEventListener('input', () => $(`[data-err="${el.id}"]`).classList.remove('show')));

  renderCatalogo();
  renderCart();
})();
