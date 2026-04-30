// Cookie Consent Banner
(function() {
  if (localStorage.getItem('cookieConsent')) return;
  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.style.cssText = `
    position:fixed;bottom:0;left:0;right:0;z-index:9999;
    background:#1e3a0f;color:#f5efd8;
    padding:1rem 1.5rem;display:flex;
    align-items:center;gap:1rem;flex-wrap:wrap;
    box-shadow:0 -4px 20px rgba(0,0,0,0.3);
    font-family:Georgia,serif;font-size:0.85rem;
  `;
  banner.innerHTML = `
    <span style="flex:1;min-width:200px;">
      🍪 We use cookies to improve your experience and show relevant ads.
      <a href="privacy.html" style="color:#c8961a;">Privacy Policy</a>
    </span>
    <button id="cookieAccept" style="background:#c8961a;color:#1e3a0f;border:none;padding:0.5rem 1.25rem;border-radius:8px;font-weight:700;cursor:pointer;font-family:Georgia,serif;">Accept</button>
    <button id="cookieDecline" style="background:transparent;color:#a8c48a;border:1px solid #4a7c28;padding:0.5rem 1rem;border-radius:8px;cursor:pointer;font-family:Georgia,serif;">Decline</button>
  `;
  document.body.appendChild(banner);
  document.getElementById('cookieAccept').onclick = function() {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.remove();
  };
  document.getElementById('cookieDecline').onclick = function() {
    localStorage.setItem('cookieConsent', 'declined');
    banner.remove();
  };
})();
