<script lang="ts">
	import { onMount } from 'svelte';
	import { Sparkles, X, Check, Star } from 'lucide-svelte';
	
	let testimonials = $state<any[]>([]);
	let loading = $state(true);

	// Modal State
	let showModal = $state(false);
	let newRating = $state(5);
	let hoverRating = $state(0);
	let newEmail = $state('');
	let newContent = $state('');
	let submitting = $state(false);
	let submittedSuccess = $state(false);

	onMount(async () => {
		try {
			const res = await fetch('/api/testimonials');
			if (res.ok) {
				testimonials = await res.json();
			}
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	});

	async function submitRating(e: Event) {
		e.preventDefault();
		submitting = true;
		try {
			const res = await fetch('/api/testimonials', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: newEmail,
					content: newContent,
					rating: newRating
				})
			});
			if (res.ok) {
				// Don't auto append because it's not approved yet
				submittedSuccess = true;
				newEmail = '';
				newContent = '';
				newRating = 5;
				setTimeout(() => {
					showModal = false;
					submittedSuccess = false;
				}, 3000);
			}
		} catch (error) {
			console.error(error);
		} finally {
			submitting = false;
		}
	}
</script>

<div class="pt-16 pb-0" id="testimonials">
	<div class="text-center mb-8">
		<h2 class="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">What clients say</h2>
		<p class="text-base sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
			See what clients think about working with me and the results we achieved together.
		</p>
	</div>

	<!-- Horizontal Scroll of Testimonials -->
	<div class="flex overflow-x-auto gap-4 pb-8 mb-8 snap-x snap-mandatory scrollbar-hide px-4 md:px-0">
		{#if loading}
			<div class="w-full text-center text-slate-500 py-12">Loading testimonials...</div>
		{:else if testimonials.length === 0}
			<div class="w-full text-center text-slate-500 py-12">No feedback yet. Be the first!</div>
		{:else}
			{#each testimonials as t}
				<div class="min-w-[300px] md:min-w-[350px] bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#222] rounded-3xl p-6 snap-center shrink-0">
					<div class="flex justify-between items-start mb-4">
						<div class="flex items-center gap-3">
							<!-- Gradient Avatar -->
							<div class="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-500 shrink-0"></div>
							<div class="overflow-hidden">
								<h4 class="text-slate-900 dark:text-white font-bold text-sm truncate">{t.email}</h4>
								<p class="text-slate-500 dark:text-slate-400 text-xs">{t.role}</p>
							</div>
						</div>
						<div class="flex items-center gap-1 text-amber-400">
							<Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
							<span class="text-sm font-bold text-slate-700 dark:text-white">{t.rating}</span>
						</div>
					</div>
					<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
						{t.content}
					</p>
				</div>
			{/each}
		{/if}
	</div>

	<!-- Actions -->
	<div class="flex flex-col sm:flex-row items-center justify-center gap-6">
		<button 
			onclick={() => showModal = true}
			class="relative group"
		>
			<div class="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
			<div class="relative flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#0a0a0a] rounded-full leading-none">
				<span class="font-bold text-slate-900 dark:text-white text-sm">Rate Me</span>
				<Sparkles class="w-4 h-4 text-amber-400" />
			</div>
		</button>
		
		<span class="text-sm font-medium text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
			View feedback
		</span>
	</div>
</div>

<!-- Rate Me Modal -->
{#if showModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onclick={() => showModal = false}>
		<div class="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#222] p-8 rounded-3xl w-full max-w-md relative" onclick={(e) => e.stopPropagation()}>
			<button onclick={() => { showModal = false; submittedSuccess = false; }} class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
				<X class="w-5 h-5" />
			</button>
			
			{#if submittedSuccess}
				<div class="text-center py-8 animate-in zoom-in duration-300">
					<div class="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
						<Check class="w-8 h-8" strokeWidth={3} />
					</div>
					<h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Thank You!</h3>
					<p class="text-slate-500 dark:text-slate-400">Your feedback has been submitted and is waiting for approval.</p>
				</div>
			{:else}
				<h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Leave Feedback</h3>
				
				<form onsubmit={submitRating} class="flex flex-col gap-4">
				<div>
					<label class="block text-sm font-medium text-slate-400 mb-1" for="email">Email</label>
					<input id="email" type="email" bind:value={newEmail} required class="w-full bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500" placeholder="example@gmail.com" />
				</div>
				<div>
					<span class="block text-sm font-medium text-slate-400 mb-2">Rating</span>
					<div class="flex items-center gap-2">
						{#each [1, 2, 3, 4, 5] as star}
							<button 
								type="button" 
								aria-label="Rate {star} stars"
								class="focus:outline-none transition-transform hover:scale-110 active:scale-95"
								onmouseenter={() => hoverRating = star}
								onmouseleave={() => hoverRating = 0}
								onclick={() => newRating = star}
							>
								<svg 
									class="w-9 h-9 transition-colors duration-200 {star <= (hoverRating || newRating) ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-slate-300 dark:text-slate-700'}" 
									viewBox="0 0 24 24" 
									stroke="currentColor" 
									stroke-width="1.5" 
									stroke-linejoin="round"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
							</button>
						{/each}
					</div>
				</div>
				<div>
					<label class="block text-sm font-medium text-slate-400 mb-1" for="content">Comment</label>
					<textarea id="content" bind:value={newContent} required rows="3" class="w-full bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500" placeholder="Great working with you!"></textarea>
				</div>
				
				<button type="submit" disabled={submitting} class="mt-4 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50">
					{submitting ? 'Submitting...' : 'Submit Rating'}
				</button>
			</form>
			{/if}
		</div>
	</div>
{/if}

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
