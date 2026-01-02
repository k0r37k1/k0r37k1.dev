# Vue 3 Component Guidelines

Component-specific patterns and advanced Motion animations.

## Motion Animation Patterns

### Import (lowercase!)

```vue
<script setup lang="ts">
import { motion } from 'motion-v'; // NOT Motion!
</script>
```

### Entrance Animations

```vue
<motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }">
  <div>Fades in from below</div>
</motion.div>
```

### Exit Animations

```vue
<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v';
import { ref } from 'vue';
const show = ref(true);
</script>

<template>
  <AnimatePresence>
    <motion.div v-if="show" key="content" :exit="{ opacity: 0, scale: 0.8 }">
      <div>Animated exit</div>
    </motion.div>
  </AnimatePresence>
</template>
```

### Layout Animations

```vue
<!-- Animates size/position changes automatically -->
<motion.div layout>
  <div :class="expanded ? 'w-full' : 'w-48'">Smooth resize</div>
</motion.div>
```

### Performance Tips

- Use hardware-accelerated properties (transform, opacity)
- Prefer `whileInView` for scroll animations over JS scroll listeners
- Combine with `client:visible` for optimal loading
- Avoid animating expensive properties (width, height, left, top)

## Astro + Vue Known Issues

### VueUse Composables SSR Problem

**Problem:** VueUse utilities (e.g. `useDark`, `useToggle`) don't work correctly with
`client:load` / `client:visible` / `client:idle`.

**Reason:** Server renders components with wrong default values (e.g. `isDark.value = false`,
no localStorage on server). Template renders with server value, then hydration mismatch on client.

**Solution:** Use `client:only="vue"` instead of `client:load`.

```vue
<!-- ❌ WRONG - VueUse with client:load -->
<script setup>
import { useDark, useToggle } from '@vueuse/core';
const isDark = useDark();
</script>

<!-- In Astro: -->
<!-- ❌ Template shows wrong value! -->
<DarkModeToggle client:load />
```

```vue
<!-- ✅ CORRECT - VueUse with client:only -->
<!-- ✅ No SSR, no mismatch -->
<DarkModeToggle client:only="vue" />
```

**Reference:** [GitHub Issue #6425](https://github.com/withastro/astro/issues/6425)

### Browser APIs Outside Lifecycle Hooks

**Problem:** Browser APIs (window, document, localStorage) **outside** lifecycle hooks
crash the build with `client:load` / `client:visible` / `client:idle`.

**Reason:** Astro renders components server-side. Browser APIs don't exist on the server.

**Solution:** Use browser APIs only in `onMounted` / `onBeforeMount`
OR use `client:only="vue"`.

```vue
<!-- ❌ WRONG - Browser API in top-level -->
<script setup>
const theme = localStorage.getItem('theme'); // ❌ Build CRASH!
const width = window.innerWidth; // ❌ Build CRASH!
</script>
```

```vue
<!-- ✅ CORRECT Option 1 - In Lifecycle Hook -->
<script setup>
import { ref, onMounted } from 'vue';

const theme = ref('light');
const width = ref(0);

onMounted(() => {
  // ✅ Safe: Browser APIs available
  theme.value = localStorage.getItem('theme') || 'light';
  width.value = window.innerWidth;
});
</script>

<!-- In Astro: -->
<Component client:load />
<!-- ✅ Works! -->
```

```vue
<!-- ✅ CORRECT Option 2 - client:only -->
<script setup>
// ✅ Safe: No SSR, client-only
const theme = localStorage.getItem('theme');
const width = window.innerWidth;
</script>

<!-- In Astro: -->
<Component client:only="vue" />
<!-- ✅ Works! -->
```

**Reference:** [GitHub Issue #4686](https://github.com/withastro/astro/issues/4686)

### Client Directive Cheat Sheet

| Use Case                                | Directive                         | Reason                                  |
| --------------------------------------- | --------------------------------- | --------------------------------------- |
| **VueUse Composables**                  | `client:only="vue"`               | Browser context + no hydration mismatch |
| **Browser APIs (localStorage, window)** | `client:only="vue"` / `onMounted` | No SSR = no crash                       |
| **Static UI (no browser access)**       | `client:visible`                  | Best performance                        |
| **Interactive UI (Buttons, Forms)**     | `client:load`                     | Immediate interactivity                 |
| **Below-the-fold Components**           | `client:idle`                     | Lazy-loading                            |

## Accessibility Requirements

```vue
<!-- ✅ Buttons with aria-label -->
<button aria-label="Increment counter">+</button>

<!-- ✅ Form controls with labels -->
<label for="email">Email</label>
<input id="email" type="email" />

<!-- ✅ Images with alt text -->
<img src="logo.png" alt="Company logo" />
```

Linting: Run `npm run lint:a11y` to catch issues early.
