# Last Bus Stop Ministry — Next.js Rebuild

Rebuilt from the original static HTML/Tailwind/vanilla-JS site into **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**, with the same live backend wired in.

## What changed from the original site
- **Hero**: full-bleed autoplay/muted/looped YouTube background video (the linked worship video), animated headline/CTAs, scroll cue.
- **Carousels**: Embla-powered testimonial slider and a ministries "cooler" carousel with drag/arrow navigation.
- **New pages** that didn't exist before: `/ministries` (deep-dive), `/sermons`, `/prayer` (prayer request form), `/leadership`, `/dashboard` (basic member view).
- **Motion**: scroll-reveal animations, hover/parallax micro-interactions, animated auth modal, animated toasts — throughout, not just on the homepage.
- **Backend**: still points at `https://backend-lastbusstopministry.onrender.com/api` — login, register, `/auth/me`, homepage announcements, and active payment accounts all call the real API exactly like the original `js/api.js` did. Auth state persists in `localStorage` under the same `lbsm_token` / `lbsm_user` keys as before.
- **Prayer requests**: the backend has no dedicated endpoint for these yet, so the form hands the request to WhatsApp (`wa.me`) so it reaches the church immediately. Swap this out once a `/prayer-requests` API route exists.
- **Dashboard**: this rebuild focuses on the public marketing site. `/dashboard` is a lightweight member view (profile + quick links) rather than a full port of the original 1000+ line admin dashboard (member management, receipts, analytics, notifications) — that stayed out of scope here to keep this deliverable focused, but it can be ported next using the same `lib/api.ts` client.

## Project structure
```
app/                Next.js App Router pages (one folder per route)
components/         Navbar, Footer, Hero, carousels, auth modal, shared UI
lib/api.ts          Ported API client (same endpoints/behaviour as js/api.js)
lib/AuthContext.tsx Auth state (login/register/logout) shared across the app
lib/Toast.tsx        Toast notifications
public/assets/      Images copied from the original project
```

## Run locally
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Build for production
```bash
npm run build
npm run start
```

## Deploy
Works out of the box on Vercel (recommended for Next.js) — just import the repo/folder, no environment variables required since the API base URL is hard-coded to match the original site's live backend.

## Notes
- Swap the hero video by changing `YOUTUBE_ID` in `components/VideoHero.tsx`.
- Testimonials, sermons, and blog post content are currently static arrays in their page files (the original backend has no endpoints for these) — replace with API calls if/when those endpoints exist.
- Tailwind theme colors match the original brand palette (`primary`, `secondary`, `accent`).
