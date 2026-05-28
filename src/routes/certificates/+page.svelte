<script lang="ts">
	import { achievementGroups, type AchievementItem } from '$lib/data/achievements';
	
	let selectedCert = $state<AchievementItem | null>(null);

	let activeCategory = $state(achievementGroups[0].category);
	let currentPage = $state(1);
	const itemsPerPage = 4;

	let activeGroup = $derived(achievementGroups.find(g => g.category === activeCategory) || achievementGroups[0]);
	let totalPages = $derived(Math.ceil(activeGroup.items.length / itemsPerPage));
	let currentItems = $derived(activeGroup.items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));

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
	<meta name="description" content="A comprehensive collection of my professional certificates and academic achievements." />
</svelte:head>

<div class="min-h-screen pt-8 px-4 sm:px-8 xl:px-12 max-w-screen-2xl mx-auto flex flex-col">
	<div class="mb-12 shrink-0">
		<a href="/" class="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-6">
			<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
			Back to Home
		</a>
		<h1 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">All Certificates</h1>
		<p class="text-lg text-slate-500 dark:text-slate-400">
			A complete archive of my certifications and achievements across multiple disciplines.
		</p>
	</div>

	<!-- Category Tabs -->
	<div class="flex flex-wrap gap-3 mb-10">
		{#each achievementGroups as group}
			<button
				onclick={() => setCategory(group.category)}
				class="px-6 py-3 rounded-full font-bold text-sm transition-all shadow-sm {activeCategory === group.category ? 'bg-sky-500 text-white shadow-sky-500/25 scale-105' : 'bg-white dark:bg-[#111] border border-slate-200 dark:border-[#222] text-slate-600 dark:text-slate-400 hover:border-sky-500/50 dark:hover:border-sky-500/50 hover:text-sky-500'}"
			>
				{group.category}
			</button>
		{/each}
	</div>

	<!-- Active Category Section -->
	<div class="mb-16 flex flex-col min-h-[600px]">
		<div class="flex items-center gap-4 mb-8 shrink-0">
			<h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{activeGroup.category}</h2>
			<div class="h-px bg-slate-200 dark:bg-slate-800 flex-1 mt-2"></div>
		</div>

		<!-- Grid of 4 (made bigger with lg:grid-cols-2) -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-12 flex-1 content-start">
			{#each currentItems as cert}
				<button 
					type="button"
					onclick={() => selectedCert = cert}
					class="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 border border-slate-200 dark:border-[#222] transition-all duration-300"
				>
					<img 
						src={cert.image} 
						alt={cert.title} 
						class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					
					<div class="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-left">
						<p class="text-sky-400 font-bold text-sm uppercase tracking-wider mb-2 drop-shadow-md">{cert.issuer}</p>
						<h3 class="text-xl sm:text-2xl font-bold text-white drop-shadow-lg mb-3 leading-tight">{cert.title}</h3>
						<div class="flex items-center gap-2 text-white/80 font-medium text-sm mt-auto">
							<span>View Certificate</span>
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
						</div>
					</div>
				</button>
			{/each}
		</div>

		<!-- Pagination -->
		{#if totalPages > 1}
			<div class="flex items-center justify-between w-full mt-auto pt-8 border-t border-slate-200 dark:border-[#222]">
				<span class="text-sm font-semibold text-slate-500 dark:text-slate-400">
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
		{:else}
			<div class="mt-auto pt-8 border-t border-slate-200 dark:border-[#222]"></div>
		{/if}
	</div>
</div>

<!-- Modal for Certificate Image -->
{#if selectedCert}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div 
		class="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-8"
		onclick={() => selectedCert = null}
	>
		<div 
			class="relative max-w-5xl w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-300"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Close button -->
			<button 
				onclick={() => selectedCert = null}
				class="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:scale-110"
				aria-label="Close modal"
			>
				<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
			</button>

			<img src={selectedCert.image} alt={selectedCert.title} class="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl" />
			
			<div class="mt-6 text-center">
				<h3 class="text-2xl font-bold text-white mb-2">{selectedCert.title}</h3>
				<p class="text-white/70 font-medium tracking-wide">{selectedCert.issuer} • <span class="font-bold">{selectedCert.date}</span></p>
			</div>
		</div>
	</div>
{/if}
