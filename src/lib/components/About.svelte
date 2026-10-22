<script lang="ts">
	import StaggerReveal from '$lib/components/StaggerReveal.svelte';

	const overview = [
		{
			area: 'Frontend',
			title: 'Interfaces',
			description:
				'React, TypeScript, JavaScript, Next.js, SvelteKit, React Native, Vue.js, Tailwind CSS, and responsive interfaces.'
		},
		{
			area: 'Backend',
			title: 'Systems',
			description:
				'Laravel, Express, Spring Boot, .NET, Node.js, FastAPI, MySQL, Supabase, PostgreSQL, and maintainable applications.'
		},
		{
			area: 'Delivery',
			title: 'Products',
			description: 'Full-stack workflows, Google Cloud, Git, and software built for real people.'
		},
		{
			area: 'AI & ML',
			title: 'Intelligence',
			description:
				'Machine learning, natural language processing, computer vision, Claude, Gemini, Google AI Studio, TensorFlow and practical AI tools.'
		}
	];
</script>

<section id="about" class="scroll-mt-10" aria-labelledby="about-heading">
	<StaggerReveal delay={40} stagger={90} duration={650}>
		<p
			class="font-mono text-[10px] font-medium tracking-[0.14em] text-slate-500 uppercase dark:text-slate-400"
		>
			02 — About
		</p>
	</StaggerReveal>

	<div class="mt-7 grid gap-7 md:grid-cols-2 md:gap-12">
		<StaggerReveal delay={90} stagger={90} duration={700}>
			<h2
				id="about-heading"
				class="font-mono text-4xl leading-[1.05] font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl dark:text-white"
			>
				Building with<br />purpose.
			</h2>
		</StaggerReveal>
		<StaggerReveal delay={150} stagger={90} duration={700}>
			<p class="max-w-md text-base leading-7 text-slate-600 dark:text-slate-400">
				I turn real needs into thoughtful web and mobile products. From the first interface to the
				systems behind it, I focus on making technology useful, reliable, and easy to use.
			</p>
		</StaggerReveal>
	</div>

	<StaggerReveal
		delay={170}
		stagger={75}
		duration={650}
		className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-2 dark:border-slate-800 dark:bg-slate-800"
	>
		{#each overview as item, index}
			<div class="min-w-0 bg-slate-50 px-5 py-6 sm:px-6 sm:py-8 dark:bg-[#171717]">
				<p
					class="font-mono text-[10px] font-medium tracking-[0.14em] text-slate-500 uppercase dark:text-slate-400"
				>
					{String(index + 1).padStart(2, '0')} / {item.area}
				</p>
				<h3 class="mt-8 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
					{item.title}
				</h3>
				<p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
					{item.description}
				</p>
			</div>
		{/each}
	</StaggerReveal>

	<a
		href="/skills"
		class="mt-6 inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-sky-500 hover:text-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-700 dark:text-white dark:hover:text-sky-400"
	>
		View all stacks
	</a>
</section>
