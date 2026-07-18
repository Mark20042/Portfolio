<script lang="ts">
	import myImage from '$lib/images/me.webp';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import StaggerReveal from '$lib/components/StaggerReveal.svelte';

	import { Eye, Star, Heart, MapPin } from 'lucide-svelte';

	let mounted = $state(false);

	let viewsCount = $state(0);
	let likesCount = $state(0);
	let avgRating = $state(0);
	let hasLiked = $state(false);

	onMount(async () => {
		if (!browser) return;

		mounted = true;
		try {
			const res = await fetch('/api/stats', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ action: 'view' })
			});
			if (res.ok) {
				const data = await res.json();
				viewsCount = data.views ?? viewsCount;
				likesCount = data.likes ?? likesCount;
				avgRating = data.avgRating ?? avgRating;
			}
		} catch (e) {
			console.error('Failed to fetch stats:', e);
		}
	});

	async function handleLike(event: MouseEvent) {
		if (hasLiked) return;
		likesCount++;
		hasLiked = true;

		// Send like to backend in the background without blocking the UI
		fetch('/api/stats', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ action: 'like' })
		}).catch((e) => console.error('Failed to update likes:', e));

		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = (rect.left + rect.width / 2) / window.innerWidth;
		const y = (rect.top + rect.height / 2) / window.innerHeight;

		const module = await import('canvas-confetti');
		const confetti = module.default || module;

		const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#14b8a6'];

		const duration = 1500; // 1.8 seconds of continuous throwing
		const end = Date.now() + duration;

		(function frame() {
			confetti({
				particleCount: 7,
				angle: 60,
				spread: 55,
				origin: { x: 0, y: y + 0.1 },
				colors: colors
			});
			confetti({
				particleCount: 7,
				angle: 120,
				spread: 55,
				origin: { x: 1, y: y + 0.1 },
				colors: colors
			});

			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		})();
	}
</script>

