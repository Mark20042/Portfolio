<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import About from '$lib/components/About.svelte';
	import Education from '$lib/components/Education.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Achievements from '$lib/components/Achievements.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
</script>

<div class="flex flex-col">
	<Hero />
	
	<About />
	<Skills />
	<Education />
	<Projects />
	<Achievements />
	<Testimonials />
</div>
