<script lang="ts">
	import azoreworldImg from '$lib/images/games/azoreworld.png';
	import luminarylogicImg from '$lib/images/games/luminarylogic.png';
	import cosmicmatchImg from '$lib/images/games/cosmicmatch.png';
	import StaggerReveal from '$lib/components/StaggerReveal.svelte';

	let games = $state([
		{
			id: 1,
			title: 'Azore World',
			url: 'https://azore-world.vercel.app',
			description: 'Dive into a fantastic web-based adventure and explore the Azore World.',
			tag1: 'TOP RATED',
			tag2: 'FANTASY RPG',
			image: azoreworldImg
		},
		{
			id: 2,
			title: 'Luminary Logic',
			url: 'https://luminary-logic.vercel.app',
			description: 'Challenge your mind with this brilliant puzzle and logic game.',
			tag1: 'BRAIN TEASER',
			tag2: 'PUZZLE',
			image: luminarylogicImg
		},
		{
			id: 3,
			title: 'Cosmic Match Pearl',
			url: 'https://cosmic-match-pearl.vercel.app',
			description: 'Match pearls in this exciting cosmic adventure across the galaxy.',
			tag1: 'CASUAL FUN',
			tag2: 'MATCHING PUZZLE',
			image: cosmicmatchImg
		}
	]);

	let innerWidth = $state(1024);
	let isMobile = $derived(innerWidth < 1024);

	let swipingFrontId = $state<number | null>(null);
	let swipingBackId = $state<number | null>(null);
	let swipingDir = $state<number>(1);

	const bringToFront = (index: number) => {
		if (isMobile || index === 0 || swipingFrontId !== null) return;

		swipingFrontId = games[index].id;
		swipingBackId = games[0].id;
		swipingDir = index === 1 ? 1 : -1;

		setTimeout(() => {
			const newGames = [...games];
			const temp = newGames[0];
			newGames[0] = newGames[index];
			newGames[index] = temp;
			games = newGames;

			swipingFrontId = null;
			swipingBackId = null;
		}, 300);
	};

	const getStyles = (i: number, gameId: number) => {
		const outX = swipingDir === 1 ? '90%' : '-90%';
		const outRot = swipingDir === 1 ? '15deg' : '-15deg';
		const sideX = isMobile ? '55%' : '65%';
		const sideRot = isMobile ? '10deg' : '12deg';
		const centerScale = isMobile ? '0.7' : '1';
		const sideScale = isMobile ? '0.55' : '0.85';
		const yOffset = isMobile ? '8px' : '15px';

		if (swipingFrontId === gameId) {
			return `transform: translateY(0) scale(${centerScale}) translateX(0) rotate(0deg); z-index: 40; opacity: 1;`;
		}

		if (swipingBackId === gameId) {
			return `transform: translateY(${yOffset}) scale(${sideScale}) translateX(${outX}) rotate(${outRot}); z-index: 25; opacity: 0.7;`;
		}

		if (i === 0) {
			return `transform: translateY(0) scale(${centerScale}) translateX(0) rotate(0deg); z-index: 30; opacity: 1;`;
		} else if (i === 1) {
			return `transform: translateY(${yOffset}) scale(${sideScale}) translateX(${sideX}) rotate(${sideRot}); z-index: 20; opacity: 0.55;`;
		} else if (i === 2) {
			return `transform: translateY(${yOffset}) scale(${sideScale}) translateX(-${sideX}) rotate(-${sideRot}); z-index: 10; opacity: 0.55;`;
		}
		return '';
	};
</script>

<svelte:window bind:innerWidth />

<div class="scroll-mt-10" id="games">
	<StaggerReveal delay={40} stagger={90} duration={650}>
		<p
			class="font-mono text-[10px] font-medium tracking-[0.14em] text-slate-500 uppercase dark:text-slate-400"
		>
			04 — Games
		</p>
	</StaggerReveal>
	<div class="mt-7 mb-12 grid gap-7 sm:mb-16 md:grid-cols-2 md:gap-12">
		<StaggerReveal delay={90} stagger={90} duration={700}>
			<h2
				class="font-mono text-4xl leading-[1.05] font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl dark:text-white"
			>
				Play my<br />games.
			</h2>
		</StaggerReveal>
		<StaggerReveal delay={150} stagger={90} duration={700}>
			<p class="max-w-md text-base leading-7 text-slate-600 dark:text-slate-400">
				Explore the web games I’ve built. Pick a game below and jump in to play.
			</p>
		</StaggerReveal>
	</div>

	<div
		class="game-list relative grid w-full gap-6 sm:grid-cols-2 lg:flex lg:h-[360px] lg:items-center lg:justify-center lg:py-4"
	>
		{#each games as game, i (game.id)}
			<div
				class="game-card min-w-0 rounded-[2rem] border border-slate-200 bg-white p-5 lg:absolute lg:w-[340px] lg:cursor-pointer lg:shadow-2xl lg:transition-all lg:duration-500 lg:ease-in-out dark:border-[#222] dark:bg-[#111]"
				style={getStyles(i, game.id)}
				onclick={() => bringToFront(i)}
				onkeydown={(e) => {
					if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
						e.preventDefault();
						bringToFront(i);
					}
				}}
				role="button"
				tabindex={isMobile ? -1 : 0}
				aria-label={`Select ${game.title}`}
			>
				<!-- Tags -->
				<div class="mb-4 flex flex-wrap gap-2">
					<span
						class="flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white dark:bg-white dark:text-slate-900"
					>
						<svg
							class="h-3 w-3"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
							><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"
							></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line
								x1="3"
								y1="21"
								x2="10"
								y2="14"
							></line></svg
						>
						{game.tag1}
					</span>
					<span
						class="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 dark:border-[#333] dark:text-slate-400"
					>
						{game.tag2}
					</span>
				</div>

				<!-- Header -->
				<div class="mb-4 flex items-center gap-4">
					<div
						class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 shadow-inner dark:bg-[#1a1a1a]"
					>
						<img src={game.image} alt={game.title} class="h-full w-full object-cover" />
					</div>
					<h3 class="text-xl leading-tight font-bold text-slate-900 dark:text-white">
						{game.title}
					</h3>
				</div>

				<!-- Description -->
				<p class="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
					{game.description}
				</p>

				<!-- Play Button -->
				<div class="flex">
					<a
						href={game.url}
						target="_blank"
						rel="noopener noreferrer"
						class="group flex w-max items-center gap-3 rounded-full border border-slate-200 py-1.5 pr-1.5 pl-5 text-sm font-bold text-slate-700 transition-all hover:border-slate-300 hover:shadow-sm dark:border-[#333] dark:text-slate-300 dark:hover:border-[#444]"
						onclick={(e) => {
							if (!isMobile && i !== 0) {
								e.preventDefault();
								bringToFront(i);
							}
						}}
					>
						Play Game
						<span
							class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white dark:bg-[#222] dark:group-hover:bg-sky-500"
						>
							<svg
								class="h-3.5 w-3.5 translate-x-[1px]"
								viewBox="0 0 24 24"
								fill="currentColor"
								stroke="currentColor"
								stroke-width="1"
								stroke-linecap="round"
								stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg
							>
						</span>
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	@media (max-width: 1023px) {
		.game-card {
			transform: none !important;
			opacity: 1 !important;
			z-index: auto !important;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.game-card {
			transition: none;
		}
	}
</style>
