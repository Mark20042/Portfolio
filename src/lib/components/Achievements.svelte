<script lang="ts">
	import { achievementGroups, type AchievementItem } from '$lib/data/achievements';

	// Flatten all items and grab the ones explicitly marked as featured
	const allAchievements = achievementGroups.flatMap(group => group.items);
	const explicitlyFeatured = allAchievements.filter(cert => cert.featured);
	
	// Fallback to custom selection if no explicit flags are set
	const featuredAchievements = explicitlyFeatured.length > 0 ? explicitlyFeatured : [
		...achievementGroups[0].items.slice(0, 3), // Software Development
		...achievementGroups[1].items.slice(0, 1), // Networking & Cybersecurity
		...achievementGroups[2].items.slice(0, 2)  // Scholastic & Extracurricular
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

<div class="mb-24 pt-12 sm:pt-16" id="achievements">
	<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
		<div class="text-left max-w-2xl">
			<h2 class="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight">Certifications & Achievements</h2>
			<p class="text-base sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
				A showcase of my continuous learning and professional development.
			</p>
		</div>
		<a href="/certificates" class="inline-flex items-center gap-2 text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 font-semibold transition-colors group whitespace-nowrap pb-1 sm:pb-2">
			View All Certificates
			<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
		</a>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
		{#each featuredAchievements as cert}
			<button 
				type="button"
				onclick={() => selectedCert = cert}
				class="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-slate-200 dark:border-[#222]"
			>
				<img 
					src={cert.image} 
					alt={cert.title} 
					class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				
				<div class="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-left">
					<p class="text-sky-400 font-bold text-xs sm:text-sm uppercase tracking-wider mb-2 drop-shadow-md">{cert.issuer}</p>
					<h3 class="text-lg sm:text-xl font-bold text-white drop-shadow-lg mb-2 leading-tight">{cert.title}</h3>
					<div class="flex items-center gap-2 text-white/80 font-medium text-xs mt-auto">
						<span>View Certificate</span>
						<svg class="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
					</div>
				</div>
			</button>
		{/each}
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
				<p class="text-white/70 font-medium">{selectedCert.issuer} • {selectedCert.date}</p>
			</div>
		</div>
	</div>
{/if}
