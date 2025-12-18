# axe-core Integration Guide

Comprehensive guide for using axe-core in this project for accessibility testing with
industry best practices.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Usage Methods](#usage-methods)
4. [Configuration](#configuration)
5. [Custom Rules](#custom-rules)
6. [Best Practices](#best-practices)
7. [Advanced Patterns](#advanced-patterns)
8. [Performance Optimization](#performance-optimization)

## Overview

This project uses a three-layer accessibility testing approach:

1. **Runtime Checks** (`axe-core`) - Real-time accessibility monitoring in development
2. **E2E Testing** (`@axe-core/playwright`) - Full page accessibility tests
3. **Unit Testing** (`vitest-axe`) - Component-level accessibility tests

### Package Versions

```json
{
  "axe-core": "^4.11.0",
  "@axe-core/playwright": "^4.11.0",
  "vitest-axe": "^0.1.0"
}
```

### What axe-core Can Detect

Axe-core automatically detects ~57% of WCAG issues, including:

- **Text Alternatives**: Missing alt text, empty labels
- **Color Contrast**: Insufficient contrast ratios (< 4.5:1)
- **Keyboard Access**: Focusable elements, skip links
- **ARIA**: Invalid attributes, missing required attributes
- **Forms**: Unlabeled inputs, missing fieldsets
- **Structure**: Heading order, landmark roles

**Important**: Manual testing is still required for:

- Keyboard navigation flows
- Screen reader announcements
- Focus management
- Dynamic content updates
- Cognitive accessibility

## Installation

Already installed in this project:

```bash
npm install axe-core
npm install -D @axe-core/playwright vitest-axe
```

## Usage Methods

### 1. Runtime Integration (Development Mode)

Add runtime accessibility checks during development to catch issues immediately.

#### Browser Console Integration

Create `src/utils/axe-runtime.ts`:

```typescript
import axe from 'axe-core';

export async function runAxeCheck() {
  if (import.meta.env.DEV) {
    try {
      const results = await axe.run();

      if (results.violations.length > 0) {
        console.group(
          `%c🚨 ${results.violations.length} Accessibility Violations Found`,
          'color: red; font-weight: bold; font-size: 14px;'
        );

        results.violations.forEach((violation) => {
          console.group(`%c${violation.id}`, 'color: orange; font-weight: bold;');
          console.log('Impact:', violation.impact);
          console.log('Description:', violation.description);
          console.log('Help:', violation.help);
          console.log('Help URL:', violation.helpUrl);
          console.log('Affected Elements:', violation.nodes.length);

          violation.nodes.forEach((node) => {
            console.log('Element:', node.target);
            console.log('HTML:', node.html);
            console.log('Fix:', node.failureSummary);
          });

          console.groupEnd();
        });

        console.groupEnd();

        // Log summary table
        console.table(
          results.violations.map((v) => ({
            ID: v.id,
            Impact: v.impact,
            Elements: v.nodes.length,
            Tags: v.tags.join(', '),
          }))
        );
      } else {
        console.log('%c✅ No accessibility violations detected!', 'color: green; font-weight: bold; font-size: 14px;');
      }

      return results;
    } catch (error) {
      console.error('axe-core runtime check failed:', error);
    }
  }
}

// Auto-run on page load in development
if (import.meta.env.DEV) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAxeCheck);
  } else {
    runAxeCheck();
  }
}
```

#### Manual Trigger with Keyboard Shortcut

Add keyboard shortcut for on-demand checks:

```typescript
// src/utils/axe-runtime.ts (continued)

if (import.meta.env.DEV) {
  document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+A or Cmd+Shift+A
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      console.clear();
      runAxeCheck();
    }
  });
}
```

#### Import in Layout

Add to `src/layouts/BaseLayout.astro`:

```astro
---
const isDev = import.meta.env.DEV;
---

<html lang="en">
  <head>
    <!-- ... -->
  </head>
  <body>
    <slot />

    {isDev && <script>import('@utils/axe-runtime');</script>}
  </body>
</html>
```

### 2. E2E Testing with Playwright

Already configured with `@axe-core/playwright`. See `tests/e2e/accessibility.spec.ts`.

#### Example: Test Fixtures for Reusable Configuration

**Best Practice**: Use test fixtures to share common axe configuration across tests.

Create `tests/fixtures/axe-test.ts`:

```typescript
import { test as base } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

type AxeFixture = {
  makeAxeBuilder: () => AxeBuilder;
};

// Extend base test with shared axe configuration
export const test = base.extend<AxeFixture>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
        .exclude('#third-party-widget')
        .exclude('.cookie-banner');

    await use(makeAxeBuilder);
  },
});

export { expect } from '@playwright/test';
```

#### Use the Fixture in Tests

```typescript
import { test, expect } from '../fixtures/axe-test';

test('homepage accessibility', async ({ page, makeAxeBuilder }) => {
  await page.goto('/');

  // Wait for page to be ready
  await page.waitForLoadState('networkidle');

  const results = await makeAxeBuilder()
    .include('#main-content') // Additional test-specific config
    .analyze();

  expect(results.violations).toEqual([]);
});
```

#### Example: Testing Dynamic Content

**Best Practice**: Always wait for content to be visible before running analyze().

```typescript
test('modal accessibility', async ({ page, makeAxeBuilder }) => {
  await page.goto('/');

  // Open modal
  await page.click('[aria-label="Open settings"]');

  // CRITICAL: Wait for modal to be fully rendered
  await page.locator('[role="dialog"]').waitFor();

  // Test modal accessibility
  const results = await makeAxeBuilder().include('[role="dialog"]').analyze();

  expect(results.violations).toEqual([]);
});
```

#### Example: Loop-Based Testing for Multiple Pages

**Best Practice**: Test multiple pages systematically with a data-driven approach.

Create `tests/config/test-urls.ts`:

```typescript
export const baseURL = 'http://localhost:4321';

export const testPages = [
  { url: '/', name: 'Homepage' },
  { url: '/about', name: 'About' },
  { url: '/contact', name: 'Contact' },
  { url: '/demo', name: 'Demo' },
];
```

Use in tests:

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { baseURL, testPages } from './config/test-urls';

test.describe('Site-wide Accessibility', () => {
  for (const page of testPages) {
    test(`${page.name} should be accessible`, async ({ page: browserPage }) => {
      await browserPage.goto(baseURL + page.url);
      await browserPage.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page: browserPage }).withTags(['wcag2a', 'wcag2aa']).analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
```

### 3. Unit Testing with Vitest

Already configured with `vitest-axe`. See `tests/unit/Counter.spec.ts`.

#### Example: Component Testing

```typescript
import { mount } from '@vue/test-utils';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import MyComponent from '@components/MyComponent.vue';

describe('MyComponent Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const wrapper = mount(MyComponent, {
      props: {
        title: 'Test Title',
      },
    });

    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('should be accessible with dynamic content', async () => {
    const wrapper = mount(MyComponent);

    await wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();

    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
```

## Configuration

### Global Configuration

Configure axe-core for consistent rules across all tests.

Create `tests/config/axe.config.ts`:

```typescript
import type { Spec } from 'axe-core';

export const axeConfig: Spec = {
  rules: [
    {
      id: 'color-contrast',
      enabled: true,
    },
    {
      id: 'image-alt',
      enabled: true,
    },
    {
      id: 'label',
      enabled: true,
    },
  ],
  // Test only WCAG 2.1 Level AA
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
  // Exclude specific selectors
  exclude: [['.third-party-widget'], ['#ads']],
};
```

### Rule Configuration

#### Disable Specific Rules

**When to use**: Temporarily disable during design phase or for known third-party issues.

```typescript
const results = await new AxeBuilder({ page })
  .disableRules([
    'color-contrast', // Temporarily disabled during brand color exploration
    'duplicate-id', // Known issue with third-party library
  ])
  .analyze();
```

#### Enable Only Specific Rules

**When to use**: Focus on specific accessibility concerns.

```typescript
const results = await new AxeBuilder({ page })
  .withRules([
    'image-alt',
    'label',
    'button-name',
    'link-name', // Test only naming rules
  ])
  .analyze();
```

#### Test Specific WCAG Levels

**Best Practice**: Use progressive enhancement - start with Level A, then add AA, then AAA.

```typescript
// Phase 1: WCAG 2.1 Level A only
const resultsA = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag21a']).analyze();

// Phase 2: WCAG 2.1 Level AA (includes Level A)
const resultsAA = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();

// Phase 3: Best Practices (industry standards)
const resultsBP = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']).analyze();
```

### Available Tags

From axe-core documentation:

- **WCAG 2.0**: `wcag2a`, `wcag2aa`, `wcag2aaa`
- **WCAG 2.1**: `wcag21a`, `wcag21aa`, `wcag21aaa`
- **WCAG 2.2**: `wcag22aa` (newer rules, disabled by default)
- **Best Practices**: `best-practice` (industry standards, not WCAG)
- **Standards**: `section508`, `EN-301-549`
- **Categories**: `cat.aria`, `cat.color`, `cat.keyboard`, `cat.forms`, etc.

## Custom Rules

Create custom accessibility rules for project-specific requirements.

### Example: Custom Button Rule

```typescript
import axe from 'axe-core';

// Register custom rule
axe.configure({
  rules: [
    {
      id: 'custom-button-padding',
      enabled: true,
      selector: 'button',
      any: ['button-has-padding'],
      tags: ['best-practice'],
      metadata: {
        description: 'Ensures buttons have minimum padding for touch targets',
        help: 'Buttons must have at least 44x44px touch target size',
      },
    },
  ],
  checks: [
    {
      id: 'button-has-padding',
      evaluate: (node: HTMLElement) => {
        const computed = window.getComputedStyle(node);
        const height = node.offsetHeight;
        const width = node.offsetWidth;

        return height >= 44 && width >= 44;
      },
      metadata: {
        impact: 'moderate',
        messages: {
          pass: 'Button has adequate touch target size',
          fail: 'Button must be at least 44x44px for accessibility',
        },
      },
    },
  ],
});
```

## Best Practices

### 1. Layer Your Testing Strategy

```text
┌─────────────────────────────────────────┐
│   Runtime Checks (Development)          │  ← Immediate feedback
│   - Auto-run on page load               │
│   - Keyboard shortcut for manual checks │
└─────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│   Unit Tests (Component Level)           │  ← Test in isolation
│   - Test components with vitest-axe     │
│   - Fast feedback loop                  │
└─────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│   E2E Tests (Full Page Context)          │  ← Test complete pages
│   - Test with @axe-core/playwright      │
│   - Real browser rendering              │
└─────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│   CI/CD Pipeline                         │  ← Prevent regressions
│   - Run all tests before merge          │
│   - Block failing accessibility PRs     │
└─────────────────────────────────────────┘
```

### 2. Use Test Fixtures

**Why**: Avoid duplication, maintain consistency, easier updates.

```typescript
// ✅ GOOD - Shared configuration via fixture
const results = await makeAxeBuilder().include('#specific-element').analyze();

// ❌ BAD - Repeated configuration everywhere
const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa'])
  .exclude('#ads')
  .exclude('.cookie-banner')
  .analyze();
```

### 3. Handle Known Issues Strategically

#### Option 1: Exclude Elements (Quick but Broad)

**Pros**: Simple, fast
**Cons**: Excludes ALL rules for element and descendants

```typescript
.exclude('#element-with-known-issue')
```

#### Option 2: Disable Rules (Targeted)

**Pros**: Specific to rule
**Cons**: Disables rule everywhere

```typescript
.disableRules(['color-contrast'])
```

#### Option 3: Violation Fingerprints (Precise)

**Best Practice**: Track specific known issues without blocking new violations.

```typescript
// Create fingerprint of violations
function violationFingerprints(scanResults: AxeResults) {
  return scanResults.violations.map((violation) => ({
    rule: violation.id,
    // CSS selectors uniquely identify each violating element
    targets: violation.nodes.map((node) => node.target),
  }));
}

// Use snapshot
test('accessibility with known issues tracked', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();

  // Fails if NEW violations appear, but allows known ones
  expect(violationFingerprints(results)).toMatchSnapshot();
});
```

### 4. Wait for Content Before Testing

**Critical**: Dynamic content must be fully rendered before analyze().

```typescript
// ✅ GOOD - Wait for specific element
await page.locator('[data-testid="main-content"]').waitFor();
const results = await new AxeBuilder({ page }).analyze();

// ✅ GOOD - Wait for network idle
await page.waitForLoadState('networkidle');
const results = await new AxeBuilder({ page }).analyze();

// ❌ BAD - May test incomplete content
await page.goto('/');
const results = await new AxeBuilder({ page }).analyze(); // Too early!
```

### 5. Document Exceptions

If you must disable a rule, document why:

```typescript
test('accessibility with documented exceptions', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .disableRules([
      // TODO: Re-enable before launch - Ticket #123
      // Temporarily disabled during brand color exploration
      // Expected completion: Sprint 45
      'color-contrast',
    ])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

### 6. Attach Scan Results for Debugging

**Best Practice**: Include full scan results as test attachments.

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('example with full results attachment', async ({ page }, testInfo) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();

  // Attach complete results for debugging
  await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json',
  });

  expect(results.violations).toEqual([]);
});
```

### 7. Exclude Third-Party Content

**Best Practice**: Don't fail tests for content you can't control.

```typescript
const results = await new AxeBuilder({ page })
  .exclude([
    '#google-ads', // Ads
    '.twitter-embed', // Social embeds
    'iframe[src*="youtube"]', // Video embeds
    '[data-third-party]', // Custom attribute for external widgets
  ])
  .analyze();
```

### 8. Progressive Enhancement Strategy

**Phase 1**: Critical violations only

```typescript
test('critical accessibility issues', async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();

  // Only fail on critical/serious violations
  const criticalViolations = results.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');

  expect(criticalViolations).toEqual([]);
});
```

**Phase 2**: Add WCAG Level A

```typescript
test('WCAG Level A compliance', async ({ page }) => {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a']).analyze();

  expect(results.violations).toEqual([]);
});
```

**Phase 3**: Add WCAG Level AA

```typescript
test('WCAG Level AA compliance', async ({ page }) => {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();

  expect(results.violations).toEqual([]);
});
```

## Advanced Patterns

### Pattern 1: Multi-Page Testing with Shared Context

Test multiple pages with authentication and shared state:

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Authenticated Pages', () => {
  // Setup: Login once for all tests
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Login
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password');
    await page.click('button[type="submit"]');

    // Save auth state
    await context.storageState({ path: 'tests/.auth/user.json' });
    await context.close();
  });

  test.use({ storageState: 'tests/.auth/user.json' });

  const authenticatedPages = ['/dashboard', '/profile', '/settings'];

  for (const url of authenticatedPages) {
    test(`${url} should be accessible`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page }).analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
```

### Pattern 2: Component State Testing

Test all states of interactive components:

```typescript
test('dropdown accessibility in all states', async ({ page }) => {
  await page.goto('/');

  // Test closed state
  const closedResults = await new AxeBuilder({ page }).include('[data-dropdown]').analyze();

  expect(closedResults.violations).toEqual([]);

  // Test open state
  await page.click('[data-dropdown-trigger]');
  await page.locator('[data-dropdown-menu]').waitFor();

  const openResults = await new AxeBuilder({ page }).include('[data-dropdown]').analyze();

  expect(openResults.violations).toEqual([]);
});
```

### Pattern 3: Conditional Testing Based on Feature Flags

```typescript
test('feature accessibility', async ({ page }) => {
  await page.goto('/');

  const isFeatureEnabled = await page.evaluate(() => {
    return window.featureFlags?.newUI === true;
  });

  if (isFeatureEnabled) {
    const results = await new AxeBuilder({ page }).include('[data-new-ui]').analyze();

    expect(results.violations).toEqual([]);
  } else {
    test.skip();
  }
});
```

### Pattern 4: Accessibility Regression Testing

Track violations over time:

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';

test('track accessibility metrics', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();

  const metrics = {
    timestamp: new Date().toISOString(),
    violations: results.violations.length,
    passes: results.passes.length,
    incomplete: results.incomplete.length,
    criticalCount: results.violations.filter((v) => v.impact === 'critical').length,
    seriousCount: results.violations.filter((v) => v.impact === 'serious').length,
  };

  // Store metrics for trending
  const metricsPath = 'tests/.metrics/accessibility.json';
  const existingMetrics = fs.existsSync(metricsPath) ? JSON.parse(fs.readFileSync(metricsPath, 'utf8')) : [];

  existingMetrics.push(metrics);
  fs.writeFileSync(metricsPath, JSON.stringify(existingMetrics, null, 2));

  // Fail test if violations increased
  if (existingMetrics.length > 1) {
    const previous = existingMetrics[existingMetrics.length - 2];
    expect(metrics.violations).toBeLessThanOrEqual(previous.violations);
  }
});
```

## Performance Optimization

### 1. Minimize Test Execution Time

**Problem**: Running full axe scans on every test can be slow.

**Solution**: Run targeted scans and use fixtures.

```typescript
// ❌ SLOW - Full page scan for every test
test('button is accessible', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze(); // Scans entire page
  // ...
});

// ✅ FAST - Scan only relevant component
test('button is accessible', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .include('[data-testid="my-button"]') // Scans only button
    .analyze();
  // ...
});
```

### 2. Parallel Test Execution

Run independent tests in parallel:

```typescript
// playwright.config.ts
export default defineConfig({
  workers: process.env.CI ? 2 : 4, // Run tests in parallel
  // ...
});
```

### 3. Cache Repeated Page Loads

Use `page.context().storageState()` to cache authentication and reduce page loads.

### 4. Use `networkidle` Sparingly

**Problem**: `networkidle` can be slow on pages with continuous network activity.

**Solution**: Wait for specific elements instead.

```typescript
// ❌ SLOW - Waits for all network activity to stop
await page.waitForLoadState('networkidle');

// ✅ FAST - Waits for specific element
await page.locator('[data-testid="main-content"]').waitFor();
```

## NPM Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "test:a11y": "playwright test tests/e2e/accessibility.spec.ts --project=chromium",
    "test:a11y:all": "playwright test tests/e2e/accessibility.spec.ts",
    "test:a11y:ci": "playwright test tests/e2e/accessibility.spec.ts --reporter=json",
    "test:a11y:debug": "playwright test tests/e2e/accessibility.spec.ts --debug"
  }
}
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Accessibility Tests

on: [push, pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:a11y:all

      # Optional: Upload results as artifact
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: accessibility-report
          path: playwright-report/
          retention-days: 30
```

### GitLab CI Example

```yaml
accessibility-tests:
  image: mcr.microsoft.com/playwright:v1.40.0-focal
  stage: test
  script:
    - npm ci
    - npx playwright install
    - npm run build
    - npm run test:a11y:all
  artifacts:
    when: on_failure
    paths:
      - playwright-report/
    expire_in: 30 days
```

## Troubleshooting

### Issue: "axe is not defined"

Make sure axe-core is properly loaded:

```typescript
// Wait for axe to load
await page.addScriptTag({
  path: require.resolve('axe-core'),
});
```

### Issue: Too many violations

Start with critical rules and progressively add more:

```typescript
// Phase 1: Critical only
.withTags(['wcag2a'])

// Phase 2: Add Level AA
.withTags(['wcag2a', 'wcag2aa'])

// Phase 3: Add WCAG 2.1
.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
```

### Issue: Flaky tests

Add proper waits before running axe:

```typescript
await page.goto('/');
await page.waitForLoadState('networkidle');
await page.waitForSelector('[data-testid="main-content"]');

const results = await new AxeBuilder({ page }).analyze();
```

### Issue: Tests fail in CI but pass locally

**Common causes**:

1. Different viewport sizes
2. Missing fonts
3. Different color rendering
4. Timing issues

**Solutions**:

```typescript
// Use consistent viewport
test.use({ viewport: { width: 1280, height: 720 } });

// Wait for fonts to load
await page.evaluate(() => document.fonts.ready);

// Use consistent color space
test.use({ colorScheme: 'light' });
```

## Resources

- [AXE_CORE_GUIDE.md](AXE_CORE_GUIDE.md) - This guide
- [axe-core GitHub](https://github.com/dequelabs/axe-core) - Official repository
- [axe-core API Documentation](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md)
- [Rule Descriptions](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Reka UI Accessibility](https://reka-ui.com/docs/overview/accessibility)
- [@axe-core/playwright Documentation](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)
- [vitest-axe Documentation](https://github.com/chaance/vitest-axe)
- [Playwright Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [Deque University](https://dequeuniversity.com/) - Accessibility training

## Summary

This project uses a comprehensive three-layer accessibility testing approach:

1. **Development** - Runtime checks with keyboard shortcuts (`Ctrl+Shift+A`)
2. **Unit Tests** - Component testing with `vitest-axe`
3. **E2E Tests** - Full page testing with `@axe-core/playwright`

All layers use the same axe-core engine for consistent results. Start with runtime checks during
development, add unit tests for components, and use E2E tests for full page validation.

**Remember**: Automated testing catches ~57% of WCAG issues. Manual testing and user feedback
are essential for comprehensive accessibility.

### Quick Start Checklist

- [ ] Install axe-core packages (already done)
- [ ] Set up runtime checks in development
- [ ] Create test fixtures for reusable configuration
- [ ] Write E2E tests for critical user flows
- [ ] Add unit tests for interactive components
- [ ] Configure CI/CD to run accessibility tests
- [ ] Document known issues and exceptions
- [ ] Review results regularly and fix violations
- [ ] Perform manual testing for remaining 43% of issues

### Impact Levels Priority

When fixing violations, prioritize by impact:

1. **Critical** - Major accessibility barriers, fix immediately
2. **Serious** - Significant barriers, fix in current sprint
3. **Moderate** - Some users affected, fix in next sprint
4. **Minor** - Best practices, fix when possible

### Common Violation Types

From axe-core best practices rules:

- **Empty headings** - Headings without text
- **Empty table headers** - Table headers without text
- **Heading order** - Non-sequential heading levels
- **Landmark unique** - Duplicate landmark roles without labels
- **Region** - Content not contained in landmarks
- **Tabindex** - Positive tabindex values

Happy testing! 🚀
