<script lang="ts">
	import { projectsData, type ProjectItem } from '$lib/data/projects';
	import { onMount } from 'svelte';
	import StaggerReveal from '$lib/components/StaggerReveal.svelte';
	import AwardWinningWork from '$lib/components/AwardWinningWork.svelte';
	import { awardsData } from '$lib/data/awards';
	import { portal } from '$lib/actions/portal';

	const awardProjectIds = new Set(awardsData.map((award) => award.projectId));
	const featuredProjects = projectsData.filter((p) => p.featured && !awardProjectIds.has(p.id));

	let selectedProject = $state<ProjectItem | null>(null);

	let tick = $state(0);
	onMount(() => {
		const interval = setInterval(() => {
			tick++;
		}, 3500);
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

<div class="scroll-mt-10" id="projects">
	<StaggerReveal delay={40} stagger={90} duration={650}>
		<p
			class="font-mono text-[10px] font-medium tracking-[0.14em] text-slate-500 uppercase dark:text-slate-400"
		>
			03 — Work
		</p>
	</StaggerReveal>
	<div class="mt-7 mb-12 grid gap-7 sm:mb-16 md:grid-cols-2 md:gap-12">
		<StaggerReveal delay={90} stagger={90} duration={700}>
			<h2
				class="font-mono text-4xl leading-[1.05] font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl dark:text-white"
			>
				Selected<br />work.
			</h2>
		</StaggerReveal>
		<StaggerReveal
			delay={150}
			stagger={90}
			duration={700}
			className="flex flex-col items-start gap-4"
		>
			<p class="max-w-md text-base leading-7 text-slate-600 dark:text-slate-400">
				Award-winning and featured projects I’ve built with care, from useful ideas to working
				products.
			</p>
			<a
				href="/projects"
				class="font-semibold text-sky-600 underline-offset-4 hover:underline focus-visible:underline dark:text-sky-400"
			>
				View all projects
			</a>
		</StaggerReveal>
	</div>

	<AwardWinningWork />

	<!-- Featured Projects -->
	<p
		class="mb-8 font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase dark:text-slate-400"
	>
		Featured work
	</p>
	<div class="featured-work grid items-start gap-x-10 gap-y-16 xl:grid-cols-2">
		{#each featuredProjects as project, idx}
			<StaggerReveal delay={idx * 110} stagger={70} duration={700} className="flex flex-col">
				<p
					class="mb-4 flex items-center justify-between font-mono text-[10px] tracking-widest text-slate-500 uppercase dark:text-slate-400"
				>
					<span>Featured / {project.category}</span><span>{String(idx + 1).padStart(2, '0')}</span>
				</p>
				<button type="button" onclick={() => (selectedProject = project)} class="text-left">
					<h3
						class="mb-3 text-xl leading-tight font-bold tracking-tight text-slate-900 transition-colors hover:text-sky-500 sm:text-2xl dark:text-white"
					>
						{project.title}
					</h3>
				</button>

				<div
					class="mb-5 h-px w-full bg-linear-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700"
				></div>

				<button
					type="button"
					onclick={() => (selectedProject = project)}
					class="group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-100 dark:bg-[#1a1a1a]"
				>
					<div class="relative aspect-video w-full">
						{#if project.images && project.images.length > 0}
							{#each project.images as img, i}
								<img
									src={img}
									alt={project.title}
									width="800"
									height="800"
									loading="lazy"
									decoding="async"
									class="absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out {tick %
										project.images.length ===
									i
										? 'scale-100 opacity-100'
										: 'scale-105 opacity-0'}"
								/>
							{/each}
						{:else}
							<img
								src={project.image}
								alt={project.title}
								width="800"
								height="600"
								loading="lazy"
								decoding="async"
								class="absolute inset-0 h-full w-full object-cover"
							/>
						{/if}
						<div
							class="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						></div>
					</div>
				</button>

				<div class="mt-5 px-1">
					<p class="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
						{project.description}
					</p>
					<div class="flex flex-wrap gap-2">
						{#each project.techStack as tag}
							<span
								class="cursor-default rounded-md border border-slate-300 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:border-[#3a3a3a] dark:text-slate-300"
							>
								{tag}
							</span>
						{/each}
					</div>
				</div>

				<button
					type="button"
					onclick={() => (selectedProject = project)}
					class="mt-5 self-start text-sm font-semibold text-slate-900 underline-offset-4 hover:underline focus-visible:underline dark:text-white"
					>Explore project</button
				>
				{#if project.githubLink || project.liveDemoLink}
					<div class="mt-4 flex flex-wrap gap-3">
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
								>
								GitHub
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
								>
								Live Demo
							</a>
						{/if}
					</div>
				{/if}
			</StaggerReveal>
		{/each}
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
				class="relative my-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:rounded-4xl dark:border-[#222] dark:bg-[#111111]"
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
					<div class="relative h-44 w-full shrink-0 bg-slate-100 sm:h-87.5 dark:bg-[#1a1a1a]">
						{#if selectedProject.images && selectedProject.images.length > 0}
							<img
								src={selectedProject.images[tick % selectedProject.images.length]}
								alt={selectedProject.title}
								width="800"
								height="600"
								loading="lazy"
								decoding="async"
								class="h-full w-full object-cover"
							/>
						{:else}
							<img
								src={selectedProject.image}
								alt={selectedProject.title}
								width="800"
								height="600"
								loading="lazy"
								decoding="async"
								class="h-full w-full object-cover"
							/>
						{/if}
						<!-- Fade bottom edge for smooth transition into content -->
						<div
							class="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white to-transparent dark:from-[#111111]"
						></div>
					</div>

					<!-- Modal Body -->
					<div class="relative z-10 px-5 pt-5 pb-6 sm:-mt-8 sm:px-10 sm:pt-8 sm:pb-10">
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
</div>

<style>
	.featured-work :global(.stagger-wrap) {
		height: 100%;
		background: transparent;
	}
</style>
