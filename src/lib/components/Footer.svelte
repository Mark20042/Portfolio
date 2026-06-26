<script lang="ts">
	import skyline from '$lib/images/footer-skyline.webp';
</script>

<footer class="w-full relative flex flex-col items-center -mt-40 sm:-mt-80 z-0">
	
	
	<!-- Skyline Image -->
	<img 
		src={skyline} 
		alt="City Skyline" 
		width="1920" height="300" loading="lazy" decoding="async"
		class="w-full h-auto opacity-90 dark:opacity-70 pointer-events-none select-none" 
	/>
</footer>
