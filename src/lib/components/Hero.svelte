<script lang="ts">
	import myImage from '$lib/images/me.png';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { Eye, Star, Heart, MapPin } from 'lucide-svelte';

	let mounted = $state(false);
	
	let viewsCount = $state(0);
	let likesCount = $state(0);
	let avgRating = $state(0);
	let hasLiked = $state(false);

	onMount(async () => {
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
		}).catch(e => console.error('Failed to update likes:', e));
		
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
		}());
	}
</script>

{#if mounted}
<div in:fly={{ y: 40, duration: 1500, delay: 200, easing: cubicOut }} class="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
	
	<!-- Left Column: Badges & Text -->
	<div class="flex-1 mt-2 md:mt-0">
		<!-- Mobile Profile Image (Visible only on mobile, placed at the top) -->
		<div class="md:hidden relative w-36 h-36 mb-6 shrink-0 cursor-pointer group perspective-[1000px]">
			<!-- Glowing ethereal backdrop that expands and fades in on hover -->
			<div class="absolute inset-0 bg-gradient-to-tr from-sky-500 via-purple-500 to-blue-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 dark:group-hover:opacity-40 transition-opacity duration-700 ease-out scale-90 group-hover:scale-110"></div>
			
			<!-- Bouncy Image Container with Tilt & Glow -->
			<div class="relative w-full h-full rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08] group-hover:-translate-y-3 group-hover:-rotate-3 z-10">
				<!-- Cinematic Grayscale to Color Transition -->
				<img src={myImage} alt="Mark Joseph Potot" class="w-full h-full object-cover grayscale-[30%] brightness-90 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700 ease-out group-hover:scale-110 drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_20px_25px_rgba(236,72,153,0.4)]" />
			</div>
		</div>

		<!-- Hero Text -->
		<h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 flex items-center gap-3">
			Mark Joseph Potot
			<svg class="w-5 h-5 text-blue-500 fill-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4" stroke="white" stroke-width="3"/></svg>
		</h1>
		
		<div class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium mb-3 text-sm sm:text-base">
			<MapPin class="w-4 h-4 text-slate-500 dark:text-slate-400" />
			Cayang Bogo City, Cebu, Philippines
		</div>

		<div class="text-xs sm:text-sm md:text-base text-slate-900 dark:text-white font-medium flex items-center gap-1.5 sm:gap-2 whitespace-nowrap mb-6">
			Full-Stack Developer <span class="text-slate-300 dark:text-slate-600 font-light">\</span> AI Developer <span class="text-slate-300 dark:text-slate-600 font-light">\</span> Machine Learning
		</div>

		<!-- Stats / Badges (Moved below title for better layout) -->
		<div class="flex flex-wrap gap-3 mb-6">
			<div class="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
				<Eye class="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
				{viewsCount} Profile Views
			</div>
			<div class="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
				<Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
				{avgRating}
			</div>
			<button onclick={handleLike} class="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border rounded-full text-xs font-semibold shadow-sm transition-all duration-300 cursor-pointer active:scale-95 {hasLiked ? 'text-sky-500 border-sky-200 dark:border-sky-900/50 bg-sky-50 dark:bg-sky-950/20 shadow-sky-500/20' : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-200 dark:hover:border-sky-900/50 hover:shadow-sm'}">
				<Heart class="w-3.5 h-3.5 transition-colors duration-300 {hasLiked ? 'fill-sky-500 text-sky-500' : 'text-slate-500 dark:text-slate-400 group-hover:text-sky-500'}" />
				{likesCount}
			</button>
		</div>

		
		<div class="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 sm:mt-8">
			<button class="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#222222] shadow-sm rounded-full text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#1a1a1a] transition-all duration-700 ease-in-out whitespace-nowrap">
				<span class="w-2 h-2 rounded-full bg-slate-900 dark:bg-white shrink-0"></span>
				Let's Work Together
			</button>
			<a href="/roadmap" class="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">
				View updates & roadmap
			</a>
		</div>
	</div>

	<!-- Right Column: Big Profile Image (Desktop Only) -->
	<div class="hidden md:block relative w-48 h-48 shrink-0 cursor-pointer group perspective-[1000px]">
		<!-- Glowing ethereal backdrop that expands and fades in on hover -->
		<div class="absolute inset-0 bg-gradient-to-tr from-sky-500 via-purple-500 to-blue-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 dark:group-hover:opacity-40 transition-opacity duration-700 ease-out scale-90 group-hover:scale-110"></div>
		
		<!-- Bouncy Image Container with Tilt & Glow -->
		<div class="relative w-full h-full rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08] group-hover:-translate-y-3 group-hover:-rotate-3 z-10">
			<!-- Cinematic Grayscale to Color Transition -->
			<img src={myImage} alt="Mark Joseph Potot" class="w-full h-full object-cover grayscale-[30%] brightness-90 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700 ease-out group-hover:scale-110 drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_20px_25px_rgba(236,72,153,0.4)]" />
		</div>
	</div>
</div>
{/if}
