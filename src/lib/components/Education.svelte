<script lang="ts">
	import crmcImg from '$lib/images/schools/crmc.webp';
	import cbshsImg from '$lib/images/schools/cbshs.webp';
	import mnhsImg from '$lib/images/schools/mnhs.webp';
	import ansImg from '$lib/images/schools/ans.webp';

	const educationList = [
		{
			school: 'Cebu Roosevelt Memorial Colleges',
			degree: 'Bachelor of Science in Information Technology ',
			years: '2023 - Present',
			image: crmcImg
		},
		{
			school: 'City of Bogo Senior High School',
			degree: 'Senior High School',
			years: '2021 - 2023',
			image: cbshsImg
		},
		{
			school: 'Mactan National High School',
			degree: 'Junior High School ',
			years: '2018 - 2021',
			image: mnhsImg
		},
		{
			school: 'Abellana National School',
			degree: 'Junior High School ',
			years: '2017 - 2018',
			image: ansImg
		}
	];
</script>

<div class="mb-12 pt-8 sm:pt-12">
	<h2 class="mb-6 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
		Education
	</h2>

	<div class="flex flex-col gap-6 sm:gap-8">
		{#each educationList as edu}
			<div class="group flex items-center justify-between">
				<div class="flex items-center gap-4">
					<div
						class="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50 shadow-sm transition-all duration-500 ease-out group-hover:scale-105 group-hover:border-sky-500/30 group-hover:shadow-md sm:h-14 sm:w-14 dark:border-[#2a2a2a] dark:bg-[#151515] dark:group-hover:shadow-[0_0_15px_rgba(236,72,153,0.1)]"
					>
						<img
							src={edu.image}
							alt={edu.school}
							width="48"
							height="48"
							loading="lazy"
							decoding="async"
							class="h-[85%] w-[85%] rounded-full object-contain transition-transform duration-500 group-hover:scale-110"
						/>
					</div>
					<div class="flex flex-col gap-0.5">
						<h3
							class="text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-sky-500 sm:text-lg dark:text-slate-100 dark:group-hover:text-sky-400"
						>
							{edu.school}
						</h3>
						<p class="text-sm font-medium text-slate-600 sm:text-base dark:text-slate-400">
							{edu.degree}
						</p>
					</div>
				</div>
				<div
					class="ml-4 text-xs font-medium tracking-wide whitespace-nowrap text-slate-400 sm:text-sm dark:text-slate-600"
				>
					{edu.years}
				</div>
			</div>
		{/each}
	</div>
</div>
