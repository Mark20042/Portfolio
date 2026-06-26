<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	
	// Import all images in the gallery folder
	const images = import.meta.glob('$lib/images/gallery/*.{jpg,png,webp,jpeg}', { eager: true, import: 'default' });
	
	let galleryItems = $state<{ src: string, id: number }[]>([]);
	let mounted = $state(false);

	// Pagination state
	let currentPage = $state(1);
	const itemsPerPage = 8;
	let totalPages = $derived(Math.ceil(galleryItems.length / itemsPerPage));
	let paginatedItems = $derived(galleryItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));

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
<div class="min-h-screen pt-8 px-4 sm:px-8 xl:px-12 max-w-7xl mx-auto flex flex-col relative z-10">
	{#if mounted}
		<div in:fly={{ y: 20, duration: 800, delay: 100, easing: cubicOut }} class="mb-12 shrink-0">
			<a href="/" class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-6">
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
				Back to Home
			</a>
			<h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Gallery</h1>
			<p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
				A collection of memories, behind-the-scenes moments, and random snapshots from my journey.
			</p>
		</div>

		<!-- Masonry Grid Layout -->
		<div in:fly={{ y: 40, duration: 1000, delay: 200, easing: cubicOut }} class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 mb-16">
			{#each paginatedItems as item (item.id)}
				<div class="break-inside-avoid relative group overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-[#222]">
					<img width="800" height="600" loading="lazy" decoding="async" src={item.src} 
						alt="Gallery Item {item.id}" 
						class="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
						loading="lazy"
					/>
					
					<!-- Subtle Overlay on Hover -->
					<div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 dark:group-hover:bg-black/40 transition-colors duration-500 pointer-events-none"></div>
				</div>
			{/each}
		</div>

		<!-- Pagination -->
		{#if totalPages > 1}
			<div class="flex items-center justify-between w-full mt-auto pt-8 border-t border-slate-200 dark:border-[#222]">
				<span class="text-sm font-semibold text-slate-600 dark:text-slate-400">
					Page {currentPage} of {totalPages}
				</span>
				
				<div class="flex items-center gap-2">
					<button 
						onclick={prevPage} 
						disabled={currentPage === 1}
						class="px-4 py-2 rounded-lg border border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#151515] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f1f1f] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-sm"
					>
						Previous
					</button>
					<button 
						onclick={nextPage} 
						disabled={currentPage === totalPages}
						class="px-4 py-2 rounded-lg border border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#151515] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f1f1f] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-sm"
					>
						Next
					</button>
				</div>
			</div>
		{/if}
	{/if}
</div>
