<script lang="ts">
	import Reveal from '$lib/components/Reveal.svelte';
	import { techStack } from '$lib/data/skills';
</script>

<svelte:head>
	<title>Tech Stack | Mark Joseph Potot</title>
	<meta
		name="description"
		content="The tools, frameworks, and platforms I reach for — across the front end, back end, infrastructure, and AI."
	/>
</svelte:head>

<div class="mx-auto min-h-screen max-w-screen-2xl px-4 pt-8 pb-24 sm:px-8 xl:px-12">
	<!-- Back link -->
	<a
		href="/"
		class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
	>
		<svg
			class="h-4 w-4"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"
			></polyline></svg
		>
		Back to Home
	</a>

	<!-- Header -->
	<h1 class="mb-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
		Tech Stack
	</h1>
	<p
		class="mb-12 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg dark:text-slate-400"
	>
		The tools, frameworks, and platforms I reach for — across the front end, back end,
		infrastructure, and AI.
	</p>

	<!-- Categories -->
	<div class="space-y-10">
		{#each techStack as group}
			<div>
				<h2 class="mb-4 text-lg font-semibold text-slate-800 sm:text-xl dark:text-slate-100">
					{group.category}
				</h2>
				<div class="flex flex-wrap gap-2 sm:gap-2.5">
					{#each group.skills as skill}
						<span
							class="cursor-default rounded-md border border-slate-300 px-2 py-0.5 text-[11px] font-medium text-slate-700 transition-colors duration-300 hover:border-slate-400 sm:px-2.5 sm:py-1 sm:text-xs dark:border-[#3a3a3a] dark:text-slate-300 dark:hover:border-[#555]"
						>
							{skill}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
