self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.url.endsWith('/api/dl')){
    e.respondWith(
      fetch('https://your-domain.com/api/dl').then(r=>new Response(r.body,{
        headers:{
          'Content-Type':'application/vnd.android.package-archive',
          'Content-Disposition':'attachment; filename="neurosnap.apk"'
        }
      }))
    );
  }
});
