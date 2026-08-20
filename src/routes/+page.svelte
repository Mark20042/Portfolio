<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import About from '$lib/components/About.svelte';
	import Education from '$lib/components/Education.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Achievements from '$lib/components/Achievements.svelte';
	import Reveal from '$lib/components/Reveal.svelte';
	import Game from '$lib/components/Game.svelte';
	import GithubContributions from '$lib/components/GithubContributions.svelte';
</script>

<div class="flex flex-col">
	<Hero />

	<Reveal delay={80}><About /></Reveal>
	<Reveal delay={140}><Skills /></Reveal>
	<Reveal delay={260}><Projects /></Reveal>
	<Reveal delay={280}><Game /></Reveal>
	<Reveal delay={200}><Education /></Reveal>
	<Reveal delay={320}><Achievements /></Reveal>
	<Reveal delay={320}><GithubContributions /></Reveal>
</div>
