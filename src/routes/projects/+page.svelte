<script lang="ts">
	import { projectsData, type ProjectItem } from '$lib/data/projects';
	import { onMount } from 'svelte';
	import Reveal from '$lib/components/Reveal.svelte';
	import { portal } from '$lib/actions/portal';

	let currentPage = $state(1);
	const itemsPerPage = 4;

	let totalPages = $derived(Math.ceil(projectsData.length / itemsPerPage));
	let currentProjects = $derived(
		projectsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

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
	<meta
		name="description"
		content="A collection of my recent projects, from web applications to robotics."
	/>
</svelte:head>

<div
	class="relative z-10 mx-auto flex min-h-screen max-w-screen-2xl flex-col px-4 pt-8 sm:px-8 xl:px-12"
>
	<div class="mb-10 shrink-0">
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
			All Projects
		</h1>
		<p class="text-lg text-slate-600 dark:text-slate-400">
			A full archive of my projects spanning full-stack development, AI, robotics, and design.
		</p>
	</div>

	<!-- Project Grid (Image Cards) -->
	<div class="mb-12 grid grid-cols-1 gap-6 sm:gap-10 md:grid-cols-2">
		{#each currentProjects as project, idx}
			<Reveal delay={70 + idx * 80} distance={22}>
				<div
					class="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:shadow-2xl dark:border-[#222] dark:bg-[#111]"
				>
					<button
						type="button"
						onclick={() => (selectedProject = project)}
						class="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-slate-100 text-left sm:aspect-video dark:bg-[#1a1a1a]"
					>
						<!-- Image Section -->
						{#if project.images && project.images.length > 0}
							{#each project.images as img, i}
								<img
									width="800"
									height="600"
									loading="lazy"
									decoding="async"
									src={img}
									alt={project.title}
									class="absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out {tick %
										project.images.length ===
									i
										? 'scale-100 opacity-100'
										: 'scale-105 opacity-0'} group-hover:scale-105"
								/>
							{/each}
						{:else}
							<img
								width="800"
								height="600"
								loading="lazy"
								decoding="async"
								src={project.image}
								alt={project.title}
								class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
							/>
						{/if}

						<!-- Hover Overlay -->
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						></div>

						<!-- Text Content (visible on hover) -->
						<div
							class="absolute inset-0 flex translate-y-4 flex-col justify-end p-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
						>
							<p
								class="mb-2 text-xs font-bold tracking-wider text-cyan-400 uppercase drop-shadow-md sm:text-sm"
							>
								{project.category}
							</p>
							<h3 class="mb-4 text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">
								{project.title}
							</h3>

							<div class="flex items-center gap-2 text-sm font-medium text-white/80">
								<span>View Details</span>
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

					<div class="flex flex-col gap-3 px-5 py-4 sm:px-6 sm:py-5">
						<button type="button" onclick={() => (selectedProject = project)} class="text-left">
							<h3
								class="text-lg leading-tight font-bold text-slate-900 transition-colors hover:text-sky-500 sm:text-xl dark:text-white"
							>
								{project.title}
							</h3>
						</button>

						{#if project.githubLink || project.liveDemoLink}
							<div class="flex flex-wrap gap-2.5">
								{#if project.githubLink}
									<a
										href={project.githubLink}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:scale-105 hover:border-slate-400 hover:bg-white dark:border-[#333] dark:bg-[#222] dark:text-slate-300 dark:hover:border-[#555] dark:hover:bg-[#2a2a2a]"
									>
										<svg
											class="h-3.5 w-3.5"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											><path
												d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
											></path></svg
										> GitHub
									</a>
								{/if}
								{#if project.liveDemoLink}
									<a
										href={project.liveDemoLink}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:scale-105 hover:border-slate-400 hover:bg-white dark:border-[#333] dark:bg-[#222] dark:text-slate-300 dark:hover:border-[#555] dark:hover:bg-[#2a2a2a]"
									>
										<svg
											class="h-3.5 w-3.5"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											><circle cx="12" cy="12" r="10" /><path
												d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
											/><path d="M2 12h20" /></svg
										> Live Demo
									</a>
								{/if}
							</div>
						{/if}
					</div>
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
</div>

<!-- Modal -->
{#if selectedProject}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		use:portal
		class="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-md sm:items-center sm:p-6"
		style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100vw; height: 100dvh;"
		onclick={() => (selectedProject = null)}
	>
		<div
			class="relative my-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:rounded-[2rem] dark:border-[#222] dark:bg-[#111111]"
			style="max-height: calc(100dvh - 1.5rem);"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Close button -->
			<div class="absolute top-4 right-4 z-20">
				<button
					onclick={() => (selectedProject = null)}
					class="rounded-full bg-black/50 p-2.5 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80"
					aria-label="Close modal"
				>
					<svg
						class="h-5 w-5"
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
			</div>

			<!-- Scrollable inner content -->
			<div class="overflow-y-auto" style="max-height: calc(100dvh - 1.5rem);">
				<!-- Image hero in modal -->
				<div class="relative h-48 w-full shrink-0 bg-slate-100 sm:h-[350px] dark:bg-[#1a1a1a]">
					{#if selectedProject.images && selectedProject.images.length > 0}
						<img
							width="800"
							height="600"
							loading="lazy"
							decoding="async"
							src={selectedProject.images[tick % selectedProject.images.length]}
							alt={selectedProject.title}
							class="h-full w-full object-cover"
						/>
					{:else}
						<img
							width="800"
							height="600"
							loading="lazy"
							decoding="async"
							src={selectedProject.image}
							alt={selectedProject.title}
							class="h-full w-full object-cover"
						/>
					{/if}
					<!-- Fade bottom edge for smooth transition into content -->
					<div
						class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-[#111111]"
					></div>
				</div>

				<!-- Modal Body -->
				<div class="relative z-10 -mt-8 flex flex-col p-5 sm:p-10">
					<div class="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row">
						<div>
							<p class="mb-2 text-sm font-bold tracking-widest text-sky-500 uppercase">
								{selectedProject.category}
							</p>
							<h2
								class="text-3xl leading-tight font-bold text-slate-900 sm:text-4xl md:text-5xl dark:text-white"
							>
								{selectedProject.title}
							</h2>
						</div>

						<div class="mt-2 flex shrink-0 flex-wrap gap-3 md:mt-0">
							{#if selectedProject.liveDemoLink}
								<a
									href={selectedProject.liveDemoLink}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition-transform hover:scale-105 dark:border-[#333] dark:bg-[#222] dark:text-white"
								>
									<svg
										class="h-4 w-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										><circle cx="12" cy="12" r="10" /><path
											d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
										/><path d="M2 12h20" /></svg
									>
									Live Site
								</a>
							{/if}
							{#if selectedProject.githubLink}
								<a
									href={selectedProject.githubLink}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition-transform hover:scale-105 dark:border-[#333] dark:bg-[#222] dark:text-white"
								>
									<svg
										class="h-4 w-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										><path
											d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
										></path></svg
									>
									Source Code
								</a>
							{/if}
						</div>
					</div>

					<div class="prose mb-10 max-w-none prose-slate dark:prose-invert">
						<p class="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
							{selectedProject.description}
						</p>
					</div>

					<div class="mt-auto">
						<h4
							class="mb-4 text-xs font-bold tracking-widest text-slate-600 uppercase dark:text-slate-400"
						>
							Technologies Used
						</h4>
						<div class="flex flex-wrap gap-2.5">
							{#each selectedProject.techStack as tag}
								<span
									class="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:text-slate-300"
								>
									{tag}
								</span>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
