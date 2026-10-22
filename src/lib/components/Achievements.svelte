<script lang="ts">
	import { achievementGroups, type AchievementItem } from '$lib/data/achievements';
	import Reveal from '$lib/components/Reveal.svelte';
	import StaggerReveal from '$lib/components/StaggerReveal.svelte';
	import { portal } from '$lib/actions/portal';

	// Flatten all items and grab the ones explicitly marked as featured
	const allAchievements = achievementGroups.flatMap((group) => group.items);
	const explicitlyFeatured = allAchievements.filter((cert) => cert.featured);

	// Fallback to custom selection if no explicit flags are set
	const featuredAchievements =
		explicitlyFeatured.length > 0
			? explicitlyFeatured
			: [
					...achievementGroups[0].items.slice(0, 3), // Software Development
					...achievementGroups[1].items.slice(0, 1), // Networking & Cybersecurity
					...achievementGroups[2].items.slice(0, 2) // Scholastic & Extracurricular
				];

	let selectedCert = $state<AchievementItem | null>(null);

	$effect(() => {
		if (selectedCert) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});
</script>

<div class="scroll-mt-10" id="achievements">
	<StaggerReveal delay={40} stagger={90} duration={650}>
		<p
			class="font-mono text-[10px] font-medium tracking-[0.14em] text-slate-500 uppercase dark:text-slate-400"
		>
			05 — Achievements
		</p>
	</StaggerReveal>
	<div class="mt-7 mb-12 grid gap-7 sm:mb-16 md:grid-cols-2 md:gap-12">
		<StaggerReveal delay={90} stagger={90} duration={700}>
			<h2
				class="font-mono text-4xl leading-[1.05] font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl dark:text-white"
			>
				Always<br />learning.
			</h2>
		</StaggerReveal>
		<StaggerReveal
			delay={150}
			stagger={90}
			duration={700}
			className="flex flex-col items-start gap-4"
		>
			<p class="max-w-md text-base leading-7 text-slate-600 dark:text-slate-400">
				Certifications and milestones that reflect the skills I keep building.
			</p>
			<a
				href="/certificates"
				class="font-semibold text-sky-600 underline-offset-4 hover:underline focus-visible:underline dark:text-sky-400"
			>
				View all certificates
			</a>
		</StaggerReveal>
	</div>

	<div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each featuredAchievements as cert, idx}
			<Reveal delay={80 + idx * 70} distance={20}>
				<button
					type="button"
					onclick={() => (selectedCert = cert)}
					class="group relative aspect-4/3 cursor-pointer overflow-hidden rounded-2xl border border-slate-200 shadow-lg dark:border-[#222]"
				>
					<img
						src={cert.image}
						alt={cert.title}
						width="800"
						height="600"
						loading="lazy"
						decoding="async"
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
					/>
					<div
						class="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>

					<div
						class="absolute inset-0 flex translate-y-4 flex-col justify-end p-6 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
					>
						<p
							class="mb-2 text-xs font-bold tracking-wider text-sky-400 uppercase drop-shadow-md sm:text-sm"
						>
							{cert.issuer}
						</p>
						<h3 class="mb-2 text-lg leading-tight font-bold text-white drop-shadow-lg sm:text-xl">
							{cert.title}
						</h3>
						<div class="mt-auto flex items-center gap-2 text-xs font-medium text-white/80">
							<span>View Certificate</span>
							<svg
								class="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
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
			</Reveal>
		{/each}
	</div>
</div>

<!-- Modal for Certificate Image -->
{#if selectedCert}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		use:portal
		class="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-8"
		style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100vw; height: 100dvh;"
		onclick={() => (selectedCert = null)}
	>
		<div
			class="animate-in fade-in zoom-in-95 relative flex w-full max-w-5xl flex-col items-center duration-300"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Close button -->
			<button
				onclick={() => (selectedCert = null)}
				class="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20"
				aria-label="Close modal"
			>
				<svg
					class="h-6 w-6"
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

			<img
				src={selectedCert.image}
				alt={selectedCert.title}
				width="800"
				height="600"
				loading="lazy"
				decoding="async"
				class="h-auto max-h-[85vh] w-full rounded-lg object-contain shadow-2xl"
			/>

			<div class="mt-6 text-center">
				<h3 class="mb-2 text-2xl font-bold text-white">{selectedCert.title}</h3>
				<p class="font-medium text-white/70">{selectedCert.issuer} • {selectedCert.date}</p>
			</div>
		</div>
	</div>
{/if}
