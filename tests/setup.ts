import { vi, expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';
import type { AxeMatchers } from 'vitest-axe/matchers';

// Extend Vitest's Assertion interface with axe matchers
declare module 'vitest' {
	interface Assertion extends AxeMatchers {}
	interface AsymmetricMatchersContaining extends AxeMatchers {}
}

expect.extend(matchers);

// Mock IntersectionObserver for motion-v animations
class IntersectionObserverMock {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
	root = null;
	rootMargin = '';
	thresholds = [];
	takeRecords = vi.fn().mockReturnValue([]);
}

global.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;

// Mock ResizeObserver for responsive components
class ResizeObserverMock {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
}

global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

// Mock requestAnimationFrame for animations
global.requestAnimationFrame = ((callback: FrameRequestCallback) => {
	return setTimeout(() => callback(Date.now()), 16);
}) as typeof requestAnimationFrame;

global.cancelAnimationFrame = ((id: number) => {
	clearTimeout(id);
}) as typeof cancelAnimationFrame;
