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
import studentdropout_welcome from '$lib/images/projects/studentdropout_welcome.png';
import studentdropout_predict from '$lib/images/projects/studentdropout_predict.png';
import studentdropout_prediction from '$lib/images/projects/studentdropout_prediction.png';
import studentdropout_medium from '$lib/images/projects/studentdropout_medium.png';

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
			'It was designed when there was a big earthquake in Bogo City and many people needed therever to quickly find an information source concerning earthquakes, especially aftershocks. Vue.js application to track earthquake movements in the Philippines using an interactive map with Leaflet and marker from OpenStreetMap, with real-time data via web scraping PHIVOLCS dashboard. It includes a sidebar list of recent earthquakes (with magnitude, location, date and depth facets), and a summary panel with statistics for the day and week, as well as for the month.',
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
			'Designed to give rice growers a quick response when they suspect an issue in the crop, rather than waiting for the agricultural expert. The AI image classification model, trained using the images of rice leaves, classifies eight rice conditions: Bacterial Leaf Blight, Brown Spot, Leaf Blast, Leaf Scald, Narrow Brown Leaf Spot, Sheath Blight, Rice Hispa infestation, and Healthy Rice Leaf, and is served using a FastAPI backend. The React interface allows a farmer to upload or take a picture of a leaf and would get instant feedback; a diagnosis with a confidence score, confidence breakdown for prediction for all classes and actionable Agriculture advice – on what the disease is, how to prevent it, which treatments to use.',
		image: rice1,
		images: [rice, rice1, rice2],
		techStack: ['React', 'Deep Learning', 'FastAPI', 'Python', 'TensorFlow', 'CSS', 'Scikit-Learn', 'Numpy', 'Pandas'],
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
			'My thesis, a high-end career development ecosystem based on AI technologies that closes the gap between graduate and employer. It includes an automated document OCR feature for transcript and business permit verification (using Tesseract.js); it includes an interactive AI mock interview option with real time evaluation of speech by the AI (including theGemini API, for converting speech to text and Deepgram for generating audible responses via speech to text); it has a 24/7 AI generated assessment, and mock interview questions; it has a dynamic resume builder with automated PDF generation; a job suitability score calculated by the AI, automating the smart matching between job seekers and job posts; it is now incorporating verified skill badges and certificates earned from standardized assessments and mock interviews; and a role-based dashboard for both job seekers and employer and admin users. Real-time communication is supported through Socket.io, automated pipelines for AI generation with Heroku Workers, email delivery with Mailtrap, and real-time alerting with Web Push Notifications.',
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
			'My first fully implemented full stack project that ended up in production while learning full stack. ApplyTrack is a software for anyone who has ever had trouble finding a job in an unorganized spreadsheet application. Made with MERN, React as the front end, serving an Express and MongoDB server on Render which enclose an excel sheet, but correctly into a dashboard. I implemented the handlers and controllers that handle each route; separated Mongoose models, route controllers, and views to make codebase easy to navigate as features were added on; used an off-the-shelf token signing service (JWT) to ensure the receiving application on the server has it, and create a protected route middleware that filters it and only allows the subscribed user to access the dashboard; and instead of using an off-the-shelf provider for authentication, I built my own JWT-based sign and verify authentication system from scratch, which I passed through the session handling procedure to the front. On top of that is full CRUD atop applications and a summary panel being thrown which has the total number of applications, success rate and offers received. A pipeline view filters all of your applications by status – Pending, Interview, Offer, Accepted, Declined and Ghosted – and provides you a distribution chart and an activity graph for viewing application progression by time.',
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
		title: 'AI Student Dropout Predictor',
		category: 'AI / Web App',
		description:
			'An intelligent, machine learning-powered web application designed to assess and predict student dropout risks based on academic, lifestyle, and demographic factors. It features a modern, interactive React frontend and a fast API backend. The system provides real-time percentage predictions and visually distinct risk levels Low, Medium, High alongside actionable, AI-recommended interventions tailored to the student\'s specific risk category. Powered by a pre-trained Logistic Regression model served via FastAPI.',
		image: studentdropout_predict,
		images: [studentdropout_welcome, studentdropout_predict, studentdropout_prediction, studentdropout_medium],
		techStack: ['React 19', 'Vite', 'FastAPI', 'Python 3', 'Scikit-Learn', 'Bootstrap 5', 'Lottie-Web'],
		githubLink: 'https://github.com/Mark20042/Student_Dropout_Prediction',
		liveDemoLink: 'https://student-dropout-prediction-xi.vercel.app',
		featured: true
	},
	{
		id: 10,
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
		id: 11,
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
