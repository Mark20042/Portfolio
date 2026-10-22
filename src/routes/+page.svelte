<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Education from '$lib/components/Education.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Achievements from '$lib/components/Achievements.svelte';
	import Game from '$lib/components/Game.svelte';
	import Reveal from '$lib/components/Reveal.svelte';
</script>

<div class="mx-auto flex w-full max-w-[960px] min-w-0 flex-col gap-28 sm:gap-40 lg:gap-96">
	<Hero />

	<Reveal delay={80}><About /></Reveal>
	<Reveal delay={120}><Education /></Reveal>
	<Reveal delay={200}><Projects /></Reveal>
	<Reveal delay={260}><Game /></Reveal>
	<Reveal delay={320}><Achievements /></Reveal>
</div>
