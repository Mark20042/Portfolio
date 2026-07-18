<script lang="ts">
	import StaggerReveal from '$lib/components/StaggerReveal.svelte';

	const featuredSkills = [
		'JavaScript',
		'TypeScript',
		'React',
		'Next.js',
		'Node.js',
		'Python',
		'Laravel',
		'.NET',
		'Express.js',
		'FastAPI',
		'MongoDB',
		'MySQL',
		'Claude Code',
		'Google Cloud Platform',
		'Arduino'
	];
</script>

<div class="mt-4 mb-12 pt-12 sm:pt-16">
	<StaggerReveal delay={20} stagger={90} duration={650}>
		<h2 class="mb-6 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
			Stacks
		</h2>
	</StaggerReveal>

	<StaggerReveal
		delay={80}
		stagger={45}
		duration={620}
		distance={14}
		className="flex flex-wrap gap-2.5 sm:gap-3"
	>
		{#each featuredSkills as skill}
			<span
				class="cursor-default rounded-md border border-slate-300 px-2 py-0.5 text-[11px] font-medium text-slate-700 transition-colors duration-300 hover:border-slate-400 sm:px-2.5 sm:py-1 sm:text-xs dark:border-[#3a3a3a] dark:text-slate-300 dark:hover:border-[#555]"
			>
				{skill}
			</span>
		{/each}
		<a
			href="/skills"
			class="cursor-default rounded-md border border-slate-300 px-2 py-0.5 text-[11px] font-medium text-slate-700 transition-colors duration-300 hover:border-slate-400 sm:px-2.5 sm:py-1 sm:text-xs dark:border-[#3a3a3a] dark:text-slate-300 dark:hover:border-[#555]"
		>
			More Skills +
		</a>
	</StaggerReveal>
</div>
