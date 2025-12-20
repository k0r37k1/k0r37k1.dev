# k0r37k1.dev

Terminal-style portfolio with 2000s Warez Scene & Y2K aesthetics, built with **Astro 5**, **Vue 3**, and **Tailwind CSS v4**.

## Design Philosophy

**Neo-Brutalism meets Underground Scene**

- 70% Modern (Vue 3, TypeScript, Motion-v, Tailwind v4)
- 30% Scene Elements (NFO borders, ASCII art, retro CRT effects)

This portfolio combines contemporary web technologies with authentic 2000s underground aesthetics—hard shadows, flat colors, Scene NFO-style borders, and subtle digital grit.

## Tech Stack

- **Framework:** Astro 5 with Vue 3 (Composition API)
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **Toolchain:** Vite+ inspired setup
  - [Rolldown](https://rolldown.rs/) - Rust-based bundler (Vite's next-gen replacement)
  - [OXC](https://oxc.rs/) - Oxlint (100x faster than ESLint)
  - [Lightning CSS](https://lightningcss.dev/) - Rust-based CSS parser
  - [Vitest](https://vitest.dev/) - Vite-native unit testing
  - [Playwright](https://playwright.dev/) - E2E testing
- **UI Libraries:** Motion-v, Reka UI, Astro Icon
- **Code Quality:** Husky, lint-staged, commitlint, Prettier, stylelint

> **Note:** This project manually implements the philosophy behind [Vite+](https://viteplus.dev/) - "The Unified Toolchain for the Web". Vite+ (currently in development) will eventually provide all of this in a single dependency.

## 🚀 Project Structure

```text
k0r37k1.dev/
├── src/
│   ├── components/
│   │   ├── terminal/        # Terminal window container
│   │   ├── sections/        # Hero, About, Projects, Skills, Contact
│   │   └── ui/              # Reusable UI components
│   ├── layouts/             # Page layouts (Astro)
│   ├── pages/               # File-based routing
│   ├── styles/              # Global CSS (terminal.css)
│   └── utils/               # Shared utilities (Figlet ASCII)
├── tests/
│   ├── e2e/                 # Playwright E2E tests
│   └── config/              # Testing configuration
├── docs/
│   └── plans/               # Design documents
└── .claude/                 # Claude Code instructions
```

## 🧞 Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build production site to `./dist/`               |
| `npm run preview`         | Preview production build locally                 |
| `npm test`                | Run Vitest unit tests                            |
| `npm run test:ui`         | Run unit tests with UI                           |
| `npm run test:e2e`        | Run E2E tests (Chromium only, fast)              |
| `npm run test:e2e:all`    | Run E2E tests (all browsers)                     |
| `npm run test:a11y`       | Run accessibility tests                          |
| `npm run lint:all`        | Run all linters + spell check                    |
| `npm run format`          | Format with Prettier                             |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## ✨ Features

- **Terminal Aesthetic** - Neo-Brutalist design with Scene NFO borders
- **ASCII Art** - Figlet.js generated logo with responsive font switching
- **Smooth Animations** - Motion-v scroll animations (spring physics)
- **Retro Effects** - CRT scanlines, holographic text, subtle glitch effects
- **Performance First** - Static site generation, optimized chunking
- **Accessibility** - WCAG AA compliant, keyboard navigation, reduced motion support
- **Testing** - Unit (Vitest), E2E (Playwright), Accessibility (axe-core)

## 🎨 Design System

### Neo-Brutalism

- **Flat colors** - No gradients (except accents)
- **Hard shadows** - 4-8px offsets in neon colors
- **Thick borders** - 2-3px instead of 1px
- **Sharp corners** - No border-radius (raw aesthetic)

### Color Palette

```css
/* Base */
--color-terminal-bg: oklch(0.15 0.02 240); /* Dark blue-black */

/* Neon Accents */
--color-terminal-primary: #00d9ff; /* Cyan */
--color-terminal-secondary: #ff00ff; /* Magenta */
--color-accent-orange: #ff6600; /* Neon Orange */
--color-accent-purple: #9d00ff; /* Electric Purple */
```

### Typography

- **Fonts:** Berkeley Mono, SF Mono, Cascadia Code (monospace)
- **Size:** 16px base (14px mobile)
- **Line-height:** 1.6 (1.3 for borders)

## 🧪 Testing

This project uses a 3-layer testing approach:

1. **Runtime** (`axe-core`) - Auto-runs in dev, Ctrl+Shift+A
2. **E2E** (`@axe-core/playwright`) - Finds ~57% WCAG issues
3. **Unit** (`vitest-axe`) - Component isolation

Run tests:

```bash
npm run test:e2e        # E2E (Chromium only)
npm run test:a11y       # Accessibility tests
npm test                # Unit tests
```

## 📦 Performance

- **Bundle size:** Optimized with manual chunking
- **Target:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Lighthouse:** ≥ 90 performance score

## 🚢 Deployment

Built for static hosting (Vercel, Netlify, Cloudflare Pages):

```bash
npm run build
```

Output: `./dist/`

## 📝 Code Style

- **Tabs** for indentation (NOT spaces)
- **Single quotes** (enforced by Prettier)
- **Semicolons** required
- **100 char** line limit
- **Path aliases** - Always use `@/`, `@components/`, `@layouts/`, `@utils/`
- **Vue 3** - Composition API only (no Options API)

### Git Commits (enforced by commitlint)

Format: `type(scope): subject`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`

Example: `feat(terminal): add glitch effect on hover`

## 📚 Documentation

- `.claude/CLAUDE.md` - Claude Code instructions
- `.claude/docs/testing-guide.md` - Testing documentation
- `.claude/docs/accessibility-resources.md` - A11y resources
- `docs/plans/` - Design documents

## 🤝 Contributing

This is a personal portfolio, but feel free to:

- Report bugs via GitHub issues
- Suggest improvements
- Use as inspiration for your own portfolio

## 📄 License

MIT

---

**Built by k0r37k1** • [Website](https://k0r37k1.dev)
