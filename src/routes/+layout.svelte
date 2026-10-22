<script lang="ts">
	import './layout.css';
	import myicon from '$lib/images/me.webp';
	import { onMount, setContext } from 'svelte';
	import Dock from '$lib/components/Dock.svelte';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { page } from '$app/stores';

	let { children } = $props();
	let isDark = $state(false);
	const heroTheme = $state({
		isDark: false,
		toggleTheme
	});
	setContext('hero-theme', heroTheme);

	let isWidePage = $derived(
		$page.url.pathname.startsWith('/projects') ||
			$page.url.pathname.startsWith('/certificates') ||
			$page.url.pathname.startsWith('/gallery') ||
			$page.url.pathname.startsWith('/skills')
	);

	onMount(() => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			isDark = true;
			document.documentElement.classList.add('dark');
		} else {
			isDark = false;
			document.documentElement.classList.remove('dark');
		}
		heroTheme.isDark = isDark;
	});

	function updateTheme() {
		heroTheme.isDark = isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.theme = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.theme = 'light';
		}
	}

	function toggleTheme() {
		isDark = !isDark;
		updateTheme();
	}
</script>

<svelte:head>
	<link rel="icon" href={myicon} />
	<title>Mark Joseph Potot</title>
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-white text-slate-900 selection:bg-black/10 dark:bg-[#111111] dark:text-slate-50 dark:selection:bg-white/10"
>
	<!-- Top Full-Width GitHub Grid Banner -->
	<div
		class="bg-github-grid pointer-events-none absolute inset-x-0 top-0 z-0 h-35 [mask-image:linear-gradient(to_bottom,black_40%,transparent)] opacity-30 dark:opacity-15"
	></div>

	{#if $page.url.pathname === '/'}
		<aside
			class="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col overflow-y-auto border-r border-slate-200 bg-white px-7 py-8 lg:flex dark:border-slate-800 dark:bg-[#111111]"
		>
			<a
				href="#intro"
				class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
				aria-label="Mark Joseph Potot, back to intro">mjp<span class="text-sky-500">.</span></a
			>
			<p
				class="mt-7 text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400"
			>
				Software Developer<br />AI &amp; Cybersecurity
			</p>
			<nav aria-label="Homepage sections" class="mt-16 flex flex-col">
				{#each [{ href: '#intro', label: 'Intro' }, { href: '#about', label: 'About' }, { href: '#projects', label: 'Work' }, { href: '#games', label: 'Games' }, { href: '#achievements', label: 'Achievements' }] as item, index}
					<a
						href={item.href}
						class="flex items-center gap-3 border-t border-slate-200 py-3 text-[11px] font-semibold tracking-wider text-slate-600 uppercase transition-colors hover:text-sky-600 focus-visible:text-sky-600 dark:border-slate-800 dark:text-slate-400 dark:hover:text-sky-400"
					>
						<span class="text-[10px] text-slate-400 dark:text-slate-500"
							>{String(index + 1).padStart(2, '0')}</span
						>{item.label}
					</a>
				{/each}
				<a
					href="/projects"
					class="border-t border-slate-200 py-3 text-[11px] font-semibold tracking-wider text-slate-600 uppercase transition-colors hover:text-sky-600 dark:border-slate-800 dark:text-slate-400 dark:hover:text-sky-400"
					>All projects ↗</a
				>
				<a
					href="/certificates"
					class="border-t border-slate-200 py-3 text-[11px] font-semibold tracking-wider text-slate-600 uppercase transition-colors hover:text-sky-600 dark:border-slate-800 dark:text-slate-400 dark:hover:text-sky-400"
					>Certificates ↗</a
				>
			</nav>
			<div class="mt-auto space-y-5 border-t border-slate-200 pt-5 dark:border-slate-800">
				<ThemeSwitch {isDark} {toggleTheme} />
				<p
					class="text-[10px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500"
				>
					Bogo City · PH
				</p>
			</div>
		</aside>
	{/if}

	<main
		class="relative z-10 mx-auto w-full flex-1 px-4 pt-20 pb-48 sm:px-6 sm:pt-38 sm:pb-80 {isWidePage
			? 'max-w-5xl xl:max-w-6xl'
			: $page.url.pathname === '/'
				? 'max-w-3xl lg:ml-56 lg:w-[calc(100%-14rem)] lg:max-w-none lg:px-10 lg:pt-0 xl:px-16'
				: 'max-w-3xl'}"
	>
		{@render children()}
	</main>

	<Footer />
	<div class={$page.url.pathname === '/' ? 'lg:hidden' : ''}>
		<Dock {isDark} {toggleTheme} />
	</div>
</div>
