(async function () {

  // No interceptar el historial para mostrar avisos de salida: generaba falsos positivos.
  // El carrito se conserva en localStorage y puede recuperarse al volver.

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
  const publicImageUrl = (path) => {
    if (!path) return '';
    let value = String(path).trim();
    if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('data:') || value.startsWith('img/')) return value;
    if (value.startsWith('products/') || value.startsWith('options/')) return 'https://ugqiomoywgpkmogcdjqn.supabase.co/storage/v1/object/public/product-images/' + value.split('/').map(encodeURIComponent).join('/');
    if (value.startsWith('/')) value = value.slice(1);
    if (value.toLowerCase().endsWith('.jpg')) value = value.slice(0, -4);
    return img(value, 600, 450);
  };
  const imageForProduct = (product) => publicImageUrl(product?.imageUrl || product?.imagenBiblioteca || product?.img) || 'img/logo.jpg';

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  // Sustituir imágenes no disponibles; los eventos inline quedan prohibidos por CSP.
  document.addEventListener('error', event => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied) return;
    image.dataset.fallbackApplied = 'true';
    image.removeAttribute('srcset');
    image.src = 'img/logo.jpg';
  }, true);

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
            l.uds > 0 && l.uds <= 99 &&
            PRODUCTOS.some((p) => p.id === l.id)
          )
          .slice(0, 50)
      : [];
  } catch { cart = []; }
  const save = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }
    catch (error) { console.warn('No se pudo guardar el carrito:', error); }
  };

  // ——— Catálogo ———
  const inactiveProductIds = new Set();
  function renderCatalogo() {
    $('#chips').innerHTML =
      `<button type="button" class="chip is-active" data-chip="todo">Todo</button>` +
      CATEGORIAS.map((c) => `<button type="button" class="chip" data-chip="${escapeHtml(c.id)}">${escapeHtml(c.nombre)}</button>`).join('');

    $('#secciones').innerHTML = CATEGORIAS.map((c, i) => {
      // Solo se muestran productos que conservan al menos una opción activa.
      const productos = PRODUCTOS.filter((p) => p.cat === c.id && !inactiveProductIds.has(String(p.id)) && (p.precioDemo === true || (Array.isArray(p.opciones) && p.opciones.length > 0)));
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
      <article class="card${p.cat === 'bebidas' ? ' card--bebidas' : ''}" data-id="${escapeHtml(p.id)}" data-search="${escapeHtml(normalize(keywords))}">
        <div class="card-img">
          <img src="${escapeHtml(imageForProduct(p))}" alt="${escapeHtml(p.nombre)}" loading="lazy" width="600" height="450" decoding="async">
          ${p.etiqueta ? `<span class="tag">${escapeHtml(p.etiqueta)}</span>` : ''}
          ${p.precioDemo ? '<span class="tag">Precio de prueba</span>' : ''}
        </div>
        <div class="card-body">
          <h4>${escapeHtml(p.nombre)}</h4>
          <p class="card-desc">${escapeHtml(p.desc)}</p>
          <div class="card-fields">
            <label>
              <span>${escapeHtml(p.opcionLabel)}</span>
              <select data-field="opcion">${p.opciones.map((o) => `<option>${escapeHtml(o)}</option>`).join('')}</select>
            </label>
            <p class="card-precio" data-price>${escapeHtml(p.precio || 'Selecciona una opción para ver el precio')} </p>
            ${p.preparations && p.preparations.length ? '<label><span>Preparación</span><select data-field="preparacion"><option value="">Sin preparación</option>'+p.preparations.map(x => '<option>'+escapeHtml(x)+'</option>').join('')+'</select></label>' : ''}
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
    if (p) {
      const key = normalizarClave(l.opcion);
      const unit = ((p.precio || '').match(/\/(kg|ud)/i) || [null, '/ud'])[0] || '/ud';
      const optionValue = p.preciosOpciones && Number.isFinite(Number(p.preciosOpciones[key]))
        ? Number(p.preciosOpciones[key])
        : (p.precioNumOpciones && Number.isFinite(p.precioNumOpciones[key]) ? p.precioNumOpciones[key] : null);
      const elegido = optionValue !== null
        ? optionValue.toFixed(2).replace('.', ',') + ' €' + unit
        : (p.precio || '');
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
    const cartContinue = $('#cartContinue');
    if (cartContinue) cartContinue.hidden = cart.length === 0;

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
          <img src="${escapeHtml(l.img ? publicImageUrl(l.img) : imageForProduct(p))}" alt="" width="60" height="60" loading="lazy" decoding="async">
          <div class="line-info">
            <strong>${escapeHtml(p.nombre)}</strong>
            <span>${escapeHtml(l.cantidad)} · ${escapeHtml(l.opcion)}${l.preparacion ? ' · ' + escapeHtml(l.preparacion) : ''}</span>
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

  function addToCart(id, cantidad, opcion, imagenSeleccionada, preparacion = '') {
    const carritoEstabaVacio = cart.length === 0;
    const existing = cart.find((l) => l.id === id && l.cantidad === cantidad && l.opcion === opcion && (l.preparacion || '') === preparacion);
    if (existing) {
      if (existing.uds >= 99) { toast('Máximo 99 unidades por producto.'); return; }
      existing.uds++;
      if (imagenSeleccionada) existing.img = imagenSeleccionada;
    } else {
      if (cart.length >= 50) { toast('Máximo 50 líneas en el pedido.'); return; }
      cart.push({ id, cantidad, opcion, preparacion, uds: 1, ...(imagenSeleccionada ? { img: imagenSeleccionada } : {}) });
    }
    save();
    if (carritoEstabaVacio) prepararHistorialSalida();
    renderCart();
    const btn = $('.cart-btn');
    btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump');
  }

  const drawer = $('#drawer');
  const backdrop = $('.drawer-backdrop');
  const cartBtn = $('.cart-btn');
  const checkoutForm = $('#checkout');

  // El carrito se conserva en localStorage al navegar fuera y volver.
  let pedidoEnProceso = false;
  let salidaDialogo = null;
  let cartHistoryEntry = false;
  let cartClosePending = false;

  // Compatibilidad con llamadas antiguas; no añadir entradas artificiales al historial.
  function prepararHistorialSalida() {}

  function volverACategorias() {
    const catalogo = document.getElementById('catalogo');
    if (catalogo) catalogo.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // El botón Atrás solo cierra el carrito si este está abierto.
  // No interpretar desplazamientos, hashes ni navegación normal como salida.
  window.addEventListener('popstate', () => {
    if (cartClosePending) {
      cartClosePending = false;
      cartHistoryEntry = false;
      return;
    }
    if (drawer?.classList.contains('open')) {
      cartHistoryEntry = false;
      closeCart(true);
    }
  });

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
    if (!drawer.classList.contains('open')) {
      history.pushState({ rodriCartOpen: true }, '', location.href);
      cartHistoryEntry = true;
    }
    backdrop.hidden = false;
    actualizarRestriccionesHora();
    inicializarTurnstile();
    drawer.removeAttribute('inert');
    requestAnimationFrame(() => {
      drawer.classList.add('open');
      backdrop.classList.add('open');
    });
    document.body.classList.add('no-scroll');
    if (cartBtn) cartBtn.setAttribute('aria-expanded', 'true');
  }

  function closeCart(fromHistory = false) {
    // Al cerrar desde un control de la interfaz, retirar la entrada propia
    // del carrito. El popstate resultante no debe confundirse con una salida.
    if (!fromHistory && cartHistoryEntry && history.state?.rodriCartOpen) {
      cartHistoryEntry = false;
      cartClosePending = true;
      history.back();
    }
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

  // Aviso de salida desactivado: nunca interrumpir el pedido por navegar o desplazarse.
  salidaDialogo = document.getElementById('exitConfirm');
  if (salidaDialogo) salidaDialogo.hidden = true;

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
    // Al confirmar un pedido, cerrar el carrito sin hacer history.back().
    // Ese popstate podía confundirse con un intento de abandonar la tienda
    // y mostrar el aviso "Salir / Seguir comprando" encima de la confirmación.
    if (drawer?.classList.contains('open')) {
      cartHistoryEntry = false;
      cartClosePending = false;
      if (history.state?.rodriCartOpen) {
        history.replaceState({ rodriPageEntry: true }, '', location.href);
      }
      closeCart(true);
    }
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

  // Franja horaria en Jerez (Europe/Madrid), también para visitantes
  // cuyo teléfono esté configurado en otra zona horaria.
  function minutosActualesJerez() {
    const partes = new Intl.DateTimeFormat('es-ES', {
      timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    const horas = Number(partes.find(p => p.type === 'hour')?.value);
    const minutos = Number(partes.find(p => p.type === 'minute')?.value);
    // Redondear hacia arriba: las 10:00:01 requieren una cita a partir de las 11:01.
    return horas * 60 + minutos + (new Date().getSeconds() > 0 ? 1 : 0);
  }

  function validarHoraRecogida(dia, hora) {
    if (!['Hoy', 'Mañana', 'Pasado mañana'].includes(dia) || !/^\d{2}:(00|30)$/.test(hora || '')) return false;
    const [horas, minutos] = hora.split(':').map(Number);
    const total = horas * 60 + minutos;
    if (total < 8 * 60 || total > 20 * 60) return false;
    // Mínimo una hora desde el momento real en la zona del establecimiento.
    return dia !== 'Hoy' || total >= minutosActualesJerez() + 60;
  }

  function actualizarRestriccionesHora() {
    const diaEl = $('#dia');
    const campoHora = $('#hora');
    if (!diaEl || !campoHora) return;

    // Evitar mostrar "Hoy" cuando ya no quedan horas de recogida.
    const hoyOption = diaEl.querySelector('option[value="Hoy"]');
    const hoyDisponible = Array.from({ length: 25 }, (_, i) => 8 * 60 + i * 30)
      .some(total => total >= minutosActualesJerez() + 60);
    if (hoyOption) {
      hoyOption.disabled = !hoyDisponible;
      hoyOption.textContent = hoyDisponible ? 'Hoy' : 'Hoy (sin horarios disponibles)';
    }
    const cambiadoAManana = !hoyDisponible && diaEl.value === 'Hoy';
    if (cambiadoAManana) diaEl.value = 'Mañana';

    const anterior = campoHora.value;
    campoHora.replaceChildren();
    campoHora.add(new Option('Selecciona una hora', ''));
    const horarios = [];
    for (let total = 8 * 60; total <= 20 * 60; total += 30) {
      const hora = String(Math.floor(total / 60)).padStart(2, '0')
        + ':' + String(total % 60).padStart(2, '0');
      if (!validarHoraRecogida(diaEl.value, hora)) continue;
      horarios.push(hora);
      campoHora.add(new Option(hora, hora));
    }

    campoHora.disabled = horarios.length === 0;
    campoHora.value = horarios.includes(anterior) ? anterior : '';
    const ayuda = $('#horaAyuda');
    if (ayuda) {
      ayuda.textContent = cambiadoAManana
        ? 'Hoy ya no quedan horas de recogida. Hemos seleccionado mañana. Horario de Jerez.'
        : horarios.length
          ? 'De ' + horarios[0] + ' a ' + horarios[horarios.length - 1]
            + ', cada 30 minutos · Hora local de Jerez.'
          : 'No hay franjas disponibles para este día. Selecciona otro.';
    }
  }

  // ——— Envío por Google Sheets y WhatsApp ———
  async function enviar(e) {
    e.preventDefault();
    // El horario puede haber dejado de estar disponible mientras se rellenaba el pedido.
    actualizarRestriccionesHora();

    // Evitar dobles envíos si el usuario pulsa repetidamente.
    if (pedidoEnProceso) return;
    pedidoEnProceso = true;

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
     errorHora.textContent = 'Selecciona uno de los horarios disponibles para el día elegido.';
    errorHora.classList.toggle('show', !horaValida);

    if (!nombreValido || !telefonoValido || !horaValida) {
      pedidoEnProceso = false;
      return;
    }

    if (!turnstileToken) {
      pedidoEnProceso = false;
      toast('Completa la verificación de seguridad antes de enviar el pedido.');
      return;
    }

    if (!cart.length) { pedidoEnProceso = false; toast('Añade productos antes de enviar.'); return; }
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const randomId = typeof crypto !== 'undefined' && crypto.getRandomValues
      ? Array.from(crypto.getRandomValues(new Uint8Array(4)), b => b.toString(16).padStart(2, '0')).join('')
      : String(Date.now());
    const idMostrar = `rod-${dd}${mm}-${randomId}`;

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
      return `• ${uds}*${p ? p.nombre : l.id}* — ${l.cantidad} (${l.opcion}${l.preparacion ? ' · ' + l.preparacion : ''}) → ${sub.toFixed(2).replace('.', ',')} €`;
    });

    const submitBtn = checkoutForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Preparando pedido...";

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

    // no-cors NO permite confirmar el registro en Sheets: informar con precisión.
    mostrarModal(idMostrar);
  }

  // Las imágenes de las preparaciones se muestran al elegir la cantidad.
  function imagenDeOpcion(product, optionLabel) {
    const key = normalizarClave(optionLabel);
    const saved = product?.optionImages?.[key];
    if (saved?.showImage && saved.url) return saved.url;
    // Respaldo fijo para las fotos de Filetes de Ternera subidas a GitHub,
    // igual que el mapa de imágenes heredadas de Pollo.
    if (product?.id === 'filetes-ternera') {
      const legacy = {
        muyfinosplancha: 'img/productos/vacuno/filetes-ternera/muy-finos-plancha-1794050096452.jpg',
        grosornormal: 'img/productos/vacuno/filetes-ternera/grosor-normal-1794050110366.jpg',
        paraempanar: 'img/productos/vacuno/filetes-ternera/para-empanar-1794050123721.jpg'
      };
      if (legacy[key]) return legacy[key];
    }
    if (product?.id === 'pollo') {
      const legacy = { pechugasenfiletes:'img/productos/pollo/pechugas-filetes.jpg', pechugasenteras:'img/productos/pollo/pechugas-enteras.jpg', muslosycontramuslos:'img/productos/pollo/muslos-contramuslos.jpg', contramuslodeshuesado:'img/productos/pollo/contramuslo-deshuesado.jpg', troceadoparaguisar:'img/productos/pollo/pollo-troceado.jpg', abiertoparaasar:'img/productos/pollo/pollo-entero.jpg' };
      return legacy[key] || null;
    }
    return null;
  }
  function actualizarImagenTarjeta(cardEl, mostrarOpcion) {
    const product = PRODUCTOS.find(item => String(item.id) === String(cardEl?.dataset.id));
    const image = cardEl?.querySelector('.card-img img');
    const option = cardEl?.querySelector('[data-field="opcion"]')?.value || '';
    if (!product || !image) return;
    const selected = mostrarOpcion ? imagenDeOpcion(product, option) : null;
    image.onerror = () => { image.onerror = null; image.removeAttribute('srcset'); image.src = img(product.img, 600, 450); };
    image.removeAttribute('srcset');
    image.src = selected || imageForProduct(product);
    image.alt = selected ? product.nombre + ': ' + option : product.nombre;
    cardEl.dataset.selectedImage = selected || '';
  }
  document.addEventListener('change', (event) => {
    const option = event.target.closest('.card [data-field="opcion"]');
    if (option) { actualizarImagenTarjeta(option.closest('.card'), true); return; }
    const quantity = event.target.closest('.card [data-field="cantidad"]');
    if (quantity) { actualizarImagenTarjeta(quantity.closest('.card'), true); actualizarPrecioCantidad(quantity.closest('.card')); }
  });
  // Precio visible de la cantidad seleccionada, calculado desde el precio por kg/ud.
  function actualizarPrecioCantidad(cardEl) {
    if (!cardEl) return;
    const p = PRODUCTOS.find(x => String(x.id) === String(cardEl.dataset.id));
    const priceEl = cardEl.querySelector('[data-price]');
    const quantity = cardEl.querySelector('[data-field="cantidad"]');
    if (!p || !priceEl || !quantity) return;
    const key = normalizarClave(cardEl.querySelector('[data-field="opcion"]')?.value || '');
    const match = String(p.precio || '').replace(',', '.').match(/[0-9]+(?:\.[0-9]+)?/);
    if (!match) return;
    const base = Number(match[0]);
    const option = p.preciosOpciones?.[key] ?? p.precioNumOpciones?.[key];
    const unitPrice = Number.isFinite(Number(option)) ? Number(option) : base;
    const label = quantity.value.toLowerCase();
    const amountMatch = label.replace(',', '.').match(/[0-9]+(?:\.[0-9]+)?/);
    if (!amountMatch) return;
    const amount = Number(amountMatch[0]);
    const factor = /\b(gr|gramos|gramo|grs)\b/.test(label) ? amount / 1000 : amount;
    if (!Number.isFinite(factor) || factor <= 0) return;
    const unit = (String(p.precio || '').match(/\/(kg|ud)/i) || [null, p.saleUnit || 'kg'])[1];
    priceEl.textContent = (unitPrice * factor).toFixed(2).replace('.', ',') + ' € · ' + quantity.value.replace(/\s*-\s*[\d.,]+\s*€/g,'').trim();
    cardEl.dataset.priceIsQuantity = 'true';
    cardEl.dataset.baseUnitPrice = unitPrice.toFixed(2).replace('.', ',') + ' €/' + unit;
  }
  function restaurarPrecioBase(cardEl) {
    if (!cardEl || cardEl.dataset.priceIsQuantity !== 'true') return;
    const priceEl = cardEl.querySelector('[data-price]');
    if (priceEl) priceEl.textContent = cardEl.dataset.baseUnitPrice || '';
    delete cardEl.dataset.priceIsQuantity;
  }
  function restaurarProductoInicial(cardEl) {
    if (!cardEl) return;
    const option = cardEl.querySelector('[data-field="opcion"]');
    if (option && option.selectedIndex !== 0) {
      option.selectedIndex = 0;
      // Actualiza también el precio y las cantidades vinculadas a la opción inicial.
      option.dispatchEvent(new Event('change', { bubbles: true }));
    }
    actualizarImagenTarjeta(cardEl, false);
    restaurarPrecioBase(cardEl);
  }

  function restaurarProductosAlSalir(exceptoCard = null) {
    document.querySelectorAll('.card').forEach(cardEl => {
      if (cardEl !== exceptoCard) restaurarProductoInicial(cardEl);
    });
  }

  document.addEventListener('pointerdown', (event) => {
    // Al salir de una tarjeta, se restaura su primera opción y su imagen principal.
    // Si se interactúa dentro de otra tarjeta, esa tarjeta conserva la selección actual.
    const cardActiva = event.target.closest('.card');
    restaurarProductosAlSalir(cardActiva);
  });

  // También cubre la navegación con teclado: al sacar el foco de una tarjeta,
  // vuelve a la primera opción del desplegable.
  document.addEventListener('focusout', (event) => {
    const cardAnterior = event.target.closest('.card');
    const siguiente = event.relatedTarget;
    if (cardAnterior && (!siguiente || !cardAnterior.contains(siguiente))) {
      restaurarProductoInicial(cardAnterior);
    }
  });
  // Actualiza precio y cantidades al cambiar cualquier opción del catálogo.
  document.addEventListener('change', (e) => {
    const select = e.target.closest('.card [data-field="opcion"]');
    if (!select) return;
    const cardEl = select.closest('.card');
    const p = PRODUCTOS.find(x => x.id === cardEl.dataset.id);
    if (!p) return;

    // La fotografía de Pollo Fresco se gestiona en el controlador de selección manual.

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
    const unit = (String(p.precio || '').match(/\/(kg|ud)/i) || [null, p.saleUnit || 'kg'])[1].toLowerCase();
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
    actualizarPrecioCantidad(cardEl);
  });

  // ——— Eventos ———
  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) {
      const c = add.closest('.card');
      const p = PRODUCTOS.find((x) => x.id === c.dataset.id);
      const cantidad = $('[data-field="cantidad"]', c).value;
      const opcion = $('[data-field="opcion"]', c).value;
      const preparacion = c.querySelector('[data-field="preparacion"]')?.value || '';
      const imagenSeleccionada = c.dataset.selectedImage || imageForProduct(p);
      addToCart(p.id, cantidad, opcion, imagenSeleccionada, preparacion);
      actualizarImagenTarjeta(c, false);
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
      if (!Number.isInteger(i) || !cart[i]) return;
      if (inc && cart[i].uds >= 99) { toast('Máximo 99 unidades por producto.'); return; }
      cart[i].uds += inc ? 1 : -1;
      if (cart[i].uds <= 0) cart.splice(i, 1);
      save(); renderCart();
      return;
    }
    if (e.target.closest('[data-open-cart]')) return openCart();
    if (e.target.closest('[data-close-cart]')) {
      closeCart();
      volverACategorias();
      return;
    }
  });

  // Botón WhatsApp del modal
  const btnWhatsAppModal = document.getElementById('btnEnviarWhatsApp');
  if (btnWhatsAppModal) {
    btnWhatsAppModal.onclick = () => {
      if (!enlaceWhatsAppPendiente) { toast('No hay un pedido pendiente para enviar.'); return; }
      // No borrar el carrito: abrir WhatsApp no demuestra que el mensaje se haya enviado.
      const enlace = enlaceWhatsAppPendiente;
      const modal = document.getElementById('modalConfirmacion');
      const modalBackdrop = document.getElementById('modalBackdrop');
      if (modal) modal.setAttribute('hidden', '');
      if (modalBackdrop) modalBackdrop.setAttribute('hidden', '');
      document.body.classList.remove('no-scroll');
      pedidoEnProceso = false;
      window.location.assign(enlace);
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
      pedidoEnProceso = false;
      // Al volver a la tienda, rearmar la protección solo si sigue habiendo carrito.
      if (cart.length) prepararHistorialSalida();
    };
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
      closeCart();
      volverACategorias();
    }
  });
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
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && drawer?.classList.contains('open')) actualizarRestriccionesHora();
  });
  window.addEventListener('pageshow', () => {
    if (drawer?.classList.contains('open')) actualizarRestriccionesHora();
  });
  $('#vaciar').addEventListener('click', () => { cart = []; save(); renderCart(); });

  $$('#nombre, #telefono, #hora').forEach((el) =>
    el.addEventListener('input', () => {
      const err = $(`[data-err="${el.id}"]`);
      if (err) err.classList.remove('show');
    }));

  // Supabase es la fuente única de precios, categorías y productos publicados.
  // Si falla la sincronización, no se publican precios de demostración.
  async function sincronizarPrecios() {
    const supabaseUrl = 'https://ugqiomoywgpkmogcdjqn.supabase.co/rest/v1/';
    const publicKey = 'sb_publishable_FU3fmq19uyZ4jUmF_uhFgg_ywVmFPrL';
    const headers = { apikey: publicKey };
    const getRows = async (table, query) => {
      const response = await fetch(supabaseUrl + table + '?' + query, { headers, cache: 'no-store' });
      if (!response.ok) throw new Error(table + ': HTTP ' + response.status);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error(table + ': respuesta incorrecta');
      return data;
    };

    try {
      const [rows, categoryRows, optionRows] = await Promise.all([
        getRows('products', 'select=id,name,description,category,base_price_cents,active,image,sale_unit,preparations,sort_order&order=sort_order.asc'),
        getRows('categories', 'select=id,name,tagline,sort_order,active&order=sort_order.asc'),
        getRows('product_options', 'select=product_id,label,price_cents,active,image,show_image,sort_order&order=sort_order.asc')
      ]);

      const activeCategories = categoryRows.filter(c => c.active === true);
      const allowedCategories = new Set(activeCategories.map(c => String(c.id)));
      const original = new Map(PRODUCTOS.map(p => [String(p.id), p]));
      const optionsByProduct = new Map();
      for (const option of optionRows) {
        if (option.active !== true || !Number.isFinite(Number(option.price_cents)) || Number(option.price_cents) <= 0) continue;
        const id = String(option.product_id);
        if (!optionsByProduct.has(id)) optionsByProduct.set(id, []);
        optionsByProduct.get(id).push(option);
      }

      const published = [];
      for (const row of rows) {
        if (row.active !== true || !allowedCategories.has(String(row.category))) continue;
        const options = optionsByProduct.get(String(row.id)) || [];
        if (!options.length) continue;
        const baseCents = Number(row.base_price_cents);
        const base = Number.isFinite(baseCents) && baseCents > 0
          ? baseCents / 100 : Number(options[0].price_cents) / 100;
        if (!(base > 0)) continue;
        const legacy = original.get(String(row.id)) || {};
        const unit = row.sale_unit === 'ud' ? 'ud' : (row.sale_unit === 'kg' ? 'kg' : (legacy.saleUnit || (legacy.precio && /\/ud/i.test(legacy.precio) ? 'ud' : 'kg')));
        const p = {
          ...legacy,
          id: String(row.id),
          nombre: String(row.name || row.id),
          desc: String(row.description || ''),
          cat: String(row.category),
          precio: base.toFixed(2).replace('.', ',') + ' €/' + unit,
          precioDemo: false,
          saleUnit: unit,
          opcionLabel: legacy.opcionLabel || (unit === 'ud' ? 'Variedad o formato' : 'Corte o preparación'),
          opciones: options.map(o => String(o.label)),
          cantidades: unit === 'ud' ? ['1 unidad', '2 unidades', '4 unidades', '6 unidades'] : ['250 gr', '500 gr', '750 gr', '1 kg'],
          preparations: Array.isArray(row.preparations) ? row.preparations : [],
          imageUrl: publicImageUrl(row.image) || legacy.imagenBiblioteca || '',
          preciosOpciones: {},
          optionImages: {},
          factoresOpciones: {}
        };
        for (const option of options) {
          const key = normalizarClave(option.label);
          p.preciosOpciones[key] = Number(option.price_cents) / 100;
          p.optionImages[key] = { url: publicImageUrl(option.image), showImage: option.show_image !== false };
        }
        published.push(p);
      }

      PRODUCTOS.splice(0, PRODUCTOS.length, ...published);
      CATEGORIAS.splice(0, CATEGORIAS.length, ...activeCategories.map(c => ({
        id: String(c.id), nombre: String(c.name || c.id), lema: String(c.tagline || '')
      })));
      const validProductIds = new Set(published.map(p => p.id));
      cart = cart.filter(item => validProductIds.has(item.id)
        && published.some(p => p.id === item.id && p.opciones.includes(item.opcion)));
      save();
      return true;
    } catch (error) {
      console.error('Catálogo no disponible:', error);
      PRODUCTOS.splice(0, PRODUCTOS.length);
      CATEGORIAS.splice(0, CATEGORIAS.length);
      cart = [];
      return false;
    }
  }

  function normalizarClave(texto) {
    return String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  // Los precios de demostración nunca se muestran como catálogo vendible.
  $('#secciones').textContent = 'Cargando productos y precios actualizados…';
  sincronizarPrecios().then(ok => {
    renderCatalogo();
    renderCart();
    if (!ok) {
      $('#secciones').textContent = 'No podemos comprobar los precios en este momento. Inténtalo de nuevo más tarde o consúltanos por WhatsApp.';
    } else if (!PRODUCTOS.length) {
      $('#secciones').textContent = 'No hay productos disponibles para encargar en este momento.';
    } else {
      document.querySelectorAll('.card [data-field="opcion"]').forEach(option => option.dispatchEvent(new Event('change', { bubbles: true })));
    }
  }); 
})();
