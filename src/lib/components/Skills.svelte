<script lang="ts">
	import { fade } from 'svelte/transition';
	
	const skills = [
		{ name: 'HTML', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
		{ name: 'CSS', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
		{ name: 'TailwindCSS', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
		{ name: 'Bootstrap', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
		{ name: 'JavaScript', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
		{ name: 'TypeScript', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
		{ name: 'React', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
		{ name: 'React Native', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
		{ name: 'Expo', image: 'https://cdn.simpleicons.org/expo/000020', invertDark: true },
		{ name: 'Flutter', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
		{ name: 'PHP', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
		{ name: 'Node.js', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
		{ name: 'Bun', image: 'https://cdn.simpleicons.org/bun/000000', invertDark: true },
		{ name: 'Hono', image: 'https://cdn.simpleicons.org/hono/E36002' },
		{ name: 'Express', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invertDark: true },
		{ name: 'Flask', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg', invertDark: true },
		{ name: 'FastAPI', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
		{ name: 'Python', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
		{ name: 'Google Colab', image: 'https://cdn.simpleicons.org/googlecolab/F9AB00' },
		{ name: 'MongoDB', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
		{ name: 'MySQL', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
		{ name: 'SQLite', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
		{ name: 'Neon', image: 'https://cdn.simpleicons.org/neon/00E599' },
		{ name: 'Drizzle', image: 'https://cdn.simpleicons.org/drizzle/C5F74F' },
		{ name: 'Prisma', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg', invertDark: true },
		{ name: 'Postman', image: 'https://cdn.simpleicons.org/postman/FF6C37' },
		{ name: 'Cloudinary', image: 'https://cdn.simpleicons.org/cloudinary/3448C5' },
		{ name: 'Podman', image: 'https://cdn.simpleicons.org/podman/892CA0' },
		{ name: 'Figma', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
		{ name: 'Arduino', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg' },
		{ name: 'Supabase', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
		{ name: 'GitHub', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invertDark: true },
	];
</script>

<div class="mb-12 pt-12 sm:pt-16 mt-4">
	<h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Skills</h2>
	
	<div class="flex flex-wrap gap-2.5 sm:gap-3">
		{#each skills as skill}
			<div 
				class="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-50 dark:bg-[#151515] hover:bg-slate-100 dark:hover:bg-[#1f1f1f] border border-slate-200 dark:border-[#2a2a2a] rounded-full text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 transition-colors duration-300 cursor-default shadow-sm"
			>
				<img src={skill.image} alt={skill.name} class="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain {skill.invertDark ? 'dark:invert opacity-90' : ''}" />
				{skill.name}
			</div>
		{/each}
	</div>
</div>
