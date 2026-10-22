<script lang="ts">
	import { onMount } from 'svelte';
	import StaggerReveal from '$lib/components/StaggerReveal.svelte';

	let timeline: HTMLDivElement;
	let lineHeight = $state(0);
	let activeEntries = $state<number[]>([]);

	onMount(() => {
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let frame = 0;

		function updateLine() {
			if (!timeline) return;
			const { top, height } = timeline.getBoundingClientRect();
			lineHeight = reducedMotion.matches
				? height
				: Math.max(0, Math.min(height, window.innerHeight * 0.7 - top));
			activeEntries = Array.from(timeline.querySelectorAll('article')).flatMap((entry, index) =>
				reducedMotion.matches || entry.getBoundingClientRect().top + 32 <= window.innerHeight * 0.7
					? [index]
					: []
			);
		}

		function scheduleUpdate() {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(updateLine);
		}

		updateLine();
		window.addEventListener('scroll', scheduleUpdate, { passive: true });
		window.addEventListener('resize', scheduleUpdate);
		const resizeObserver = new ResizeObserver(scheduleUpdate);
		resizeObserver.observe(timeline);
		reducedMotion.addEventListener('change', scheduleUpdate);
		return () => {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			window.removeEventListener('scroll', scheduleUpdate);
			window.removeEventListener('resize', scheduleUpdate);
			reducedMotion.removeEventListener('change', scheduleUpdate);
		};
	});

	const experienceList = [
		{
			role: 'Backend AI Engineering Internship',
			company: 'FlyRank AI',
			location: 'Chicago, Illinois, United States',
			years: 'October 2026 – Present',
			stack: 'Next.js, FastAPI, Express.js, Node.js, PostgreSQL, Supabase, Neon, SQLite, Zod',
			highlights: [
				'Architected retrieval-backed answer flows and RAG pipelines using semantic embeddings, vector retrieval, and custom chunking to reduce hallucinations and ground model outputs.',
				'Engineered API contracts and tool-calling workflows with Zod validation, structured outputs, and upstream API failure handling.',
				'Built automated evaluation harnesses to assess latency, answer correctness, and grounding quality; implemented fallbacks and error handling for rate limits and model degradation.'
			]
		},
		{
			role: 'Full-Stack Web Developer · Part Time',
			company: '6010 Digital Solutions',
			location: 'La Paz, Bogo City, Cebu',
			years: 'September 2026 – Present',
			stack: 'Laravel, React, Inertia.js, OAuth',
			highlights: [
				'Developed full-stack web applications with responsive React and Inertia.js frontends and Laravel APIs.',
				'Integrated OAuth authentication and role-based access control for reliable session management.',
				'Worked with stakeholders to translate business processes into maintainable, production-ready software.'
			]
		}
	];

	const educationList = [
		{
			school: 'Cebu Roosevelt Memorial Colleges',
			degree: 'Bachelor of Science in Information Technology',
			years: '2023 – Present'
		},
		{
			school: 'City of Bogo Senior High School',
			degree: 'Senior High School',
			years: '2021 – 2023'
		}
	];
</script>

<section
	id="experience-education"
	class="scroll-mt-10"
	aria-labelledby="experience-education-heading"
