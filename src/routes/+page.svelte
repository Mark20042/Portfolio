<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Education from '$lib/components/Education.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Achievements from '$lib/components/Achievements.svelte';
	import Game from '$lib/components/Game.svelte';
	import Reveal from '$lib/components/Reveal.svelte';
</script>

<div class="flex w-full min-w-0 flex-col">
	<Hero />

	<div
		class="mx-auto mt-24 flex w-full max-w-[960px] min-w-0 flex-col gap-28 px-4 sm:mt-36 sm:gap-40 sm:px-6 lg:gap-64"
	>
		<Reveal delay={80}><About /></Reveal>
		<Reveal delay={120}><Education /></Reveal>
		<Reveal delay={200}><Projects /></Reveal>
		<Reveal delay={260}><Game /></Reveal>
		<Reveal delay={320}><Achievements /></Reveal>
	</div>
</div>
