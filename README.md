# k0r37k1.dev

## Personal portfolio mit Terminal-Ästhetik und 2000s Warez Scene Vibes

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro)](https://astro.build)
[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

[**→ Live Demo**](https://k0r37k1.dev)

---

## Über das Projekt

Ein Portfolio-Website, die moderne Web-Technologien mit der rohen Ästhetik der 2000er Underground-Szene
verbindet. NFO-Style ASCII-Borders, CRT-Effekte, Phosphor-Glow und Terminal-Vibes treffen auf Vue 3,
TypeScript und Motion-Animationen.

**Design-Philosophie:** 70% Modern, 30% Underground

---

## ✨ Highlights

### Terminal-Ästhetik

- **CRT-Effekte** - Scanlines, Phosphor-Glow, subtile Flicker-Animation
- **ASCII Art** - Figlet.js generiertes Logo mit responsiver Font-Umschaltung
- **NFO-Borders** - Authentische Scene-Style Box-Drawing-Zeichen (`┌─┐│└┘`)
- **VT323 Bitmap Font** - Optimiert für scharfes Rendering bei allen Auflösungen

### Neo-Brutalism Design

- Flat Colors, keine Gradienten (außer Glowing Accents)
- Hard Shadows (4-8px Offsets in Neon-Farben)
- Dicke Borders (2-3px), keine Rounded Corners
- Monospace Typography (Berkeley Mono, SF Mono, Cascadia Code)

### Features

- **Zweisprachig** - Deutsch (Standard) + Englisch (`/en/`)
- **Motion Animations** - Spring Physics, Scroll-triggered Effects
- **Accessibility** - WCAG AA konform, Keyboard-Navigation, Reduced Motion Support
- **Performance** - Static Site Generation, Islands Architecture

---

## 🛠️ Tech Stack

**Framework & UI:**

- [Astro 5](https://astro.build) - Static Site Generation, Islands Architecture
- [Vue 3](https://vuejs.org) - Composition API, Reactive Components
- [Tailwind CSS v4](https://tailwindcss.com) - CSS-first Config, Native Variables
- [Motion-v](https://motion.dev) - Spring Physics Animationen

**Vite+ Inspired Toolchain:**

- [Rolldown](https://rolldown.rs/) - Rust-based Bundler
- [OXC (Oxlint)](https://oxc.rs/) - 100x schneller als ESLint
- [Lightning CSS](https://lightningcss.dev/) - Rust-based CSS Parser
- [Vitest](https://vitest.dev) + [Playwright](https://playwright.dev) - Testing

> **Hinweis:** Dieses Projekt implementiert manuell die [Vite+](https://viteplus.dev/) Philosophie - eine
> unified, Rust-based Toolchain für das Web (aktuell in Entwicklung).

---

## 🚀 Setup

```bash
# Repository klonen
git clone https://github.com/k0r37k1/k0r37k1.dev.git
cd k0r37k1.dev

# Dependencies installieren
npm install

# Dev-Server starten
npm run dev
# → http://localhost:4321
```

### Commands

| Command            | Aktion                                 |
| :----------------- | :------------------------------------- |
| `npm run dev`      | Dev-Server starten                     |
| `npm run build`    | Production Build erstellen (`./dist/`) |
| `npm run preview`  | Production Build lokal testen          |
| `npm test`         | Unit Tests ausführen                   |
| `npm run test:e2e` | E2E Tests ausführen                    |
| `npm run lint:all` | Alle Linter + Spell Check ausführen    |

---

## 🎨 Design System

### Farbpalette (P3 Color Space)

```css
/* Terminal Base */
--color-terminal-bg: oklch(0.15 0.02 240); /* Dark blue-black */
--color-terminal-text: oklch(0.9 0.01 120); /* Off-white green */

/* Neon Accents */
--color-terminal-primary: #00d9ff; /* Cyan */
--color-terminal-secondary: #ff00ff; /* Magenta */
--color-accent-orange: #ff6600; /* Phosphor Orange */
--color-accent-purple: #9d00ff; /* Electric Purple */
```

### Typography

- **Body:** Berkeley Mono, SF Mono, Cascadia Code (16px / 14px mobile)
- **Headings:** VT323 Bitmap Font (1.5-2rem)
- **Borders:** VT323 (1.25rem)

---

## 📄 Lizenz

[MIT License](LICENSE) - Frei zur Nutzung, Modifikation und Verteilung.

---

**Built with ❤️ by [k0r37k1](https://github.com/k0r37k1)**

[Website](https://k0r37k1.dev) • [GitHub](https://github.com/k0r37k1) • [X](https://x.com/k0r37k1)

> _"Where underground aesthetics meet modern web development"_
