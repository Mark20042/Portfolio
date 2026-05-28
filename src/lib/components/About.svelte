<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
<section in:fly={{ y: 50, duration: 1500, delay: 600, easing: cubicOut }} class="mt-8 space-y-6">
	<h2 class="text-2xl font-bold text-slate-900 dark:text-white">About</h2>
	<div class="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
		<p>
			I'm a Bachelor of Science in Information Technology student at Cebu Roosevelt Memorial Colleges who has been actively working on commission-based projects and business-driven applications alongside my studies. Through building web and mobile solutions for real clients, I've gained hands-on experience turning ideas and requirements into production-ready products.
		</p>
		<p>
			I enjoy working closely with clients to understand their goals, translate business needs into technical solutions, and deliver reliable, maintainable software. My focus is on combining strong technical skills with practical business thinking, continuous learning, and real-world impact.
		</p>
		<p>
			I'm currently open to freelance opportunities where I can help individuals and businesses build their digital presence and custom tools.
		</p>
	</div>
</section>
{/if}
