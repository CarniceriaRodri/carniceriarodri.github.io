(() => {
'use strict';
const SUPABASE_URL='https://ugqiomoywgpkmogcdjqn.supabase.co';
const SUPABASE_KEY='sb_publishable_FU3fmq19uyZ4jUmF_uhFgg_ywVmFPrL';
const $=id=>document.getElementById(id);
const client=window.supabase?.createClient(SUPABASE_URL,SUPABASE_KEY);
let session=null;
const slug=value=>String(value||'sin-nombre').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'sin-nombre';
function message(id,text){$(id).textContent=text}
function publicUrl(path){
 if(!path)return '';
 if(/^https?:\/\//i.test(path))return path;
 if(String(path).startsWith('img/'))return new URL(path,location.href).href;
 if(/^(products|options)\//.test(path))return client.storage.from('product-images').getPublicUrl(path).data.publicUrl;
 return new URL('img/productos/'+String(path).replace(/^\/+/, '')+'.jpg',location.href).href;
}
async function checkSession(next){
 session=next;
 if(!session?.user?.id){$('loginPanel').hidden=false;$('backupPanel').hidden=true;return;}
 $('loginPanel').hidden=true;$('backupPanel').hidden=true;message('loginStatus','Comprobando permisos…');
 const {data,error}=await client.from('admin_users').select('user_id').eq('user_id',session.user.id).maybeSingle();
 if(error||!data){message('loginStatus',error?'No se pudieron verificar los permisos.':'Esta cuenta no está autorizada.');await client.auth.signOut();return;}
 $('backupPanel').hidden=false;message('loginStatus','');
}
async function init(){
 if(!client){message('loginStatus','No se pudo iniciar Supabase. Comprueba la conexión.');return;}
 const {data}=await client.auth.getSession();await checkSession(data.session);
 client.auth.onAuthStateChange((_event,next)=>{setTimeout(()=>checkSession(next),0)});
}
$('login').addEventListener('click',async()=>{
 const button=$('login');button.disabled=true;message('loginStatus','Entrando…');
 try{const {data,error}=await client.auth.signInWithPassword({email:$('email').value.trim(),password:$('password').value});if(error)throw error;await checkSession(data.session);}
 catch(e){message('loginStatus','No se pudo iniciar sesión: '+(e.message||String(e)));}
 finally{button.disabled=false;}
});
$('logout').addEventListener('click',()=>client.auth.signOut());
$('download').addEventListener('click',async()=>{
 const button=$('download');button.disabled=true;$('progress').hidden=false;$('progressBar').style.width='0%';message('status','Consultando catálogo…');
 try{
  const [{data:products,error:pe},{data:options,error:oe}]=await Promise.all([
   client.from('products').select('id,name,category,image').order('sort_order'),
   client.from('product_options').select('id,product_id,label,image').order('sort_order')
  ]);
  if(pe)throw pe;if(oe)throw oe;
  const byId=new Map((products||[]).map(p=>[String(p.id),p]));
  const files=[];
  for(const p of products||[])if(p.image)files.push({path:p.image,folder:slug(p.category)+'/'+slug(p.name),name:slug(p.name)+extension(p.image),label:p.name+' (principal)'});
  for(const o of options||[]){const p=byId.get(String(o.product_id));if(p&&o.image)files.push({path:o.image,folder:slug(p.category)+'/'+slug(p.name),name:slug(o.label)+extension(o.image),label:p.name+' · '+o.label});}
  if(!files.length)throw new Error('No se encontraron imágenes asignadas en el catálogo.');
  const zip=new JSZip();const used=new Set();let done=0,failed=[];
  message('status','Descargando '+files.length+' imágenes…');
  for(const f of files){
   try{
    const url=publicUrl(f.path);const response=await fetch(url);
    if(!response.ok)throw new Error('HTTP '+response.status);
    const blob=await response.blob();if(!blob.size)throw new Error('Archivo vacío');
    let name=f.folder+'/'+f.name;let n=2;while(used.has(name)){name=f.folder+'/'+f.name.replace(/(\.[^.]+)$/,'-'+n+'$1');n++;}used.add(name);
    zip.file(name,blob);
   }catch(e){failed.push(f.label+': '+(e.message||String(e)));}
   done++;$('progressBar').style.width=Math.round(done/files.length*75)+'%';
   message('status','Descargadas '+done+' de '+files.length+' imágenes.'+(failed.length?'\nNo disponibles: '+failed.length:''));
  }
  if(!used.size)throw new Error('No se pudo descargar ninguna imagen. Revisa la conexión y los permisos de lectura.');
  zip.file('LEEME.txt','Copia de seguridad de imágenes de Carnicería Rodri.\nArchivos incluidos: '+used.size+'\nFecha: '+new Date().toLocaleString('es-ES')+'\n'+(failed.length?'\nNo se pudieron descargar:\n'+failed.join('\n'):''));
  message('status','Comprimiendo imágenes…');
  const content=await zip.generateAsync({type:'blob'},meta=>{$('progressBar').style.width=(75+Math.round(meta.percent*.25))+'%';});
  const url=URL.createObjectURL(content);const a=document.createElement('a');a.href=url;a.download='Carniceria_Rodri_Imagenes_'+new Date().toISOString().slice(0,10)+'.zip';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
  $('progressBar').style.width='100%';
  message('status','ZIP preparado: '+used.size+' imágenes incluidas.'+(failed.length?'\nAtención: '+failed.length+' imágenes no se pudieron descargar. Consulta el archivo LEEME.txt dentro del ZIP.':'\nLa copia está completa.'));
 }catch(e){message('status','No se pudo crear la copia: '+(e.message||String(e)));}
 finally{button.disabled=false;}
});
function extension(path){const clean=String(path||'').split('?')[0];const match=clean.match(/\.(jpe?g|png|webp|gif)$/i);return match?'.'+match[1].toLowerCase():'.jpg';}
init();
})();