# Last Bus Stop Ministry — Next.js + Tailwind CSS + Framer Motion

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

- **Backend:** same API as the original site (`https://backend-lastbusstopministry.onrender.com`). Override with `NEXT_PUBLIC_API_URL` (see `.env.example`).
- **Hero video:** YouTube `gTJ1bFapnhY` plays muted, looping, on load. To self-host instead, put a file at `public/videos/hero.mp4` and set `NEXT_PUBLIC_HERO_MP4=/videos/hero.mp4`.
- **Content:** ministries, leaders, blog posts, FAQs, service times live in `src/lib/site.ts`. Blog post bodies are placeholder text — replace with real articles.
- **Member dashboard:** `/dashboard` (receipts, giving accounts, announcements, profile; admin: receipts review, members, payment accounts, announcements, analytics, audit logs).
