/* Guarda la app en el telefono para que abra sin internet.
   Al cambiar los archivos, subir CACHE de version. */
var CACHE = "prioridades-v3";
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
    caches.open(CACHE).then(function(c){
      // cache:"reload" evita que el navegador nos pase una copia vieja suya.
      return Promise.all(ARCHIVOS.map(function(url){
        return fetch(new Request(url, { cache: "reload" })).then(function(res){
          if (res && res.ok) return c.put(url, res);
        }).catch(function(){});
      }));
    }).then(function(){ return self.skipWaiting(); })
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

function esPantalla(req){
  return req.mode === "navigate"
    || (req.headers.get("accept") || "").indexOf("text/html") >= 0;
}

/* La pantalla principal se pide primero a la red, asi una version nueva se ve
   al abrir y no recien la segunda vez. Si no hay señal o tarda, sale la copia
   guardada y la red sigue actualizandola para la proxima. */
function pantalla(req){
  var red = fetch(req).then(function(res){
    if (res && res.ok) {
      var copia = res.clone();
      caches.open(CACHE).then(function(c){ c.put("./index.html", copia); });
    }
    return res;
  });

  var deEspera = new Promise(function(resolve){
    setTimeout(function(){ resolve(caches.match("./index.html")); }, 3000);
  });

  return Promise.race([red.catch(function(){ return null; }), deEspera])
    .then(function(res){
      if (res) return res;
      return caches.match("./index.html").then(function(hit){
        return hit || red;
      });
    })
    .catch(function(){
      return caches.match("./index.html").then(function(hit){
        return hit || new Response("Sin conexión", {
          status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      });
    });
}

/* Iconos y manifest: primero lo guardado, y se refresca por atras. */
function archivo(req){
  return caches.match(req).then(function(hit){
    var red = fetch(req).then(function(res){
      if (res && res.ok) {
        var copia = res.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copia); });
      }
      return res;
    });
    if (hit) { red.catch(function(){}); return hit; }
    return red.catch(function(){ return caches.match("./index.html"); });
  });
}

self.addEventListener("fetch", function(ev){
  if (ev.request.method !== "GET") return;
  if (new URL(ev.request.url).origin !== self.location.origin) return;
  ev.respondWith(esPantalla(ev.request) ? pantalla(ev.request) : archivo(ev.request));
});
