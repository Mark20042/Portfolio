<script lang="ts">
	import { page } from '$app/stores';

	let { isDark, toggleTheme } = $props();

	let currentPath = $derived($page.url.pathname);
</script>

<div class="fixed bottom-4 sm:bottom-8 w-full flex justify-center z-[100] pointer-events-none">
	<nav class="pointer-events-auto hide-scrollbar flex items-center gap-2 sm:gap-4 md:gap-6 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-black/50 rounded-full transition-all duration-500 ease-out overflow-x-auto max-w-[95vw]">
		
		<!-- Home Icon -->
		<div class="relative group flex justify-center">
			<a href="/" class="p-2 rounded-full transition-all duration-300 hover:scale-125 hover:-translate-y-1 {currentPath === '/' ? 'text-black dark:text-white bg-slate-100 dark:bg-slate-800 shadow-inner' : 'text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white'}" aria-label="Home">
				<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
			</a>
			<span class="absolute -top-12 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-xl whitespace-nowrap">Home</span>
		</div>

		<!-- Projects Icon -->
		<div class="relative group flex justify-center">
			<a href="/projects" class="p-2 rounded-full transition-all duration-300 hover:scale-125 hover:-translate-y-1 {currentPath.startsWith('/projects') ? 'text-black dark:text-white bg-slate-100 dark:bg-slate-800 shadow-inner' : 'text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white'}" aria-label="Projects">
				<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
			</a>
			<span class="absolute -top-12 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-xl whitespace-nowrap">Projects</span>
		</div>

		<!-- Certificates Icon -->
		<div class="relative group flex justify-center">
			<a href="/certificates" class="p-2 rounded-full transition-all duration-300 hover:scale-125 hover:-translate-y-1 {currentPath.startsWith('/certificates') ? 'text-black dark:text-white bg-slate-100 dark:bg-slate-800 shadow-inner' : 'text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white'}" aria-label="Certificates">
				<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
			</a>
			<span class="absolute -top-12 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-xl whitespace-nowrap">Certificates</span>
		</div>

		<!-- Image/Gallery Icon -->
		<div class="relative group flex justify-center">
			<a href="/gallery" class="p-2 rounded-full transition-all duration-300 hover:scale-125 hover:-translate-y-1 {currentPath.startsWith('/gallery') ? 'text-black dark:text-white bg-slate-100 dark:bg-slate-800 shadow-inner' : 'text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white'}" aria-label="Gallery">
				<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
			</a>
			<span class="absolute -top-12 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-xl whitespace-nowrap">Gallery</span>
		</div>

		<div class="hidden md:block w-px h-6 bg-slate-200 dark:bg-slate-700"></div>

		<!-- GitHub Icon -->
		<div class="hidden md:flex relative group justify-center">
			<a href="https://github.com/Mark20042" target="_blank" rel="noopener noreferrer" class="p-2 text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white rounded-full transition-all duration-300 hover:scale-125 hover:-translate-y-1" aria-label="GitHub">
				<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
			</a>
			<span class="absolute -top-12 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-xl whitespace-nowrap">GitHub</span>
		</div>

		<!-- LinkedIn Icon -->
		<div class="hidden md:flex relative group justify-center">
			<a href="https://www.linkedin.com/in/mark-joseph-potot-b0a471369" target="_blank" rel="noopener noreferrer" class="p-2 text-slate-600 hover:text-[#0A66C2] dark:text-slate-400 rounded-full transition-all duration-300 hover:scale-125 hover:-translate-y-1" aria-label="LinkedIn">
				<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
			</a>
			<span class="absolute -top-12 px-3 py-1.5 bg-[#0A66C2] text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-xl whitespace-nowrap">LinkedIn</span>
		</div>

		<!-- Facebook Icon -->
		<div class="hidden md:flex relative group justify-center">
			<a href="https://www.facebook.com/makoyjoseph.minor/" target="_blank" rel="noopener noreferrer" class="p-2 text-slate-600 hover:text-[#1877F2] dark:text-slate-400 rounded-full transition-all duration-300 hover:scale-125 hover:-translate-y-1" aria-label="Facebook">
				<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
			</a>
			<span class="absolute -top-12 px-3 py-1.5 bg-[#1877F2] text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-xl whitespace-nowrap">Facebook</span>
		</div>

		<!-- Instagram Icon -->
		<div class="hidden md:flex relative group justify-center">
			<a href="https://www.instagram.com/azorezxc/" target="_blank" rel="noopener noreferrer" class="p-2 text-slate-600 hover:text-[#E4405F] dark:text-slate-400 rounded-full transition-all duration-300 hover:scale-125 hover:-translate-y-1" aria-label="Instagram">
				<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5.838a4.162 4.162 0 1 0 0 8.324 4.162 4.162 0 0 0 0-8.324zm0 6.838a2.676 2.676 0 1 1 0-5.352 2.676 2.676 0 0 1 0 5.352zm5.338-7.662a.996.996 0 1 0-.001 1.992.996.996 0 0 0 .001-1.992z"></path></svg>
			</a>
			<span class="absolute -top-12 px-3 py-1.5 bg-gradient-to-tr from-[#FD1D1D] via-[#E4405F] to-[#F56040] text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-xl whitespace-nowrap">Instagram</span>
		</div>
		
		<div class="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>

		<!-- Theme Toggle Icon -->
		<div class="relative group flex justify-center shrink-0">
			<button onclick={toggleTheme} class="p-2 text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white rounded-full transition-all duration-300 hover:scale-125 hover:-translate-y-1" aria-label="Toggle Theme">
				{#if isDark}
					<!-- Sun icon for dark mode (click to light) -->
					<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
				{:else}
					<!-- Moon icon for light mode (click to dark) -->
					<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
				{/if}
			</button>
			<span class="absolute -top-12 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-xl whitespace-nowrap">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
		</div>
	</nav>
</div>

<style>
	.hide-scrollbar {
		-ms-overflow-style: none;  /* IE and Edge */
		scrollbar-width: none;  /* Firefox */
	}
	.hide-scrollbar::-webkit-scrollbar {
		display: none; /* Chrome, Safari and Opera */
	}
</style>
