# Test Suite Documentation

Comprehensive testing setup with unit tests (Vitest) and E2E tests (Playwright) following industry best
practices.

## Test Structure

```text
tests/
├── fixtures/
│   └── axe-test.ts              # Shared axe-core configuration
├── config/
│   ├── test-urls.ts             # Centralized URL configuration
│   └── axe.config.ts            # Global axe-core settings
├── unit/
│   └── Counter.spec.ts          # Component unit tests
└── e2e/
    ├── homepage.spec.ts         # Basic E2E tests
    ├── accessibility.spec.ts    # Core accessibility tests
    ├── accessibility-advanced.spec.ts # Advanced a11y patterns
    └── keyboard-navigation.spec.ts    # Keyboard interaction tests
```

## Running Tests

### Unit Tests (Vitest)

```bash
npm test                  # Run unit tests
npm run test:ui           # Run with UI
npm run test:coverage     # Generate coverage report
```

### E2E Tests (Playwright)

```bash
# General E2E
npm run test:e2e          # Run all E2E tests (Chromium only, fast)
npm run test:e2e:all      # Run on all browsers (slower)
npm run test:e2e:ui       # Interactive mode
npm run test:e2e:debug    # Debug mode
npm run test:e2e:report   # View HTML report

# Accessibility Tests
npm run test:a11y         # Basic accessibility tests (fast)
npm run test:a11y:all     # All browsers
npm run test:a11y:advanced # Advanced patterns only
npm run test:a11y:full    # All accessibility tests
npm run test:a11y:ci      # CI-optimized with JSON reporter
```

## Accessibility Testing Architecture

### Three-Layer Approach

Following industry best practices, our accessibility testing uses a comprehensive three-layer approach:

```text
┌─────────────────────────────────────────┐
│   Runtime Checks (Development)          │  ← Immediate feedback
│   - Auto-run on page load               │    Press Ctrl+Shift+A
│   - Keyboard shortcut for manual checks │
└─────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│   Unit Tests (Component Level)           │  ← Fast feedback
│   - Component isolation testing         │    with vitest-axe
│   - Vitest integration                  │
└─────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│   E2E Tests (Full Page Context)          │  ← Complete validation
│   - Full page accessibility             │    with @axe-core/playwright
│   - Real browser rendering              │
└─────────────────────────────────────────┘
```

### Test Categories

#### 1. Core Accessibility Tests (`accessibility.spec.ts`)

- **Site-wide tests**: All main pages tested with loop-based approach
- **Component tests**: Specific sections and interactive elements
- **User flow tests**: Critical paths through the application
- **WCAG compliance**: Separate tests for Level A, AA, and Best Practices

**Key Features:**

- Uses test fixtures for consistent configuration
- Centralized URL management via `test-urls.ts`
- Comprehensive documentation with inline comments
- Best practices from Playwright and axe-core documentation

#### 2. Advanced Patterns (`accessibility-advanced.spec.ts`)

- **Progressive testing**: Critical violations first, then serious
- **Dynamic content**: Tests for modals, accordions, tabs
- **Component states**: All states of interactive elements
- **Performance optimization**: Region-specific scans
- **Regression tracking**: Violation metrics over time

**Key Features:**

- Impact-based filtering (Critical → Serious → Moderate → Minor)
- State-based testing for dynamic components
- ARIA pattern validation
- Keyboard navigation checks

### Test Fixtures

The `tests/fixtures/axe-test.ts` fixture provides:

- Pre-configured WCAG 2.1 Level AA + Best Practices
- Common third-party exclusions (ads, embeds)
- Consistent configuration across all tests
- Easy to extend for project-specific needs

**Usage:**

```typescript
import { test, expect } from '../fixtures/axe-test';

test('my page is accessible', async ({ page, makeAxeBuilder }) => {
  await page.goto('/my-page');
  const results = await makeAxeBuilder().analyze();
  expect(results.violations).toEqual([]);
});
```

