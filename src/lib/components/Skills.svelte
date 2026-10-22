<script lang="ts">
	import StaggerReveal from '$lib/components/StaggerReveal.svelte';
	import { techStack } from '$lib/data/skills';
</script>

<section id="stacks" class="mt-4 mb-8 scroll-mt-10 pt-8 sm:pt-10" aria-labelledby="stacks-heading">
	<StaggerReveal delay={20} stagger={90} duration={650}>
		<h2
			id="stacks-heading"
			class="mb-6 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white"
		>
			Stacks
		</h2>
	</StaggerReveal>

	<StaggerReveal
		delay={80}
		stagger={45}
		duration={620}
		distance={14}
		className="grid gap-5 md:grid-cols-2 sm:gap-6"
	>
		{#each techStack as group, index}
			<div
				class="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-6 sm:px-7 sm:py-8 dark:border-slate-800 dark:bg-[#171717]"
			>
				<p
					class="font-mono text-[10px] font-medium tracking-[0.14em] text-slate-500 uppercase dark:text-slate-400"
				>
					{String(index + 1).padStart(2, '0')} / {group.category}
				</p>
				<h3 class="mt-6 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
					{group.category}
				</h3>
				<ul class="mt-5 flex flex-wrap gap-2.5" aria-label={`${group.category} skills`}>
					{#each group.skills as skill}
						<li
							class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm leading-5 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
						>
							{skill}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</StaggerReveal>
</section>