{#if mounted}
	<div
		in:fly={{ y: 40, duration: 1500, delay: 200, easing: cubicOut }}
		class="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row"
	>
		<!-- Left Column: Badges & Text -->
		<div class="mt-2 flex-1 md:mt-0">
			<!-- Mobile Profile Image (Visible only on mobile, placed at the top) -->
			<div
				class="group relative mb-6 h-36 w-36 shrink-0 cursor-pointer perspective-[1000px] md:hidden"
			>
				<!-- Glowing ethereal backdrop that expands and fades in on hover -->
				<div
					class="absolute inset-0 scale-90 rounded-3xl bg-gradient-to-tr from-sky-500 via-purple-500 to-blue-500 opacity-60 blur-2xl dark:opacity-40"
				></div>

				<!-- Bouncy Image Container with Tilt & Glow -->
				<div class="relative z-10 h-full w-full overflow-hidden rounded-3xl">
					<!-- Cinematic Grayscale to Color Transition -->
					<img
						src={myImage}
						alt="Mark Joseph Potot"
						width="192"
						height="192"
						fetchpriority="high"
						decoding="sync"
						class="h-full w-full object-cover brightness-100 contrast-100 drop-shadow-[0_20px_25px_rgba(236,72,153,0.4)] grayscale-0"
					/>
				</div>
			</div>

			<!-- Hero Text -->
			<StaggerReveal delay={30} stagger={70} duration={720}>
				<h1
					class="mb-2 flex items-center gap-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white"
				>
					Mark Joseph Potot
					<svg
						class="h-5 w-5 fill-blue-500 text-blue-500"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
						/><path d="m9 12 2 2 4-4" stroke="white" stroke-width="3" /></svg
					>
				</h1>

				<div
					class="mb-3 flex items-center gap-1.5 text-sm font-medium text-slate-700 sm:text-base dark:text-slate-300"
				>
					<MapPin class="h-4 w-4 text-slate-600 dark:text-slate-400" />
					Lahug Cebu City, Cebu, Philippines
				</div>

				<div
					class="mb-6 flex items-center gap-1.5 text-xs font-medium whitespace-nowrap text-slate-900 sm:gap-2 sm:text-sm md:text-base dark:text-white"
				>
					Full-Stack Developer <span class="font-light text-slate-300 dark:text-slate-600">\</span>
					Generative AI
					<span class="font-light text-slate-300 dark:text-slate-600">\</span> Data Science
				</div>
			</StaggerReveal>

			<!-- Stats / Badges (Moved below title for better layout) -->
			<StaggerReveal delay={170} stagger={80} duration={700} className="mb-6 flex flex-wrap gap-3">
				<div
					class="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
				>
					<Eye class="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
					{viewsCount} Profile Views
				</div>
				<div
					class="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
				>
					<Star class="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
					{avgRating}
				</div>
				<button
					onclick={handleLike}
					class="flex cursor-pointer items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-semibold shadow-sm transition-all duration-300 active:scale-95 dark:bg-slate-900 {hasLiked
						? 'border-sky-200 bg-sky-50 text-sky-500 shadow-sky-500/20 dark:border-sky-900/50 dark:bg-sky-950/20'
						: 'border-slate-200 text-slate-700 hover:border-sky-200 hover:text-sky-500 hover:shadow-sm dark:border-slate-800 dark:text-slate-300 dark:hover:border-sky-900/50 dark:hover:text-sky-400'}"
				>
					<Heart
						class="h-3.5 w-3.5 transition-colors duration-300 {hasLiked
							? 'fill-sky-500 text-sky-500'
							: 'text-slate-600 group-hover:text-sky-500 dark:text-slate-400'}"
					/>
					{likesCount}
				</button>
			</StaggerReveal>

			<StaggerReveal
				delay={230}
				stagger={90}
				duration={680}
				className="mt-4 flex flex-nowrap items-center gap-3 sm:mt-8 sm:gap-6"
			>
				<button
					class="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold whitespace-nowrap text-slate-900 shadow-sm transition-all duration-700 ease-in-out hover:bg-slate-50 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm dark:border-[#222222] dark:bg-[#111111] dark:text-white dark:hover:bg-[#1a1a1a]"
				>
					<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900 sm:h-2 sm:w-2 dark:bg-white"
					></span>
					Let's Work Together
				</button>
				<a
					href="/roadmap"
					class="shrink-0 text-[11px] font-semibold whitespace-nowrap text-slate-600 hover:text-slate-900 sm:text-sm dark:text-slate-400 dark:hover:text-white"
				>
					View updates & roadmap
				</a>
			</StaggerReveal>
		</div>

		<!-- Right Column: Big Profile Image (Desktop Only) -->
		<div
			class="group relative hidden h-48 w-48 shrink-0 cursor-pointer perspective-[1000px] md:block"
		>
			<!-- Glowing ethereal backdrop that expands and fades in on hover -->
			<div
				class="absolute inset-0 scale-90 rounded-3xl bg-gradient-to-tr from-sky-500 via-purple-500 to-blue-500 opacity-0 blur-2xl transition-opacity duration-700 ease-out group-hover:scale-110 group-hover:opacity-60 dark:group-hover:opacity-40"
			></div>

			<!-- Bouncy Image Container with Tilt & Glow -->
			<div
				class="relative z-10 h-full w-full overflow-hidden rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-3 group-hover:scale-[1.08] group-hover:-rotate-3"
			>
				<!-- Cinematic Grayscale to Color Transition -->
				<img
					src={myImage}
					alt="Mark Joseph Potot"
					width="192"
					height="192"
					fetchpriority="high"
					decoding="sync"
					class="h-full w-full object-cover brightness-100 contrast-100 drop-shadow-[0_20px_25px_rgba(236,72,153,0.4)] grayscale-0 transition-all duration-700 ease-out group-hover:scale-110"
				/>
			</div>
		</div>
	</div>
{/if}
