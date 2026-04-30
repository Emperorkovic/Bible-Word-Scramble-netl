const CACHE_NAME = 'bible-scramble-v2';
const ASSETS = [
  '/', '/index.html', '/style.css', '/game.js', '/words.js',
  '/about.html', '/contact.html', '/privacy.html', '/terms.html',
  '/blog.html', '/blog-top10.html', '/blog-names.html',
  '/blog-places.html', '/blog-kids.html', '/blog-hebrew.html',
  '/blog-prophecy.html', '/manifest.json', '/logo.svg', '/cookies.js',
];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/index.html')))));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))));
