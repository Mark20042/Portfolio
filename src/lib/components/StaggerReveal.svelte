<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	let {
		distance = 18,
		duration = 700,
		delay = 0,
		stagger = 90,
		once = false,
		className = '',
		children
	}: {
		distance?: number;
		duration?: number;
		delay?: number;
		stagger?: number;
		once?: boolean;
		className?: string;
		children?: Snippet;
	} = $props();

	let visible = $state(false);
	let el = $state<HTMLElement | null>(null);
	let prefersReducedMotion = $state(false);

	const applyChildIndices = () => {
		if (!el) return;
		Array.from(el.children).forEach((child, index) => {
			(child as HTMLElement).style.setProperty('--stagger-index', `${index}`);
		});
	};

	onMount(() => {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = media.matches;
		if (prefersReducedMotion) {
			visible = true;
			return;
		}

		if (!el) return;
		applyChildIndices();

		const childObserver = new MutationObserver(() => applyChildIndices());
		childObserver.observe(el, { childList: true });

		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					if (once) obs.unobserve(entry.target);
				} else if (!once) {
					visible = false;
				}
			},
			{ threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
		);

		obs.observe(el);
		return () => {
			childObserver.disconnect();
			obs.disconnect();
		};
	});
</script>

<div
	bind:this={el}
	class={`stagger-wrap ${className}`}
	class:is-visible={visible}
	style={`--stagger-distance:${distance}px;--stagger-duration:${duration}ms;--stagger-delay:${delay}ms;--stagger-gap:${stagger}ms;`}
>
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.stagger-wrap > :global(*) {
		opacity: 0;
		transform: translate3d(0, var(--stagger-distance), 0);
		transition:
			opacity var(--stagger-duration) cubic-bezier(0.22, 1, 0.36, 1),
			transform var(--stagger-duration) cubic-bezier(0.22, 1, 0.36, 1);
		transition-delay: calc(var(--stagger-delay) + (var(--stagger-index, 0) * var(--stagger-gap)));
		will-change: opacity, transform;
	}

	.stagger-wrap.is-visible > :global(*) {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}

	@media (prefers-reduced-motion: reduce) {
		.stagger-wrap > :global(*) {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
