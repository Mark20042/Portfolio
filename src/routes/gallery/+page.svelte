<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import Reveal from '$lib/components/Reveal.svelte';

	// Import all images in the gallery folder
	const images = import.meta.glob('$lib/images/gallery/*.{jpg,png,webp,jpeg}', {
		eager: true,
		import: 'default'
	});

	let galleryItems = $state<{ src: string; id: number }[]>([]);
	let mounted = $state(false);

	// Pagination state
	let currentPage = $state(1);
	const itemsPerPage = 8;
	let totalPages = $derived(Math.ceil(galleryItems.length / itemsPerPage));
	let paginatedItems = $derived(
		galleryItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	onMount(() => {
		// Convert the imported object into an array of image sources
		const srcs = Object.values(images) as string[];
		galleryItems = srcs.map((src, index) => ({
			src,
			id: index
		}));
		mounted = true;
	});

	function nextPage() {
		if (currentPage < totalPages) currentPage++;
	}

	function prevPage() {
		if (currentPage > 1) currentPage--;
	}

	function setPage(page: number) {
		currentPage = page;
	}
</script>

<svelte:head>
	<title>Gallery - Mark Joseph Potot</title>
</svelte:head>

<!-- Added pb-48 sm:pb-80 to account for the footer's negative margin and prevent overlap -->
<div class="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pt-8 sm:px-8 xl:px-12">
	{#if mounted}
		<div in:fly={{ y: 20, duration: 800, delay: 100, easing: cubicOut }} class="mb-12 shrink-0">
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
				Gallery
			</h1>
			<p class="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
				A collection of memories, behind-the-scenes moments, and random snapshots from my journey.
			</p>
		</div>

		<!-- Masonry Grid Layout -->
		<div
			in:fly={{ y: 40, duration: 1000, delay: 200, easing: cubicOut }}
			class="mb-16 columns-1 gap-6 space-y-6 sm:columns-2 md:columns-3 lg:columns-4"
		>
			{#each paginatedItems as item, i (item.id)}
				<Reveal delay={i * 60}>
					<div
						class="group relative break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-[#222] dark:bg-slate-800"
					>
						<img
							width="800"
							height="600"
							loading="lazy"
							decoding="async"
							src={item.src}
							alt="Gallery Item {item.id}"
							class="h-auto w-full transform object-cover transition-transform duration-700 ease-out group-hover:scale-110"
						/>

						<!-- Subtle Overlay on Hover -->
						<div
							class="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20 dark:group-hover:bg-black/40"
						></div>
					</div>
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
		{/if}
	{/if}
</div>
