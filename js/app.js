(async function () {

  // Comprobar si la tienda está en mantenimiento
  try {
    const respuesta = await fetch(
      'https://ugqiomoywgpkmogcdjqn.supabase.co/rest/v1/site_settings?select=maintenance_enabled,maintenance_message&id=eq.1',
      {
        headers: {
          apikey: 'sb_publishable_FU3fmq19uyZ4jUmF_uhFgg_ywVmFPrL'
        },
        cache: 'no-store'
      }
    );

    if (respuesta.ok) {
      const ajustes = await respuesta.json();

      if (ajustes[0]?.maintenance_enabled === true) {
        const mensaje = ajustes[0].maintenance_message ||
          'Estamos realizando tareas de mantenimiento. Volveremos muy pronto.';

        document.body.replaceChildren();

        const contenedor = document.createElement('main');
        contenedor.style.cssText =
          'min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:30px;font-family:system-ui,sans-serif;background:#f5f2ed;color:#211a17;';

        const titulo = document.createElement('h1');
        titulo.textContent = '🥩 Carnicería Rodri';

        const aviso = document.createElement('h2');
        aviso.textContent = 'Estamos en mantenimiento';

        const texto = document.createElement('p');
        texto.textContent = mensaje;

        contenedor.append(titulo, aviso, texto);
        document.body.appendChild(contenedor);
        return;
      }
    }
  } catch (error) {
    console.warn('No se pudo comprobar el mantenimiento:', error);
  }

  // El resto de la tienda continúa debajo
  const TELEFONO = '34677228251';
  const STORAGE_KEY = 'rodri-encargo';


  // ⚡ URL del Apps Script
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz0Ydh6S00C_8LHjfpTGk4np3G2qmwbmUPMZSOMOMWWHX60K3zF5T38WQSv1Aw1UDxH/exec";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const img = (name, w, h) => `img/productos/${name}.jpg`;

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  // ——— Estado del encargo ———
  let cart = [];
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    cart = Array.isArray(raw)
      ? raw
          .filter((l) =>
            l &&
            typeof l.id === 'string' &&
            typeof l.cantidad === 'string' &&
            typeof l.opcion === 'string' &&
            Number.isInteger(l.uds) &&
            l.uds > 0
          )
          .slice(0, 50)
      : [];
  } catch { cart = []; }
  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

  // ——— Catálogo ———
  function renderCatalogo() {
    $('#chips').innerHTML =
      `<button type="button" class="chip is-active" data-chip="todo">Todo</button>` +
      CATEGORIAS.map((c) => `<button type="button" class="chip" data-chip="${escapeHtml(c.id)}">${escapeHtml(c.nombre)}</button>`).join('');

    $('#secciones').innerHTML = CATEGORIAS.map((c, i) => {
      // Solo se muestran productos que conservan al menos una opción activa.
      const productos = PRODUCTOS.filter((p) => p.cat === c.id && Array.isArray(p.opciones) && p.opciones.length > 0);
      if (!productos.length) return '';
      return `
        <section class="cat" id="cat-${escapeHtml(c.id)}" data-cat="${escapeHtml(c.id)}">
          <header class="cat-head">
            <span class="cat-n">${String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>${escapeHtml(c.nombre)}</h3>
              <p>${escapeHtml(c.lema)}</p>
            </div>
          </header>
          <div class="grid">${productos.map(card).join('')}</div>
        </section>`;
    }).join('');
  }

  function card(p) {
    const keywords = [p.nombre, p.desc, ...p.opciones].join(' ').toLowerCase();
    return `
      <article class="card" data-id="${escapeHtml(p.id)}" data-search="${escapeHtml(normalize(keywords))}">
        <div class="card-img">
          <img src="${img(p.img, 600, 450)}" srcset="${img(p.img, 400, 300)} 400w, ${img(p.img, 800, 600)} 800w"
               sizes="(max-width: 640px) 100vw, 360px" alt="${escapeHtml(p.nombre)}" loading="lazy" width="600" height="450" decoding="async"
               onerror="this.onerror=null;this.removeAttribute('srcset');this.src='img/productos/${escapeHtml(p.img)}.jpg'">
          ${p.etiqueta ? `<span class="tag">${escapeHtml(p.etiqueta)}</span>` : ''}
        </div>
        <div class="card-body">
          <h4>${escapeHtml(p.nombre)}</h4>
          <p class="card-desc">${escapeHtml(p.desc)}</p>
          <div class="card-fields">
            <label>
              <span>${escapeHtml(p.opcionLabel)}</span>
              <select data-field="opcion">${p.opciones.map((o) => `<option>${escapeHtml(o)}</option>`).join('')}</select>
            </label>
            ${p.precio ? `<p class="card-precio" data-price>${escapeHtml(p.precio)} </p>` : ''}
            <label>
              <span>Cantidad</span>
              <select data-field="cantidad">${p.cantidades.map((o) => `<option>${escapeHtml(o)}</option>`).join('')}</select>
            </label>
          </div>
          <button type="button" class="btn btn-add" data-add>
            <span class="plus" aria-hidden="true">+</span> Añadir al pedido
          </button>
        </div>
      </article>`;
  }

  function normalize(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  // ——— Filtros ———
  function filtrar() {
    const q = normalize($('#buscar').value.trim());
    const chipActivo = $('.chip.is-active');
    const activa = (chipActivo && chipActivo.dataset.chip) || 'todo';
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

  // ——— Cálculo de precio de una línea ———
  function calcularLinea(l, p) {
    const matchNum = l.cantidad.replace(',', '.').match(/[\d.]+/);
    const cantidadNum = matchNum ? parseFloat(matchNum[0]) * l.uds : l.uds;
    let unidadStr = l.cantidad.replace(/[\d.,]/g, '').trim().toLowerCase();
    if (/pieza|unidad|medall|tira|lata|botella|pack|garrafa|caja|cu[ñn]a/.test(unidadStr)) unidadStr = 'ud';
    else if (/^g|gr|grs|gramos/.test(unidadStr)) unidadStr = 'gr';
    else if (/^kg|kilo/.test(unidadStr)) unidadStr = 'kg';
    else unidadStr = 'ud';
    let precioNum = 0;
    if (p && p.precio) {
      const key = normalizarClave(l.opcion);
      const unit = (p.precio.match(/\/(kg|ud)/i) || [,'ud'])[0];
      const optionValue = p.preciosOpciones && Number.isFinite(Number(p.preciosOpciones[key]))
        ? Number(p.preciosOpciones[key])
        : (p.precioNumOpciones && Number.isFinite(p.precioNumOpciones[key]) ? p.precioNumOpciones[key] : null);
      const elegido = optionValue !== null
        ? optionValue.toFixed(2).replace('.', ',') + ' €' + unit
        : p.precio;
      const m = elegido.replace(',', '.').match(/[\d.]+/);
      if (m) precioNum = parseFloat(m[0]);
    }
    const factorPeso = unidadStr === 'gr' ? 0.001 : 1;
    return { cantidadNum, unidadStr, precioNum, factorPeso };
  }

  // ——— Panel del encargo ———
  function renderCart() {
    const total = cart.reduce((n, l) => n + l.uds, 0);
    $$('[data-cart-count]').forEach((el) => (el.textContent = total));
    $('.float-bar').hidden = total === 0;
    $('#cartEmpty').hidden = cart.length > 0;
    $('#checkout').hidden = cart.length === 0;

    let totalEuros = 0;

    $('#cartList').innerHTML = cart.map((l, i) => {
      const p = PRODUCTOS.find((x) => x.id === l.id);
      if (!p) return '';
      const { cantidadNum, unidadStr, precioNum, factorPeso } = calcularLinea(l, p);
      const subtotal = Number((precioNum * cantidadNum * factorPeso).toFixed(2));
      totalEuros += subtotal;
      const precioTexto = precioNum > 0
        ? `<span class="line-precio">${subtotal.toFixed(2).replace('.', ',')} €</span>`
        : '';
      return `
        <li class="line">
          <img src="${img(p.img, 120, 120)}" alt="" width="60" height="60" loading="lazy" decoding="async">
          <div class="line-info">
            <strong>${escapeHtml(p.nombre)}</strong>
            <span>${escapeHtml(l.cantidad)} · ${escapeHtml(l.opcion)}</span>
            ${precioTexto}
          </div>
          <div class="stepper" aria-label="Unidades">
            <button type="button" data-dec="${i}" aria-label="Quitar uno">−</button>
            <b>${l.uds}</b>
            <button type="button" data-inc="${i}" aria-label="Añadir uno">+</button>
          </div>
        </li>`;
    }).join('');

    const totalEl = $('#cartTotal');
    if (totalEl) {
      if (totalEuros > 0) {
        totalEl.hidden = false;
        totalEl.innerHTML = `<span>Total</span><strong>${totalEuros.toFixed(2).replace('.', ',')} €</strong>`;
      } else {
        totalEl.hidden = true;
      }
    }
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
  const cartBtn = $('.cart-btn');
  const checkoutForm = $('#checkout');

  // Verificación anti-bots de Cloudflare Turnstile
  let turnstileToken = '';
  let turnstileWidgetId = null;
  const turnstileContainer = $('#turnstile-container');
  const TURNSTILE_SITE_KEY = '0x4AAAAAAF2ddTXIxCLGKWQT';

  function inicializarTurnstile() {
    // El formulario empieza oculto si el carrito está vacío.
    // Renderizar Turnstile solo cuando el formulario ya está visible.
    if (turnstileWidgetId === null && window.turnstile && turnstileContainer && !checkoutForm.hidden) {
      turnstileWidgetId = window.turnstile.render(turnstileContainer, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => { turnstileToken = token; },
        'expired-callback': () => { turnstileToken = ''; },
        'error-callback': () => { turnstileToken = ''; toast('No se pudo completar la verificación. Recarga la página e inténtalo de nuevo.'); }
      });
    }
  }

  function openCart() {
    inicializarTurnstile();
    backdrop.hidden = false;
    drawer.removeAttribute('inert');
    requestAnimationFrame(() => {
      drawer.classList.add('open');
      backdrop.classList.add('open');
    });
    document.body.classList.add('no-scroll');
    if (cartBtn) cartBtn.setAttribute('aria-expanded', 'true');
  }

  function closeCart() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('no-scroll');
    if (cartBtn) cartBtn.setAttribute('aria-expanded', 'false');
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

  // ——— Función para mostrar el modal ———
  function mostrarModal(idMostrar) {
    const submitBtn = checkoutForm ? checkoutForm.querySelector('button[type="submit"]') : null;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar pedido por WhatsApp";
    }
    closeCart();
    const modal = document.getElementById('modalConfirmacion');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalId = document.getElementById('confirmacionIdPedido');
    if (modalId) modalId.textContent = idMostrar;
    if (modal) {
      modal.removeAttribute('hidden');
      modal.style.display = 'block';
      modal.style.position = 'fixed';
      modal.style.top = '50%';
      modal.style.left = '50%';
      modal.style.transform = 'translate(-50%, -50%)';
      modal.style.zIndex = '9999';
      modal.style.background = '#fff';
      modal.style.padding = '2rem';
      modal.style.borderRadius = '1rem';
    }
    if (modalBackdrop) {
      modalBackdrop.removeAttribute('hidden');
      modalBackdrop.style.display = 'block';
      modalBackdrop.style.position = 'fixed';
      modalBackdrop.style.inset = '0';
      modalBackdrop.style.background = 'rgba(0,0,0,0.5)';
      modalBackdrop.style.zIndex = '9998';
    }
    document.body.classList.add('no-scroll');
  }

  // Validación de recogida: horario 08:00-20:00, cada 30 minutos y mínimo 60 minutos.
  function fechaRecogidaSeleccionada(dia, hora) {
    if (!hora || !/^\\d{2}:\\d{2}$/.test(hora)) return null;
    const [horas, minutos] = hora.split(':').map(Number);
    const desplazamiento = dia === 'Hoy' ? 0 : dia === 'Mañana' ? 1 : 2;
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + desplazamiento);
    fecha.setHours(horas, minutos, 0, 0);
    return fecha;
  }

  function validarHoraRecogida(dia, hora) {
  if (!hora || !/^\d{2}:\d{2}$/.test(hora)) return false;

  const [horas, minutos] = hora.split(':').map(Number);

  return horas >= 8 &&
    (horas < 20 || (horas === 20 && minutos === 0)) &&
    minutos >= 0 &&
    minutos <= 59;
}

  function actualizarRestriccionesHora() {
  const campoHora = $('#hora');
  if (!campoHora) return;

  campoHora.min = '08:00';
  campoHora.max = '20:00';
  campoHora.step = '60';

  if (campoHora.value && !validarHoraRecogida($('#dia').value, campoHora.value)) {
    campoHora.value = '';
  }
}

  // ——— Envío por Google Sheets y WhatsApp ———
  async function enviar(e) {
    e.preventDefault();

    const nombre = $('#nombre').value.trim().replace(/\s+/g, ' ');
    const telefono = $('#telefono').value.trim();
    const hora = $('#hora').value;
    const dia = $('#dia').value;
    const notas = $('#observaciones').value.trim();

    const nombreValido = /^[\p{L}]+(?:[’'-][\p{L}]+)*(?:\s+[\p{L}]+(?:[’'-][\p{L}]+)*)+$/u.test(nombre);
    const errorNombre = $('[data-err="nombre"]');
    const errorTelefono = $('[data-err="telefono"]');
    const errorHora = $('[data-err="hora"]');

    errorNombre.textContent = 'Escribe al menos un nombre y un apellido, sin números.';
    errorNombre.classList.toggle('show', !nombreValido);

    const formatoTelefonoValido = /^\+?[\d\s().-]+$/.test(telefono);
    let soloDigitos = telefono.replace(/\D/g, '');
    if (soloDigitos.startsWith('34') && soloDigitos.length === 11) {
      soloDigitos = soloDigitos.slice(2);
    }
    const telefonoValido = formatoTelefonoValido && /^[67]\d{8}$/.test(soloDigitos);
    errorTelefono.textContent = 'Introduce un móvil español de 9 cifras que empiece por 6 o 7. Puedes añadir +34.';
    errorTelefono.classList.toggle('show', !telefonoValido);

    const horaValida = validarHoraRecogida(dia, hora);
     errorHora.textContent = 'La recogida debe ser entre las 08:00 y las 20:00.';
    errorHora.classList.toggle('show', !horaValida);

    if (!nombreValido || !telefonoValido || !horaValida) return;

    if (!turnstileToken) {
      toast('Completa la verificación de seguridad antes de enviar el pedido.');
      return;
    }

    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const idMostrar = `rod-${dd}${mm}-${Math.floor(10 + Math.random() * 90)}`;

    let totalPedido = 0;
    const productosParaSheets = cart.map((l) => {
      const p = PRODUCTOS.find((x) => x.id === l.id);
      const nombreProd = p ? p.nombre : l.id;
      const { cantidadNum, unidadStr, precioNum, factorPeso } = calcularLinea(l, p);
      const subtotalNum = Number((precioNum * cantidadNum * factorPeso).toFixed(2));
      totalPedido += subtotalNum;
      const productoCompleto = l.opcion ? `${nombreProd} — ${l.opcion}` : nombreProd;
      return {
        producto: productoCompleto,
        nombre: productoCompleto,
        cantidad: cantidadNum,
        unidad: unidadStr,
        precioUnitario: precioNum,
        subtotal: subtotalNum
      };
    });

    const lineas = cart.map((l) => {
      const p = PRODUCTOS.find((x) => x.id === l.id);
      const uds = l.uds > 1 ? `${l.uds} × ` : '';
      const { cantidadNum, unidadStr, precioNum, factorPeso } = calcularLinea(l, p);
      const sub = Number((precioNum * cantidadNum * factorPeso).toFixed(2));
      return `• ${uds}*${p ? p.nombre : l.id}* — ${l.cantidad} (${l.opcion}) → ${sub.toFixed(2).replace('.', ',')} €`;
    });

    const submitBtn = checkoutForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Registrando pedido...";

    const textoWA = [
      '*🥩 NUEVO PEDIDO - CARNICERÍA RODRI*',
      `*ID Referencia:* ${idMostrar}`,
      `*Cliente:* ${nombre}`,
      `*Teléfono:* ${telefono}`,
      `*Recogida:* ${dia} a las ${hora}`,
      notas ? `*Notas:* ${notas}` : null,
      '',
      '*Productos:*',
      ...lineas,
      '',
      `*Total:* ${totalPedido.toFixed(2).replace('.', ',')} €`,
      '',
      '¡Gracias por confiar en Carnicería Rodri! 🍖',
    ].filter((x) => x !== null).join('\n');

    enlaceWhatsAppPendiente = `https://wa.me/${TELEFONO}?text=${encodeURIComponent(textoWA)}`;

    // Timeout de 8s para el fetch
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      try {
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify({
            turnstileToken: turnstileToken,
            codigoPedido: idMostrar,
            cliente: nombre,
            telefono: telefono,
            total: Number(totalPedido.toFixed(2)),
            estado: 'Pendiente',
            productos: productosParaSheets
          }),
          signal: controller.signal
        });
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      console.warn("No se pudo completar el envío a la hoja de pedidos:", error);
      toast("No hemos podido confirmar el envío. Completa también el envío por WhatsApp.");
    }

    // El token Turnstile es de un solo uso: limpiar el widget tras cada intento.
    if (window.turnstile && turnstileWidgetId !== null) {
      window.turnstile.reset(turnstileWidgetId);
      turnstileToken = '';
    }

    // El navegador usa no-cors y no puede leer la respuesta de Apps Script.
    // Se conserva el comportamiento actual del modal.
    mostrarModal(idMostrar);
  }

  // Actualiza precio y cantidades al cambiar cualquier opción del catálogo.
  document.addEventListener('change', (e) => {
    const select = e.target.closest('.card [data-field="opcion"]');
    if (!select) return;
    const cardEl = select.closest('.card');
    const p = PRODUCTOS.find(x => x.id === cardEl.dataset.id);
    if (!p) return;

    // Cambiar la fotografía solo ante una selección manual del cliente.
    // Los change sintéticos usados al sincronizar precios no deben alterar la imagen inicial.
    if (p.id === 'pollo' && e.isTrusted) {
      const fotosPollo = {
        pechugasenfiletes: 'img/productos/pechugasenfiletes.jpg',
        pechugasenteras: 'img/productos/pechugasenteras.jpg',
        muslosycontramuslos: 'img/productos/musloscontramuslos.jpg',
        contramuslodeshuesado: 'img/productos/pollocontramuslodeshuesado.jpg',
        troceadoparaguisar: 'img/productos/pollotroceado.jpg',
        abiertoparaasar: 'img/productos/pollo entero.jpg'
      };
      const foto = fotosPollo[normalizarClave(select.value)];
      const imagen = cardEl.querySelector('.card-img img');
      if (foto && imagen) {
        imagen.onerror = () => {
          imagen.onerror = null;
          imagen.removeAttribute('srcset');
          imagen.src = 'img/productos/pollo.jpg';
        };
        imagen.removeAttribute('srcset');
        imagen.src = foto;
        imagen.alt = 'Pollo fresco: ' + select.value;
      }
    }

    const key = normalizarClave(select.value);
    const baseMatch = String(p.precio || '').replace(',', '.').match(/[0-9]+(?:\.[0-9]+)?/);
    const basePrice = baseMatch ? Number(baseMatch[0]) : 0;
    let optionPrice = basePrice;
    if (p.preciosOpciones && Number.isFinite(Number(p.preciosOpciones[key]))) {
      optionPrice = Number(p.preciosOpciones[key]);
    } else if (p.factoresOpciones && Number.isFinite(Number(p.factoresOpciones[key]))) {
      optionPrice = basePrice * Number(p.factoresOpciones[key]);
    }
    if (!(optionPrice > 0)) return;
    p.precioNumOpciones = p.precioNumOpciones || {};
    p.precioNumOpciones[key] = optionPrice;
    const unit = (String(p.precio || '').match(/\/(kg|ud)/i) || [,'kg'])[1].toLowerCase();
    const priceText = optionPrice.toFixed(2).replace('.', ',') + ' €/' + unit;
    const priceEl = cardEl.querySelector('[data-price]');
    if (priceEl) priceEl.innerHTML = escapeHtml(priceText) + ' ';
    const cantidad = cardEl.querySelector('[data-field="cantidad"]');
    if (!cantidad) return;
    const original = p.cantidadesOriginales || p.cantidades;
    cantidad.innerHTML = original.map(label => {
      const m = label.match(/[0-9]+(?:[.,][0-9]+)?/);
      if (!m) return '<option>' + escapeHtml(label) + '</option>';
      const amount = Number(m[0].replace(',', '.'));
      const factor = /gr|gram/i.test(label) ? amount / 1000 : amount;
      const value = (optionPrice * factor).toFixed(2).replace('.', ',');
      const updated = label.replace(/-\s*[0-9]+(?:[.,][0-9]+)?\s*€/i, '- ' + value + ' €');
      return '<option>' + escapeHtml(updated) + '</option>';
    }).join('');
  });

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

      // Desplazar la barra horizontal para mantener visible la categoría seleccionada.
      // scrollIntoView con inline:center actúa sobre la barra desplazable en móvil.
      chip.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });

      $('#catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const inc = e.target.closest('[data-inc]');
    const dec = e.target.closest('[data-dec]');
    if (inc || dec) {
      const el = inc || dec;
      const i = Number(el.dataset.inc != null ? el.dataset.inc : el.dataset.dec);
      cart[i].uds += inc ? 1 : -1;
      if (cart[i].uds <= 0) cart.splice(i, 1);
      save(); renderCart();
      return;
    }
    if (e.target.closest('[data-open-cart]')) return openCart();
    if (e.target.closest('[data-close-cart]')) return closeCart();
  });

  // Botón WhatsApp del modal
  const btnWhatsAppModal = document.getElementById('btnEnviarWhatsApp');
  if (btnWhatsAppModal) {
    btnWhatsAppModal.onclick = () => {
      if (enlaceWhatsAppPendiente) {
        window.open(enlaceWhatsAppPendiente, '_blank', 'noopener,noreferrer');
      }
      const modal = document.getElementById('modalConfirmacion');
      const modalBackdrop = document.getElementById('modalBackdrop');
      if (modal) modal.setAttribute('hidden', '');
      if (modalBackdrop) modalBackdrop.setAttribute('hidden', '');
      document.body.classList.remove('no-scroll');
      cart = []; save(); renderCart();
    };
  }

  // Botón "Cerrar" del modal
  const btnCerrarModal = document.getElementById('btnCerrarModal');
  if (btnCerrarModal) {
    btnCerrarModal.onclick = () => {
      const modal = document.getElementById('modalConfirmacion');
      const modalBackdrop = document.getElementById('modalBackdrop');
      if (modal) modal.setAttribute('hidden', '');
      if (modalBackdrop) modalBackdrop.setAttribute('hidden', '');
      document.body.classList.remove('no-scroll');
    };
  }

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCart(); });
  $('#buscar').addEventListener('input', filtrar);
  if (checkoutForm) checkoutForm.addEventListener('submit', enviar);
  $('#dia').addEventListener('change', () => {
    actualizarRestriccionesHora();
    $('[data-err="hora"]').classList.remove('show');
  });
  $('#hora').addEventListener('change', () => {
    $('[data-err="hora"]').classList.remove('show');
  });
  actualizarRestriccionesHora();
  $('#vaciar').addEventListener('click', () => { cart = []; save(); renderCart(); });

  $$('#nombre, #telefono, #hora').forEach((el) =>
    el.addEventListener('input', () => {
      const err = $(`[data-err="${el.id}"]`);
      if (err) err.classList.remove('show');
    }));

  async function sincronizarPrecios() {
    try {
      const response = await fetch('https://ugqiomoywgpkmogcdjqn.supabase.co/rest/v1/products?select=id,name,base_price_cents,active&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncWlvbW95d2dwa21vZ2NkanFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2MDc0OTQsImV4cCI6MjEwOTE4MzQ5NH0.k--iBQrSD_raY-TQn01ZHPIkZJ5Xm_KrxEmwY08po3Q', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store',
        
      });
      if (!response.ok) throw new Error('Supabase respondió ' + response.status);
      const rows = await response.json();
      rows.forEach(row => {
        const normalizar = texto => String(texto || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]/g, '');

const product = PRODUCTOS.find(p => String(p.id) === String(row.id))
  || PRODUCTOS.find(p => normalizar(p.nombre) === normalizar(row.name));
        if (!product || !Number.isFinite(Number(row.base_price_cents))) return;
        const unit = (product.precio && product.precio.match(/\/(kg|ud)/i) || [,'ud'])[1].toLowerCase();
        const basePrice = Number(row.base_price_cents) / 100;
        product.precio = basePrice.toFixed(2).replace('.', ',') + ' €/' + unit;
        if (Array.isArray(product.cantidades)) {
          product.cantidades = product.cantidades.map(label => {
            const amountMatch = label.match(/[0-9]+(?:[.,][0-9]+)?/);
            if (!amountMatch) return label;
            const amount = Number(amountMatch[0].replace(',', '.'));
            const lower = label.toLowerCase();
            let factor = amount;
            if (/gr|gram/.test(lower)) factor = amount / 1000;
            else if (/kg|kilo/.test(lower)) factor = amount;
            const value = (basePrice * factor).toFixed(2).replace('.', ',');
            return label.replace(/-\s*[0-9]+(?:[.,][0-9]+)?\s*€/i, '- ' + value + ' €');
          });
        }
      });

      // Cargar precios específicos guardados para cualquier producto.
      const publicKey = response.url.split('apikey=')[1];
      if (publicKey) {
        const optionsResponse = await fetch(
          'https://ugqiomoywgpkmogcdjqn.supabase.co/rest/v1/product_options?select=product_id,label,price_cents,active&apikey=' + publicKey,
          { method: 'GET', mode: 'cors', cache: 'no-store' }
        );
        if (optionsResponse.ok) {
          const optionRows = await optionsResponse.json();
          const picada = PRODUCTOS.find(p => p.id === 'picada');
          if (picada) {
            PRODUCTOS.forEach(product => {
              product.cantidadesOriginales = product.cantidades.slice();
              product.factoresOpciones = {};
              const configured = window.FACTORES_OPCIONES && window.FACTORES_OPCIONES[product.id];
              if (configured) Object.entries(configured).forEach(([label, factor]) => {
                product.factoresOpciones[normalizarClave(label)] = factor;
              });
              product.preciosOpciones = {};
            });
            optionRows.forEach(row => {
              const product = PRODUCTOS.find(p => String(p.id) === String(row.product_id));
              if (!product || !row.label) return;

              const label = String(row.label).trim();
              const key = normalizarClave(label);

              // Las opciones OFF se retiran de la tienda, aunque sigan guardadas en administración.
              if (row.active === false) {
                product.opciones = product.opciones.filter(option => normalizarClave(option) !== key);
                return;
              }

              if (!product.opciones.some(option => normalizarClave(option) === key)) {
                product.opciones.push(label);
              }

              if (Number.isFinite(Number(row.price_cents))) {
                product.preciosOpciones[key] = Number(row.price_cents) / 100;
              }
            });
          }
        }
      }
    } catch (error) {
      console.warn('No se pudieron sincronizar los precios; se muestran los precios locales.', error);
    }
  }

  function normalizarClave(texto) {
    return String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  // Mostrar el catálogo local inmediatamente, sin esperar a Supabase.
  renderCatalogo();
  renderCart();

  // Actualizar precios en segundo plano; si falla la conexión,
  // el catálogo seguirá visible con los precios locales.
  sincronizarPrecios().then(() => {
    renderCatalogo();
    document.querySelectorAll('.card [data-field="opcion"]').forEach(option => option.dispatchEvent(new Event('change', { bubbles: true })));
    renderCart();
  }); 
})();
