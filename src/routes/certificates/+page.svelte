<script lang="ts">
	import { achievementGroups, type AchievementItem } from '$lib/data/achievements';
	import Reveal from '$lib/components/Reveal.svelte';
	import StaggerReveal from '$lib/components/StaggerReveal.svelte';

	let selectedCert = $state<AchievementItem | null>(null);

	let activeCategory = $state(achievementGroups[0].category);
	let currentPage = $state(1);
	const itemsPerPage = 4;

	let activeGroup = $derived(
		achievementGroups.find((g) => g.category === activeCategory) || achievementGroups[0]
	);
	let totalPages = $derived(Math.ceil(activeGroup.items.length / itemsPerPage));
	let currentItems = $derived(
		activeGroup.items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	function nextPage() {
		if (currentPage < totalPages) currentPage++;
	}

	function prevPage() {
		if (currentPage > 1) currentPage--;
	}

	function setCategory(category: string) {
		activeCategory = category;
		currentPage = 1;
	}

	$effect(() => {
		if (selectedCert) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});
</script>

<svelte:head>
	<title>Certificates | Mark Joseph Potot</title>
	<meta
		name="description"
		content="A comprehensive collection of my professional certificates and academic achievements."
	/>
</svelte:head>

<div class="mx-auto flex min-h-screen max-w-screen-2xl flex-col px-4 pt-8 sm:px-8 xl:px-12">
	<div class="mb-12 shrink-0">
		<a
			href="/"
			class="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
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
		<h1 class="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
			All Certificates
		</h1>
		<p class="text-lg text-slate-600 dark:text-slate-400">
			A complete archive of my certifications and achievements across multiple disciplines.
		</p>
	</div>

	<!-- Category Tabs -->
	<StaggerReveal delay={40} stagger={70} duration={620} className="mb-10 flex flex-wrap gap-3">
		{#each achievementGroups as group}
			<button
				onclick={() => setCategory(group.category)}
				class="rounded-full px-6 py-3 text-sm font-bold shadow-sm transition-all {activeCategory ===
				group.category
					? 'scale-105 bg-sky-500 text-white shadow-sky-500/25'
					: 'border border-slate-200 bg-white text-slate-600 hover:border-sky-500/50 hover:text-sky-500 dark:border-[#222] dark:bg-[#111] dark:text-slate-400 dark:hover:border-sky-500/50'}"
			>
				{group.category}
			</button>
		{/each}
	</StaggerReveal>

	<!-- Active Category Section -->
	<div class="mb-16 flex min-h-[600px] flex-col">
		<div class="mb-8 flex shrink-0 items-center gap-4">
			<h2 class="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
				{activeGroup.category}
			</h2>
			<div class="mt-2 h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
		</div>

		<!-- Grid of 4 (made bigger with lg:grid-cols-2) -->
		<div class="mb-12 grid flex-1 grid-cols-1 content-start gap-8 sm:grid-cols-2 lg:grid-cols-2">
			{#each currentItems as cert, idx}
				<Reveal delay={80 + idx * 80} distance={24}>
					<button
						type="button"
						onclick={() => (selectedCert = cert)}
						class="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-3xl border border-slate-200 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-[#222]"
					>
						<img
							width="800"
							height="600"
							loading="lazy"
							decoding="async"
							src={cert.image}
							alt={cert.title}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						></div>

						<div
							class="absolute inset-0 flex translate-y-4 flex-col justify-end p-8 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
						>
							<p
								class="mb-2 text-sm font-bold tracking-wider text-sky-400 uppercase drop-shadow-md"
							>
								{cert.issuer}
							</p>
							<h3
								class="mb-3 text-xl leading-tight font-bold text-white drop-shadow-lg sm:text-2xl"
							>
								{cert.title}
							</h3>
							<div class="mt-auto flex items-center gap-2 text-sm font-medium text-white/80">
								<span>View Certificate</span>
								<svg
									class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"
									></polyline></svg
								>
							</div>
						</div>
					</button>
				</Reveal>
			{/each}
		</div>

		<!-- Pagination -->
		{#if totalPages > 1}
			<div
				class="mt-auto flex w-full items-center justify-between border-t border-slate-200 pt-8 dark:border-[#222]"
			>
				<span class="text-sm font-semibold text-slate-600 dark:text-slate-400">
					Page {currentPage} of {totalPages}
				</span>

				<div class="flex items-center gap-2">
					<button
						onclick={prevPage}
						disabled={currentPage === 1}
						class="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2a2a2a] dark:bg-[#151515] dark:text-slate-300 dark:hover:bg-[#1f1f1f]"
					>
						Previous
					</button>
					<button
						onclick={nextPage}
						disabled={currentPage === totalPages}
						class="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2a2a2a] dark:bg-[#151515] dark:text-slate-300 dark:hover:bg-[#1f1f1f]"
					>
						Next
					</button>
				</div>
			</div>
		{:else}
			<div class="mt-auto border-t border-slate-200 pt-8 dark:border-[#222]"></div>
		{/if}
	</div>
</div>

<!-- Modal for Certificate Image -->
{#if selectedCert}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-8"
		onclick={() => (selectedCert = null)}
	>
		<div
			class="animate-in fade-in zoom-in-95 relative flex w-full max-w-5xl flex-col items-center duration-300"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Close button -->
			<button
				onclick={() => (selectedCert = null)}
				class="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20"
				aria-label="Close modal"
			>
				<svg
					class="h-6 w-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"
					></line></svg
				>
			</button>

			<img
				width="800"
				height="600"
				loading="lazy"
				decoding="async"
				src={selectedCert.image}
				alt={selectedCert.title}
				class="h-auto max-h-[85vh] w-full rounded-lg object-contain shadow-2xl"
			/>

			<div class="mt-6 text-center">
				<h3 class="mb-2 text-2xl font-bold text-white">{selectedCert.title}</h3>
				<p class="font-medium tracking-wide text-white/70">
					{selectedCert.issuer} • <span class="font-bold">{selectedCert.date}</span>
				</p>
			</div>
		</div>
	</div>
{/if}
