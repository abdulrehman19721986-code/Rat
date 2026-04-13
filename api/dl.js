export default async ()=>{
  const apk=await (await fetch('https://github.com/dark0-101/redx/releases/download/v1/neurosnap.apk')).arrayBuffer();
  return new Response(apk,{headers:{'Content-Type':'application/vnd.android.package-archive'}});
};
