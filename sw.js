var cacheName = 'helloWorld';                   //缓存的名称
self.addEventListener('install', event => {     //安装事件
  event.waitUntil(                              //延时,避免sw安装之前执行下面的代码
      caches.open(cacheName)                    //打开缓存
        .then(cache => cache.addAll([           //把 js 和 图片文件添加到缓存中
            './js/index.js',
            './images/page_load.gif'
        ]))
    );
});
// 缓存任何获取的新资源
self.addEventListener('fetch', event => {
  event.respondWith(
      caches.match(event.request, { ignoreSearch: true })
    .then(function (response) {
        if (response) {
            return response;
        }
        var requestToCache = event.request.clone();
        return fetch(requestToCache).then(
        function (response) {
            if (!response || response.status !== 200) {
                return response;
            }
            var responseToCache = response.clone();
            caches.open(cacheName)
                .then(function (cache) {
                    cache.put(requestToCache, responseToCache);
                });
            return response;
        });
    })
    );
});