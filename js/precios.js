// Sincroniza precios públicos desde Supabase.
(async function () {
  const KEY = 'sb_publishable_FU3fmq19uyZ4jUmF_uhFgg_ywVmFPrL';
  const URL = 'https://ugqiomoywgpkmogcdjqn.supabase.co/rest/v1/products?select=id,base_price_cents,active&apikey=' + encodeURIComponent(KEY);

  function mostrarAviso(texto, ok) {
    let aviso = document.getElementById('aviso-precios');
    if (!aviso) {
      aviso = document.createElement('p');
      aviso.id = 'aviso-precios';
      aviso.style.cssText = 'margin:10px auto;padding:12px;max-width:1100px;border-radius:8px;font-size:14px;background:#fff3e0;color:#333;position:relative;z-index:10';
      const destino = document.getElementById('chips') || document.querySelector('.catalogo-head') || document.querySelector('main') || document.body;
      destino.parentNode.insertBefore(aviso, destino);
    }
    aviso.textContent = texto;
    aviso.style.background = ok ? '#e8f5e9' : '#fff3e0';
  }

  try {
    mostrarAviso('Comprobando precios...', false);
    const respuesta = await fetch(URL, { method: 'GET', mode: 'cors', cache: 'no-store' });
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
        if (selector && Array.isArray(p.cantidades)) {
          selector.innerHTML = p.cantidades.map(x => '<option>' + String(x).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])) + '</option>').join('');
        }
      }
      cuenta++;
    });

    if (cuenta) mostrarAviso('Precios actualizados desde el panel (' + cuenta + ' productos).', true);
    else mostrarAviso('Conexión correcta, pero no se encontraron productos coincidentes.', false);
  } catch (error) {
    mostrarAviso('No se pudieron actualizar los precios. ' + error.message, false);
    console.error('Sincronización de precios:', error);
  }
})();
