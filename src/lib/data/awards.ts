import sumobot from '$lib/images/projects/sumobot.webp';
import webDevelopmentChampion from '../../routes/projects/webdevelopmentchampion.jpg';

export interface AwardItem {
	id: string;
	/** Matching project in projectsData, used to avoid duplicating the homepage feature. */
	projectId?: number;
	title: string;
	award: string;
	event: string;
	/** Use YYYY-MM-DD so entries sort chronologically. */
	date: string;
	description: string;
	image: string;
	imageAlt: string;
	/** Import a certificate image and assign it here when available. */
	certificateImage?: string;
	/** Direct video file URL, e.g. /videos/sumobot.mp4 from the static folder. */
	videoSrc?: string;
	/** Optional WebVTT captions for spoken audio. */
	videoCaptionsSrc?: string;
	/** External video page (YouTube, Vimeo, etc.), shown as a link. */
	videoLink?: string;
	githubLink?: string;
	liveDemoLink?: string;
	techStack: string[];
}

// Add more entries here. The homepage displays them newest first automatically.
export const awardsData: AwardItem[] = [
	{
		id: 'web-development-champion-2026',
		title: 'Adaptive Web Experience System',
		award: 'Champion — Web Development',
		event: 'Web Development Culminating Activity 2026',
		date: '2026-10-20',
		description:
			'I independently developed and coded the Adaptive Web Experience System from scratch for the Sypher Creative Solutions case study: Building an Adaptive Website for Diverse User Devices. We presented the project as a team. The project adapts its visual complexity across High, Medium, and Basic performance modes, with a device-performance dashboard, manual mode selection, responsive layouts, and reduced-motion accessibility. After a tie, I won the debugging tiebreaker to secure the championship.',
		image: webDevelopmentChampion,
		imageAlt: 'Web Development Culminating Activity 2026 championship recognition',
		liveDemoLink: 'https://ccs-4a.tech',
		githubLink: 'https://github.com/Pang-malakasan/ccs-4a',
		techStack: [
			'SvelteKit',
			'Tailwind CSS',
			'TypeScript',
			'Framer Motion',
			'GSAP',
			'Cloudinary',
			'UI/UX Design',
			'Responsive Design',
			'Adaptive Performance',
			'Accessibility'
		]
	},
	{
		id: 'sumobot-2024',
		projectId: 10,
		title: 'Sumobot',
		award: 'Creative Visionary Award',
		event: 'InnovaTech Nexus',
		date: '2024-01-25',
		description:
			'An autonomous, sensor-driven Sumobot built for the InnovaTech Nexus robotics exhibition. Designed to detect and push opponents out of a ring, it received the Creative Visionary Award in recognition of its standout robot design.',
		image: sumobot,
		imageAlt: 'Sumobot robot built for the InnovaTech Nexus robotics exhibition',
		techStack: ['Arduino', 'C++', 'Ultrasonic Sensors', 'Motor Driver', 'Robotics']
	}
];
