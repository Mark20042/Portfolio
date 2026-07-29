<script lang="ts">
	import azoreworldImg from '$lib/images/games/azoreworld.png';
	import luminarylogicImg from '$lib/images/games/luminarylogic.png';
	import cosmicmatchImg from '$lib/images/games/cosmicmatch.png';

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
	let isMobile = $derived(innerWidth < 640);

	let swipingFrontId = $state<number | null>(null);
	let swipingBackId = $state<number | null>(null);
	let swipingDir = $state<number>(1);

	const bringToFront = (index: number) => {
		if (index === 0 || swipingFrontId !== null) return;
		
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

<div class="mb-24 pt-12 sm:pt-16" id="games">
	<div class="mb-12 flex flex-col justify-between gap-4 sm:mb-16 sm:flex-row sm:items-end">
		<div class="max-w-2xl text-left">
			<h2
				class="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:mb-6 sm:text-5xl dark:text-white"
			>
				Play My Games
			</h2>
			<p class="text-base leading-relaxed text-slate-600 sm:text-xl dark:text-slate-400">
				Check out these web-based games I've developed. Click a card to bring it to the front!
			</p>
		</div>
	</div>

	<div class="relative flex h-[240px] w-full items-center justify-center overflow-x-hidden py-4 sm:h-[300px] sm:overflow-visible">
		{#each games as game, i (game.id)}
			<div
				class="absolute w-[300px] cursor-pointer rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl transition-all duration-500 ease-in-out sm:w-[380px] sm:p-5 dark:border-[#222] dark:bg-[#111]"
				style={getStyles(i, game.id)}
				onclick={() => bringToFront(i)}
				onkeydown={(e) => e.key === 'Enter' && bringToFront(i)}
				role="button"
				tabindex="0"
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
					<h3 class="text-xl font-bold leading-tight text-slate-900 dark:text-white">
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
						class="group flex w-max items-center gap-3 rounded-full border border-slate-200 py-1.5 pl-5 pr-1.5 text-sm font-bold text-slate-700 transition-all hover:border-slate-300 hover:shadow-sm dark:border-[#333] dark:text-slate-300 dark:hover:border-[#444]"
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
								stroke-linejoin="round"
							><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
						</span>
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>
