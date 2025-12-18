import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from 'vitest-axe';
import Counter from '@components/demo/Counter.vue';

describe('Counter.vue', () => {
	let wrapper: ReturnType<typeof mount>;

	beforeEach(() => {
		wrapper = mount(Counter, {
			props: {
				initialCount: 0,
			},
		});
	});

	describe('Initialization', () => {
		it('renders with initial count from props', () => {
			const customWrapper = mount(Counter, {
				props: { initialCount: 5 },
			});
			expect(customWrapper.text()).toContain('5');
		});

		it('defaults to 0 when no initialCount provided', () => {
			const defaultWrapper = mount(Counter);
			expect(defaultWrapper.text()).toContain('0');
		});

		it('renders all three control buttons', () => {
			const buttons = wrapper.findAll('button');
			expect(buttons).toHaveLength(3);

			// Verify buttons by aria-label (testing real behavior, not test IDs)
			expect(wrapper.find('[aria-label="Decrement"]').exists()).toBe(true);
			expect(wrapper.find('[aria-label="Reset"]').exists()).toBe(true);
			expect(wrapper.find('[aria-label="Increment"]').exists()).toBe(true);
		});
	});

	describe('User Interactions', () => {
		it('increments count when increment button clicked', async () => {
			const incrementBtn = wrapper.find('[aria-label="Increment"]');
			await incrementBtn.trigger('click');

			// Test real behavior: count should be 1
			expect(wrapper.text()).toContain('1');
		});

		it('decrements count when decrement button clicked', async () => {
			const decrementBtn = wrapper.find('[aria-label="Decrement"]');
			await decrementBtn.trigger('click');

			// Test real behavior: count should be -1
			expect(wrapper.text()).toContain('-1');
		});

		it('resets count to 0 when reset button clicked', async () => {
			// First increment to 5
			const incrementBtn = wrapper.find('[aria-label="Increment"]');
			for (let i = 0; i < 5; i++) {
				await incrementBtn.trigger('click');
			}

			// Then reset
			const resetBtn = wrapper.find('[aria-label="Reset"]');
			await resetBtn.trigger('click');

			// Should be back to 0
			expect(wrapper.text()).toContain('0');
		});

		it('handles multiple increments correctly', async () => {
			const incrementBtn = wrapper.find('[aria-label="Increment"]');

			await incrementBtn.trigger('click');
			await incrementBtn.trigger('click');
			await incrementBtn.trigger('click');

			expect(wrapper.text()).toContain('3');
		});

		it('handles mixed increment and decrement operations', async () => {
			const incrementBtn = wrapper.find('[aria-label="Increment"]');
			const decrementBtn = wrapper.find('[aria-label="Decrement"]');

			await incrementBtn.trigger('click'); // 1
			await incrementBtn.trigger('click'); // 2
			await decrementBtn.trigger('click'); // 1

			expect(wrapper.text()).toContain('1');
		});
	});

	describe('Computed Properties', () => {
		it('displays correct total clicks for positive count', async () => {
			const incrementBtn = wrapper.find('[aria-label="Increment"]');
			await incrementBtn.trigger('click');
			await incrementBtn.trigger('click');

			// Total clicks should show 2
			expect(wrapper.text()).toContain('Total Clicks');
			expect(wrapper.text()).toContain('2');
		});

		it('displays correct total clicks for negative count', async () => {
			const decrementBtn = wrapper.find('[aria-label="Decrement"]');
			await decrementBtn.trigger('click');
			await decrementBtn.trigger('click');

			// Total clicks should show 2 (absolute value)
			expect(wrapper.text()).toContain('Total Clicks');
			expect(wrapper.text()).toContain('2');
		});

		it('displays correct direction arrow for positive count', async () => {
			const incrementBtn = wrapper.find('[aria-label="Increment"]');
			await incrementBtn.trigger('click');

			// Direction should be ↑
			expect(wrapper.text()).toContain('↑');
		});

		it('displays correct direction arrow for negative count', async () => {
			const decrementBtn = wrapper.find('[aria-label="Decrement"]');
			await decrementBtn.trigger('click');

			// Direction should be ↓
			expect(wrapper.text()).toContain('↓');
		});

		it('displays correct direction arrow for zero', () => {
			// Direction should be →
			expect(wrapper.text()).toContain('→');
		});
	});

	describe('Animation Trigger', () => {
		it('triggers pulse animation on increment', async () => {
			vi.useFakeTimers();

			const incrementBtn = wrapper.find('[aria-label="Increment"]');
			await incrementBtn.trigger('click');

			// Animation should be active immediately after click
			expect(wrapper.vm.isAnimating).toBe(true);

			// Fast-forward time
			vi.advanceTimersByTime(300);
			await wrapper.vm.$nextTick();

			// Animation should be complete
			expect(wrapper.vm.isAnimating).toBe(false);

			vi.useRealTimers();
		});

		it('triggers pulse animation on decrement', async () => {
			vi.useFakeTimers();

			const decrementBtn = wrapper.find('[aria-label="Decrement"]');
			await decrementBtn.trigger('click');

			expect(wrapper.vm.isAnimating).toBe(true);

			vi.advanceTimersByTime(300);
			await wrapper.vm.$nextTick();

			expect(wrapper.vm.isAnimating).toBe(false);

			vi.useRealTimers();
		});

		it('triggers pulse animation on reset', async () => {
			vi.useFakeTimers();

			const resetBtn = wrapper.find('[aria-label="Reset"]');
			await resetBtn.trigger('click');

			expect(wrapper.vm.isAnimating).toBe(true);

			vi.advanceTimersByTime(300);
			await wrapper.vm.$nextTick();

			expect(wrapper.vm.isAnimating).toBe(false);

			vi.useRealTimers();
		});
	});

	describe('Accessibility', () => {
		it('has proper aria-labels on all buttons', () => {
			expect(wrapper.find('[aria-label="Decrement"]').exists()).toBe(true);
			expect(wrapper.find('[aria-label="Reset"]').exists()).toBe(true);
			expect(wrapper.find('[aria-label="Increment"]').exists()).toBe(true);
		});

		it('displays semantic labels for statistics', () => {
			expect(wrapper.text()).toContain('Total Clicks');
			expect(wrapper.text()).toContain('Direction');
		});

		it('should not have any automatically detectable accessibility issues', async () => {
			const results = await axe(wrapper.element, {
				rules: {
					// Disable region rule for isolated component testing
					// Full page landmark testing is covered by E2E tests
					region: { enabled: false },
				},
			});
			expect(results).toHaveNoViolations();
		});
	});
});
