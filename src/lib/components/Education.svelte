<script lang="ts">
	import crmcImg from '$lib/images/schools/crmc.png';
	import cbshsImg from '$lib/images/schools/cbshs.png';
	import mnhsImg from '$lib/images/schools/mnhs.jpg';
	import ansImg from '$lib/images/schools/ans.png';

	const educationList = [
		{
			school: 'Cebu Roosevelt Memorial Colleges',
			degree: 'Bachelor of Science in Information Technology (BSIT)',
			years: '2023 - Present',
			image: crmcImg
		},
		{
			school: 'City of Bogo Senior High School',
			degree: 'Senior High School Diploma',
			years: '2021 - 2023',
			image: cbshsImg
		},
		{
			school: 'Mactan National High School',
			degree: 'Junior High School (Grades 8-10)',
			years: '2018 - 2021',
			image: mnhsImg
		},
		{
			school: 'Abellana National School',
			degree: 'Junior High School (Grade 7)',
			years: '2017 - 2018',
			image: ansImg
		}
	];
</script>

<div class="mb-12 pt-8 sm:pt-12">
	<h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Education</h2>
	
	<div class="flex flex-col gap-6 sm:gap-8">
		{#each educationList as edu}
			<div class="flex items-center justify-between group">
				<div class="flex items-center gap-4">
					<div class="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-slate-200 dark:border-[#2a2a2a] bg-slate-50 dark:bg-[#151515] shadow-sm flex shrink-0 items-center justify-center overflow-hidden transition-all duration-500 ease-out group-hover:scale-105 group-hover:border-sky-500/30 group-hover:shadow-md dark:group-hover:shadow-[0_0_15px_rgba(236,72,153,0.1)]">
						<img src={edu.image} alt={edu.school} width="48" height="48" loading="lazy" decoding="async" class="w-[85%] h-[85%] object-contain rounded-full transition-transform duration-500 group-hover:scale-110" />
					</div>
					<div class="flex flex-col gap-0.5">
						<h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300 group-hover:text-sky-500 dark:group-hover:text-sky-400">{edu.school}</h3>
						<p class="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">{edu.degree}</p>
					</div>
				</div>
				<div class="text-xs sm:text-sm font-medium text-slate-400 dark:text-slate-600 tracking-wide ml-4 whitespace-nowrap">
					{edu.years}
				</div>
			</div>
		{/each}
	</div>
</div>
