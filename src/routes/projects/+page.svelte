<script lang="ts">
	import { projectsData, type ProjectItem } from '$lib/data/projects';
	import { onMount } from 'svelte';
	
	let currentPage = $state(1);
	const itemsPerPage = 4;
	
	let totalPages = $derived(Math.ceil(projectsData.length / itemsPerPage));
	let currentProjects = $derived(projectsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));

	let selectedProject = $state<ProjectItem | null>(null);

	function nextPage() {
		if (currentPage < totalPages) currentPage++;
	}

	function prevPage() {
		if (currentPage > 1) currentPage--;
	}

	let tick = $state(0);
	onMount(() => {
		const interval = setInterval(() => {
			tick++;
		}, 1500);
		return () => clearInterval(interval);
	});

	$effect(() => {
		if (selectedProject) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});
</script>

<svelte:head>
	<title>Projects | Mark Joseph Potot</title>
	<meta name="description" content="A collection of my recent projects, from web applications to robotics." />
</svelte:head>

<div class="min-h-screen pt-8 px-4 sm:px-8 xl:px-12 max-w-screen-2xl mx-auto flex flex-col relative z-10">
	<div class="mb-10 shrink-0">
		<a href="/" class="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-6">
			<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
			Back to Home
		</a>
		<h1 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">All Projects</h1>
		<p class="text-lg text-slate-500 dark:text-slate-400">
			A full archive of my projects spanning full-stack development, AI, robotics, and design.
		</p>
	</div>

	<!-- Project Grid (Image Cards) -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-12">
		{#each currentProjects as project}
			<button 
				type="button"
				onclick={() => selectedProject = project}
				class="relative w-full aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden group shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 bg-slate-100 dark:bg-[#111] border border-slate-200 dark:border-[#222] text-left cursor-pointer"
			>
				<!-- Image Section -->
				{#if project.images && project.images.length > 0}
					{#each project.images as img, i}
						<img 
							src={img} 
							alt={project.title} 
							class="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out {(tick % project.images.length) === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} group-hover:scale-105" 
						/>
					{/each}
				{:else}
					<img 
						src={project.image} 
						alt={project.title} 
						class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
					/>
				{/if}

				<!-- Hover Overlay -->
				<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

				<!-- Text Content (visible on hover) -->
				<div class="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
					<p class="text-cyan-400 font-bold text-xs sm:text-sm uppercase tracking-wider mb-2 drop-shadow-md">{project.category}</p>
					<h3 class="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg mb-4">{project.title}</h3>
					
					<div class="flex items-center gap-2 text-white/80 font-medium text-sm">
						<span>View Details</span>
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
	{/if}
</div>

<!-- Modal -->
{#if selectedProject}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div 
		class="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6"
		onclick={() => selectedProject = null}
	>
		<div 
			class="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#222] rounded-[2rem] w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative animate-in fade-in zoom-in-95 duration-300"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Close button -->
			<div class="absolute top-4 right-4 z-20">
				<button 
					onclick={() => selectedProject = null}
					class="p-2.5 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white transition-all hover:scale-110"
					aria-label="Close modal"
				>
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
				</button>
			</div>

			<!-- Image hero in modal -->
			<div class="relative w-full h-64 sm:h-[400px] shrink-0 bg-slate-100 dark:bg-[#1a1a1a]">
				{#if selectedProject.images && selectedProject.images.length > 0}
					<img src={selectedProject.images[tick % selectedProject.images.length]} alt={selectedProject.title} class="w-full h-full object-cover" />
				{:else}
					<img src={selectedProject.image} alt={selectedProject.title} class="w-full h-full object-cover" />
				{/if}
				<!-- Fade bottom edge for smooth transition into content -->
				<div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-[#111111] to-transparent"></div>
			</div>

			<!-- Modal Body -->
			<div class="p-8 sm:p-12 flex flex-col -mt-8 relative z-10">
				<div class="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
					<div>
						<p class="text-sm font-bold text-sky-500 uppercase tracking-widest mb-2">{selectedProject.category}</p>
						<h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">{selectedProject.title}</h2>
					</div>
					
					<div class="flex flex-wrap gap-3 shrink-0 mt-2 md:mt-0">
						{#if selectedProject.liveDemoLink}
							<a href={selectedProject.liveDemoLink} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-md">
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
								Live Site
							</a>
						{/if}
						{#if selectedProject.githubLink}
							<a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-[#222] text-slate-900 dark:text-white rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-sm border border-slate-200 dark:border-[#333]">
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
								Source Code
							</a>
						{/if}
					</div>
				</div>

				<div class="prose prose-slate dark:prose-invert max-w-none mb-10">
					<p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
						{selectedProject.description}
					</p>
				</div>

				<div class="mt-auto">
					<h4 class="text-xs font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-widest">Technologies Used</h4>
					<div class="flex flex-wrap gap-2.5">
						{#each selectedProject.techStack as tag}
							<span class="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#2a2a2a] rounded-xl shadow-sm">
								{tag}
							</span>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