>
	<StaggerReveal delay={40} stagger={90} duration={650}>
		<p
			class="font-mono text-[10px] font-medium tracking-[0.14em] text-slate-500 uppercase dark:text-slate-400"
		>
			Experience / Education
		</p>
	</StaggerReveal>
	<div class="mt-7 mb-12 grid gap-7 md:grid-cols-2 md:gap-12">
		<StaggerReveal delay={90} stagger={90} duration={700}>
			<h2
				id="experience-education-heading"
				class="font-mono text-4xl leading-[1.05] font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl dark:text-white"
			>
				Learning by<br />building.
			</h2>
		</StaggerReveal>
		<StaggerReveal delay={150} stagger={90} duration={700}>
			<p class="max-w-md text-base leading-7 text-slate-600 dark:text-slate-400">
				Hands-on experience across AI, web development, and software engineering, grounded in my
				studies.
			</p>
		</StaggerReveal>
	</div>

	<div
		bind:this={timeline}
		class="timeline relative ml-2 border-l border-slate-200 pl-8 sm:ml-3 sm:pl-12 dark:border-slate-800"
	>
		<div
			class="timeline-line pointer-events-none absolute top-0 -left-px w-0.5"
			style:height={`${lineHeight}px`}
			aria-hidden="true"
		></div>
		{#each experienceList as experience, index}
			<StaggerReveal delay={70} duration={700} once className="relative mb-10 last:mb-0">
				<article
					class:is-active={activeEntries.includes(index)}
					class="relative rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7 dark:border-slate-800 dark:bg-[#171717]"
				>
					<span
						class="absolute top-7 -left-[2.6rem] h-3 w-3 sm:-left-[3.6rem] dark:bg-[#111111]"
						aria-hidden="true"
					></span>
					<p class="font-mono text-xs text-sky-700 dark:text-sky-400">{experience.years}</p>
					<h3 class="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
						{experience.role}
					</h3>
					<p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
						{experience.company} · {experience.location}
					</p>
					<p class="mt-3 text-xs text-slate-500 dark:text-slate-400">{experience.stack}</p>
					<ul
						class="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-400"
					>
						{#each experience.highlights as highlight}
							<li>{highlight}</li>
						{/each}
					</ul>
				</article>
			</StaggerReveal>
		{/each}

		{#each educationList as edu, index}
			<StaggerReveal delay={70} duration={700} once className="relative mb-10 last:mb-0">
				<article
					class:is-active={activeEntries.includes(index === 0 ? 2 : 4)}
					class="relative rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7 dark:border-slate-800 dark:bg-[#171717]"
				>
					<span
						class="absolute top-7 -left-[2.6rem] h-3 w-3 sm:-left-[3.6rem] dark:bg-[#111111]"
						aria-hidden="true"
					></span>
					<p class="font-mono text-xs text-sky-700 dark:text-sky-400">{edu.years}</p>
					<h3 class="mt-4 text-lg font-semibold text-slate-950 dark:text-white">{edu.degree}</h3>
					<p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{edu.school}</p>
				</article>
			</StaggerReveal>
			{#if edu.degree === 'Bachelor of Science in Information Technology'}
				<StaggerReveal delay={70} duration={700} once className="relative mb-10">
					<article
						class:is-active={activeEntries.includes(3)}
						class="relative rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7 dark:border-slate-800 dark:bg-[#171717]"
					>
						<span
							class="r absolute top-7 -left-[2.6rem] h-3 w-3 sm:-left-[3.6rem] dark:bg-[#111111]"
							aria-hidden="true"
						></span>
						<p class="font-mono text-xs text-sky-700 dark:text-sky-400">April 2023</p>
						<h3 class="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
							IT Work Immersion Trainee
						</h3>
						<p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
							First Agro-Industrial Bank Inc. · Gairan, Bogo City, Cebu, Philippines
						</p>
						<p class="mt-3 text-xs text-slate-500 dark:text-slate-400">
							Java, Java Swing, MySQL, NetBeans
						</p>
						<p class="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
							Developed a Java Swing desktop application with authentication and basic CRUD
							features, backed by MySQL.
						</p>
					</article>
				</StaggerReveal>
			{/if}
		{/each}
	</div>
</section>

<style>
	.timeline-line {
		background: linear-gradient(to bottom, #38bdf8, #6366f1);
		box-shadow: 0 0 12px rgb(56 189 248 / 25%);
		transition: height 180ms ease-out;
	}

	.timeline :global(article) {
		border: 0;
		background: transparent;
		box-shadow: none;
	}

	.timeline :global(article > p:first-of-type) {
		display: inline-flex;
		align-items: center;
		font-size: 0.65rem;
		letter-spacing: 0.04em;
	}

	.timeline :global(article > span) {
		width: 0.75rem;
		height: 0.75rem;
		border: 2px solid #94a3b8;
		border-radius: 50%;
		top: 2rem;
		border-color: #94a3b8;
		transition:
			background-color 400ms ease,
			border-color 400ms ease,
			box-shadow 400ms ease;
	}

	.timeline :global(article.is-active > span) {
		border-color: #38bdf8;
		background: #38bdf8;
		box-shadow:
			0 0 0 5px rgb(56 189 248 / 12%),
			0 0 18px rgb(56 189 248 / 25%);
	}

	.timeline :global(article > span)::after {
		position: absolute;
		content: '';
		left: 100%;
		top: 50%;
		width: 1.9rem;
		height: 1px;
		background: linear-gradient(to right, rgb(56 189 248 / 60%), rgb(56 189 248 / 10%));
	}

	@media (min-width: 640px) {
		.timeline :global(article > span)::after {
			width: 2.9rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.timeline-line,
		.timeline :global(article),
		.timeline :global(article > span) {
			transition: none;
		}
	}
</style>
