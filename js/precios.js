// Sincroniza precios públicos desde Supabase sin depender del panel de administración.
(async function () {
  const URL = 'https://ugqiomoywgpkmogcdjqn.supabase.co/rest/v1/products?select=id,base_price_cents,active';
  const KEY = 'sb_publishable_FU3fmq19uyZ4jUmF_uhFgg_ywVmFPrL';

  function mostrarAviso(texto, ok) {
    let aviso = document.getElementById('aviso-precios');
    if (!aviso) {
      aviso = document.createElement('p');
      aviso.id = 'aviso-precios';
      aviso.style.cssText = 'margin:10px 0;padding:10px;border-radius:8px;font-size:14px;background:#f3f3f3;color:#333';
      const chips = document.getElementById('chips');
      if (chips && chips.parentNode) chips.parentNode.insertBefore(aviso, chips);
    }
    if (aviso) {
      aviso.textContent = texto;
      aviso.style.background = ok ? '#e8f5e9' : '#fff3e0';
    }
  }

  try {
    const respuesta = await fetch(URL, {
      headers: { apikey: KEY, Authorization: 'Bearer ' + KEY },
      cache: 'no-store'
    });
    if (!respuesta.ok) throw new Error('Error HTTP ' + respuesta.status);
    const filas = await respuesta.json();
    let cuenta = 0;

    filas.forEach(fila => {
      const p = window.PRODUCTOS && window.PRODUCTOS.find(item => item.id === fila.id);
      if (!p || fila.base_price_cents == null) return;

      const precio = Number(fila.base_price_cents) / 100;
      if (!Number.isFinite(precio)) return;
      const unidad = (p.precio && p.precio.match(/\/(kg|ud)/i) || [null, 'ud'])[1].toLowerCase();
      p.precio = precio.toFixed(2).replace('.', ',') + ' €/' + unidad;

      if (Array.isArray(p.cantidades)) {
        p.cantidades = p.cantidades.map(etiqueta => {
          const m = etiqueta.match(/[0-9]+(?:[.,][0-9]+)?/);
          if (!m) return etiqueta;
          const cantidad = Number(m[0].replace(',', '.'));
          const texto = etiqueta.toLowerCase();
          let factor = cantidad;
          if (/gr|gram/.test(texto)) factor = cantidad / 1000;
          else if (/kg|kilo/.test(texto)) factor = cantidad;
          const importe = (precio * factor).toFixed(2).replace('.', ',');
          return etiqueta.replace(/-\s*[0-9]+(?:[.,][0-9]+)?\s*€/i, '- ' + importe + ' €');
        });
      }

      const tarjeta = document.querySelector('.card[data-id="' + CSS.escape(p.id) + '"]');
      if (tarjeta) {
        const precioEl = tarjeta.querySelector('.card-precio');
        if (precioEl) precioEl.innerHTML = p.precio + ' <small>orientativo</small>';
        const selector = tarjeta.querySelector('[data-field="cantidad"]');
        if (selector) selector.innerHTML = p.cantidades.map(x => '<option>' + String(x).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])) + '</option>').join('');
      }
      cuenta++;
    });

    if (cuenta) mostrarAviso('Precios actualizados desde el panel (' + cuenta + ' productos).', true);
    else mostrarAviso('Conexión correcta, pero no se encontraron productos coincidentes.', false);
  } catch (error) {
    mostrarAviso('No se pudieron actualizar los precios. Se mantienen los precios de la web. ' + error.message, false);
    console.error('Sincronización de precios:', error);
  }
})();