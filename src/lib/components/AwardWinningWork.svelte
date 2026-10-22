<script lang="ts">
	import { Trophy, Github, Play, ExternalLink } from 'lucide-svelte';
	import { awardsData } from '$lib/data/awards';
	import StaggerReveal from '$lib/components/StaggerReveal.svelte';

	const awards = [...awardsData].sort((a, b) => b.date.localeCompare(a.date));
	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC'
	});
</script>

{#if awards.length > 0}
	<section
		id="award-winning-work"
		aria-label="Award-winning work"
		class="mb-24 w-full scroll-mt-10 sm:mb-32 lg:mb-40"
	>
		<p
			class="mb-8 font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400"
		>
			Award-winning work
		</p>
		<div class="space-y-24 sm:space-y-36">
			{#each awards as award (award.id)}
				<article aria-labelledby={`award-${award.id}`}>
					<StaggerReveal delay={40} duration={750} once>
						<figure class="group overflow-hidden rounded-2xl sm:rounded-3xl">
							<img
								src={award.image}
								alt={award.imageAlt}
								width="800"
								height="600"
								loading="lazy"
								decoding="async"
								class="max-h-[560px] w-full object-contain transition-transform duration-700 group-hover:scale-[1.015] motion-reduce:transition-none"
							/>
						</figure>
					</StaggerReveal>
					<div
						class="mt-8 grid gap-7 sm:mt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-10 xl:gap-12"
					>
						<StaggerReveal delay={60} stagger={70} duration={650} once>
							<p
								class="mb-4 flex items-start gap-2 text-xs leading-5 font-semibold text-amber-800 dark:text-amber-300"
							>
								<Trophy size={16} class="mt-0.5 shrink-0" aria-hidden="true" />
								{award.award}
							</p>
							<h3
								id={`award-${award.id}`}
								class="max-w-lg text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.15] font-semibold tracking-[-0.04em] text-slate-950 dark:text-white"
							>
								{award.title}
							</h3>
							<p class="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">{award.event}</p>
							<time
								datetime={award.date}
								class="mt-1 block font-mono text-[11px] text-slate-500 dark:text-slate-400"
								>{dateFormatter.format(new Date(`${award.date}T00:00:00Z`))}</time
							>
						</StaggerReveal>
						<StaggerReveal delay={100} stagger={70} duration={650} once>
							<p class="max-w-xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
								{award.description}
							</p>
							{#if award.techStack.length > 0}
								<ul aria-label="Technologies used" class="mt-6 flex flex-wrap gap-x-4 gap-y-2">
									{#each award.techStack as technology}
										<li class="text-[11px] leading-5 text-slate-500 dark:text-slate-400">
											{technology}
										</li>
									{/each}
								</ul>
							{/if}
							{#if award.liveDemoLink || award.githubLink || award.videoLink || award.certificateImage}
								<div class="mt-7 flex flex-wrap gap-x-6 gap-y-4">
									{#each [{ href: award.liveDemoLink, label: 'Visit website', icon: ExternalLink }, { href: award.githubLink, label: 'Source code', icon: Github }, { href: award.videoLink, label: 'Watch video', icon: Play }, { href: award.certificateImage, label: 'View certificate', icon: Trophy }] as link}
										{#if link.href}
											<a
												href={link.href}
												target="_blank"
												rel="noopener noreferrer"
												class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-950 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 dark:text-white"
											>
												<link.icon size={15} aria-hidden="true" />{link.label}<span class="sr-only">
													(opens in a new tab)</span
												>
											</a>
										{/if}
									{/each}
								</div>
							{/if}
						</StaggerReveal>
					</div>
					{#if award.videoSrc}
						<figure class="mt-10">
							<video
								controls
								playsinline
								preload="none"
								poster={award.image}
								aria-label={`${award.title} demonstration`}
								class="aspect-video w-full rounded-2xl bg-black"
							>
								<source src={award.videoSrc} />
								{#if award.videoCaptionsSrc}
									<track
										kind="captions"
										src={award.videoCaptionsSrc}
										srclang="en"
										label="English"
									/>
								{/if}
								Your browser does not support video.
								<a href={award.videoSrc}>Download the video</a>.
							</video>
							<figcaption class="mt-3 text-sm text-slate-500 dark:text-slate-400">
								{award.title} — project demonstration
							</figcaption>
						</figure>
					{/if}
				</article>
			{/each}
		</div>
	</section>
{/if}
