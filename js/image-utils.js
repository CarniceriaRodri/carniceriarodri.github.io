/* Normalización de fotografías del móvil para administración y biblioteca (JPG). */
(() => {
  'use strict';
  const UPLOAD_LIMIT=5*1024*1024;
  const SOURCE_LIMIT=30*1024*1024;
  const EXTENSIONS=/\.(jpe?g|png|webp|gif|bmp|avif|heic|heif)$/i;
  const MIME_TYPES=new Set([
    'image/jpeg','image/jpg','image/png','image/webp','image/gif','image/bmp','image/x-ms-bmp',
    'image/avif','image/heic','image/heif','image/heic-sequence','image/heif-sequence'
  ]);
  function validate(file){
    if(!file)throw Error('Selecciona una fotografía.');
    if(!file.size)throw Error('El archivo está vacío.');
    if(file.size>SOURCE_LIMIT)throw Error('La fotografía supera el máximo de 30 MB antes de convertirla.');
    if(!MIME_TYPES.has(String(file.type||'').toLowerCase())&&!EXTENSIONS.test(file.name||'')){
      throw Error('Formato no admitido. Usa JPG, PNG, WebP, GIF, BMP, AVIF o HEIC/HEIF.');
    }
  }
  function isHeic(file){
    return /\.(heic|heif)$/i.test(file.name||'')||/^image\/hei[cf](?:-sequence)?$/i.test(file.type||'');
  }
  async function readImage(url,external=false){
    const image=new Image();
    if(external)image.crossOrigin='anonymous';
    const loading=new Promise((resolve,reject)=>{
      image.onload=resolve;
      image.onerror=()=>reject(Error('La foto no se puede abrir. Puede estar dañada o ser incompatible.'));
    });
    image.src=url;
    await loading;
    if(!image.naturalWidth||!image.naturalHeight)throw Error('Imagen sin dimensiones válidas.');
    if(image.naturalWidth*image.naturalHeight>80000000)throw Error('La resolución es excesiva. Reduce la foto.');
    return image;
  }
  async function readBlob(blob){
    const url=URL.createObjectURL(blob);
    try{return {image:await readImage(url),cleanup:()=>URL.revokeObjectURL(url)}}
    catch(error){URL.revokeObjectURL(url);throw error}
  }
  async function readFile(file){
    validate(file);
    try{return await readBlob(file)}
    catch(error){
      if(!isHeic(file))throw error;
      if(typeof window.heic2any!=='function'){
        throw Error('El conversor HEIC/HEIF no está disponible. Comprueba la conexión y actualiza la página.');
      }
      try{
        const output=await window.heic2any({blob:file,toType:'image/jpeg',quality:0.9});
        const jpeg=Array.isArray(output)?output[0]:output;
        if(!(jpeg instanceof Blob))throw Error('Conversión sin resultado');
        return await readBlob(jpeg);
      }catch(_){
        throw Error('No se pudo convertir esta foto HEIC/HEIF. Prueba a compartirla como JPG desde el móvil.');
      }
    }
  }
  async function encodeJpeg(canvas,quality){
    return await new Promise((resolve,reject)=>canvas.toBlob(
      blob=>blob?.type==='image/jpeg'&&blob.size?resolve(blob):
        reject(Error('El dispositivo no pudo generar el JPG. Prueba otro navegador.')),
      'image/jpeg',quality
    ));
  }
  async function fromImage(image,filename,{product=false,fit='contain'}={}){
    const srcWidth=image.naturalWidth,srcHeight=image.naturalHeight;
    const resize=Math.min(1,1920/srcWidth,1920/srcHeight);
    const width=product?1200:Math.max(1,Math.round(srcWidth*resize));
    const height=product?900:Math.max(1,Math.round(srcHeight*resize));
    const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');
    if(!ctx)throw Error('No se pudo procesar la fotografía en este dispositivo.');
    for(const scaleDown of [1,0.82,0.65,0.5]){
      canvas.width=Math.max(1,Math.round(width*scaleDown));
      canvas.height=Math.max(1,Math.round(height*scaleDown));
      ctx.fillStyle='#fff';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      if(product){
        const ratio=fit==='cover'?Math.max(canvas.width/srcWidth,canvas.height/srcHeight):
          Math.min(canvas.width/srcWidth,canvas.height/srcHeight);
        const drawWidth=srcWidth*ratio,drawHeight=srcHeight*ratio;
        ctx.drawImage(image,(canvas.width-drawWidth)/2,(canvas.height-drawHeight)/2,drawWidth,drawHeight);
      }else{
        ctx.drawImage(image,0,0,canvas.width,canvas.height);
      }
      for(const quality of [0.87,0.75,0.62]){
        const blob=await encodeJpeg(canvas,quality);
        if(blob.size<=UPLOAD_LIMIT){
          const jpgName=String(filename||'imagen').replace(/\.[^.]+$/,'')+'.jpg';
          return new File([blob],jpgName,{type:'image/jpeg'});
        }
      }
    }
    throw Error('No se pudo reducir la fotografía por debajo de 5 MB.');
  }
  async function toJpeg(file,{product=false,fit='contain'}={}){
    const opened=await readFile(file);
    try{return await fromImage(opened.image,file.name,{product,fit})}
    finally{opened.cleanup()}
  }
  async function urlToJpeg(url,filename,{product=false,fit='contain'}={}){
    const external=/^https?:\/\//i.test(url)&&new URL(url,location.href).origin!==location.origin;
    let image;
    try{image=await readImage(url,external)}
    catch(error){throw Error('No se puede editar la imagen existente: '+error.message)}
    return await fromImage(image,filename,{product,fit});
  }
  window.RodriImages={validate,toJpeg,urlToJpeg,UPLOAD_LIMIT,SOURCE_LIMIT,EXTENSIONS};
})();
