---
title: 'Website Updates January 2026'
description: 'New projects in portfolio, accessibility improvements, fresh animations.'
pubDate: 2026-01-04
tags: ['update', 'portfolio', 'a11y']
---

Quick update on the website – a few things happened.

## New Projects in Portfolio

Both apps are now officially in the portfolio:

😴 **DoZzzy** – Minimalist nap timer for Android. Timer up to 3h, presets, customizable alarm with snooze.
Accessible, DE/EN.

📝 **Plain Text Editor** – Minimalist text editor for Android. Focus Mode, Typewriter Mode, font settings,
auto-save. Accessible, DE/EN.

Both are still waiting for the Google Play Store release. The project cards link to the Play Store in general for now. 🏪

## Accessibility Improvements

Small but important fix: All decorative icons now have the attribute:

```html
aria-hidden="true"
```

Screen readers now only read the relevant text, not the icon descriptions.

Affected components:

- Contact Section (Social Links)
- Skills Section (Tech Icons)
- Footer (Navigation Icons)

All 15 a11y tests pass. WCAG 2.2 AA compliant. ✅

## Hover Animations

Project cards now have subtle hover effects with colored shadows:

- Projects: Red shadow
- Skills: Magenta shadow

Subtle, but makes the UI feel more alive. Motion-v does the rest. 🎨

## Screenshot Added

The k0r37k1.dev project now has a real screenshot instead of the "no img" placeholder. Looks way more professional.

Next update when the apps hit the Play Store. Stay tuned. ✌️
