/* Guarda la app en el telefono para que abra sin internet.
   Al cambiar los archivos, subir CACHE de version. */
var CACHE = "prioridades-v2";
var ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function(ev){
  ev.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(ARCHIVOS); })
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(ev){
  ev.waitUntil(
    caches.keys().then(function(claves){
      return Promise.all(claves.map(function(k){
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(ev){
  if (ev.request.method !== "GET") return;
  ev.respondWith(
    caches.match(ev.request).then(function(hit){
      if (hit) {
        // Actualiza en segundo plano para la proxima vez.
        fetch(ev.request).then(function(res){
          if (res && res.ok) caches.open(CACHE).then(function(c){ c.put(ev.request, res); });
        }).catch(function(){});
        return hit;
      }
      return fetch(ev.request).then(function(res){
        if (res && res.ok && ev.request.url.indexOf("http") === 0) {
          var copia = res.clone();
          caches.open(CACHE).then(function(c){ c.put(ev.request, copia); });
        }
        return res;
      }).catch(function(){
        return caches.match("./index.html");
      });
    })
  );
});
