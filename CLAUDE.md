# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

```bash
npm install       # install the `serve` package
npm start         # serves on $PORT (default: random port)
```

For local dev, open the printed URL. The password gate uses `sessionStorage` — entering the password once unlocks the session.

## Architecture

This is a **pure static site** (HTML + CSS + JS, no build step, no framework). Content lives directly in HTML files. Shared styles live in `shared.css`.

**Structure:**
- `index.html` — landing page (intro, featured case study cards, project grid)
- `ai-receptionist/index.html` — case study #1
- `next-gen-booking/index.html` — case study #2
- `shared.css` — design system (tokens, layout, all shared components)
- `password.js` — session-based password gate (password: `ketchup`, stored in `sessionStorage` as `blvd_auth`)

**Media files** (videos, audio) are excluded from git via `.gitignore`. MP4s and the demo audio file must be added manually after cloning.

## Design system

All design tokens and reusable components are in `shared.css`. Key tokens:

- `--bg: #0A0A0A`, `--accent: #CEAA75` (gold)
- `--max-w: 1080px`, `--gutter: clamp(24px, 5vw, 80px)`
- `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`
- Typography: `--title-xl` through `--body-xs` using `clamp()` for fluid sizing

Key CSS classes: `.wrap` (max-width container), `.block` (scroll-animated section), `.meta-grid` (metrics strip), `.text-block-grid` (1fr / 1.6fr label+content layout), `.proto-panel` / `.cta-callout` (sparkle-orbit animated borders on hover).

Responsive breakpoints: `768px` (tablet) and `640px` (mobile).

## Scroll animations

Sections use `.block` + `.visible`. A shared `IntersectionObserver` (threshold `0.08`, rootMargin `-40px`) adds `.visible` when a `.block` enters the viewport. Each page instantiates its own observer inline.

## Deployment

Deployed on Railway. The `npm start` script runs `serve . -l $PORT`. No build step or environment variables needed beyond `PORT`.
