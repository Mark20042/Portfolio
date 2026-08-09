import gradsync from '$lib/images/projects/gradsync.png';
import gradsyncanalyticslanding from '$lib/images/projects/gradsyncanalyticslanding.jpg';
import gradsyncjobseekerdashboard from '$lib/images/projects/gradsyncjobseekerdashboard.jpg';
import gradsyncaijobseeker from '$lib/images/projects/gradsyncaijobseeker.png';
import gradsyncjobseekerjobdetails from '$lib/images/projects/gradsyncjobseekerjobdetails.png';
import gradsyncjobseekermessages from '$lib/images/projects/gradsyncjobseekermessages.png';
import gradsyncjobseekerresume from '$lib/images/projects/gradsyncjobseekerresume.png';
import gradsyncjobseekerskills from '$lib/images/projects/gradsyncjobseekerskills.png';
import kapesaamigo from '$lib/images/projects/kapesaamigo.webp';
import ravex from '$lib/images/projects/ravex.webp';
import vortex from '$lib/images/projects/vortex.webp';
import linetracing from '$lib/images/projects/linetracing.webp';
import sumobot from '$lib/images/projects/sumobot.webp';
import vox from '$lib/images/projects/vox.webp';
import vox1 from '$lib/images/projects/vox1.webp';
import vox2 from '$lib/images/projects/vox2.webp';
import vox3 from '$lib/images/projects/vox3.webp';
import linog from '$lib/images/projects/linog.webp';
import linog1 from '$lib/images/projects/linog1.webp';
import linog2 from '$lib/images/projects/linog2.webp';
import rice from '$lib/images/projects/riceleafdiseasedetection.png';
import rice1 from '$lib/images/projects/riceleafdiseasedetection1.png';
import rice2 from '$lib/images/projects/riceleafdiseasedetection2.png';
import applytrack from '$lib/images/projects/applytrack.png';
import applytrack0 from '$lib/images/projects/applytrack0.png';
import applytrack1 from '$lib/images/projects/applytrack1.png';
import applytrack2 from '$lib/images/projects/applytrack2.png';

export interface ProjectItem {
	id: number;
	title: string;
	category: string;
	description: string;
	image: string;
	images: string[];
	techStack: string[];
	githubLink?: string;
	liveDemoLink?: string;
	featured?: boolean; // Controls if this project appears on the homepage
}