### Configuration Files

#### `tests/config/test-urls.ts`

Centralized URL management for multi-page testing:

```typescript
export const testPages: TestPage[] = [
  {
    url: '/',
    name: 'Homepage',
    waitForSelectors: ['text=Lightning-Fast Builds'],
  },
  // Add more pages here
];
```

**Benefits:**

- Single source of truth for tested pages
- Automatic inclusion in site-wide tests
- Consistent wait strategies

#### `tests/config/axe.config.ts`

Global axe-core configuration for runtime checks:

```typescript
export const axeConfig: Spec = {
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'],
  rules: [
    /* ... */
  ],
  exclude: [
    /* ... */
  ],
};
```

**Benefits:**

- Consistent rules across all tests
- Impact-based filtering helpers
- Easy to update globally

## Best Practices Implemented

### 1. Test Fixtures

✅ Shared configuration via fixtures
✅ No duplication across tests
✅ Easy to maintain and update

### 2. Wait Strategies

✅ `waitForSelector()` for specific elements
✅ `waitForLoadState('networkidle')` for full page loads
✅ Custom wait selectors per page

### 3. Progressive Enhancement

✅ Test critical violations first
✅ Then add serious violations
✅ Finally test all WCAG levels

### 4. Loop-Based Testing

✅ Multiple pages tested systematically
✅ Centralized URL configuration
✅ Consistent test patterns

### 5. Debugging Support

✅ Attach full scan results to tests
✅ JSON reporter for CI integration
✅ Violation fingerprinting

## Adding New Tests

### Add a New Page to Test

1. Add URL to `tests/config/test-urls.ts`:

```typescript
export const testPages: TestPage[] = [
  // ... existing pages
  {
    url: '/new-page',
    name: 'New Page',
    waitForSelectors: ['text=Unique Content'],
  },
];
```

1. Run tests - new page is automatically included!

```bash
npm run test:a11y
```

### Add a New Test Pattern

Create a new test file or add to existing:

```typescript
import { test, expect } from '../fixtures/axe-test';

test.describe('My Feature', () => {
  test('should be accessible', async ({ page, makeAxeBuilder }) => {
    await page.goto('/my-feature');
    await page.waitForSelector('[data-my-feature]');

    const results = await makeAxeBuilder().include('[data-my-feature]').analyze();

    expect(results.violations).toEqual([]);
  });
});
```

## CI/CD Integration

Tests are optimized for CI with:

- Chromium-only mode for speed (`test:a11y`)
- JSON reporter for CI parsing (`test:a11y:ci`)
- Automatic screenshot/video on failure
- HTML report generation

### GitHub Actions Example

```yaml
- run: npm ci
- run: npx playwright install --with-deps chromium
- run: npm run build
- run: npm run test:a11y:ci
```

## Troubleshooting

### Tests are slow

Use region-specific scans:

```typescript
.include('main') // Only test main content
```

### Flaky tests

Add proper waits:

```typescript
await page.waitForSelector('[data-testid="content"]');
await page.waitForLoadState('networkidle');
```

### Too many violations

Start with critical only:

```typescript
const critical = filterByImpact(results.violations, ['critical']);
expect(critical).toEqual([]);
```

## Resources

- [AXE_CORE_GUIDE.md](../AXE_CORE_GUIDE.md) - Comprehensive axe-core guide
- [Playwright Docs](https://playwright.dev/docs/accessibility-testing)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Summary

This test suite implements industry best practices from:

- ✅ Playwright official documentation
- ✅ axe-core team recommendations
- ✅ Qantas Engineering multi-layer approach
- ✅ Community-validated patterns

**Coverage:**

- ~57% of WCAG issues detected automatically
- Progressive enhancement (Critical → AA → Best Practices)
- Multi-layer testing (Unit → E2E → CI/CD)
- Advanced patterns (State, Dynamic, Regression)

Happy testing! 🚀
