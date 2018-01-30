// 注册 service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js',).then(function (registration) {
        // 注册成功
        console.log(registration)
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function (err) {
        // 注册失败 :(
        console.log('ServiceWorker registration failed: ', err);
    });
}