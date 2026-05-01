# Bible Word Scramble 🙏✝️

A complete, AdSense-ready Bible word scramble web app — installable as a PWA.

## Files

- `index.html` — Main game page
- `style.css` — All styling (nature/scripture theme)
- `game.js` — Game logic
- `words.js` — 1000+ Bible word database
- `about.html` — About page (required for AdSense)
- `contact.html` — Contact page (required for AdSense)
- `privacy.html` — Privacy Policy (required for AdSense)
- `blog.html` — Blog index
- `blog-top10.html` — First blog article (full content)
- `manifest.json` — PWA manifest (Add to Home Screen)
- `sw.js` — Service worker (offline support)

## Deploy to Vercel (Free — Recommended)

1. Go to https://vercel.com and create a free account
2. Install Vercel CLI: `npm i -g vercel`
3. In this folder, run: `vercel`
4. Follow prompts — your site will be live in 60 seconds!
5. Get a custom domain at https://vercel.com/domains (optional, ~$10/yr)

## Deploy to Netlify (Alternative)

1. Go to https://netlify.com
2. Drag and drop this entire folder onto their deploy zone
3. Done! You get a free .netlify.app domain

## Deploy to GitHub Pages (Free)

1. Create a GitHub repo
2. Upload all files
3. Go to Settings → Pages → Deploy from main branch
4. Live at: yourusername.github.io/bible-scramble

## Adding Google AdSense

Once approved by AdSense (after ~4-6 weeks live):

1. Replace each `<div class="ad-slot">` block with your AdSense code:

```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

2. Add the AdSense script to the `<head>` of each HTML file:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```

## Adding Google Analytics

In the `<head>` of each page, add:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## PWA Icons

To generate proper icons (192x192 and 512x512 PNG files):
- Use https://realfavicongenerator.net
- Or use the included icon.svg as a base

## AdSense Checklist ✅

- [x] Privacy Policy page
- [x] About page  
- [x] Contact page
- [x] Blog with articles (content depth)
- [x] Professional design
- [x] Mobile responsive
- [x] Fast loading
- [ ] Live for 4-6 weeks with real traffic
- [ ] Google Analytics installed
- [ ] Custom domain (recommended)

## Timeline to First Earnings

- Week 1: Deploy site + get domain
- Week 2-4: Share with church, family, social media
- Week 5-6: Apply for Google AdSense
- Week 7-8: Get approved + start earning!

God bless your ministry! 🙏