export const projectsData: ProjectItem[] = [
	{
		id: 1,
		title: 'Philippines Linog Tracker',
		category: 'Web App',
		description:
			'Built in response to a significant earthquake that struck Bogo City, when many residents were urgently searching for reliable information on seismic events — particularly aftershocks. This dynamic earthquake tracking dashboard for the Philippines, built with Vue.js, utilizes web scraping to fetch real-time data from PHIVOLCS and visualizes seismic events on an interactive map using Leaflet and OpenStreetMap markers. Features include a filterable sidebar list of recent earthquakes showing magnitude, location, date, and depth, along with a summary panel displaying statistical totals for the day, week, and month.',
		image: linog1,
		images: [linog, linog1, linog2],
		techStack: ['Vue.js', 'Web Scraping', 'Leaflet', 'OpenStreetMap', 'CSS'],
		githubLink: 'https://github.com/Mark20042/linog-tracker',
		liveDemoLink: 'https://linogtrackerazoredev.vercel.app/',
		featured: true
	},
	{
		id: 2,
		title: 'Rice Leaf Disease Detection',
		category: 'AI / Web App',
		description:
			'Built for rice farmers who need a fast answer when something looks wrong in the field, without waiting on an agricultural technician. A deep learning image classifier trained on rice leaf photos identifies eight conditions — Bacterial Leaf Blight, Brown Spot, Leaf Blast, Leaf Scald, Narrow Brown Leaf Spot, Sheath Blight, Rice Hispa infestation, and Healthy Rice Leaf — and is served through a FastAPI backend. The React interface lets a farmer upload or snap a photo of a leaf and instantly see the diagnosis with a confidence score, a prediction confidence breakdown across every class, and actionable agricultural guidance covering what the disease is, how to prevent it, and which treatments to apply.',
		image: rice1,
		images: [rice, rice1, rice2],
		techStack: ['React', 'Deep Learning', 'FastAPI', 'Python', 'TensorFlow', 'CSS'],
		githubLink: undefined,
		liveDemoLink: 'https://rice-leaf-disease-detection-ten.vercel.app/',
		featured: true
	},
	{
		id: 3,
		title: 'VOX - AI Voice Assistant',
		category: 'AI Platform',
		description:
			'A modern, AI-powered voice assistant combining a robust Python FastAPI backend with an immersive React and Three.js frontend. This system features real-time speech recognition, text-to-speech, and WebSocket-based communication wrapped in a beautiful 3D animated UI. Capabilities include document processing (PDF, DOCX, Excel) and advanced voice automation to instantly play YouTube videos or query Wikipedia.',
		image: vox3,
		images: [vox, vox1, vox2, vox3],
		techStack: ['React', 'Three.js', 'Python', 'FastAPI', 'WebSockets', 'NLP'],
		githubLink: undefined,
		liveDemoLink: undefined,
		featured: false
	},
	{
		id: 4,
		title: 'GradSync',
		category: 'Career Platform',
		description:
			'My capstone thesis — a premium, AI-powered career development ecosystem built to bridge the gap between graduates and employers. Features include automated document OCR for transcript and business permit verification (Tesseract.js), an interactive AI mock interview room with real-time speech evaluation powered by Gemini API and Deepgram for speech-to-text and text-to-speech, a 24/7 AI generator for assessments and mock interviews questions, a dynamic resume builder with automated PDF generation, AI-calculated job suitability scores for smart matching between candidates and job postings, verified skill badges and certificates earned through standardized assessments and mock interviews, and role-based dashboards for job seekers, employers, and administrators. Real-time communication is handled via Socket.io, with Heroku Workers orchestrating automated AI generation pipelines, Mailtrap for email delivery, and Web Push Notifications for real-time alerts.',
		image: gradsync,
		images: [
			gradsync,
			gradsyncanalyticslanding,
			gradsyncjobseekerdashboard,
			gradsyncaijobseeker,
			gradsyncjobseekerjobdetails,
			gradsyncjobseekermessages,
			gradsyncjobseekerresume,
			gradsyncjobseekerskills
		],
		techStack: [
			'React 19',
			'Vite',
			'Tailwind CSS',
			'Framer Motion',
			'GSAP',
			'Node.js',
			'Express',
			'TypeScript',
			'MongoDB',
			'Mongoose',
			'JWT',
			'Socket.io',
			'Gemini API',
			'Deepgram',
			'Heroku Workers',
			'Tesseract.js (OCR)',
			'Mailtrap',
			'Web Push Notifications',
			'Pdfx',
			'PDF-Parse',
			'REST API'
		],
		githubLink: 'https://github.com/Mark20042/GradSync',
		liveDemoLink: 'https://gradsync.tech/',
		featured: true
	},
	{
		id: 5,
		title: 'ApplyTrack',
		category: 'Web App',
		description:
			'My first full-stack project deployed to production, built while learning full stack development. ApplyTrack is a job application tracker for anyone tired of losing their search inside a messy spreadsheet. Built on the MERN stack with a React frontend on Vercel and an Express and MongoDB backend on Render, it wraps the familiarity of an Excel sheet in a proper dashboard. I architected the backend around the MVC pattern, separating Mongoose models, route controllers, and views so the codebase stayed navigable as features grew, and rather than reaching for an off-the-shelf auth provider I wrote my own JWT-based authentication from scratch — learning token signing, verification, and protected route middleware on the server, then passing the token through to the frontend to persist sessions and guard the dashboard. On top of that sits full CRUD over applications and an overview panel surfacing total applications, success rate, and offers received. A pipeline view breaks every application down by status — Pending, Interview, Offer, Accepted, Declined, and Ghosted — alongside a distribution chart and an activity graph so progress over time is visible at a glance.',
		image: applytrack,
		images: [applytrack, applytrack0, applytrack1, applytrack2],
		techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'MVC', 'JWT Auth', 'JavaScript', 'Vercel', 'Render'],
		githubLink: 'https://github.com/Mark20042/apply-track',
		liveDemoLink: 'https://apply-track-peach.vercel.app/',
		featured: true
	},
	{
		id: 6,
		title: 'Ravex (Django Car Marketplace)',
		category: 'Marketplace',
		description:
			'A complete buy-and-sell platform for vehicles, built entirely with Django. Ravex allows users to create accounts, list cars for sale with detailed specifications, and browse or search for vehicles using advanced filtering.',
		image: ravex,
		images: [ravex],
		techStack: ['Django', 'Python', 'SQLite', 'JavaScript', 'Bootstrap', 'HTML/CSS'],
		githubLink: undefined,
		liveDemoLink: undefined,
		featured: false
	},
	{
		id: 7,
		title: 'Kape Sa Amigo (Coffee Shop Website)',
		category: 'Business Website',
		description:
			"A full-featured website for a local coffee shop, 'Kape Sa Amigo.' The site features an elegant landing page, a menu showcase, and an integrated table reservation system. The backend is powered by PHP with PDO for secure database connections and includes PayPal integration for online orders or payments.",
		image: kapesaamigo,
		images: [kapesaamigo],
		techStack: ['PHP', 'PDO', 'PayPal', 'JavaScript', 'HTML/CSS'],
		githubLink: undefined,
		liveDemoLink: undefined,
		featured: false
	},
	{
		id: 8,
		title: 'Arduino Line-Tracing Robot',
		category: 'Robotics',
		description:
			'An autonomous line-following robot built with an Arduino. It uses IR sensors to detect and follow a black line on a white surface, adjusting its motors in real-time to navigate the course. This project demonstrates core concepts in sensor integration, motor control, and embedded C++ programming.',
		image: linetracing,
		images: [linetracing],
		techStack: ['Arduino', 'C++', 'IR Sensors', 'Motor Driver', 'Robotics'],
		githubLink: undefined,
		liveDemoLink: undefined,
		featured: false
	},
	{
		id: 9,
		title: 'Sumobot (Creative Visionary Award)',
		category: 'Robotics',
		description:
			"An autonomous, sensor-driven Sumobot built for the 'InnovaTech Nexus' robotics exhibition. Designed to detect and push opponents out of a ring, this robot won the 'Creative Visionary Award' for its exceptional innovation and practical application of robotics principles.",
		image: sumobot,
		images: [sumobot],
		techStack: ['Arduino', 'C++', 'Ultrasonic Sensors', 'Motor Driver', 'Robotics'],
		githubLink: undefined,
		liveDemoLink: undefined,
		featured: true
	},
	{
		id: 10,
		title: 'Vortex Vermillion (Esports Static Website)',
		category: 'Static Website',
		description:
			"A meticulously designed static website for the 'Vortex Vermillion' esports team, showcasing a clean, modern aesthetic with sharp visuals and responsive layouts built entirely with HTML and CSS. Features include team rosters, upcoming matches, news sections, and a dynamic hero banner.",
		image: vortex,
		images: [vortex],
		techStack: ['HTML', 'CSS', 'Responsive Design', 'Web Design'],
		githubLink: undefined,
		liveDemoLink: undefined
	}
];
