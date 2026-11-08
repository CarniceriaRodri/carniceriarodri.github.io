(() => {
 const SUPABASE_URL = 'https://ugqiomoywgpkmogcdjqn.supabase.co';
 const SUPABASE_KEY = 'sb_publishable_FU3fmq19uyZ4jUmF_uhFgg_ywVmFPrL';
 const $ = id => document.getElementById(id);
 const euro = cents => (Number(cents || 0)/100).toFixed(2).replace('.', ',') + ' €';
 const centsFromInput = value => Math.round(Number(String(value).replace(',', '.')) * 100);

 function status(id,msg){$(id).textContent=msg}

 if(!window.supabase){
   status('loginStatus','No se ha cargado la conexión de Supabase. Comprueba Internet y vuelve a abrir el panel.');
   return;
 }

 const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

 async function loadMaintenance(){
   const toggle=$('maintenanceToggle');
   if(!toggle)return;
   status('maintenanceStatus','Consultando estado…');
   const {data,error}=await client.from('site_settings')
     .select('maintenance_enabled').eq('id',1).maybeSingle();
   if(error || !data){
     status('maintenanceStatus','No se pudo consultar el mantenimiento: '+(error?.message||'No hay configuración.'));
     toggle.disabled=true;
     return;
   }
   toggle.disabled=false;
   toggle.checked=!!data.maintenance_enabled;
   status('maintenanceStatus',toggle.checked?'Mantenimiento ACTIVADO.':'Mantenimiento desactivado.');
 }

 $('maintenanceToggle').addEventListener('change',async()=>{
   const toggle=$('maintenanceToggle');
   const nuevoEstado=toggle.checked;
   toggle.disabled=true;
   status('maintenanceStatus','Guardando cambio…');
   const {error}=await client.from('site_settings')
     .update({maintenance_enabled:nuevoEstado}).eq('id',1);
   toggle.disabled=false;
   if(error){
     toggle.checked=!nuevoEstado;
     status('maintenanceStatus','No se pudo guardar: '+error.message);
     return;
   }
   status('maintenanceStatus',nuevoEstado?'Mantenimiento ACTIVADO.':'Mantenimiento desactivado.');
 });

 async function showSession(session){
   if(!session || !session.user || !session.user.id){
     $('loginPanel').hidden=false;
     $('adminPanel').hidden=true;
     $('logout').hidden=true;
     $('products').innerHTML='';
     return;
   }

   // Mantener el panel oculto mientras se comprueba la autorización.
   $('adminPanel').hidden=true;
   $('products').innerHTML='';
   $('loginPanel').hidden=true;
   $('logout').hidden=true;
   status('loginStatus','Comprobando autorización…');

   const {data:admin,error:adminError}=await client
     .from('admin_users')
     .select('user_id')
     .eq('user_id',session.user.id)
     .maybeSingle();

   if(adminError || !admin){
     $('adminPanel').hidden=true;
     $('loginPanel').hidden=false;
     $('logout').hidden=true;
     $('products').innerHTML='';
     status('loginStatus',
       adminError
         ? 'No se pudo verificar la autorización de esta cuenta. Se cerrará la sesión por seguridad.'
         : 'Esta cuenta no está autorizada para administrar la web. Se cerrará la sesión.'
     );
     await client.auth.signOut();
     return;
   }

   $('loginPanel').hidden=true;
   $('adminPanel').hidden=false;
   $('logout').hidden=false;
   status('loginStatus','');
   await loadMaintenance();
   await loadProducts();
 }

 async function loadCategoriesEditor(){
   const container=$('categoryRows');
   if(!container)return;
   const {data,error}=await client.from('categories').select('id,name,tagline,sort_order,active').order('sort_order');
   if(error){status('categoryStatus','No se pudieron cargar las categorías: '+error.message);return}
   container.innerHTML=(data||[]).map(c=>
     '<div class="category-editor-row" data-category-id="'+escapeHtml(c.id)+'">'+
     '<strong>'+escapeHtml(c.name)+'</strong><div class="muted">Identificador: '+escapeHtml(c.id)+'</div>'+
     '<label>Nombre de la categoría<input data-cat-name value="'+escapeHtml(c.name)+'"></label>'+
     '<label>Descripción<input data-cat-tagline value="'+escapeHtml(c.tagline||'')+'"></label>'+
     '<div class="category-row-fields"><label>Orden de aparición<input data-cat-order type="number" value="'+Number(c.sort_order||0)+'"></label></div>'+
     '<div class="category-row-actions"><label><input data-cat-active type="checkbox"'+(c.active?' checked':'')+'> Visible en la tienda</label><button type="button" class="secondary" data-save-category>Guardar cambios</button><button type="button" data-delete-category style="background:#9c2929">Eliminar categoría</button></div></div>'
   ).join('');
 }
 $('categoryRows').addEventListener('click',async e=>{
   const del=e.target.closest('[data-delete-category]');
    if(del){
      const row=del.closest('[data-category-id]'),id=row.dataset.categoryId;
      del.disabled=true;
      try{
        const {count,error}=await client.from('products').select('id',{count:'exact',head:true}).eq('category',id);
        if(error)throw error;
        if(count){status('categoryStatus','No se puede eliminar: contiene '+count+' productos. Elimina primero todos los productos y sus opciones.');return}
        if(!confirm('¿Eliminar definitivamente la categoría '+id+'?'))return;
        const result=await client.from('categories').delete().eq('id',id).select('id');
        if(result.error)throw result.error;
        if(!result.data?.length)throw new Error('No se eliminó la categoría.');
        status('categoryStatus','Categoría eliminada.');await loadProducts();
      }catch(err){status('categoryStatus','Error al eliminar: '+err.message)}
      finally{del.disabled=false}
      return;
    }
    const button=e.target.closest('[data-save-category]');if(!button)return;
   const row=button.closest('[data-category-id]');
   const name=row.querySelector('[data-cat-name]').value.trim();
   if(!name){status('categoryStatus','Escribe el nombre de la categoría.');return}
   button.disabled=true;
   const {error}=await client.from('categories').update({
     name,tagline:row.querySelector('[data-cat-tagline]').value.trim(),
     sort_order:Number(row.querySelector('[data-cat-order]').value)||0,
     active:row.querySelector('[data-cat-active]').checked
   }).eq('id',row.dataset.categoryId);
   button.disabled=false;
   status('categoryStatus',error?'No se pudo guardar: '+error.message:'Categoría guardada correctamente.');
   if(!error)await loadProducts();
 });
 $('createCategory').addEventListener('click',async()=>{
   const id=$('newCategoryId').value.trim().toLowerCase().replace(/[^a-z0-9-]/g,'-');
   const name=$('newCategoryName').value.trim();
   if(!id||!name){status('categoryStatus','Indica identificador y nombre.');return}
   const button=$('createCategory');button.disabled=true;
   const {error}=await client.from('categories').insert({id,name,tagline:$('newCategoryTagline').value.trim(),sort_order:Number($('newCategoryOrder').value)||0,active:true});
   button.disabled=false;
   status('categoryStatus',error?'No se pudo crear: '+error.message:'Categoría creada correctamente.');
   if(!error){$('newCategoryId').value='';$('newCategoryName').value='';$('newCategoryTagline').value='';await loadProducts();}
 });

 async function loadProducts(){
   const openOptionPanels=new Set(Array.from(document.querySelectorAll('.options-details[open]')).map(el=>el.dataset.productOptions));
   status('adminStatus','Cargando productos…');
   let {data:products,error}=await client.from('products').select('id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations').order('sort_order');
   if(products){
     const excludedCategories=['caza','casqueria','vaca-buey','vaca buey','vaca y buey'];
     const normalizeCategory=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es').trim();
     products=products.filter(product=>!excludedCategories.includes(normalizeCategory(product.category)));
   }
   if(error){status('adminStatus','No se pudieron cargar los productos: '+error.message);return}
   if(!products || !products.length){
     $('emptyNotice').hidden=false;
     $('products').innerHTML='';
     status('adminStatus','');
     return;
   }
   $('emptyNotice').hidden=true;
   const catalogue=(window.PRODUCTOS||[]);
   // El panel solo administra el catálogo vigente; los productos históricos de Supabase
   // se conservan en la base de datos, pero no deben crear categorías repetidas.
   // Mostrar TODOS los productos de Supabase, también los nuevos o renombrados.
   if(!products.length){
     $('emptyNotice').hidden=false;
     $('products').innerHTML='';
     status('adminStatus','No hay productos del catálogo actual para mostrar.');
     return;
   }
   const {data:databaseCategories,error:categoryError}=await client.from('categories').select('id,name,tagline,sort_order,active').order('sort_order');
   if(categoryError){status('adminStatus','No se pudieron cargar categorías: '+categoryError.message);return}
   const categoryMeta={
     salado:{name:'Salado',icon:'🧂',color:'#80612a',bg:'#f8f4e8'},
     precocinados:{name:'Precocinados',icon:'🍗',color:'#9a4b28',bg:'#fbf0e8'},
     cerdo:{name:'Cerdo',icon:'🐖',color:'#8a4d36',bg:'#fbf1ed'},
     ternera:{name:'Ternera',icon:'🥩',color:'#7b2e20',bg:'#f8f0e9'},
     iberico:{name:'Cerdo ibérico',icon:'🐖',color:'#70402f',bg:'#f8efeb'},
     pollo:{name:'Pollo',icon:'🐔',color:'#8a6b20',bg:'#fbf7e9'},
     gallina:{name:'Gallina',icon:'🐓',color:'#766044',bg:'#f5f1e9'},
     pavo:{name:'Pavo',icon:'🦃',color:'#80612a',bg:'#f8f4e8'},
     bebidas:{name:'Refrescos y bebidas',icon:'🥤',color:'#356b83',bg:'#edf5f8'}
   };
   (databaseCategories||[]).forEach(c=>{categoryMeta[c.id]={...(categoryMeta[c.id]||{icon:'📦',color:'#765c4d',bg:'#f7f2ec'}),name:c.name,tagline:c.tagline,active:c.active};});
   products.forEach(p=>{if(!categoryMeta[p.category])categoryMeta[p.category]={name:p.category||'Sin categoría',icon:'📦',color:'#765c4d',bg:'#f7f2ec'};});
   const categoryOptions=Object.entries(categoryMeta).map(([id,c])=>'<option value="'+escapeHtml(id)+'">'+escapeHtml(c.name)+'</option>').join('');
   // Orden estable por categoría: cada categoría se crea una sola vez,
   // usando la categoría del catálogo actual y no el texto histórico de Supabase.
   const catalogueById=new Map(catalogue.map(item=>[String(item.id),item]));
   products.sort((a,b)=>{
     const ca=Object.keys(categoryMeta).indexOf(a.category||'');
     const cb=Object.keys(categoryMeta).indexOf(b.category||'');
     if(ca!==cb)return ca-cb;
     return Number(a.sort_order||0)-Number(b.sort_order||0);
   });

   const {data:options,error:optError}=await client.from('product_options').select('id,product_id,label,image,show_image,price_cents,active,sort_order').order('sort_order');
   if(optError){status('adminStatus','No se pudieron cargar las opciones: '+optError.message);return}

   const optionRows=options||[];
   const previousCategorySections=Array.from(document.querySelectorAll('.category-section'));
   const openCategoryPanels=new Set(previousCategorySections.filter(el=>el.open).map(el=>el.dataset.categorySection));
   const hadCategoryPanels=previousCategorySections.length>0;
   // Categorías retiradas de la vista del panel a petición del propietario.
   // No se borran registros ni productos de Supabase.
   const categoriasOcultas=new Set([
     'charcuteria y quesos','cordero y cabrito','despensa y complementos',
     'elaborados de la casa','pollo y aves','vacuno y ternera'
   ]);
   const normalizarCategoria=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
   const groupedProducts=Object.keys(categoryMeta).filter(categoryKey=>
     !categoriasOcultas.has(normalizarCategoria(categoryMeta[categoryKey].name))
   ).map(categoryKey=>({
     key:categoryKey,
     meta:categoryMeta[categoryKey],
     items:products.filter(p=>p.category===categoryKey)
   })).filter(group=>group.items.length>0);

   $('products').innerHTML=groupedProducts.map(group=>{
     const categoryProducts=group.items.map(p=>{
       const cp=catalogue.find(item=>String(item.id)===String(p.id))||catalogue.find(item=>imageSlug(item.nombre)===imageSlug(p.name));
       const opts=optionRows.filter(o=>String(o.product_id)===String(p.id));
       const missing=(cp?.opciones||[]).filter(label=>!opts.some(o=>String(o.label).trim().toLocaleLowerCase('es')===String(label).trim().toLocaleLowerCase('es')));
       const saved=opts.map(o=>optionMarkup(o,p)).join('');
       const pending=missing.map(label=>'<div class="option-item pending-option"><div class="option-heading"><div class="option-name">'+escapeHtml(label)+'</div><span class="option-state">Pendiente</span></div><div class="add-option-row"><input inputmode="decimal" placeholder="Precio (€)" aria-label="Precio para '+escapeHtml(label)+'" data-pending-price="'+p.id+'" data-pending-label="'+escapeHtml(label)+'"><button class="icon-button" title="Añadir opción" aria-label="Añadir opción" data-add-catalogue-option="'+p.id+'" data-option-label="'+escapeHtml(label)+'">➕</button></div></div>').join('');
       const prepValues=Array.isArray(p.preparations)?p.preparations:[];
       const prepEditor='<div class="options-content" style="padding:10px 0"><label>Tipo de venta<select data-sale-unit="'+p.id+'"><option value="">Sin definir</option><option value="kg"'+(p.sale_unit==='kg'?' selected':'')+'>Por kilo</option><option value="ud"'+(p.sale_unit==='ud'?' selected':'')+'>Por unidad</option></select></label><label style="display:block;margin-top:8px">Preparaciones gratuitas (una por línea)<textarea rows="3" data-preparations="'+p.id+'" placeholder="Filetes finos&#10;Filetes gruesos&#10;En dados">'+escapeHtml(prepValues.join('\n'))+'</textarea></label><button type="button" class="secondary" data-save-product-settings="'+p.id+'">Guardar venta y preparaciones</button></div>';
       return '<article class="product product-unified"><div class="product-head"><div style="display:flex;align-items:center;gap:12px;min-width:0"><div class="admin-product-thumb" style="width:86px;height:86px;flex:0 0 86px;border-radius:10px;background:#f2eee9;overflow:hidden;display:grid;place-items:center">'+(imagePublicUrl(p.image||cp?.imagenBiblioteca)?'<img loading="lazy" src="'+escapeHtml(imagePublicUrl(p.image||cp?.imagenBiblioteca))+'" alt="Foto de '+escapeHtml(p.name)+'" style="width:100%;height:100%;object-fit:contain">':'<span style="font-size:11px;text-align:center;padding:5px">Sin imagen</span>')+'</div><div><div class="product-name">'+escapeHtml(p.name)+'</div><div class="category">'+escapeHtml(p.category||group.meta.name)+(p.active?'':' · Inactivo')+'</div></div></div><button type="button" class="image-action product-image-action" data-image-product="'+escapeHtml(p.id)+'" data-image-category="'+escapeHtml(cp?.cat||p.category||'otros')+'" data-image-product-slug="'+escapeHtml(cp?.id||p.name||p.id)+'" data-image-path="'+escapeHtml(p.image||cp?.imagenBiblioteca||'')+'" title="Gestionar imagen principal" aria-label="Gestionar imagen principal de '+escapeHtml(p.name)+'">📷 Imagen</button></div>'+
         '<details class="product-settings"><summary>Editar ficha del producto</summary><div class="options-content"><label>Nombre<input data-product-name="'+escapeHtml(p.id)+'" value="'+escapeHtml(p.name)+'"></label><label>Descripción<textarea rows="2" data-product-description="'+escapeHtml(p.id)+'">'+escapeHtml(p.description||'')+'</textarea></label><label>Categoría<select data-product-category="'+escapeHtml(p.id)+'">'+categoryOptions.replace('value="'+escapeHtml(p.category)+'"','value="'+escapeHtml(p.category)+'" selected')+'</select></label><label>Precio base (€)<input inputmode="decimal" data-product-base="'+escapeHtml(p.id)+'" value="'+(p.base_price_cents==null?'':(Number(p.base_price_cents)/100).toFixed(2))+'"></label><label>Orden<input type="number" data-product-order="'+escapeHtml(p.id)+'" value="'+Number(p.sort_order||0)+'"></label><label><input type="checkbox" data-product-active="'+escapeHtml(p.id)+'"'+(p.active?' checked':'')+'> Producto activo</label><button type="button" class="secondary" data-save-product-details="'+escapeHtml(p.id)+'">Guardar ficha</button><button type="button" data-delete-product="'+escapeHtml(p.id)+'" style="background:#9c2929;margin-left:8px">Eliminar producto</button></div></details>'+ 
         '<details class="options-details" data-product-options="'+p.id+'"'+(openOptionPanels.has(String(p.id))?' open':'')+'><summary>'+(group.key==='bebidas'?'Variedades y formatos':'Preparaciones y opciones')+' <span class="muted">'+opts.length+' guardadas · '+missing.length+' pendientes</span></summary><div class="options-content">'+
         '<details class="product-settings"><summary>Venta y preparaciones gratuitas</summary>'+prepEditor+'</details>'+(saved||'')+(pending||'')+
         '<div class="option" style="margin-top:14px;font-weight:700;color:var(--ink)">'+(group.key==='bebidas'?'Añadir variedad y formato':'Añadir preparación u opción')+'</div><div class="add-option-row"><label class="sr-only" for="new-label-'+p.id+'">Nombre opción</label><input id="new-label-'+p.id+'" placeholder="'+(group.key==='bebidas'?'Ej. Fanta naranja · botella 1,5 L':'Nombre de la opción')+'"><label class="sr-only" for="new-price-'+p.id+'">Precio (€)</label><input id="new-price-'+p.id+'" inputmode="decimal" placeholder="Precio (€)"><button class="icon-button" aria-label="Añadir opción" data-add-option="'+p.id+'">➕</button></div></div></details></article>';
     }).join('');
     const sectionOpen=hadCategoryPanels&&openCategoryPanels.has(String(group.key));
     return '<details class="category-section" data-category-section="'+escapeHtml(group.key)+'"'+(sectionOpen?' open':'')+'><summary class="category-test" style="--cat-color:'+group.meta.color+';--cat-bg:'+group.meta.bg+'"><h2><span class="category-icon" aria-hidden="true">'+group.meta.icon+'</span> '+escapeHtml(group.meta.name)+'</h2><p>Gestiona aquí todos los productos y sus opciones</p></summary>'+categoryProducts+'<div class="category-close-row"><button type="button" class="secondary" data-close-category>Cerrar categoría</button></div></details>';
   }).join('');
   status('adminStatus',products.length+' productos cargados.');
   await loadCategoriesEditor();

 }

 function optionMarkup(o,p){
   return '<div class="option-item"><div class="option-heading"><div class="option-name">'+escapeHtml(o.label)+'</div><button type="button" class="image-action" data-image-option="'+escapeHtml(o.id)+'" data-image-category="'+escapeHtml(((window.PRODUCTOS||[]).find(x=>String(x.id)===String(p.id))||(window.PRODUCTOS||[]).find(x=>imageSlug(x.nombre)===imageSlug(p.name)))?.cat||p.category||'otros')+'" data-image-product-slug="'+escapeHtml(((window.PRODUCTOS||[]).find(x=>String(x.id)===String(p.id))||(window.PRODUCTOS||[]).find(x=>imageSlug(x.nombre)===imageSlug(p.name)))?.id||p.name||p.id)+'" data-image-option-slug="'+escapeHtml(o.label)+'" data-image-path="'+escapeHtml(o.image||'')+'" data-show-image="'+(o.show_image!==false?'true':'false')+'" title="Gestionar imagen de '+escapeHtml(o.label)+'" aria-label="Gestionar imagen de '+escapeHtml(o.label)+'">📷</button><button class="option-toggle'+(o.active?'':' is-off')+'" data-toggle-option="'+o.id+'" data-next-active="'+(o.active?'false':'true')+'" title="'+(o.active?'Desactivar':'Activar')+'" aria-label="'+(o.active?'Desactivar':'Activar')+'">'+(o.active?'ON':'OFF')+'</button></div><div class="option-state">'+(o.active?'Activo':'Inactivo')+(o.image?' · Tiene imagen':' · Usa imagen principal')+'</div><div class="price-row"><label class="sr-only" for="opt-'+o.id+'">Precio (€)</label><input id="opt-'+o.id+'" inputmode="decimal" value="'+(Number(o.price_cents||0)/100).toFixed(2)+'"><button class="save-icon" data-save-option="'+o.id+'" title="Guardar" aria-label="Guardar">💾</button><button class="secondary" data-delete-option="'+o.id+'" aria-label="Eliminar opción">×</button></div></div>';
 }

 function escapeHtml(v){
   return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 }

 $('login').addEventListener('click',async()=>{
   const button=$('login');
   button.disabled=true;
   status('loginStatus','Conectando con Supabase…');
   try {
     const {data,error}=await client.auth.signInWithPassword({email:$('email').value.trim(),password:$('password').value});
     if(error){status('loginStatus','No se pudo iniciar sesión: '+error.message);return}
     status('loginStatus','Acceso correcto. Comprobando autorización…');
     await showSession(data.session);
   } catch(err) {
     status('loginStatus','Error de conexión: '+(err?.message||String(err)));
   } finally {
     button.disabled=false;
   }
 });

 $('logout').addEventListener('click',async()=>{
   await client.auth.signOut();
   location.reload();
 });


 let imageTarget=null;
 let selectedImageFile=null;
 let selectedLibraryPath='';
 let originalImageFile=null;
 let originalImageUrl='';
 let imagePreviewVersion=0;

 function managedStoragePath(path){
   return typeof path==='string' && /^(products|options)\//.test(path);
 }
 function imagePublicUrl(path){
   if(!path)return '';
   if(/^https?:\/\//i.test(path))return path;
   if(String(path).startsWith('img/'))return path;
   if(managedStoragePath(path))return client.storage.from('product-images').getPublicUrl(path).data.publicUrl;
   return 'img/productos/'+String(path).replace(/^\/+/, '')+'.jpg';
 }
 function imageSlug(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'imagen'}
 function fileBase64(file){return file.arrayBuffer().then(buffer=>{const bytes=new Uint8Array(buffer);let binary='';for(let i=0;i<bytes.length;i+=0x8000)binary+=String.fromCharCode(...bytes.subarray(i,i+0x8000));return btoa(binary)})}
 function updateImageToggleText(){
   const toggle=$('imageShowToggle');
   $('imageShowToggleText').textContent=toggle.checked
     ?'Mostrar imagen específica'
     :'Mostrar imagen principal';
 }
 function openImageEditor(target){
   imageTarget=target;
   selectedImageFile=null;
   selectedLibraryPath='';
   originalImageFile=null;
   originalImageUrl='';
   imagePreviewVersion++;
   document.querySelector('input[name="imageFit"][value="contain"]').checked=true;
   $('imageFile').value='';
   $('imageCamera').value='';
   $('imageStatus').textContent='';
   $('imageDialogTitle').textContent=target.kind==='product'?'Imagen principal · '+target.name:'Imagen · '+target.name;
   $('imageToggleRow').hidden=target.kind!=='option';
   $('imageShowToggle').checked=target.showImage!==false;
   updateImageToggleText();
   const previewUrl=imagePublicUrl(target.path);
   $('imagePreview').hidden=!previewUrl;
   if(previewUrl){$('imagePreview').src=previewUrl;originalImageUrl=previewUrl;}
   else{$('imagePreview').removeAttribute('src');originalImageUrl='';}
   $('imageCurrent').textContent=target.path?'Imagen asignada. Puedes sustituirla o quitarla.':'Todavía no hay una imagen propia asignada.';
   $('imageRemove').hidden=!target.path;
   $('imageDialog').showModal();
 }
 async function renderSelectedImage(){
   if(!originalImageFile&&!originalImageUrl)return;
   const version=++imagePreviewVersion;
   const mode=document.querySelector('input[name="imageFit"]:checked')?.value||'contain';
   let sourceUrl='';
   try{
     sourceUrl=originalImageFile?URL.createObjectURL(originalImageFile):originalImageUrl;
     const source=new Image();
     if(!originalImageFile&&/^https?:\/\//i.test(sourceUrl))source.crossOrigin='anonymous';
     source.src=sourceUrl;
     await new Promise((resolve,reject)=>{source.onload=resolve;source.onerror=()=>reject(new Error('No se puede abrir la imagen. Comprueba que la dirección sea accesible.'));});
     if(version!==imagePreviewVersion)return;
     const width=1200,height=900,canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
     const ctx=canvas.getContext('2d');if(!ctx)throw new Error('No se pudo crear la vista previa');
     ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);
     const scale=mode==='cover'?Math.max(width/source.naturalWidth,height/source.naturalHeight):Math.min(width/source.naturalWidth,height/source.naturalHeight);
     const drawWidth=source.naturalWidth*scale,drawHeight=source.naturalHeight*scale;
     ctx.drawImage(source,(width-drawWidth)/2,(height-drawHeight)/2,drawWidth,drawHeight);
     if(originalImageFile)URL.revokeObjectURL(sourceUrl);
     sourceUrl='';
     const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',0.9));
     if(version!==imagePreviewVersion)return;
     if(!blob)throw new Error('El navegador no pudo procesar la imagen.');
     selectedImageFile=new File([blob],((originalImageFile?.name||selectedLibraryPath.split('/').pop()||'imagen-actual').replace(/\.[^.]+$/,'')+'.webp'),{type:blob.type||'image/webp'});
     if($('imagePreview').src.startsWith('blob:'))URL.revokeObjectURL($('imagePreview').src);
     $('imagePreview').src=URL.createObjectURL(blob);$('imagePreview').hidden=false;
     $('imageCurrent').textContent='';status('imageStatus','');
   }catch(error){
     if(version!==imagePreviewVersion)return;
     selectedImageFile=null;status('imageStatus','No se pudo actualizar la imagen: '+(error?.message||String(error)));
   }finally{
     if(sourceUrl&&originalImageFile)URL.revokeObjectURL(sourceUrl);
   }
 }
 function handleSelectedImage(file,inputId){
   if(!file)return;
   if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024){
     selectedImageFile=null;originalImageFile=null;
     $(inputId).value='';
     status('imageStatus','Formato no permitido o archivo superior a 5 MB.');
     return;
   }
   originalImageFile=file;
   renderSelectedImage();
 }

 const GITHUB_PAGES_BASE='https://carniceriarodri.github.io/';
 let currentLibraryFolder='';
 let uploadLibraryFolder='';
 function folderSlug(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9-]+/g,'-').replace(/^-+|-+$/g,'');}
 function libraryPath(folder=currentLibraryFolder){return 'img/productos/biblioteca/'+(folder?folder+'/':'');}
 function libraryImageUrl(path){return GITHUB_PAGES_BASE+path.split('/').map(encodeURIComponent).join('/');}
 function updateLibraryPaths(){
   $('imageLibraryPath').textContent=libraryPath(currentLibraryFolder);
   $('libraryUploadPath').textContent=libraryPath(uploadLibraryFolder);
 }
 async function functionErrorMessage(error){
   let detail=error?.message||String(error);
   try{
     const response=error?.context;
     if(response&&typeof response.clone==='function'){
       const payload=await response.clone().json();
       if(payload?.error)detail=payload.error;
       else if(payload?.message)detail=payload.message;
     }
   }catch(_){}
   return detail;
 }
 async function listLibraryFolder(folder){
   const {data,error}=await client.functions.invoke('github-images',{body:{action:'list-folder',folder}});
   if(error){
     let detail=error.message||'Error al consultar la biblioteca.';
     try{const context=error.context;if(context&&typeof context.json==='function'){const body=await context.json();if(body?.error)detail=body.error;}}catch(_){}
     throw new Error(detail);
   }
   if(data?.error)throw new Error(data.error);
   return Array.isArray(data?.entries)?data.entries:[];
 }
 async function loadImageLibrary(folder=currentLibraryFolder){
   currentLibraryFolder=folder;updateLibraryPaths();
   const grid=$('imageLibraryGrid');grid.innerHTML='';status('imageLibraryStatus','Cargando biblioteca…');
   try{
     const entries=await listLibraryFolder(folder);
     const folders=entries.filter(entry=>entry.type==='dir');
     const images=entries.filter(file=>file.type==='file'&&/\.(jpe?g|png|webp)$/i.test(file.name));
     folders.sort((a,b)=>a.name.localeCompare(b.name,'es'));images.sort((a,b)=>b.name.localeCompare(a.name));
     if(folder){
       const up=document.createElement('button');up.type='button';up.className='secondary';up.textContent='↑ Subir un nivel';
       up.addEventListener('click',()=>loadImageLibrary(folder.includes('/')?folder.slice(0,folder.lastIndexOf('/')):''));
       grid.append(up);
     }
     folders.forEach(dir=>{
       const button=document.createElement('button');button.type='button';button.className='secondary';button.textContent='📁 '+dir.name;
       button.style.cssText='padding:10px;min-width:0;text-align:left';
       button.addEventListener('click',()=>loadImageLibrary(folder?folder+'/'+folderSlug(dir.name):folderSlug(dir.name)));
       grid.append(button);
     });
     for(const file of images){
       const card=document.createElement('button');card.type='button';card.className='secondary';card.style.cssText='padding:6px;min-width:0;background:#f8f6f2;color:var(--ink);border:1px solid var(--line)';
       const img=document.createElement('img');img.src=libraryImageUrl(file.path)+'?v='+encodeURIComponent(file.sha||'');img.alt=file.name;img.loading='lazy';img.style.cssText='display:block;width:100%;height:86px;object-fit:contain;background:white;border-radius:6px';
       const name=document.createElement('span');name.textContent=file.name;name.style.cssText='display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;margin-top:4px';card.append(img,name);
       card.addEventListener('click',()=>{selectedLibraryPath=file.path;selectedImageFile=null;originalImageFile=null;originalImageUrl=libraryImageUrl(file.path);$('imagePreview').src=originalImageUrl;$('imagePreview').hidden=false;$('imageCurrent').textContent='Imagen seleccionada de la biblioteca. Pulsa «Guardar imagen» para asignarla.';status('imageStatus','Imagen de la biblioteca seleccionada.');$('imageLibraryPicker').hidden=true;});
       grid.append(card);
     }
     status('imageLibraryStatus',images.length+' imágenes y '+folders.length+' carpetas disponibles.');return images;
   }catch(error){status('imageLibraryStatus','No se pudo cargar la biblioteca: '+(error?.message||String(error)));return [];}
 }
 async function manageLibraryItem(action,entry){
   const isFolder=entry.type==='dir';
   const currentPath=entry.path;
   if(action==='delete'){
     const warning=isFolder
       ?'¿Borrar la carpeta «'+entry.name+'» y TODO su contenido? Esta acción no se puede deshacer.'
       :'¿Borrar la imagen «'+entry.name+'»? Si está asignada a un producto, se quitará también esa asignación.';
     if(!confirm(warning))return;
   }
   let newName='';
   if(action==='rename'){
     newName=prompt(isFolder?'Nuevo nombre de la carpeta:':'Nuevo nombre del archivo (con extensión):',entry.name);
     if(newName===null)return;
     newName=newName.trim();
     if(!newName||newName===entry.name)return;
   }
   const host=$('libraryUploadNavStatus');
   host.textContent=action==='delete'?'Borrando…':'Renombrando…';
   try{
     const {data,error}=await client.functions.invoke('github-images',{body:{
       action:action==='delete'?'delete-item':'rename-item',
       path:currentPath,
       newName
     }});
     if(error)throw error;
     if(data?.error)throw new Error(data.error);
     host.textContent=action==='delete'?'Elemento borrado correctamente.':'Elemento renombrado correctamente.';
     await refreshUploadFolders();
     if(!$('imageLibraryPicker').hidden)await loadImageLibrary(currentLibraryFolder);
   }catch(error){host.textContent='No se pudo '+(action==='delete'?'borrar':'renombrar')+': '+await functionErrorMessage(error);}
 }
 function libraryItemRow(entry){
   const isFolder=entry.type==='dir';
   const row=document.createElement('div');row.className='library-item';
   const open=document.createElement('button');open.type='button';open.className='library-item-open';
   if(isFolder){
     open.textContent='📁 '+entry.name;
     open.addEventListener('click',()=>{uploadLibraryFolder=uploadLibraryFolder?uploadLibraryFolder+'/'+folderSlug(entry.name):folderSlug(entry.name);refreshUploadFolders();});
   }else{
     const img=document.createElement('img');img.className='library-item-thumb';img.src=libraryImageUrl(entry.path)+'?v='+encodeURIComponent(entry.sha||'');img.alt='';img.loading='lazy';
     const name=document.createElement('span');name.className='library-item-name';name.textContent=entry.name;
     open.append(img,name);
   }
   const actions=document.createElement('div');actions.className='library-item-actions';
   const rename=document.createElement('button');rename.type='button';rename.textContent='✏️';rename.title=isFolder?'Renombrar carpeta':'Renombrar archivo';rename.setAttribute('aria-label',rename.title);
   rename.addEventListener('click',()=>manageLibraryItem('rename',entry));
   const remove=document.createElement('button');remove.type='button';remove.textContent='🗑️';remove.title=isFolder?'Borrar carpeta y contenido':'Borrar archivo';remove.setAttribute('aria-label',remove.title);
   remove.addEventListener('click',()=>manageLibraryItem('delete',entry));
   actions.append(rename,remove);row.append(open,actions);return row;
 }
 async function refreshUploadFolders(){
   const host=$('libraryUploadFolders');host.innerHTML='';
   updateLibraryPaths();
   try{
     const entries=await listLibraryFolder(uploadLibraryFolder);
     const folders=entries.filter(entry=>entry.type==='dir').sort((a,b)=>a.name.localeCompare(b.name,'es'));
     const files=entries.filter(entry=>entry.type==='file'&&/\.(jpe?g|png|webp)$/i.test(entry.name)).sort((a,b)=>a.name.localeCompare(b.name,'es'));
     if(uploadLibraryFolder){
       const up=document.createElement('button');up.type='button';up.className='secondary';up.textContent='⬆️ Subir un nivel';
       up.addEventListener('click',()=>{uploadLibraryFolder=uploadLibraryFolder.includes('/')?uploadLibraryFolder.slice(0,uploadLibraryFolder.lastIndexOf('/')):'';refreshUploadFolders();});
       host.append(up);
     }
     folders.forEach(dir=>host.append(libraryItemRow(dir)));
     files.forEach(file=>host.append(libraryItemRow(file)));
     $('libraryUploadNavStatus').textContent=folders.length+' carpetas y '+files.length+' imágenes en esta ubicación. Puedes entrar, renombrar o borrar.';
   }catch(error){$('libraryUploadNavStatus').textContent='No se pudieron cargar las carpetas: '+await functionErrorMessage(error);}
 }
 $('openImageLibrary').addEventListener('click',async()=>{$('imageLibraryPicker').hidden=!$('imageLibraryPicker').hidden;if(!$('imageLibraryPicker').hidden)await loadImageLibrary('');});
 $('refreshImageLibrary').addEventListener('click',()=>loadImageLibrary(currentLibraryFolder));
 $('libraryGoRoot').addEventListener('click',()=>loadImageLibrary(''));
 $('libraryUploadUp').addEventListener('click',()=>{uploadLibraryFolder=uploadLibraryFolder.includes('/')?uploadLibraryFolder.slice(0,uploadLibraryFolder.lastIndexOf('/')):'';refreshUploadFolders();});
 $('libraryUploadRoot').addEventListener('click',()=>{uploadLibraryFolder='';refreshUploadFolders();});
 $('libraryCreateFolderButton').addEventListener('click',async()=>{
   const raw=prompt('Nombre de la nueva carpeta:');
   if(raw===null)return;
   const folder=folderSlug(raw),button=$('libraryCreateFolderButton'),statusEl=$('libraryUploadNavStatus');
   if(!folder||folder.length>80){statusEl.textContent='Escribe un nombre válido de hasta 80 caracteres.';return;}
   button.disabled=true;statusEl.textContent='Creando carpeta…';
   try{
     const {data,error}=await client.functions.invoke('github-images',{body:{action:'create-folder',folder:uploadLibraryFolder?uploadLibraryFolder+'/'+folder:folder}});
     if(error)throw error;
     if(!data?.path)throw new Error('GitHub no confirmó la creación de la carpeta.');
     uploadLibraryFolder=uploadLibraryFolder?uploadLibraryFolder+'/'+folder:folder;
     statusEl.textContent='Carpeta creada correctamente.';
     await refreshUploadFolders();await loadImageLibrary(currentLibraryFolder);
   }catch(error){statusEl.textContent='No se pudo crear la carpeta: '+await functionErrorMessage(error);}
   finally{button.disabled=false;}
 });
 $('libraryUploadButton').addEventListener('click',()=>$('libraryUploadFiles').click());
 $('libraryUploadFolderButton').addEventListener('click',()=>$('libraryUploadFolder').click());
 $('libraryUploadZipButton').addEventListener('click',()=>$('libraryUploadZip').click());
 async function uploadLibraryFiles(files,input,button,preserveFolders){
   if(!files.length)return;
   const statusEl=$('libraryUploadStatus'),baseFolder=uploadLibraryFolder;
   const valid=files.filter(file=>['image/jpeg','image/png','image/webp'].includes(file.type)&&file.size>0&&file.size<=5*1024*1024);
   const invalid=files.length-valid.length;
   if(!valid.length){statusEl.textContent='No hay imágenes válidas. Usa JPG, PNG o WebP de hasta 5 MB cada una.';input.value='';return;}
   input.disabled=true;button.disabled=true;
   let uploaded=0,failed=0;
   statusEl.textContent='Preparando '+valid.length+' imágenes…';
   for(let i=0;i<valid.length;i++){
     const file=valid[i];
     let destination=baseFolder;
     if(preserveFolders){
       const relative=String(file.webkitRelativePath||file.name).split('/');
       relative.pop();
       const nested=relative.slice(0,-1).map(folderSlug).filter(Boolean);
       if(nested.length)destination=[baseFolder,...nested].filter(Boolean).join('/');
     }
     statusEl.textContent='Subiendo '+(i+1)+' de '+valid.length+': '+file.name;
     try{
       const {data,error}=await client.functions.invoke('github-images',{body:{
         action:'upload',kind:'product',category:'biblioteca',productSlug:destination,
         fileName:file.name,contentType:file.type,contentBase64:await fileBase64(file)
       }});
       if(error)throw error;
       if(!data?.path)throw new Error('GitHub no devolvió la ruta.');
       uploaded++;
     }catch(error){
       failed++;
       statusEl.textContent='Error con '+file.name+': '+await functionErrorMessage(error);
     }
   }
   input.disabled=false;button.disabled=false;input.value='';
   statusEl.textContent='Proceso terminado: '+uploaded+' imágenes guardadas'+(failed?', '+failed+' errores':'')+(invalid?', '+invalid+' archivos omitidos por formato o tamaño':'')+'.';
   await refreshUploadFolders();await loadImageLibrary(currentLibraryFolder);
 }
 $('libraryUploadFiles').addEventListener('change',async()=>{
   await uploadLibraryFiles(Array.from($('libraryUploadFiles').files||[]),$('libraryUploadFiles'),$('libraryUploadButton'),false);
 });
 $('libraryUploadFolder').addEventListener('change',async()=>{
   await uploadLibraryFiles(Array.from($('libraryUploadFolder').files||[]),$('libraryUploadFolder'),$('libraryUploadFolderButton'),true);
 });
 $('libraryUploadZip').addEventListener('change',async()=>{
   const input=$('libraryUploadZip'),button=$('libraryUploadZipButton'),archive=input.files?.[0];
   if(!archive)return;
   if(!window.JSZip){$('libraryUploadStatus').textContent='No se ha podido cargar el descompresor ZIP. Recarga el panel.';input.value='';return;}
   input.disabled=true;button.disabled=true;
   try{
     $('libraryUploadStatus').textContent='Abriendo archivo ZIP…';
     const zip=await JSZip.loadAsync(archive);
     const entries=Object.values(zip.files).filter(entry=>!entry.dir&&!entry.name.startsWith('__MACOSX/')&&!entry.name.split('/').pop().startsWith('._'));
     const imageEntries=entries.filter(entry=>/\.(jpe?g|png|webp)$/i.test(entry.name));
     if(!imageEntries.length)throw new Error('El ZIP no contiene imágenes JPG, PNG o WebP.');
     const totalSize=imageEntries.reduce((sum,entry)=>sum+(entry._data?.uncompressedSize||0),0);
     if(totalSize>100*1024*1024)throw new Error('El contenido de imágenes del ZIP supera el límite de 100 MB.');
     const files=[];
     for(let i=0;i<imageEntries.length;i++){
       const entry=imageEntries[i],name=entry.name.split('/').pop();
       $('libraryUploadStatus').textContent='Descomprimiendo '+(i+1)+' de '+imageEntries.length+': '+name;
       const blob=await entry.async('blob');
       const type=/\.png$/i.test(name)?'image/png':/\.webp$/i.test(name)?'image/webp':'image/jpeg';
       const file=new File([blob],name,{type});
       Object.defineProperty(file,'webkitRelativePath',{value:entry.name});
       files.push(file);
     }
     await uploadLibraryFiles(files,input,button,true);
   }catch(error){
     $('libraryUploadStatus').textContent='No se pudo procesar el ZIP: '+(error?.message||String(error));
   }finally{
     input.disabled=false;button.disabled=false;input.value='';
   }
 });
 refreshUploadFolders();
 $('imageShowToggle').addEventListener('change',updateImageToggleText);
 document.querySelectorAll('input[name="imageFit"]').forEach(input=>input.addEventListener('change',()=>{if(originalImageFile||originalImageUrl)renderSelectedImage();}));
 $('imageFile').addEventListener('change',()=>handleSelectedImage($('imageFile').files?.[0]||null,'imageFile'));
 $('imageCamera').addEventListener('change',()=>handleSelectedImage($('imageCamera').files?.[0]||null,'imageCamera'));
 function closeImageEditor(){
   if($('imagePreview').src.startsWith('blob:'))URL.revokeObjectURL($('imagePreview').src);
   $('imageDialog').close();
   imageTarget=null;
   selectedImageFile=null;
   originalImageFile=null;
   originalImageUrl='';
   selectedLibraryPath='';
   imagePreviewVersion++;
 }
 $('imageClose').addEventListener('click',closeImageEditor);
 $('imageCancel').addEventListener('click',closeImageEditor);
 $('imageDialog').addEventListener('click',e=>{
   if(e.target===$('imageDialog'))closeImageEditor();
 });
 $('imageSave').addEventListener('click',async()=>{
   if(!imageTarget)return;
   const button=$('imageSave');
   button.disabled=true;
   $('imageRemove').disabled=true;
   status('imageStatus','Guardando imagen…');
   try{
     const target=imageTarget;
     const changes={};
     let newPath=target.path||null;
     if(selectedImageFile){
       const {data:uploadData,error:uploadError}=await client.functions.invoke('github-images',{body:{action:'upload',kind:target.kind,id:target.id,category:target.category,productSlug:target.productSlug,optionSlug:target.optionSlug,contentType:selectedImageFile.type,fileName:selectedImageFile.name,contentBase64:await fileBase64(selectedImageFile)}});
       if(uploadError)throw uploadError;
       if(!uploadData?.path)throw new Error('GitHub no devolvió la ruta de la imagen.');
       newPath=uploadData.path;changes.image=newPath;
     } else if(selectedLibraryPath){
       newPath=selectedLibraryPath;
       changes.image=newPath;
     }
     if(target.kind==='option')changes.show_image=$('imageShowToggle').checked;
     const table=target.kind==='product'?'products':'product_options';
     const {error:updateError}=await client.from(table).update(changes).eq('id',target.id);
     if(updateError)throw updateError;
     closeImageEditor();
     status('adminStatus','Imagen guardada correctamente.');
     await loadProducts();
   }catch(error){
     status('imageStatus','No se pudo guardar: '+(error?.message||String(error)));
   }finally{
     button.disabled=false;
     $('imageRemove').disabled=false;
   }
 });
 $('imageRemove').addEventListener('click',async()=>{
   if(!imageTarget?.path)return;
   if(!confirm('¿Quitar la imagen asignada?'))return;
   const button=$('imageRemove');
   button.disabled=true;
   $('imageSave').disabled=true;
   status('imageStatus','Quitando imagen…');
   try{
     const target=imageTarget;
     const table=target.kind==='product'?'products':'product_options';
     const changes=target.kind==='option'?{image:null,show_image:false}:{image:null};
     const {error:updateError}=await client.from(table).update(changes).eq('id',target.id);
     if(updateError)throw updateError;
     closeImageEditor();
     status('adminStatus','Imagen quitada. Se utilizará la imagen principal cuando corresponda.');
     await loadProducts();
   }catch(error){
     status('imageStatus','No se pudo quitar: '+(error?.message||String(error)));
   }finally{
     button.disabled=false;
     $('imageSave').disabled=false;
   }
 });


 $('products').addEventListener('click',async e=>{
   const closeCategoryButton=e.target.closest('[data-close-category]');
   if(closeCategoryButton){
     const categorySection=closeCategoryButton.closest('.category-section');
     if(categorySection)categorySection.open=false;
     return;
   }

   const imageProductButton=e.target.closest('[data-image-product]');
   const imageOptionButton=e.target.closest('[data-image-option]');
   if(imageProductButton){
     openImageEditor({kind:'product',id:imageProductButton.dataset.imageProduct,name:imageProductButton.closest('.product')?.querySelector('.product-name')?.textContent||'Producto',category:imageProductButton.dataset.imageCategory,productSlug:imageProductButton.dataset.imageProductSlug,path:imageProductButton.dataset.imagePath||null});
     return;
   }
   if(imageOptionButton){
     openImageEditor({kind:'option',id:imageOptionButton.dataset.imageOption,name:imageOptionButton.closest('.option-item')?.querySelector('.option-name')?.textContent||'Preparación',category:imageOptionButton.dataset.imageCategory,productSlug:imageOptionButton.dataset.imageProductSlug,optionSlug:imageOptionButton.dataset.imageOptionSlug,path:imageOptionButton.dataset.imagePath||null,showImage:imageOptionButton.dataset.showImage!=='false'});
     return;
   }

   const detailsButton=e.target.closest('[data-save-product-details]');
   if(detailsButton){
     const id=detailsButton.dataset.saveProductDetails;
     const name=document.querySelector('[data-product-name="'+CSS.escape(id)+'"]').value.trim();
     const description=document.querySelector('[data-product-description="'+CSS.escape(id)+'"]').value.trim();
     const category=document.querySelector('[data-product-category="'+CSS.escape(id)+'"]').value;
     const base=document.querySelector('[data-product-base="'+CSS.escape(id)+'"]').value.trim();
     const order=Number(document.querySelector('[data-product-order="'+CSS.escape(id)+'"]').value);
     const active=document.querySelector('[data-product-active="'+CSS.escape(id)+'"]').checked;
     if(!name||!category||!Number.isFinite(order)|| (base!==''&&(!Number.isFinite(centsFromInput(base))||centsFromInput(base)<0))){status('adminStatus','Revisa los datos de la ficha.');return}
     detailsButton.disabled=true;
     const {error}=await client.from('products').update({name,description,category,base_price_cents:base===''?null:centsFromInput(base),sort_order:order,active}).eq('id',id);
     detailsButton.disabled=false;
     if(error){status('adminStatus','Error al guardar ficha: '+error.message);return}
     status('adminStatus','Ficha guardada en Supabase.');await loadProducts();return;
   }

   const settingsButton=e.target.closest('[data-save-product-settings]');
   if(settingsButton){
     const id=settingsButton.dataset.saveProductSettings;
     const unit=$('[data-sale-unit="'+id+'"]').value||null;
     const preparations=$('[data-preparations="'+id+'"]').value.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
     settingsButton.disabled=true;
     status('adminStatus','Guardando configuración…');
     const {error}=await client.from('products').update({sale_unit:unit,preparations}).eq('id',id);
     settingsButton.disabled=false;
     if(error){status('adminStatus','No se pudo guardar: '+error.message);return}
     status('adminStatus','Tipo de venta y preparaciones guardados.');
     await loadProducts();
     return;
   }

   const productId=e.target.dataset.saveProduct;
   const optionId=e.target.dataset.saveOption;
   const addOptionProductId=e.target.dataset.addOption;
   const toggleOptionId=e.target.dataset.toggleOption;
   const deleteOptionId=e.target.dataset.deleteOption;
   const catalogOptionProductId=e.target.dataset.useCatalogOption;

   if(catalogOptionProductId){
     $('new-label-'+catalogOptionProductId).value=e.target.dataset.optionLabel||'';
     $('new-price-'+catalogOptionProductId).focus();
     status('adminStatus','Escribe el precio de esa opción y pulsa Añadir.');
     return;
   }

   const pendingButton=e.target.closest('[data-add-catalogue-option]');
   if(pendingButton){
     const pendingProductId=pendingButton.dataset.addCatalogueOption;
     const label=pendingButton.dataset.optionLabel||'';
     const priceInput=pendingButton.parentElement.querySelector('[data-pending-price]');
     const cents=centsFromInput(priceInput?.value||'');
     if(!Number.isFinite(cents)||cents<=0){
       status('adminStatus','Introduce un precio válido para '+label+'.');
       return;
     }
     pendingButton.disabled=true;
     status('adminStatus','Añadiendo '+label+'…');
     const {data:existing,error:readError}=await client.from('product_options').select('sort_order').eq('product_id',pendingProductId).order('sort_order',{ascending:false}).limit(1);
     if(readError){
       pendingButton.disabled=false;
       status('adminStatus','No se pudo preparar la opción: '+readError.message);
       return;
     }
     const nextOrder=(existing&&existing.length?Number(existing[0].sort_order||0)+1:0);
     const {error}=await client.from('product_options').insert({product_id:pendingProductId,label,price_cents:cents,active:true,sort_order:nextOrder});
     pendingButton.disabled=false;
     if(error){status('adminStatus','No se pudo añadir: '+error.message);return}
     status('adminStatus',label+' añadida y activada.');
     await loadProducts();
     return;
   }

   if(deleteOptionId){
     if(!confirm('¿Eliminar definitivamente esta opción? Esta acción no se puede deshacer.'))return;
     e.target.disabled=true;
     status('adminStatus','Eliminando opción…');
     const {error}=await client.from('product_options').delete().eq('id',deleteOptionId);
     e.target.disabled=false;
     if(error){status('adminStatus','No se pudo eliminar: '+error.message);return}
     status('adminStatus','Opción eliminada.');
     await loadProducts();
     return;
   }

   if(toggleOptionId){
     const nextActive=e.target.dataset.nextActive==='true';
     if(!confirm(nextActive?'¿Quieres volver a activar esta opción?':'¿Quieres desactivar esta opción?'))return;
     const toggleButton=e.target.closest('[data-toggle-option]');
     if(!toggleButton)return;
     toggleButton.disabled=true;
     status('adminStatus',nextActive?'Activando opción…':'Desactivando opción…');
     const {error}=await client.from('product_options').update({active:nextActive}).eq('id',toggleOptionId);
     toggleButton.disabled=false;
     if(error){status('adminStatus','No se pudo cambiar el estado: '+error.message);return}
     toggleButton.dataset.nextActive=nextActive?'false':'true';
     toggleButton.textContent=nextActive?'ON':'OFF';
     toggleButton.classList.toggle('is-off',!nextActive);
     toggleButton.title=nextActive?'Desactivar':'Activar';
     toggleButton.setAttribute('aria-label',nextActive?'Desactivar':'Activar');
     const stateLabel=toggleButton.closest('.option-item')?.querySelector('.option-state');
     if(stateLabel)stateLabel.textContent=nextActive?'Activo':'Inactivo';
     status('adminStatus',nextActive?'Opción activada.':'Opción desactivada.');
     return;
   }

   if(addOptionProductId){
     const label=$('new-label-'+addOptionProductId).value.trim();
     const cents=centsFromInput($('new-price-'+addOptionProductId).value);
     if(!label){status('adminStatus','Escribe el nombre de la opción.');return}
     if(!Number.isFinite(cents)||cents<0){status('adminStatus','Introduce un precio válido.');return}
     e.target.disabled=true;
     status('adminStatus','Añadiendo opción…');
     const {data:existing,error:readError}=await client.from('product_options').select('sort_order').eq('product_id',addOptionProductId).order('sort_order',{ascending:false}).limit(1);
     if(readError){
       e.target.disabled=false;
       status('adminStatus','No se pudo preparar la opción: '+readError.message);
       return;
     }
     const nextOrder=(existing&&existing.length?Number(existing[0].sort_order||0)+1:0);
     const {error:insertError}=await client.from('product_options').insert({product_id:addOptionProductId,label,price_cents:cents,active:true,sort_order:nextOrder});
     e.target.disabled=false;
     if(insertError){status('adminStatus','No se pudo añadir la opción: '+insertError.message);return}
     status('adminStatus','Opción añadida correctamente.');
     await loadProducts();
     return;
   }

   if(!productId&&!optionId)return;

   e.target.disabled=true;
   status('adminStatus','Guardando…');
   let result;

   if(productId){
     const cents=centsFromInput($('base-'+productId).value);
     if(!Number.isFinite(cents)||cents<0){
       status('adminStatus','Introduce un precio válido.');
       e.target.disabled=false;
       return;
     }
     result=await client.from('products').update({base_price_cents:cents}).eq('id',productId);
   } else {
     const cents=centsFromInput($('opt-'+optionId).value);
     if(!Number.isFinite(cents)||cents<0){
       status('adminStatus','Introduce un precio válido.');
       e.target.disabled=false;
       return;
     }
     result=await client.from('product_options').update({price_cents:cents}).eq('id',optionId);
   }

   e.target.disabled=false;
   if(result.error){status('adminStatus','Error al guardar: '+result.error.message);return}
   status('adminStatus','Precio guardado correctamente.');
 });

 client.auth.getSession()
   .then(({data,error})=>{
     if(error)throw error;
     return showSession(data && data.session);
   })
   .catch(err=>{
     $('adminPanel').hidden=true;
     $('products').innerHTML='';
     status('loginStatus','No se pudo comprobar la sesión: '+(err?.message||String(err)));
   });

 client.auth.onAuthStateChange((_event,session)=>{
   if(!session){
     $('loginPanel').hidden=false;
     $('adminPanel').hidden=true;
     $('logout').hidden=true;
     $('products').innerHTML='';
   }
 });
})();
