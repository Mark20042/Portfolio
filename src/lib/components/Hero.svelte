<script lang="ts">
	import { fly, scale, fade } from 'svelte/transition';
	import { cubicOut, backOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import myImage from '$lib/images/me.webp';
	import dataCampLogo from '$lib/images/datacamplogo.svg';
	import StaggerReveal from '$lib/components/StaggerReveal.svelte';
	import dictBadge from '$lib/images/dict-cyberpro-badge.png';
	import dictQrCode from '$lib/images/dict-cyberpro-qr.png';
	import dictLogo from '$lib/images/dict-logo.png';
	import oracleLogo from '$lib/images/oracle-logo.png';
	import googleLogo from '$lib/images/google-g.png';
	import { portal } from '$lib/actions/portal';

	import {
		MapPin,
		Github,
		Linkedin,
		Hand,
		ShieldCheck,
		X,
		Download,
		ExternalLink,
		ChevronRight
	} from 'lucide-svelte';

	let mounted = $state(false);
	let showDictModal = $state(false);

	let isLiked = $state(false);
	let isCelebrating = $state(false);
	let celebrationTimeout: ReturnType<typeof setTimeout> | undefined;

	onMount(() => {
		mounted = true;
		return () => clearTimeout(celebrationTimeout);
	});

	async function handleLike(event: MouseEvent) {
		isLiked = !isLiked;
		clearTimeout(celebrationTimeout);
		if (!isLiked) {
			isCelebrating = false;
			return;
		}

		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = (rect.left + rect.width / 2) / window.innerWidth;
		const y = (rect.top + rect.height / 2) / window.innerHeight;
		isCelebrating = true;
		clearTimeout(celebrationTimeout);
		celebrationTimeout = setTimeout(() => (isCelebrating = false), 700);

		const module = await import('canvas-confetti');
		if (!isLiked) return;
		const confetti = module.default || module;
		const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#14b8a6'];
		const duration = 1500;
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

{#snippet codeReactionButton()}
	<button
		type="button"
		onclick={handleLike}
		aria-label={isLiked ? 'Remove code reaction' : 'Send a code reaction'}
		aria-pressed={isLiked}
		class="absolute right-3 bottom-5 z-20 flex h-12 w-12 cursor-pointer items-center justify-center text-amber-400 transition-transform duration-300 hover:scale-110 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:scale-90 dark:text-yellow-300"
	>
		<svg
			width="44"
			height="30"
			viewBox="0 0 48 34"
			fill={isLiked ? 'currentColor' : 'none'}
			stroke="currentColor"
			stroke-width="1"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			class="{isCelebrating
				? 'scale-125'
				: 'scale-100'} h-auto w-7 transition-transform duration-300 md:w-11"
		>
			<path
				transform="translate(0 0)"
				d="M12 9 Q12 8 11 9 L2 16 Q1 17 2 18 L11 25 Q12 26 12 25 L12 21 Q12 20 11 19 L8 17 L11 15 Q12 14 12 13 Z"
			/>
			<path
				transform="translate(-3 0)"
				d="M36 9 Q36 8 37 9 L46 16 Q47 17 46 18 L37 25 Q36 26 36 25 L36 21 Q36 20 37 19 L40 17 L37 15 Q36 14 36 13 Z"
			/>
			<path
				d="M27.5 3 H30.5 Q31.5 3 31.2 4.5 L19.5 29.5 Q19.2 31 18.2 31 H15.2 Q14.2 31 14.5 29.5 L26.2 4.5 Q26.5 3 27.5 3 Z"
			/>
		</svg>
	</button>
{/snippet}

{#if mounted}
	<div
		in:fly={{ y: 40, duration: 1500, delay: 200, easing: cubicOut }}
		id="intro"
		class="flex scroll-mt-10 flex-col items-start justify-between gap-8 md:flex-row lg:gap-10 lg:pt-20"
	>
		<!-- Left Column: Badges & Text -->
		<div class="mt-2 w-full min-w-0 flex-1 md:mt-0 lg:pt-52 xl:pt-60">
			<div class="mb-7 hidden lg:block">
				<h1
					class="font-mono text-[clamp(2.25rem,3.8vw,3.5rem)] leading-[1.05] font-bold tracking-[-0.055em] text-slate-900 dark:text-white"
				>
					<span class="block whitespace-nowrap">Mark Joseph Potot</span>
				</h1>
			</div>

			<div
				class="group relative mb-6 h-48 w-44 shrink-0 cursor-pointer perspective-[1000px] md:hidden"
			>
				<div
					class="absolute inset-0 scale-90 rounded-3xl bg-gradient-to-tr from-sky-500 via-purple-500 to-blue-500 opacity-60 blur-2xl dark:opacity-40"
				></div>

				<div class="relative z-10 h-full w-full overflow-hidden rounded-3xl">
					<img
						src={myImage}
						alt="Mark Joseph Potot"
						width="800"
						height="800"
						fetchpriority="high"
						decoding="sync"
						class="h-full w-full object-cover object-top brightness-100 contrast-100 drop-shadow-[0_20px_25px_rgba(236,72,153,0.4)] grayscale-0"
					/>
				</div>
				{@render codeReactionButton()}
			</div>

			<!-- Hero Text -->
			<StaggerReveal delay={30} stagger={70} duration={720} className="lg:hidden">
				<h1
					class="mb-2 flex flex-wrap items-center gap-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white"
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
					Cayang Bogo City, Cebu, Philippines
				</div>

				<div
					class="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-900 sm:gap-2 sm:text-sm md:text-base dark:text-white"
				>
					Software Developer <span class="font-light text-slate-300 dark:text-slate-600">\</span>
					AI Developer
					<span class="font-light text-slate-300 dark:text-slate-600">\</span> Cybersecurity
				</div>
			</StaggerReveal>

			<StaggerReveal delay={120} duration={700} className="max-w-xl">
				<p class="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
					A Full-Stack Developer in Bogo City, Cebu that builds real world solutions using
					technologies.
				</p>
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
					class="flex shrink-0 items-center gap-1.5 text-[11px] font-bold whitespace-normal text-slate-700 hover:text-slate-900 sm:text-sm sm:whitespace-nowrap dark:text-slate-300 dark:hover:text-white"
				>
					<Github class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
					Top 116 Most Followed GitHub in
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
					class="flex shrink-0 items-center gap-1.5 text-[11px] font-bold whitespace-normal text-slate-700 hover:text-yellow-600 sm:text-sm sm:whitespace-nowrap dark:text-slate-300 dark:hover:text-yellow-400"
				>
					<img
						src={googleLogo}
						alt="Google"
						class="h-4 w-4 shrink-0 object-contain sm:h-5 sm:w-5"
					/>
					83 Google Cloud Badges
				</a>
				<div class="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
					<a
						href="https://certificates.dev/c/a182214f-2817-44f1-aca5-116ab2b162c1"
						target="_blank"
						rel="noopener noreferrer"
						class="flex shrink-0 items-center gap-1.5 text-[11px] font-bold whitespace-normal text-slate-700 hover:text-blue-600 sm:text-sm sm:whitespace-nowrap dark:text-slate-300 dark:hover:text-blue-400"
					>
						<svg
							class="h-3.5 w-3.5 shrink-0 text-blue-600 sm:h-4 sm:w-4"
							viewBox="0 0 34 34"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M33.374 18.88a2.03 2.03 0 0 0 0-2.933l-1.496-1.428a2.02 2.02 0 0 1-.546-2.036l.582-1.984a2.03 2.03 0 0 0-1.468-2.542l-2.008-.488a2.03 2.03 0 0 1-1.492-1.49l-.488-2.01a2.027 2.027 0 0 0-2.54-1.466l-1.986.58a2.02 2.02 0 0 1-2.036-.546l-1.428-1.494a2.026 2.026 0 0 0-2.934 0l-1.428 1.494a2.02 2.02 0 0 1-2.036.546l-1.984-.58a2.03 2.03 0 0 0-2.542 1.466l-.488 2.01a2.02 2.02 0 0 1-1.49 1.49l-2.01.488a2.03 2.03 0 0 0-1.468 2.542l.582 1.984a2.02 2.02 0 0 1-.546 2.036L.628 15.947a2.03 2.03 0 0 0 0 2.934l1.496 1.428c.55.524.76 1.31.546 2.036l-.582 1.986a2.03 2.03 0 0 0 1.468 2.54l2.01.488c.736.18 1.312.754 1.49 1.492l.488 2.008a2.03 2.03 0 0 0 2.542 1.468l1.984-.582c.728-.214 1.514 0 2.036.546l1.428 1.496a2.03 2.03 0 0 0 2.934 0l1.428-1.496a2.03 2.03 0 0 1 2.036-.546l1.986.582a2.03 2.03 0 0 0 2.54-1.468l.488-2.008a2.03 2.03 0 0 1 1.492-1.492l2.008-.488a2.03 2.03 0 0 0 1.468-2.54l-.582-1.986a2.02 2.02 0 0 1 .546-2.036zm-17.77 2.389L13.62 23.25l-5.8-5.8 5.8-5.8 1.984 1.984-3.818 3.816zm4.816 1.982-1.984-1.982 3.818-3.818-3.818-3.816 1.984-1.984 5.8 5.8z"
							/>
						</svg>
						Certified Junior React Developer
					</a>
					<button
						onclick={(e) => {
							e.preventDefault();
							showDictModal = true;
						}}
						class="flex shrink-0 cursor-pointer items-center gap-1.5 text-[11px] font-bold whitespace-normal text-slate-700 hover:text-indigo-600 sm:text-sm sm:whitespace-nowrap dark:text-slate-300 dark:hover:text-indigo-400"
					>
						<img src={dictLogo} alt="DICT Logo" class="h-3.5 w-auto shrink-0 sm:h-4" />
						DICT Cybersecurity Level 2
					</button>
				</div>

				<div class="flex w-full flex-col gap-2 sm:mt-1 sm:flex-row sm:items-center sm:gap-6">
					<a
						href="https://www.datacamp.com/certificate/AIEDA0016778679335"
						target="_blank"
						rel="noopener noreferrer"
						class="flex shrink-0 items-center gap-1.5 text-[11px] font-bold whitespace-normal text-slate-700 hover:text-green-600 sm:text-sm sm:whitespace-nowrap dark:text-slate-300 dark:hover:text-green-400"
					>
						<img src={dataCampLogo} alt="DataCamp" class="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />

						AI Engineer for Developers Associate
					</a>
					<a
						href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=4C1B1866C6AAD8300EAA6949385ECEB2B19B0821AF31C7E356EA9D3113678ABB"
						target="_blank"
						rel="noopener noreferrer"
						class="flex shrink-0 items-center gap-1.5 text-[11px] font-bold whitespace-normal text-slate-700 hover:text-red-600 sm:text-sm sm:whitespace-nowrap dark:text-slate-300 dark:hover:text-red-400"
					>
						<img src={oracleLogo} alt="Oracle" class="h-3.5 w-auto shrink-0 sm:h-4" />

						Agentic AI Certified Associate
					</a>
				</div>

				<div class="flex w-full sm:mt-2">
					<a
						href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=131EC2275FD9FCDCFEDF96C462CB51E8141FB7D57FA14DCBD51DBB380C8E63DC"
						target="_blank"
						rel="noopener noreferrer"
						class="flex shrink-0 items-center gap-1.5 text-[11px] font-bold whitespace-normal text-slate-700 hover:text-red-600 sm:text-sm sm:whitespace-nowrap dark:text-slate-300 dark:hover:text-red-400"
					>
						<img src={oracleLogo} alt="Oracle" class="h-3.5 w-auto shrink-0 sm:h-4" />

						Oracle Cloud Infrastructure Certified Architect Associate
					</a>
				</div>
			</StaggerReveal>
			<div class="mt-8 hidden lg:block">
				<div class="flex flex-wrap items-center gap-3">
					<a
						href="#projects"
						class="inline-flex items-center rounded-lg bg-slate-900 px-5 py-3 text-xs font-semibold tracking-wide text-white uppercase transition-colors hover:bg-sky-600 dark:bg-white dark:text-slate-900 dark:hover:bg-sky-200"
						>Selected Works</a
					>
					<a
						href="mailto:mark.potot2004@gmail.com"
						class="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-xs font-semibold tracking-wide text-slate-900 uppercase transition-colors hover:border-sky-500 hover:text-sky-600 dark:border-slate-700 dark:text-white dark:hover:text-sky-400"
						>Say Hello <Hand size={16} class="-rotate-25" aria-hidden="true" /></a
					>
				</div>
				<div class="mt-6 flex flex-wrap items-center gap-6">
					<a
						href="https://github.com/Mark20042"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
						><Github size={15} aria-hidden="true" /> GitHub</a
					>
					<a
						href="https://www.linkedin.com/in/mark-joseph-potot-b0a471369"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
						><Linkedin size={15} aria-hidden="true" /> LinkedIn</a
					>
				</div>
			</div>

			<StaggerReveal
				delay={290}
				stagger={100}
				duration={650}
				className="mt-4 flex flex-wrap items-center gap-3 sm:mt-5 lg:hidden"
			>
				<a
					href="#projects"
					class="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold tracking-wide text-white uppercase transition-colors hover:bg-sky-600 dark:bg-white dark:text-slate-900 dark:hover:bg-sky-200"
					>Selected Works</a
				>
				<a
					href="mailto:mark.potot2004@gmail.com"
					class="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold tracking-wide text-slate-900 uppercase transition-colors hover:border-sky-500 hover:text-sky-600 dark:border-slate-700 dark:text-white dark:hover:text-sky-400"
					>Say Hello <Hand size={16} class="-rotate-25" aria-hidden="true" /></a
				>
			</StaggerReveal>
			<div class="mt-5 flex flex-wrap items-center gap-6 lg:hidden">
				<a
					href="https://github.com/Mark20042"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
					><Github size={15} aria-hidden="true" /> GitHub</a
				>
				<a
					href="https://www.linkedin.com/in/mark-joseph-potot-b0a471369"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
					><Linkedin size={15} aria-hidden="true" /> LinkedIn</a
				>
			</div>
		</div>

		<!-- Right Column: Big Profile Image (Desktop Only) -->
		<div
			class="relative hidden h-64 w-56 shrink-0 md:block lg:mt-48 lg:h-[360px] lg:w-[250px] xl:mt-56 xl:h-[400px] xl:w-[270px]"
		>
			<div class="relative z-10 h-full w-full overflow-hidden rounded-3xl">
				<img
					src={myImage}
					alt="Mark Joseph Potot"
					width="800"
					height="800"
					fetchpriority="high"
					decoding="sync"
					class="h-full w-full object-cover object-top"
				/>
			</div>
			{@render codeReactionButton()}
		</div>
	</div>
{/if}

{#if showDictModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		use:portal
		class="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-8"
		style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100vw; height: 100dvh;"
		onclick={() => (showDictModal = false)}
		onkeydown={(e) => e.key === 'Escape' && (showDictModal = false)}
		tabindex="-1"
		role="dialog"
		aria-modal="true"
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="animate-in fade-in zoom-in-95 relative flex w-full max-w-2xl flex-col items-center duration-300"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Close button -->
			<button
				onclick={() => (showDictModal = false)}
				class="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20"
				aria-label="Close modal"
			>
				<X class="h-6 w-6" />
			</button>

			<img
				src={dictBadge}
				alt="DICT Cybersecurity Badge"
				loading="lazy"
				decoding="async"
				class="h-auto max-h-[75vh] w-full rounded-lg object-contain shadow-2xl"
			/>

			<div class="mt-6 w-full text-center">
				<h3 class="mb-2 text-2xl font-bold text-white">DICT Cybersecurity Recognition</h3>
				<p class="font-medium text-white/70">How to Verify</p>

				<div
					class="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-white/60 sm:text-sm"
				>
					<span>Download QR</span>
					<ChevronRight class="h-3.5 w-3.5 opacity-50" />
					<span>Go to Portal</span>
					<ChevronRight class="h-3.5 w-3.5 opacity-50" />
					<span>Upload QR</span>
				</div>

				<div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
					<a
						href={dictQrCode}
						download="dict-cyberpro-qr.png"
						class="flex items-center justify-center gap-2 rounded-xl bg-indigo-500/90 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
					>
						<Download class="h-4 w-4" />
						Download QR
					</a>
					<a
						href="https://cyberpro.dict.gov.ph/verify"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20"
					>
						Verify on Portal
						<ExternalLink
							class="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
						/>
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}
