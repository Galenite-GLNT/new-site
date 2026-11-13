# Galenite · VI Edition

Seasonal design branch based on `backup/pre-redesign-2026-09-29`.

## What's changed

- Real homepage markup in `index.html`, original site routes kept.
- Responsive poster/editorial styling in `style.css`.
- First-visit intro animation (2.7s): dark screen → 3×3 image mosaic → VI → brand mark → page reveal. Implemented in `vice.js`; no video in the UI.
- Products and contact pages use the same visual language via `subpages.css`.
- AI Office, Galen chat and Auth retain their original UI logic, with a restrained optional palette overlay from `assets/vi/app-theme.css`.
- Reduced-motion support, intro skip control, keyboard navigation, responsive menu.

## Artwork

`assets/vi/wallpaper.webp` and `assets/vi/mark.webp` are optimized from the supplied Galenite wallpaper and VI-themed logo. Both are **committed to the repository** and served locally; no external image hosts are required.

`assets/vi/sunset.svg` and `assets/vi/mark.svg` are fallback vector assets.

## Test locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

The intro runs on the first page load of a tab. To replay it, run in DevTools:

```js
sessionStorage.removeItem('galenite-vi-intro');
location.reload();
```

## Deployment

This branch does **not** deploy to production. Review the changes and merge into the branch used for deployment only after acceptance.

Unofficial GTA VI tribute styling. Galenite is not affiliated with Rockstar Games.
