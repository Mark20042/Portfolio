<script lang="ts">
	let { isDark, toggleTheme }: { isDark: boolean; toggleTheme: (event: MouseEvent) => void } =
		$props();
</script>

<button
	type="button"
	role="switch"
	aria-checked={isDark}
	aria-label="Dark mode"
	onclick={toggleTheme}
	class="group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full text-xs font-semibold text-slate-600 outline-offset-4 hover:text-sky-600 focus-visible:outline-2 focus-visible:outline-sky-500 dark:text-slate-300 dark:hover:text-slate-100"
>
	<span
		aria-hidden="true"
		class="relative block h-7 w-12 rounded-full border border-slate-300 bg-slate-200 p-0.5 shadow-inner group-hover:border-sky-400 dark:border-slate-600 dark:bg-slate-700 dark:group-hover:border-slate-400"
	>
		<span
			class="flex h-5 w-5 items-center justify-center rounded-full bg-white text-amber-500 shadow-sm dark:translate-x-5 dark:text-indigo-600"
		>
			{#if isDark}
				<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
					><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" /></svg
				>
			{:else}
				<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
					><circle cx="12" cy="12" r="4" /><path
						d="M11 1h2v3h-2zm0 19h2v3h-2zM1 11h3v2H1zm19 0h3v2h-3zM3.5 4.9 4.9 3.5l2.1 2.1-1.4 1.4zm13.5 13.5 1.4-1.4 2.1 2.1-1.4 1.4zM3.5 19.1 5.6 17l1.4 1.4-2.1 2.1zM17 5.6l2.1-2.1 1.4 1.4L18.4 7z"
					/></svg
				>
			{/if}
		</span>
	</span>
	<span aria-hidden="true">{isDark ? 'Night' : 'Day'}</span>
</button>
