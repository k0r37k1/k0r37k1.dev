# Projekt-Befehle Dokumentation

Vollständige Übersicht aller verfügbaren NPM-Befehle für dieses Projekt.

---

## 📦 Projekt-Management

### Installation

```bash
npm install
```

Installiert alle Abhängigkeiten aus package.json.

---

## 🚀 Entwicklung

### Dev Server

```bash
npm run dev
```

Startet den Entwicklungsserver auf `http://localhost:4321` mit Hot Module Replacement (HMR).

### Build

```bash
npm run build
```

Erstellt einen produktionsreifen Build im `./dist/` Verzeichnis.

### Preview

```bash
npm run preview
```

Startet einen lokalen Server zur Vorschau des Production Builds.

### Astro CLI

```bash
npm run astro [command]
```

Direkter Zugriff auf alle Astro CLI-Befehle.

---

## 🧪 Testing

### Unit Tests (Vitest)

```bash
npm test
# oder
npm run test
```

Führt alle Vitest Unit-Tests im Watch-Modus aus.

```bash
npm run test:ui
```

Startet Vitest mit interaktiver UI (`http://localhost:51204`).

```bash
npm run test:coverage
```

Führt Tests aus und generiert einen Coverage-Report.

### E2E Tests (Playwright)

```bash
npm run test:e2e
```

**Schnell:** Führt E2E-Tests nur in Chromium aus (empfohlen für lokale Entwicklung).

```bash
npm run test:e2e:all
```

**Vollständig:** Führt E2E-Tests in allen Browsern aus (Chromium, Firefox, WebKit, Mobile).

```bash
npm run test:e2e:ui
```

Startet Playwright mit interaktiver UI für Test-Entwicklung.

```bash
npm run test:e2e:debug
```

Startet Playwright im Debug-Modus mit Step-by-Step Ausführung.

```bash
npm run test:e2e:report
```

Zeigt den HTML-Report der letzten E2E-Test-Ausführung.

### Accessibility Tests

```bash
npm run test:a11y
```

**Schnell:** Führt Accessibility-Tests nur in Chromium aus.

```bash
npm run test:a11y:all
```

**Vollständig:** Führt Accessibility-Tests in allen Browsern aus.

---

## 🔍 Linting

### OXC Linter (Hauptlinter)

```bash
npm run lint
```

Führt OXLint aus (100x schneller als ESLint, Rust-basiert).

```bash
npm run lint:fix
```

Führt OXLint aus und behebt automatisch behebbare Probleme.

### Accessibility Linting

```bash
npm run lint:a11y
```

Prüft Vue-Komponenten auf Accessibility-Probleme (WCAG 2.1 Level AA).

```bash
npm run lint:a11y:fix
```

Behebt automatisch behebbare Accessibility-Probleme in Vue-Dateien.

### Markdown Linting

```bash
npm run lint:md
```

Prüft alle Markdown-Dateien auf Stil- und Formatierungsprobleme.

```bash
npm run lint:md:fix
```

Behebt automatisch behebbare Markdown-Probleme.

### CSS Linting

```bash
npm run lint:css
```

Prüft CSS, Astro und Vue-Dateien auf CSS-Probleme (mit Stylelint).

```bash
npm run lint:css:fix
```

Behebt automatisch behebbare CSS-Probleme.

### Alle Linter

```bash
npm run lint:all
```

Führt alle Linter aus: OXLint + Accessibility + Markdown + CSS + Spell Check.

---

## ✨ Formatierung

### Code formatieren

```bash
npm run format
```

Formatiert alle Dateien mit Prettier (JavaScript, TypeScript, JSON, CSS, Markdown, Astro, Vue).

```bash
npm run format:check
```

Prüft, ob alle Dateien korrekt formatiert sind (ohne Änderungen vorzunehmen).

---

## 📝 Rechtschreibprüfung

### Spell Check

```bash
npm run spell
```

Prüft Rechtschreibung in Code-Dateien mit Vorschlägen für Korrekturen.

```bash
npm run spell:check
```

Prüft Rechtschreibung in allen Dateien.

```bash
npm run spell:fix
```

Prüft Rechtschreibung mit erweitertem Kontext und Korrekturvorschlägen.

---

## 🔧 Git Hooks

### Husky vorbereiten

```bash
npm run prepare
```

Initialisiert Husky Git Hooks (wird automatisch nach `npm install` ausgeführt).

---

## 🎯 Häufig verwendete Workflows

### Vor jedem Commit

```bash
# Tests, Linting und Formatierung prüfen
npm run lint:all
npm test
npm run format:check
```

**Hinweis:** Pre-commit Hooks mit Husky und lint-staged führen automatisch Checks aus.

### Vollständige Qualitätsprüfung

```bash
# Alle Tests und Linter ausführen
npm run lint:all
npm test
npm run test:e2e:all
npm run test:a11y:all
```

### Vor Deployment

```bash
# Build testen
npm run build
npm run preview

# Alle Tests ausführen
npm run lint:all
npm test
npm run test:e2e:all
```

---

## 📊 Zusammenfassung nach Kategorie

| Kategorie           | Befehle                                                                        |
| :------------------ | :----------------------------------------------------------------------------- |
| **Entwicklung**     | `dev`, `build`, `preview`                                                      |
| **Unit Tests**      | `test`, `test:ui`, `test:coverage`                                             |
| **E2E Tests**       | `test:e2e`, `test:e2e:all`, `test:e2e:ui`, `test:e2e:debug`, `test:e2e:report` |
| **Accessibility**   | `test:a11y`, `test:a11y:all`                                                   |
| **Linting**         | `lint`, `lint:fix`, `lint:md`, `lint:css`, `lint:all`                          |
| **Formatierung**    | `format`, `format:check`                                                       |
| **Rechtschreibung** | `spell`, `spell:check`, `spell:fix`                                            |

---

## 💡 Tipps

- **Schnelle Entwicklung:** Verwende `npm run dev` für lokale Entwicklung
- **Schnelle Tests:** Verwende `test:e2e` und `test:a11y` (nur Chromium) für schnelles Feedback
- **CI/CD Tests:** Verwende `test:e2e:all` und `test:a11y:all` für vollständige Browser-Abdeckung
- **Auto-Fix:** Die meisten Linter haben einen `:fix` Befehl für automatische Korrekturen
- **Git Hooks:** Husky führt automatisch `lint-staged` bei Commits aus

---

## 🔗 Weitere Informationen

Für Details zu Tech Stack, Code-Stil und Best Practices siehe [CLAUDE.md](CLAUDE.md).
