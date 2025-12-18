# astro

Modern web project built with **Astro 5**, **Vue 3**, and **Tailwind CSS v4**, featuring a
[Vite+](https://viteplus.dev/)-inspired toolchain for maximum performance and developer experience.

## Tech Stack

- **Framework:** Astro 5 with Vue 3 (Composition API)
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **Toolchain:** Vite+ inspired setup
  - [Rolldown](https://rolldown.rs/) - Rust-based bundler (Vite's next-gen replacement)
  - [OXC](https://oxc.rs/) - Oxlint (100x faster than ESLint)
  - [Lightning CSS](https://lightningcss.dev/) - Rust-based CSS parser
  - [Vitest](https://vitest.dev/) - Vite-native unit testing
  - [Playwright](https://playwright.dev/) - E2E testing
- **UI Libraries:** Motion, Reka UI, Astro Icon
- **Code Quality:** Husky, lint-staged, commitlint, Prettier, stylelint

> **Note:** This project manually implements the philosophy behind [Vite+](https://viteplus.dev/) -
> "The Unified Toolchain for the Web". Vite+ (currently in development) will eventually provide
> all of this in a single dependency.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory.
Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
