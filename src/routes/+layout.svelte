<script lang="ts">
	import './layout.css';
	import myicon from '$lib/images/me.webp';
	import { onMount, flushSync } from 'svelte';
	import Dock from '$lib/components/Dock.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { page } from '$app/stores';

	let { children } = $props();
	let isDark = $state(false);

	let isWidePage = $derived($page.url.pathname.startsWith('/projects') || $page.url.pathname.startsWith('/certificates') || $page.url.pathname.startsWith('/gallery'));

	onMount(() => {
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			isDark = true;
			document.documentElement.classList.add('dark');
		} else {
			isDark = false;
			document.documentElement.classList.remove('dark');
		}
	});

	function updateTheme() {
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.theme = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.theme = 'light';
		}
	}

	function toggleTheme(event: MouseEvent) {
		const isAppearanceTransition = document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!isAppearanceTransition) {
			isDark = !isDark;
			updateTheme();
			return;
		}

		const x = event.clientX;
		const y = event.clientY;
		const endRadius = Math.hypot(
			Math.max(x, innerWidth - x),
			Math.max(y, innerHeight - y)
		);

		const transition = document.startViewTransition(() => {
			flushSync(() => {
				isDark = !isDark;
				updateTheme();
			});
		});

		transition.ready.then(() => {
			const clipPath = [
				`circle(0px at ${x}px ${y}px)`,
				`circle(${endRadius}px at ${x}px ${y}px)`
			];
			document.documentElement.animate(
				{
					clipPath: clipPath,
				},
				{
					duration: 1000,
					easing: 'ease-in-out',
					pseudoElement: '::view-transition-new(root)'
				}
			);
		});
	}
</script>

<svelte:head>
	<link rel="icon" href={myicon} />
	<title>Mark Joseph Potot</title>
</svelte:head>

<div class="min-h-screen bg-white text-slate-900 dark:bg-[#111111] dark:text-slate-50 selection:bg-black/10 dark:selection:bg-white/10 flex flex-col">
	
	<!-- Top Full-Width GitHub Grid Banner -->
	<div class="absolute top-0 inset-x-0 h-35 bg-github-grid opacity-30 dark:opacity-15 [mask-image:linear-gradient(to_bottom,black_40%,transparent)] z-0 pointer-events-none"></div>

	<main class="relative z-10 mx-auto px-4 sm:px-6 pt-20 sm:pt-38 pb-48 sm:pb-80 w-full flex-1 {isWidePage ? 'max-w-5xl xl:max-w-6xl' : 'max-w-3xl'}">
		{@render children()}
	</main>

	<Footer />
	<Dock {isDark} {toggleTheme} />
</div>
