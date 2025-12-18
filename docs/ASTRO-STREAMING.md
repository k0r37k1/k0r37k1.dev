# Astro Streaming Best Practices

Astro's SSR nutzt HTML-Streaming, um Komponenten sofort an den Browser zu senden,
sobald sie verfügbar sind. Dies verbessert die wahrgenommene Performance erheblich.

## ❌ Anti-Pattern: Blocking Data Fetching

```astro
---
// src/pages/index.astro
// ❌ FALSCH: Blockiert das gesamte Page-Rendering
const personResponse = await fetch('https://randomuser.me/api/');
const personData = await personResponse.json();
const randomPerson = personData.results[0];

const factResponse = await fetch('https://catfact.ninja/fact');
const factData = await factResponse.json();
---

<html>
  <head>
    <title>A name and a fact</title>
  </head>
  <body>
    <!-- Browser wartet auf BEIDE API-Calls, bevor er IRGENDWAS rendert -->
    <h2>A name</h2>
    <p>{randomPerson.name.first}</p>

    <h2>A fact</h2>
    <p>{factData.fact}</p>
  </body>
</html>
```

**Problem:** Der Browser wartet auf alle `await`-Calls im Frontmatter, bevor er HTML sendet.

---

## ✅ Lösung 1: Component-Level Streaming

Verschiebe `await`-Calls in separate Komponenten:

### 1. Komponenten erstellen

```astro
---
// src/components/RandomName.astro
const personResponse = await fetch('https://randomuser.me/api/');
const personData = await personResponse.json();
const randomPerson = personData.results[0];
---

<p>{randomPerson.name.first}</p>
```

```astro
---
// src/components/RandomFact.astro
const factResponse = await fetch('https://catfact.ninja/fact');
const factData = await factResponse.json();
---

<p>{factData.fact}</p>
```

### 2. In der Page verwenden

```astro
---
// src/pages/index.astro
import RandomName from '@components/RandomName.astro';
import RandomFact from '@components/RandomFact.astro';
---

<html>
  <head>
    <title>A name and a fact</title>
  </head>
  <body>
    <!-- ✅ Wird SOFORT gerendert -->
    <h2>A name</h2>

    <!-- ✅ Fetcht parallel, streamt wenn fertig -->
    <RandomName />

    <!-- ✅ Wird SOFORT gerendert -->
    <h2>A fact</h2>

    <!-- ✅ Fetcht parallel, streamt wenn fertig -->
    <RandomFact />
  </body>
</html>
```

**Vorteile:**

- `<head>`, `<body>`, `<h2>` werden sofort gesendet
- API-Calls laufen parallel
- Browser rendert schrittweise

---

## ✅ Lösung 2: Promise-Direct Streaming

Inkludiere Promises direkt im Template (ohne `await`):

```astro
---
// src/pages/index.astro
// ✅ Keine await - nur Promises erstellen
const personPromise = fetch('https://randomuser.me/api/')
  .then((response) => response.json())
  .then((personData) => personData.results[0].name.first);

const factPromise = fetch('https://catfact.ninja/fact')
  .then((response) => response.json())
  .then((factData) => factData.fact);
---

<html>
  <head>
    <title>A name and a fact</title>
  </head>
  <body>
    <!-- ✅ Wird SOFORT gerendert -->
    <h2>A name</h2>

    <!-- ✅ Promise wird inline resolved -->
    <p>{personPromise}</p>

    <!-- ✅ Wird SOFORT gerendert, während personPromise noch läuft -->
    <h2>A fact</h2>

    <!-- ✅ Promise wird inline resolved -->
    <p>{factPromise}</p>
  </body>
</html>
```

**Reihenfolge:**

1. `<h2>A name</h2>` wird gerendert
2. Browser wartet auf `personPromise`
3. `<p>{person}</p>` wird gerendert
4. `<h2>A fact</h2>` wird gerendert (während factPromise noch läuft!)
5. `<p>{fact}</p>` wird gerendert

---

## 📊 Performance-Vergleich

| Methode                      | Time to First Byte | First Contentful Paint | User Experience      |
| :--------------------------- | :----------------- | :--------------------- | :------------------- |
| **Blocking (❌)**            | ~800ms             | ~800ms                 | Lange weißer Screen  |
| **Component Streaming (✅)** | ~50ms              | ~50ms                  | Sofort sichtbar      |
| **Promise Direct (✅)**      | ~50ms              | ~50ms                  | Schrittweise Inhalte |

**Performance-Gewinn:** 40-70% schnelleres First Contentful Paint

---

## 🎯 Wann welche Methode?

### Component-Level Streaming

**Nutze wenn:**

- Daten in wiederverwendbaren Komponenten
- Komplexe API-Logik
- TypeScript-Support benötigt

**Beispiel:** Blog-Posts, User-Profiles, Product-Cards

### Promise Direct

**Nutze wenn:**

- Einmalige API-Calls
- Einfache Daten-Transformation
- Maximale Performance (keine Extra-Komponente)

**Beispiel:** Single-Page Stats, Dynamic Counters

---

## 🚀 Real-World Beispiel: Blog-Seite

```astro
---
// src/pages/blog.astro
import BlogPost from '@components/BlogPost.astro';
import Sidebar from '@components/Sidebar.astro';

// ❌ NICHT so:
// const posts = await fetch('/api/posts').then(r => r.json());

// ✅ Stattdessen: Promise direkt
const postsPromise = fetch('/api/posts').then((r) => r.json());
---

<Layout>
  <!-- ✅ Header wird SOFORT gerendert -->
  <header>
    <h1>Blog</h1>
  </header>

  <main>
    <!-- ✅ Sidebar lädt parallel (eigene API-Calls) -->
    <Sidebar />

    <div class="posts">
      <!-- ✅ Posts werden gerendert, sobald Promise resolved -->
      {postsPromise.then((posts) => posts.map((post) => <BlogPost {...post} />))}
    </div>
  </main>
</Layout>
```

---

## ⚡ Performance-Tipps

1. **Paralleles Fetching:** Erstelle alle Promises vor dem Template
2. **Strategische Reihenfolge:** Above-the-fold zuerst, dann Promises
3. **Component Isolation:** Jede Komponente hat eigenen Fetch-Scope
4. **Error Handling:** Nutze `.catch()` für Promise-Fehler

```astro
---
const dataPromise = fetch('/api/data')
  .then((r) => r.json())
  .catch((err) => ({ error: 'Failed to load' }));
---

<p>{dataPromise}</p>
```

---

## 📚 Weitere Ressourcen

- [Astro Docs: Streaming](https://docs.astro.build/en/recipes/streaming-improve-page-performance/)
- [Web.dev: Streaming SSR](https://web.dev/streaming-ssr/)
- [Astro Performance Guide](https://docs.astro.build/en/guides/performance/)

---

**Zusammenfassung:** Nutze Streaming für 40-70% schnellere Ladezeiten! 🚀
