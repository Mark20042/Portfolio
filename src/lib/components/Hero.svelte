<script lang="ts">
	import myImage from '$lib/images/me.webp';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import StaggerReveal from '$lib/components/StaggerReveal.svelte';

	import { Eye, Star, Heart, MapPin, Github, Gamepad2, Play } from 'lucide-svelte';

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
			
			<div
				class="group relative mb-6 h-36 w-36 shrink-0 cursor-pointer perspective-[1000px] md:hidden"
			>
				
				<div
					class="absolute inset-0 scale-90 rounded-3xl bg-gradient-to-tr from-sky-500 via-purple-500 to-blue-500 opacity-60 blur-2xl dark:opacity-40"
				></div>

				
				<div class="relative z-10 h-full w-full overflow-hidden rounded-3xl">
				
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
					Banban Bogo City, Cebu, Philippines
				</div>

				<div
					class="mb-6 flex items-center gap-1.5 text-xs font-medium whitespace-nowrap text-slate-900 sm:gap-2 sm:text-sm md:text-base dark:text-white"
				>
					Full-Stack Developer <span class="font-light text-slate-300 dark:text-slate-600">\</span>
					Generative AI
					<span class="font-light text-slate-300 dark:text-slate-600">\</span> Data Science
				</div>
			</StaggerReveal>

			
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
				className="mt-4 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-6"
			>
				<a
					href="https://github.com/gayanvoice/top-github-users/blob/main/markdown/followers/philippines.md"
					target="_blank"
					rel="noopener noreferrer"
					class="flex shrink-0 items-center gap-1.5 text-[11px] font-bold whitespace-nowrap text-slate-700 hover:text-slate-900 sm:text-sm dark:text-slate-300 dark:hover:text-white"
				>
					<Github class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
					Rank 190 GitHub in
					<img
						src="https://camo.githubusercontent.com/63a8c7227a0afb177ce4c90991f3314944d611f06d78fd4099d4c95e1e0d9b41/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f392f39392f466c61675f6f665f7468655f5068696c697070696e65732e737667"
						alt="Philippines Flag"
						class="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
					/>
				</a>
				<a
					href="https://www.skills.google/public_profiles/d78b6fd0-7c12-4c4d-9646-24856704ea97"
					target="_blank"
					rel="noopener noreferrer"
					class="flex shrink-0 items-center gap-1.5 text-[11px] font-bold whitespace-nowrap text-slate-700 hover:text-yellow-600 sm:text-sm dark:text-slate-300 dark:hover:text-yellow-400"
				>
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
						alt="Google"
						class="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
					/>
					83 Google Cloud Badges
				</a>
				<a
					href="https://certificates.dev/c/a182214f-2817-44f1-aca5-116ab2b162c1"
					target="_blank"
					rel="noopener noreferrer"
					class="flex shrink-0 items-center gap-1.5 text-[11px] font-bold whitespace-nowrap text-slate-700 hover:text-blue-600 sm:text-sm dark:text-slate-300 dark:hover:text-blue-400"
				>
					<svg
						class="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4 text-blue-600"
						viewBox="0 0 34 34"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M33.374 18.88a2.03 2.03 0 0 0 0-2.933l-1.496-1.428a2.02 2.02 0 0 1-.546-2.036l.582-1.984a2.03 2.03 0 0 0-1.468-2.542l-2.008-.488a2.03 2.03 0 0 1-1.492-1.49l-.488-2.01a2.027 2.027 0 0 0-2.54-1.466l-1.986.58a2.02 2.02 0 0 1-2.036-.546l-1.428-1.494a2.026 2.026 0 0 0-2.934 0l-1.428 1.494a2.02 2.02 0 0 1-2.036.546l-1.984-.58a2.03 2.03 0 0 0-2.542 1.466l-.488 2.01a2.02 2.02 0 0 1-1.49 1.49l-2.01.488a2.03 2.03 0 0 0-1.468 2.542l.582 1.984a2.02 2.02 0 0 1-.546 2.036L.628 15.947a2.03 2.03 0 0 0 0 2.934l1.496 1.428c.55.524.76 1.31.546 2.036l-.582 1.986a2.03 2.03 0 0 0 1.468 2.54l2.01.488c.736.18 1.312.754 1.49 1.492l.488 2.008a2.03 2.03 0 0 0 2.542 1.468l1.984-.582c.728-.214 1.514 0 2.036.546l1.428 1.496a2.03 2.03 0 0 0 2.934 0l1.428-1.496a2.03 2.03 0 0 1 2.036-.546l1.986.582a2.03 2.03 0 0 0 2.54-1.468l.488-2.008a2.03 2.03 0 0 1 1.492-1.492l2.008-.488a2.03 2.03 0 0 0 1.468-2.54l-.582-1.986a2.02 2.02 0 0 1 .546-2.036zm-17.77 2.389L13.62 23.25l-5.8-5.8 5.8-5.8 1.984 1.984-3.818 3.816zm4.816 1.982-1.984-1.982 3.818-3.818-3.818-3.816 1.984-1.984 5.8 5.8z" />
					</svg>
					Certified Junior React Developer
				</a>
			</StaggerReveal>

			<StaggerReveal delay={290} stagger={100} duration={650} className="mt-4 flex flex-wrap items-center gap-3 sm:mt-5">
				<a
					href="#games"
					onclick={(e) => {
						e.preventDefault();
						document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' });
					}}
					class="group relative inline-flex w-fit items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-1.5 text-[11px] font-bold tracking-wide text-white shadow-[0_8px_16px_-6px_rgba(16,185,129,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_20px_-6px_rgba(16,185,129,0.7)] sm:text-xs"
				>
				
					<div
						class="animate-sheen absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent"
					></div>
					
					<span class="relative z-10 flex items-center animate-games-track">
						<Gamepad2 class="mr-1.5 h-3 w-3 shrink-0 text-white sm:h-3.5 sm:w-3.5 animate-games-icon-left" />
						
						<span class="whitespace-nowrap">Play My Games</span>

						<Play class="absolute left-full ml-1.5 h-3 w-3 shrink-0 fill-white text-white opacity-0 sm:h-3.5 sm:w-3.5 animate-games-icon-right" />
					</span>
					
				</a>
				
				<a
					href="#projects"
					onclick={(e) => {
						e.preventDefault();
						document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
					}}
					class="group relative inline-flex w-fit items-center gap-1.5 overflow-hidden rounded-full border border-slate-700/50 bg-slate-900/80 px-4 py-1.5 text-[11px] font-bold tracking-wide text-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-800 hover:text-white hover:shadow-[0_8px_30px_rgba(56,189,248,0.25)] sm:text-xs dark:border-slate-800/80 dark:bg-black/60 dark:hover:border-slate-600 dark:hover:bg-[#111]"
				>
					
					<div
						class="animate-sheen absolute inset-0 -translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent"
						style="animation-delay: 2.4s;"
					></div>
					
					<span class="relative z-10 flex items-center gap-1.5">
						Selected Works
						
						<div class="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center overflow-visible sm:h-4 sm:w-4">
						
							<div class="absolute inset-0 h-full w-full animate-icon-default">
								<Star class="h-full w-full text-slate-400" />
							</div>
						
							<div class="absolute inset-0 h-full w-full animate-icon-active">
								<Star class="h-full w-full text-yellow-400 fill-yellow-400" />
							</div>
							
							<svg 
								class="absolute -right-2 -top-2 h-2.5 w-2.5 text-yellow-200 animate-icon-sparkle" 
								viewBox="0 0 24 24" fill="currentColor"
							>
								<path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6L2 9.6h7.6z" />
							</svg>
						</div>
					</span>
				</a>
			</StaggerReveal>
		</div>

		<!-- Right Column: Big Profile Image (Desktop Only) -->
		<div
			class="group relative hidden h-48 w-48 shrink-0 cursor-pointer perspective-[1000px] md:block"
		>
			
			<div
				class="absolute inset-0 scale-90 rounded-3xl bg-gradient-to-tr from-sky-500 via-purple-500 to-blue-500 opacity-0 blur-2xl transition-opacity duration-700 ease-out group-hover:scale-110 group-hover:opacity-60 dark:group-hover:opacity-40"
			></div>

			
			<div
				class="relative z-10 h-full w-full overflow-hidden rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-3 group-hover:scale-[1.08] group-hover:-rotate-3"
			>
				
				<img
					src={myImage}
					alt="Mark Joseph Potot"
					width="192"
					height="192"
					fetchpriority="high"
					decoding="sync"
					class="h-full w-full object-cover brightness-100 contrast-100 drop-shadow-[0_20px_25px_rgba(236,72,153,0.4)] grayscale-0 transition-all duration-400 ease-out group-hover:scale-110"
				/>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes sheen {
		0% {
			transform: translateX(-100%);
			animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		}
		30% {
			transform: translateX(200%);
		}
		100% {
			transform: translateX(200%);
		}
	}
	.animate-sheen {
		animation: sheen 8s infinite;
	}

	@keyframes -global-icon-default-pop {
		0%, 54% { transform: translateY(0) scale(1); opacity: 1; }
		57%, 76% { transform: translateY(-16px) scale(0.5); opacity: 0; }
		79%, 100% { transform: translateY(0) scale(1); opacity: 1; }
	}
	@keyframes -global-icon-active-pop {
		0%, 54% { transform: translateY(16px) scale(0.5); opacity: 0; }
		57%, 76% { transform: translateY(0) scale(1); opacity: 1; }
		79%, 100% { transform: translateY(16px) scale(0.5); opacity: 0; }
	}
	@keyframes -global-icon-sparkle-pop {
		0%, 55% { transform: translate(0, 8px) rotate(-45deg) scale(0); opacity: 0; }
		58%, 76% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
		79%, 100% { transform: translate(0, 8px) rotate(-45deg) scale(0); opacity: 0; }
	}
	:global(.animate-icon-default) { animation: icon-default-pop 8s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
	:global(.animate-icon-active) { animation: icon-active-pop 8s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
	:global(.animate-icon-sparkle) { animation: icon-sparkle-pop 8s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }

	@keyframes -global-games-track-slide {
		0%, 25% { transform: translateX(0); }
		28%, 45% { transform: translateX(-1.25rem); }
		48%, 100% { transform: translateX(0); }
	}
	@keyframes -global-games-icon-left-fade {
		0%, 25% { opacity: 1; }
		28%, 45% { opacity: 0; }
		48%, 100% { opacity: 1; }
	}
	@keyframes -global-games-icon-right-fade {
		0%, 25% { opacity: 0; }
		28%, 45% { opacity: 1; }
		48%, 100% { opacity: 0; }
	}
	:global(.animate-games-track) { animation: games-track-slide 8s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
	:global(.animate-games-icon-left) { animation: games-icon-left-fade 8s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
	:global(.animate-games-icon-right) { animation: games-icon-right-fade 8s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
</style>
