<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	let {
		direction = 'up',
		distance = 40,
		duration = 800,
		delay = 130,
		once = false,
		className = '',
		children
	}: {
		direction?: 'up' | 'down' | 'left' | 'right';
		distance?: number;
		duration?: number;
		delay?: number;
		once?: boolean;
		className?: string;
		children?: Snippet;
	} = $props();

	let visible = $state(false);
	let el = $state<HTMLElement | null>(null);
	let prefersReducedMotion = $state(false);

	const getHiddenTransform = () => {
		switch (direction) {
			case 'down':
				return `translate3d(0, ${-distance}px, 0)`;
			case 'left':
				return `translate3d(${distance}px, 0, 0)`;
			case 'right':
				return `translate3d(${-distance}px, 0, 0)`;
			case 'up':
			default:
				return `translate3d(0, ${distance}px, 0)`;
		}
	};

	onMount(() => {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = media.matches;
		if (prefersReducedMotion) {
			visible = true;
			return;
		}

		if (!el) return;
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					if (once) obs.unobserve(entry.target);
				} else if (!once) {
					visible = false;
				}
			},
			{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
		);
		obs.observe(el);
		return () => obs.disconnect();
	});
</script>

<div bind:this={el} class={className}>
	<div
		class="reveal-content"
		class:is-visible={visible}
		style={`--reveal-duration:${duration}ms;--reveal-delay:${delay}ms;--reveal-hidden-transform:${getHiddenTransform()};`}
	>
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>

<style>
	.reveal-content {
		opacity: 0;
		transform: var(--reveal-hidden-transform);
		transition:
			opacity var(--reveal-duration) cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay),
			transform var(--reveal-duration) cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay);
		will-change: opacity, transform;
	}

	.reveal-content.is-visible {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}

	@media (prefers-reduced-motion: reduce) {
		.reveal-content {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
