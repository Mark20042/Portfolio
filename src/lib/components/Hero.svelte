<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import myImage from '$lib/images/me.webp';
	import dictBadge from '$lib/images/dict-cyberpro-badge.png';
	import dictQrCode from '$lib/images/dict-cyberpro-qr.png';
	import { portal } from '$lib/actions/portal';
	import { PALETTES, mixGradient } from '$lib/vapor/palettes';
	import {
		PORTRAIT,
		HORIZON_RATIO,
		analyzePortrait,
		glyphFor,
		type PortraitField
	} from '$lib/vapor/symbolPortrait';
	import VaporStageBg from '$lib/vapor/VaporStageBg.svelte';
	import {
		RotateCcw,
		Mic,
		Send,
		X,
		Download,
		ExternalLink,
		ChevronRight,
		Sparkles,
		Volume2
	} from 'lucide-svelte';

	type PromptItem = {
		id: string;
		tag: string;
		xpReward: number;
		question: string;
		answer: string;
		stats?: { label: string; value: string }[];
		links?: { label: string; href: string; external?: boolean; action?: () => void }[];
	};

	type DispersionParticle = {
		x: number;
		y: number;
		vx: number;
		vy: number;
		age: number;
		maxAge: number;
		tone: number;
		char: string;
	};

	const DISPERSION_CHARS = '.:-=+*xX#%@';
	const HOVER_SWIRL_CHARS = ['{', '}', '>', '<', '@', '#', '%', '*', '+', '=', '-', '/', '^', '?'];
	const NUM_DISPERSION = 65;

	const PROMPT_SETS: PromptItem[][] = [
		[
			{
				id: 'fav-project',
				tag: 'MAIN QUEST',
				xpReward: 60,
				question: 'Favorite project?',
				answer:
					"GradSync is my flagship thesis project — an AI-powered career ecosystem connecting graduates and employers. It features real-time AI mock interviews (Gemini + Deepgram), OCR transcript verification, dynamic resume generation, and smart job suitability scoring. Another close favorite is my Philippines Linog Tracker, built rapidly during the Bogo City earthquake to give residents real-time PHIVOLCS seismic maps.",
				stats: [
					{ label: 'AI ENGINE', value: 'Gemini + Deepgram' },
					{ label: 'IMPACT', value: 'Real-Time PHIVOLCS' },
					{ label: 'CLASS', value: 'Flagship System' }
				],
				links: [
					{ label: 'Explore Projects', href: '#projects' },
					{ label: 'All Works ↗', href: '/projects' }
				]
			},
			{
				id: 'background',
				tag: 'ORIGIN LORE',
				xpReward: 50,
				question: "What's your background?",
				answer:
					"I'm Mark Joseph Potot, a Full-Stack & AI Developer from Bogo City, Cebu, Philippines. I'm currently a Backend AI Engineering Intern at FlyRank AI (Chicago) architecting RAG pipelines and tool-calling workflows, and a Part-Time Full-Stack Developer at 6010 Digital Solutions building production Laravel + React/Inertia apps.",
				stats: [
					{ label: 'GUILD', value: 'FlyRank AI (Chicago)' },
					{ label: 'RANK', value: 'Top 116 PH GitHub' },
					{ label: 'ROLE', value: 'AI + Full-Stack' }
				],
				links: [
					{ label: 'Experience & Education', href: '#experience-education' },
					{ label: 'GitHub (Top 116 PH) ↗', href: 'https://github.com/Mark20042', external: true }
				]
			},
			{
				id: 'drives',
				tag: 'CORE DRIVE',
				xpReward: 50,
				question: 'What drives you?',
				answer:
					'Building AI and full-stack software that solves immediate, real-world problems for real people — whether that is helping rice farmers diagnose crop diseases with computer vision, helping my community track earthquake aftershocks in real time, or shipping grounded AI agents that genuinely work in production.',
				stats: [
					{ label: 'ALIGNMENT', value: 'Human-Centric AI' },
					{ label: 'MISSION', value: 'Ship Production Agents' }
				],
				links: [
					{ label: 'About Me', href: '#about' },
					{ label: 'Say Hello ↗', href: 'mailto:mark.potot2004@gmail.com', external: true }
				]
			}
		],
		[
			{
				id: 'ai-rag',
				tag: 'BOSS TECH',
				xpReward: 75,
				question: 'AI & RAG experience?',
				answer:
					'At FlyRank AI, I architect retrieval-backed answer flows (RAG) with semantic embeddings, custom chunking, and Zod-validated tool calling to eliminate hallucinations. I also build computer vision & voice AI platforms using FastAPI, TensorFlow, Gemini API, Deepgram, and WebSockets.',
				stats: [
					{ label: 'SPECIALTY', value: 'RAG & Tool Calling' },
					{ label: 'VALIDATION', value: 'Zero-Hallucination Zod' },
					{ label: 'VISION/VOICE', value: 'TF + Deepgram' }
				],
				links: [
					{ label: 'View Tech Stack ↗', href: '/skills' },
					{ label: 'Selected Works', href: '#projects' }
				]
			},
			{
				id: 'certs',
				tag: 'TROPHY ROOM',
				xpReward: 65,
				question: 'Certifications & badges?',
				answer:
					'I hold 83 Google Cloud Badges, Oracle Cloud Infrastructure Certified Architect Associate, Oracle Agentic AI Certified Associate, DataCamp AI Engineer for Developers Associate, Certified Junior React Developer, and DICT Cybersecurity Level 2 recognition.',
				stats: [
					{ label: 'GOOGLE CLOUD', value: '83 Skill Badges' },
					{ label: 'ORACLE CLOUD', value: 'Architect + Agentic AI' },
					{ label: 'SECURITY', value: 'DICT CyberPro Lvl 2' }
				],
				links: [
					{ label: 'All Certificates ↗', href: '/certificates' },
					{
						label: 'Verify DICT CyberPro',
						href: '#verify-dict',
						action: () => (showDictModal = true)
					}
				]
			},
			{
				id: 'stack',
				tag: 'LOADOUT',
				xpReward: 50,
				question: 'What is your tech stack?',
				answer:
					'Frontend: React, Next.js, SvelteKit, TypeScript, Vue.js, Tailwind CSS. Backend & AI: Python, FastAPI, Node.js, Express, Laravel, Spring Boot, .NET, TensorFlow, Gemini/Claude APIs. Data & Cloud: PostgreSQL, Supabase, Neon, MySQL, Google Cloud, and OCI.',
				stats: [
					{ label: 'FRONTEND', value: 'React · Next · SvelteKit' },
					{ label: 'BACKEND/AI', value: 'FastAPI · Laravel · TF' },
					{ label: 'CLOUD/DB', value: 'GCP · OCI · Postgres' }
				],
				links: [
					{ label: 'Full Skills Breakdown ↗', href: '/skills' },
					{ label: 'GitHub Profile ↗', href: 'https://github.com/Mark20042', external: true }
				]
			}
		],
		[
			{
				id: 'rice-ai',
				tag: 'VISION AI',
				xpReward: 60,
				question: 'Tell me about Rice Leaf AI',
				answer:
					'Rice Leaf Disease Detection helps farmers diagnose 8 rice crop conditions (such as Bacterial Leaf Blight, Leaf Blast, and Brown Spot) in seconds. A TensorFlow deep learning model served via FastAPI + React returns confidence breakdowns and actionable treatment advice.',
				stats: [
					{ label: 'MODEL', value: 'TensorFlow CNN' },
					{ label: 'CLASSES', value: '8 Crop Diseases' },
					{ label: 'LATENCY', value: '< 1.2s Inference' }
				],
				links: [
					{
						label: 'Live Demo ↗',
						href: 'https://rice-leaf-disease-detection-ten.vercel.app/',
						external: true
					},
					{ label: 'More Projects', href: '#projects' }
				]
			},
			{
				id: 'vox-ai',
				tag: 'VOICE AI',
				xpReward: 60,
				question: 'What is VOX Voice Assistant?',
				answer:
					'VOX is a real-time AI voice assistant combining a Python FastAPI backend with an interactive 3D Three.js + React frontend. It features low-latency speech recognition, WebSocket streaming, document intelligence (PDF/DOCX/Excel), and voice-controlled automation.',
				stats: [
					{ label: 'INTERFACE', value: '3D Three.js + Voice' },
					{ label: 'STREAMING', value: 'Full-Duplex WebSockets' }
				],
				links: [{ label: 'See All Projects ↗', href: '/projects' }]
			},
			{
				id: 'contact',
				tag: 'CO-OP MODE',
				xpReward: 80,
				question: 'How can we work together?',
				answer:
					"I'm open to AI engineering, full-stack development, and software engineering opportunities! You can reach me directly at mark.potot2004@gmail.com or connect with me on LinkedIn and GitHub.",
				stats: [
					{ label: 'STATUS', value: 'Open for Opportunities' },
					{ label: 'RESPONSE', value: '< 24 Hours' }
				],
				links: [
					{ label: 'Email Mark ↗', href: 'mailto:mark.potot2004@gmail.com', external: true },
					{
						label: 'LinkedIn ↗',
						href: 'https://www.linkedin.com/in/mark-joseph-potot-b0a471369',
						external: true
					}
				]
			}
		]
	];

	let paletteIndex = $state(0);
	let currentPalette = $derived(PALETTES[paletteIndex]);

	let promptSetIndex = $state(0);
	let currentPrompts = $derived(PROMPT_SETS[promptSetIndex]);
	let isSpinningRefresh = $state(false);

	let activePrompt = $state<PromptItem | null>(null);
	let typedAnswer = $state('');
	let isTyping = $state(false);
	let userQuery = $state('');
	let activeQuestionLabel = $state('');
	let conversationMode = $state(false);
	let isListening = $state(false);
	let showDictModal = $state(false);

	let xp = $state(2450);
	let unlockedIds = $state<string[]>([]);
	let kudosCount = $state(142);
	let xpToastTimer: ReturnType<typeof setTimeout> | undefined;

	function awardXp(amount: number, _label: string) {
		xp += amount;
	}

	let isLiked = $state(false);
	let isCelebrating = $state(false);
	let celebrationTimeout: ReturnType<typeof setTimeout> | undefined;

	let stageEl = $state<HTMLElement | null>(null);
	let portraitCanvas = $state<HTMLCanvasElement | null>(null);
	let horizonY = $state(0);

	let field: PortraitField | null = null;
	let hologramCanvas: HTMLCanvasElement | null = null;
	let spideyCanvas: HTMLCanvasElement | null = null;
	let dispersionParticles: DispersionParticle[] = [];
	let sparkleSource: PortraitField | null = null;
	let sparkles: { x: number; y: number; phase: number; speed: number; size: number; tone: number; ux: number; uy: number; ch: number }[] = [];
	let pointerX = -9999;
	let pointerY = -9999;
	let smoothGazeX = 0;
	let smoothGazeY = 0;
	let hoverStrength = 0;
	let animFrameId = 0;
	let lastRenderTime = 0;
	let typingIntervalId: ReturnType<typeof setInterval> | undefined;

	function spawnDispersionParticle(p?: DispersionParticle): DispersionParticle {
		const target = p || {
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			age: 0,
			maxAge: 1,
			tone: 0.7,
			char: '+'
		};
		if (!field || field.emitters.length === 0) return target;

		const em = field.emitters[Math.floor(Math.random() * field.emitters.length)];
		const { cellW, cellH } = PORTRAIT;
		target.x = em.x * cellW + cellW * 0.5 + (Math.random() - 0.5) * 4;
		target.y = em.y * cellH + cellH * 0.5 + (Math.random() - 0.5) * 4;
		const speed = 8 + Math.random() * 18;
		target.vx = em.nx * speed + (Math.random() - 0.5) * 8;
		target.vy = em.ny * speed - 3 - Math.random() * 8;
		target.age = 0;
		target.maxAge = 0.8 + Math.random() * 1.1;
		target.tone = Math.min(1, em.tone + 0.15);
		target.char = DISPERSION_CHARS[Math.floor(Math.random() * DISPERSION_CHARS.length)];
		return target;
	}

	function initDispersionParticles() {
		dispersionParticles = Array.from({ length: NUM_DISPERSION }, () => {
			const p = spawnDispersionParticle();
			p.age = Math.random() * p.maxAge;
			p.x += p.vx * p.age;
			p.y += p.vy * p.age;
			return p;
		});
	}

	async function handleLike(event: MouseEvent) {
		isLiked = true;
		kudosCount += 1;
		awardXp(25, `CODE KUDOS #${kudosCount}`);
		clearTimeout(celebrationTimeout);

		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const y = (rect.top + rect.height / 2) / window.innerHeight;
		isCelebrating = true;
		celebrationTimeout = setTimeout(() => (isCelebrating = false), 700);

		const module = await import('canvas-confetti');
		const confetti = module.default || module;
		const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#14b8a6'];
		const duration = 1200;
		const end = Date.now() + duration;

		(function frame() {
			confetti({
				particleCount: 6,
				angle: 60,
				spread: 55,
				origin: { x: 0, y: y + 0.1 },
				colors
			});
			confetti({
				particleCount: 6,
				angle: 120,
				spread: 55,
				origin: { x: 1, y: y + 0.1 },
				colors
			});

			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		})();
	}

	function buildStaticPortraitCanvas() {
		if (!field) return;
		const { cols, rows, b, a, cellHash } = field;
		const { W, MAIN_H, REFL_H, TOTAL_H, cellW, cellH } = PORTRAIT;
		const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 2, 2);

		const off = document.createElement('canvas');
		off.width = W * dpr;
		off.height = TOTAL_H * dpr;
		const octx = off.getContext('2d');
		if (!octx) return;

		octx.save();
		octx.scale(dpr, dpr);
		octx.font = `bold 6px "JetBrains Mono", Consolas, monospace`;
		octx.textAlign = 'center';
		octx.textBaseline = 'middle';

		const pal = PALETTES[paletteIndex];
		const [br, bg, bb] = pal.bgRGB;

		// 1. Solid silhouette occlusion pass: fills ONLY Mark's exact portrait cells with the base background color
		//    so the background stage (ceiling grid, stars, floating symbols) stays strictly BEHIND Mark and never shows through him,
		//    while remaining 100% transparent outside his silhouette (no square crop or oblong halo).
		for (let y = 0; y < rows; y++) {
			const rowOff = y * cols;
			const cellTop = y * cellH - 0.35;
			for (let x = 0; x < cols; x++) {
				const cov = a[rowOff + x];
				if (cov < 0.08) continue;
				const maskAlpha = Math.min(1, cov * 1.35);
				octx.fillStyle = `rgba(${br}, ${bg}, ${bb}, ${maskAlpha})`;
				octx.fillRect(x * cellW - 0.35, cellTop, cellW + 0.7, cellH + 0.7);
			}
		}

		// 2. Exact `scratch/preview.png` portrait glyph render on top of the opaque silhouette cells
		for (let y = 0; y < rows; y++) {
			const ny = y / rows;
			const rowOff = y * cols;
			const py = y * cellH + cellH * 0.5;
			for (let x = 0; x < cols; x++) {
				const i = rowOff + x;
				const cov = a[i];
				if (cov < 0.08) continue;

				// Leave a small subset of bottom-part cells (ny > 0.78 && cellHash > 0.68) to disperse dynamically in renderAsciiCanvas
				if (ny > 0.78 && cellHash[i] > 0.68) continue;

				const tone = b[i];
				const [r, g, bl] = mixGradient(tone, pal);
				const alpha = cov * (0.45 + 0.55 * Math.pow(tone, 0.7));
				const px = x * cellW + cellW * 0.5;

				octx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${bl | 0}, ${alpha})`;
				octx.fillText(glyphFor(tone), px, py);
			}
		}

		// Inverted Floor Reflection below the horizon
		const reflRows = 22;
		const reflCellH = REFL_H / reflRows;
		for (let ry = 0; ry < reflRows; ry++) {
			const srcY = rows - 1 - Math.floor((ry / reflRows) * 26);
			if (srcY < 0) continue;
			const rowOff = srcY * cols;
			const py = MAIN_H + 3 + ry * reflCellH;
			const fadeOut = Math.pow(1 - ry / reflRows, 1.45) * 0.42;

			for (let x = 0; x < cols; x++) {
				const i = rowOff + x;
				const cov = a[i];
				if (cov < 0.12) continue;

				const tone = b[i];
				const [r, g, bl] = mixGradient(tone, pal);
				const px = x * cellW + cellW * 0.5;
				octx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${bl | 0}, ${fadeOut * cov * (0.32 + tone * 0.68)})`;
				octx.fillText(glyphFor(tone), px, py);
			}
		}

		octx.restore();
		hologramCanvas = off;
		buildSpideyCanvas();
	}

	// Procedural Spider-Man mask fitted to Mark's head silhouette (revealed only through the magnifying glass)
	function buildSpideyCanvas() {
		if (!field) return;
		const { cols, rows, a } = field;
		const { W, MAIN_H, cellW, cellH } = PORTRAIT;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);

		let top = -1;
		for (let y = 0; y < rows && top < 0; y++) {
			for (let x = 0; x < cols; x++) {
				if (a[y * cols + x] > 0.3) {
					top = y;
					break;
				}
			}
		}
		if (top < 0) return;
		const chinRow = Math.min(rows - 1, Math.floor(rows * 0.68));
		const faceRowEnd = Math.floor(top + (chinRow - top) * 0.75);
		let sumMid = 0;
		let cnt = 0;
		let maxHalf = 0;
		for (let y = top; y <= faceRowEnd; y++) {
			let minX = -1;
			let maxX = -1;
			for (let x = 0; x < cols; x++) {
				if (a[y * cols + x] > 0.3) {
					if (minX < 0) minX = x;
					maxX = x;
				}
			}
			if (minX < 0) continue;
			sumMid += (minX + maxX) / 2;
			cnt++;
			maxHalf = Math.max(maxHalf, (maxX - minX) / 2);
		}
		if (!cnt) return;
		const cx = (sumMid / cnt) * cellW + cellW * 0.5;
		const topPx = top * cellH;
		const chinPx = chinRow * cellH;
		const cy = (topPx + chinPx) / 2;
		const rx = Math.min(maxHalf * cellW * 1.02, (chinPx - topPx) * 0.42);
		const ry = (chinPx - topPx) / 2;

		const c = document.createElement('canvas');
		c.width = W * dpr;
		c.height = MAIN_H * dpr;
		const g = c.getContext('2d');
		if (!g) return;
		g.scale(dpr, dpr);

		// Clip: head ellipse ∩ actual silhouette cells
		g.save();
		g.beginPath();
		g.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
		g.clip();
		g.beginPath();
		for (let y = top; y <= chinRow; y++) {
			for (let x = 0; x < cols; x++) {
				if (a[y * cols + x] > 0.3) g.rect(x * cellW - 0.5, y * cellH - 0.5, cellW + 1, cellH + 1);
			}
		}
		g.clip();

		// Red suit base with shading
		const base = g.createRadialGradient(cx - rx * 0.2, cy - ry * 0.3, ry * 0.1, cx, cy, ry * 1.1);
		base.addColorStop(0, '#ff3b4e');
		base.addColorStop(0.55, '#d41a2e');
		base.addColorStop(1, '#6e0814');
		g.fillStyle = base;
		g.fillRect(cx - rx - 4, cy - ry - 4, rx * 2 + 8, ry * 2 + 8);

		// Webbing radiating from the nose bridge
		const ox = cx;
		const oy = cy + ry * 0.08;
		const strands = 18;
		g.strokeStyle = 'rgba(25, 0, 6, 0.85)';
		g.lineWidth = 1.1;
		g.beginPath();
		for (let k = 0; k < strands; k++) {
			const ang = (k / strands) * Math.PI * 2;
			g.moveTo(ox, oy);
			g.lineTo(ox + Math.cos(ang) * ry * 2.2, oy + Math.sin(ang) * ry * 2.2);
		}
		g.stroke();
		for (let ring = 1; ring <= 9; ring++) {
			const rr = ring * ry * 0.2;
			g.beginPath();
			for (let k = 0; k <= strands; k++) {
				const a0 = (k / strands) * Math.PI * 2;
				const am = ((k + 0.5) / strands) * Math.PI * 2;
				const a1 = ((k + 1) / strands) * Math.PI * 2;
				if (k === 0) g.moveTo(ox + Math.cos(a0) * rr, oy + Math.sin(a0) * rr);
				g.quadraticCurveTo(
					ox + Math.cos(am) * rr * 0.88,
					oy + Math.sin(am) * rr * 0.88,
					ox + Math.cos(a1) * rr,
					oy + Math.sin(a1) * rr
				);
			}
			g.stroke();
		}

		// Big white eyes with thick black frames
		const eyeY = cy - ry * 0.02;
		for (const side of [-1, 1]) {
			g.save();
			g.translate(cx, eyeY);
			g.scale(side, 1);
			g.beginPath();
			g.moveTo(rx * 0.1, ry * 0.07);
			g.quadraticCurveTo(rx * 0.28, -ry * 0.2, rx * 0.7, -ry * 0.25);
			g.bezierCurveTo(rx * 0.76, ry * 0.0, rx * 0.56, ry * 0.2, rx * 0.32, ry * 0.19);
			g.quadraticCurveTo(rx * 0.15, ry * 0.17, rx * 0.1, ry * 0.07);
			g.closePath();
			const eg = g.createLinearGradient(0, -ry * 0.25, 0, ry * 0.2);
			eg.addColorStop(0, '#ffffff');
			eg.addColorStop(1, '#c9d3e6');
			g.fillStyle = eg;
			g.fill();
			g.lineJoin = 'round';
			g.strokeStyle = '#0b0507';
			g.lineWidth = Math.max(2.5, rx * 0.075);
			g.stroke();
			g.restore();
		}

		// Soft gloss highlight
		const gloss = g.createRadialGradient(cx - rx * 0.35, cy - ry * 0.5, 2, cx - rx * 0.35, cy - ry * 0.5, ry * 0.6);
		gloss.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
		gloss.addColorStop(1, 'rgba(255, 255, 255, 0)');
		g.fillStyle = gloss;
		g.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
		g.restore();

		spideyCanvas = c;
	}

	function cyclePalette() {
		paletteIndex = (paletteIndex + 1) % PALETTES.length;
		awardXp(15, `${PALETTES[paletteIndex].label} MODE`);
		buildStaticPortraitCanvas();
	}

	function cyclePromptSet() {
		isSpinningRefresh = true;
		promptSetIndex = (promptSetIndex + 1) % PROMPT_SETS.length;
		setTimeout(() => {
			isSpinningRefresh = false;
		}, 360);
	}

	function speakText(text: string) {
		if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
		window.speechSynthesis.cancel();
		if (!conversationMode) return;
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.rate = 1.04;
		utterance.pitch = 0.96;
		window.speechSynthesis.speak(utterance);
	}

	function triggerPrompt(item: PromptItem, customQuestion?: string) {
		clearInterval(typingIntervalId);
		activePrompt = item;
		activeQuestionLabel = customQuestion || item.question;
		typedAnswer = '';
		isTyping = true;

		if (!unlockedIds.includes(item.id)) {
			unlockedIds = [...unlockedIds, item.id];
			awardXp(item.xpReward, `${item.tag} UNLOCKED`);
		} else {
			awardXp(10, `${item.tag} REPLAY`);
		}

		const fullText = item.answer;
		let idx = 0;
		typingIntervalId = setInterval(() => {
			idx += 3;
			if (idx >= fullText.length) {
				typedAnswer = fullText;
				isTyping = false;
				clearInterval(typingIntervalId);
			} else {
				typedAnswer = fullText.slice(0, idx);
			}
		}, 16);

		if (conversationMode) {
			speakText(fullText);
		}
	}

	function clearResponse() {
		clearInterval(typingIntervalId);
		activePrompt = null;
		typedAnswer = '';
		isTyping = false;
		if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
			window.speechSynthesis.cancel();
		}
	}

	function handleQuerySubmit(e: SubmitEvent) {
		e.preventDefault();
		const q = userQuery.trim();
		if (!q) return;

		const lower = q.toLowerCase();
		const allPrompts = PROMPT_SETS.flat();

		let matched = allPrompts[0];
		if (
			lower.includes('background') ||
			lower.includes('who') ||
			lower.includes('experience') ||
			lower.includes('intern') ||
			lower.includes('flyrank') ||
			lower.includes('education') ||
			lower.includes('school')
		) {
			matched = allPrompts.find((p) => p.id === 'background') ?? allPrompts[0];
		} else if (
			lower.includes('rag') ||
			lower.includes('agent') ||
			lower.includes('ai') ||
			lower.includes('llm')
		) {
			matched = allPrompts.find((p) => p.id === 'ai-rag') ?? allPrompts[0];
		} else if (
			lower.includes('cert') ||
			lower.includes('badge') ||
			lower.includes('oracle') ||
			lower.includes('google') ||
			lower.includes('dict') ||
			lower.includes('cyber')
		) {
			matched = allPrompts.find((p) => p.id === 'certs') ?? allPrompts[0];
		} else if (
			lower.includes('stack') ||
			lower.includes('skill') ||
			lower.includes('tech') ||
			lower.includes('language')
		) {
			matched = allPrompts.find((p) => p.id === 'stack') ?? allPrompts[0];
		} else if (lower.includes('rice') || lower.includes('leaf') || lower.includes('farmer')) {
			matched = allPrompts.find((p) => p.id === 'rice-ai') ?? allPrompts[0];
		} else if (lower.includes('vox') || lower.includes('voice')) {
			matched = allPrompts.find((p) => p.id === 'vox-ai') ?? allPrompts[0];
		} else if (
			lower.includes('contact') ||
			lower.includes('hire') ||
			lower.includes('email') ||
			lower.includes('reach') ||
			lower.includes('work')
		) {
			matched = allPrompts.find((p) => p.id === 'contact') ?? allPrompts[0];
		} else if (
			lower.includes('drive') ||
			lower.includes('motivat') ||
			lower.includes('why') ||
			lower.includes('passion')
		) {
			matched = allPrompts.find((p) => p.id === 'drives') ?? allPrompts[0];
		} else {
			matched = allPrompts.find((p) => p.id === 'fav-project') ?? allPrompts[0];
		}

		userQuery = '';
		triggerPrompt(matched, q);
	}

	function handleVoiceInput() {
		if (typeof window === 'undefined') return;
		const SpeechRecognition =
			(window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
				.SpeechRecognition ||
			(window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

		if (!SpeechRecognition) {
			const all = PROMPT_SETS.flat();
			const next = all[Math.floor(Math.random() * all.length)];
			triggerPrompt(next);
			return;
		}

		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const recognition = new (SpeechRecognition as any)();
			recognition.lang = 'en-US';
			recognition.interimResults = false;
			recognition.maxAlternatives = 1;

			isListening = true;
			recognition.start();

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			recognition.onresult = (event: any) => {
				const transcript = event.results?.[0]?.[0]?.transcript;
				isListening = false;
				if (transcript) {
					userQuery = transcript;
					handleQuerySubmit(new SubmitEvent('submit'));
				}
			};

			recognition.onerror = () => {
				isListening = false;
			};

			recognition.onend = () => {
				isListening = false;
			};
		} catch {
			isListening = false;
		}
	}

	function toggleConversationMode() {
		conversationMode = !conversationMode;
		if (!conversationMode && typeof window !== 'undefined' && 'speechSynthesis' in window) {
			window.speechSynthesis.cancel();
		} else if (conversationMode && activePrompt) {
			speakText(activePrompt.answer);
		}
	}

	function measureHorizon() {
		if (!stageEl || !portraitCanvas) return;
		const stageRect = stageEl.getBoundingClientRect();
		const canvasRect = portraitCanvas.getBoundingClientRect();
		horizonY = canvasRect.top - stageRect.top + canvasRect.height * HORIZON_RATIO;
	}

	function renderAsciiCanvas(time: number) {
		if (!portraitCanvas || !field || !hologramCanvas) {
			animFrameId = requestAnimationFrame(renderAsciiCanvas);
			return;
		}

		const dt = Math.min(0.08, (time - (lastRenderTime || time)) / 1000);
		lastRenderTime = time;
		const t = time / 1000;

		const ctx = portraitCanvas.getContext('2d');
		if (!ctx) return;

		const { cols, rows, b, a, cellHash } = field;
		const { W, MAIN_H, TOTAL_H, cellW, cellH } = PORTRAIT;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);

		if (portraitCanvas.width !== W * dpr || portraitCanvas.height !== TOTAL_H * dpr) {
			portraitCanvas.width = W * dpr;
			portraitCanvas.height = TOTAL_H * dpr;
		}

		ctx.save();
		ctx.scale(dpr, dpr);
		ctx.clearRect(0, 0, W, TOTAL_H);

		// Subtle unified portrait motion ("just a bit" — zero per-row warping, zero waving lines on face)
		const isHovering = pointerX > 15 && pointerX < W - 15 && pointerY > 15 && pointerY < MAIN_H - 15;
		hoverStrength += ((isHovering ? 1 : 0) - hoverStrength) * Math.min(1, dt * 7);

		const targetGazeX = isHovering ? ((pointerX - W * 0.5) / W) * 1.8 : 0;
		const targetGazeY = isHovering ? ((pointerY - MAIN_H * 0.42) / MAIN_H) * 1.1 : 0;
		smoothGazeX += (targetGazeX - smoothGazeX) * Math.min(1, dt * 6);
		smoothGazeY += (targetGazeY - smoothGazeY) * Math.min(1, dt * 6);

		const swayX = Math.sin(t * 0.9) * 1.0 + smoothGazeX;
		const swayY = Math.cos(t * 1.2) * 0.7 + smoothGazeY;

		// 1. Fast 1-call cached portrait & reflection render (60fps zero-lag, 100% transparent outside glyphs so NO square/crop!)
		ctx.drawImage(hologramCanvas, swayX, swayY, W, TOTAL_H);

		const pal = currentPalette;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		// 1b. Subtle bottom-part cell dispersion (only bottom ~22 rows, selective subset cellHash > 0.68 — "not that many"!)
		ctx.font = `bold 6px "JetBrains Mono", Consolas, monospace`;
		const startBottomRow = Math.floor(rows * 0.78);
		for (let y = startBottomRow; y < rows; y++) {
			const ny = y / rows;
			const rowOff = y * cols;
			const basePy = y * cellH + cellH * 0.5 + swayY;
			const bottomWeight = (ny - 0.78) / 0.22;
			for (let x = 0; x < cols; x++) {
				const i = rowOff + x;
				const cov = a[i];
				if (cov < 0.08) continue;
				const hVal = cellHash[i];
				if (hVal <= 0.68) continue;

				const nx = (x / cols - 0.5) * 2;
				const phase = t * 1.9 + hVal * Math.PI * 2 + x * 0.1;
				const drift = (0.5 + 0.5 * Math.sin(phase)) * bottomWeight;
				const px = x * cellW + cellW * 0.5 + swayX + (nx * 7.5 + Math.cos(phase) * 5.0) * drift;
				const py = basePy + (2.0 + Math.abs(Math.sin(phase)) * 7.0) * drift;

				const tone = b[i];
				const [r, g, bl] = mixGradient(tone, pal);
				const alpha = cov * (0.45 + 0.55 * Math.pow(tone, 0.7)) * Math.max(0.22, 1 - drift * 0.55);
				ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${bl | 0}, ${alpha})`;
				ctx.fillText(glyphFor(tone), px, py);
			}
		}

		// 2. Magnifying glass: inside the lens Mark's face is revealed as Spider-Man (magnified)
		if (hoverStrength > 0.02 && pointerX > 0 && pointerY > 0) {
			const R = 62 * (0.55 + 0.45 * hoverStrength);
			const zoom = 1.4;
			const lx = pointerX;
			const ly = pointerY;
			const [lbr, lbg, lbb] = pal.bgRGB;

			ctx.save();
			ctx.beginPath();
			ctx.arc(lx, ly, R, 0, Math.PI * 2);
			ctx.clip();
			ctx.fillStyle = `rgba(${lbr}, ${lbg}, ${lbb}, ${0.92 * hoverStrength})`;
			ctx.fillRect(lx - R, ly - R, R * 2, R * 2);
			ctx.translate(lx, ly);
			ctx.scale(zoom, zoom);
			ctx.translate(-lx, -ly);
			ctx.globalAlpha = hoverStrength;
			ctx.drawImage(hologramCanvas, swayX, swayY, W, TOTAL_H);
			if (spideyCanvas) ctx.drawImage(spideyCanvas, swayX, swayY, W, MAIN_H);
			ctx.restore();

			// Glass sheen
			ctx.save();
			ctx.globalAlpha = hoverStrength;
			const sheen = ctx.createRadialGradient(lx - R * 0.35, ly - R * 0.4, 2, lx, ly, R);
			sheen.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
			sheen.addColorStop(0.45, 'rgba(255, 255, 255, 0.04)');
			sheen.addColorStop(1, 'rgba(180, 210, 255, 0.10)');
			ctx.fillStyle = sheen;
			ctx.beginPath();
			ctx.arc(lx, ly, R, 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
			ctx.lineWidth = 1.6;
			ctx.beginPath();
			ctx.arc(lx, ly, R * 0.8, Math.PI * 1.08, Math.PI * 1.42);
			ctx.stroke();

			// Handle (bottom-right)
			const ha = Math.PI * 0.25;
			const hx0 = lx + Math.cos(ha) * (R + 3);
			const hy0 = ly + Math.sin(ha) * (R + 3);
			const hx1 = lx + Math.cos(ha) * (R + 46);
			const hy1 = ly + Math.sin(ha) * (R + 46);
			ctx.lineCap = 'round';
			ctx.strokeStyle = '#1c1020';
			ctx.lineWidth = 9;
			ctx.beginPath();
			ctx.moveTo(hx0, hy0);
			ctx.lineTo(hx1, hy1);
			ctx.stroke();
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(hx0 + 2, hy0 - 2);
			ctx.lineTo(hx1 + 2, hy1 - 2);
			ctx.stroke();

			// Metal rim
			const rim = ctx.createLinearGradient(lx - R, ly - R, lx + R, ly + R);
			rim.addColorStop(0, '#f4f1ff');
			rim.addColorStop(0.5, '#8b84a3');
			rim.addColorStop(1, '#ede8ff');
			ctx.strokeStyle = rim;
			ctx.lineWidth = 4.5;
			ctx.beginPath();
			ctx.arc(lx, ly, R, 0, Math.PI * 2);
			ctx.stroke();
			ctx.strokeStyle = 'rgba(20, 10, 30, 0.6)';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.arc(lx, ly, R - 2.6, 0, Math.PI * 2);
			ctx.stroke();
			ctx.restore();
		}

		// 3. Bottom-part dispersion particles (lightweight, only ~65 particles)
		ctx.font = `bold 6.5px "JetBrains Mono", Consolas, monospace`;
		for (let idx = 0; idx < dispersionParticles.length; idx++) {
			const p = dispersionParticles[idx];
			p.age += dt;
			if (p.age >= p.maxAge) {
				spawnDispersionParticle(p);
			}
			p.x += p.vx * dt;
			p.y += p.vy * dt;

			const lifeRatio = p.age / p.maxAge;
			const fade = Math.sin(lifeRatio * Math.PI);
			const [r, g, bl] = mixGradient(p.tone, pal);
			const pAlpha = Math.max(0, Math.min(0.76, fade * 0.7));
			if (pAlpha > 0.03 && p.x > 20 && p.x < W - 20 && p.y > 20 && p.y < MAIN_H + 10) {
				ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${bl | 0}, ${pAlpha})`;
				ctx.fillText(p.char, p.x + swayX, p.y + swayY);
			}
		}

		// 4. Random dispersion OUTSIDE Mark (floating just beyond the head/hair/shoulder edge, never on the face)
		if (sparkleSource !== field) {
			sparkleSource = field;
			sparkles = [];
			const { edgeDist } = field;
			for (let y = 0; y < rows; y++) {
				const ny = y / rows;
				if (ny < 0.1 || ny > 0.74) continue;
				for (let x = 0; x < cols; x++) {
					const i = y * cols + x;
					if (a[i] < 0.3) continue;
					const hv = cellHash[i];
					if (!(edgeDist[i] > 0 && edgeDist[i] <= 2.4 && hv > 0.7)) continue;
					const nx = (x / cols - 0.5) * 2;
					const dy = (ny - 0.4) * 2;
					const len = Math.hypot(nx, dy) || 1;
					sparkles.push({
						x: x * cellW + cellW * 0.5,
						y: y * cellH + cellH * 0.5,
						phase: (hv * 331.7) % 1,
						speed: 0.22 + ((hv * 53.1) % 1) * 0.4,
						size: 14 + ((hv * 17.3) % 1) * 22,
						tone: 0.7 + ((hv * 7.7) % 1) * 0.28,
						ux: nx / len + (hv - 0.8) * 1.2,
						uy: dy / len - 0.2,
						ch: hv
					});
				}
			}
			if (sparkles.length > 75) sparkles = sparkles.filter((_, k) => k % Math.ceil(sparkles.length / 75) === 0);
		}

		ctx.font = `bold 6.5px "JetBrains Mono", Consolas, monospace`;
		for (let k = 0; k < sparkles.length; k++) {
			const s = sparkles[k];
			const c = (t * s.speed + s.phase) % 1;
			const alpha = Math.sin(c * Math.PI) * 0.72;
			if (alpha < 0.04) continue;
			const px = s.x + swayX + s.ux * s.size * c;
			const py = s.y + swayY + s.uy * s.size * c;
			const [r, g, bl] = mixGradient(s.tone, pal);
			ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${bl | 0}, ${alpha})`;
			ctx.fillText(DISPERSION_CHARS[Math.floor((s.ch * 97 + c * 4) % DISPERSION_CHARS.length)], px, py);
		}

		ctx.restore();
		animFrameId = requestAnimationFrame(renderAsciiCanvas);
	}

	function handleCanvasMouseMove(e: MouseEvent) {
		if (!portraitCanvas) return;
		const rect = portraitCanvas.getBoundingClientRect();
		pointerX = (e.clientX - rect.left) * (PORTRAIT.W / rect.width);
		pointerY = (e.clientY - rect.top) * (PORTRAIT.TOTAL_H / rect.height);
	}

	function handleCanvasMouseLeave() {
		pointerX = -9999;
		pointerY = -9999;
	}

	onMount(() => {
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.src = myImage;
		img.onload = () => {
			field = analyzePortrait(img);
			buildStaticPortraitCanvas();
			initDispersionParticles();
			measureHorizon();
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const tag = (e.target as HTMLElement | null)?.tagName;
			if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
			if (e.key === '1' && currentPrompts[0]) {
				triggerPrompt(currentPrompts[0]);
			} else if (e.key === '2' && currentPrompts[1]) {
				triggerPrompt(currentPrompts[1]);
			} else if (e.key === '3' && currentPrompts[2]) {
				triggerPrompt(currentPrompts[2]);
			} else if (e.key === 'r' || e.key === 'R') {
				cyclePromptSet();
			}
		};

		measureHorizon();
		const ro = new ResizeObserver(measureHorizon);
		if (stageEl) ro.observe(stageEl);
		if (portraitCanvas) ro.observe(portraitCanvas);
		window.addEventListener('resize', measureHorizon);
		window.addEventListener('keydown', handleKeyDown);

		animFrameId = requestAnimationFrame(renderAsciiCanvas);

		return () => {
			cancelAnimationFrame(animFrameId);
			clearInterval(typingIntervalId);
			clearTimeout(celebrationTimeout);
			clearTimeout(xpToastTimer);
			ro.disconnect();
			window.removeEventListener('resize', measureHorizon);
			window.removeEventListener('keydown', handleKeyDown);
			if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
				window.speechSynthesis.cancel();
			}
		};
	});
</script>

<section
	bind:this={stageEl}
	id="intro"
	class="vapor-stage relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 pt-5 pb-12 select-none sm:px-8 sm:pb-16"
	style:--bg-base={currentPalette.bgBase}
	style:--accent={currentPalette.accentHex}
>
	<!-- Animated Synthwave Ceiling Grid, Sky, Rays, Horizon & Scrolling 3D Floor Grid -->
	<VaporStageBg palette={currentPalette} {horizonY} />

	<!-- Top Navigation Bar & VAPOR Mode Switcher -->
	<header class="relative z-30 flex w-full max-w-[1440px] items-center justify-between pt-1">
		<div class="hidden w-28 sm:block" aria-hidden="true"></div>

		<!-- Center HUD: Arcade Navigation Tabs -->
		<nav
			aria-label="Primary Navigation"
			class="flex flex-wrap items-center justify-center gap-5 sm:gap-9 md:gap-12"
		>
			{#each [
				{ label: 'HOME', href: '#intro', active: true },
				{ label: 'PROJECTS', href: '/projects', active: false },
				{ label: 'SKILLS', href: '/skills', active: false },
				{ label: 'ABOUT', href: '#about', active: false },
				{ label: 'CERTIFICATES', href: '/certificates', active: false }
			] as item}
				<a
					href={item.href}
					class="vapor-mono relative py-1.5 text-[11px] font-medium tracking-[0.26em] transition-colors sm:text-xs {item.active
						? 'text-white'
						: 'text-purple-200/65 hover:text-white'}"
				>
					{item.label}
					{#if item.active}
						<span
							class="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full transition-all"
							style="background-color: {currentPalette.accentHex}; box-shadow: 0 0 10px {currentPalette.accentHex};"
						></span>
					{/if}
				</a>
			{/each}
		</nav>

		<!-- Right HUD: Synthwave Theme Switcher -->
		<div class="flex w-auto justify-end sm:w-28">
			<button
				type="button"
				onclick={cyclePalette}
				title="Switch synthwave color mode"
				class="vapor-mono group flex cursor-pointer items-center gap-2 rounded-xs border border-purple-300/25 bg-black/40 px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-purple-100/90 backdrop-blur-md transition-all hover:border-purple-300/60 hover:bg-purple-950/40 active:scale-95 sm:text-[11px]"
			>
				<span
					class="h-2 w-2 rounded-full transition-transform group-hover:scale-125"
					style="background-color: {currentPalette.dotColor}; box-shadow: 0 0 8px {currentPalette.dotColor};"
				></span>
				{currentPalette.label}
			</button>
		</div>
	</header>

	<!-- Center Stage: Neon Title + Subtitle + Pure Symbol Living ASCII Portrait -->
	<div class="relative z-20 mt-3 flex w-full flex-1 flex-col items-center justify-center sm:mt-4">
		<h1
			class="vapor-title relative z-30 text-center text-[clamp(2.4rem,7.2vw,5.75rem)] leading-none font-black tracking-[0.06em] text-white uppercase select-text"
			style="text-shadow: {currentPalette.titleShadow};"
		>
			MARK JOSEPH
		</h1>

		<p
			class="vapor-mono relative z-30 mt-2.5 text-center text-xs font-medium tracking-[0.14em] select-text sm:mt-3.5 sm:text-base md:text-[17px]"
			style="color: {currentPalette.subtitleColor}; text-shadow: 0 0 14px {currentPalette.bgGlow};"
		>
			AI engineer <span class="mx-1.5 opacity-80">·</span> building agents &amp; systems that ship
		</p>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative z-20 -mt-3 flex w-full max-w-[730px] items-center justify-center sm:-mt-5"
			onmousemove={handleCanvasMouseMove}
			onmouseleave={handleCanvasMouseLeave}
		>
			<canvas
				bind:this={portraitCanvas}
				width={PORTRAIT.W}
				height={PORTRAIT.TOTAL_H}
				aria-label="ASCII art portrait of Mark Joseph Potot"
				class="pointer-events-auto h-auto w-full max-w-[730px] cursor-none object-contain"
			></canvas>

			<!-- Signature Code Reaction Button (</> Icon Only) positioned over the right shoulder -->
			<button
				type="button"
				onclick={handleLike}
				aria-label={isLiked ? 'Remove code reaction' : 'Send a code reaction'}
				aria-pressed={isLiked}
				title="Send a code reaction"
				class="absolute right-6 bottom-[24%] z-30 flex h-11 w-11 cursor-pointer items-center justify-center text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.45)] transition-transform duration-300 hover:scale-115 active:scale-90 sm:right-10"
			>
				<svg
					width="40"
					height="28"
					viewBox="0 0 48 34"
					fill={isLiked ? 'currentColor' : 'none'}
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
					class="{isCelebrating ? 'scale-125' : 'scale-100'} h-auto w-8 transition-transform duration-300 sm:w-9"
				>
					<path
						transform="translate(0 0)"
						d="M12 9 Q12 8 11 9 L2 16 Q1 17 2 18 L11 25 Q12 26 12 25 L12 21 Q12 20 11 19 L8 17 L11 15 Q12 14 12 13 Z"
					/>
					<path
						transform="translate(-3 0)"
						d="M36 9 Q36 8 37 9 L46 16 Q47 17 46 18 L37 25 Q36 26 36 25 L36 21 Q36 20 37 19 L40 17 L37 15 Q36 14 36 13 Z"
					/>
					<path
						d="M27.5 3 H30.5 Q31.5 3 31.2 4.5 L19.5 29.5 Q19.2 31 18.2 31 H15.2 Q14.2 31 14.5 29.5 L26.2 4.5 Q26.5 3 27.5 3 Z"
					/>
				</svg>
			</button>
		</div>
	</div>

	<!-- Simple, Clean Interactive Chat Box Positioned Higher Over the Horizon -->
	<div class="relative z-30 -mt-44 flex w-full max-w-[820px] flex-col items-center sm:-mt-52">
		<div
			class="w-full rounded-xs border border-purple-300/25 bg-[#150c1f]/90 p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.82)] backdrop-blur-md sm:p-4"
		>
			<div class="flex items-center gap-2.5 sm:gap-3">
				<button
					type="button"
					onclick={cyclePromptSet}
					aria-label="Shuffle questions"
					title="Shuffle prompt questions"
					class="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xs border border-purple-300/15 bg-black/30 text-purple-200/70 transition-colors hover:border-purple-300/40 hover:text-white"
				>
					<RotateCcw
						class="h-4 w-4 transition-transform duration-300 {isSpinningRefresh ? '-rotate-180' : ''}"
					/>
				</button>

				<div class="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
					{#each currentPrompts as item (item.id)}
						<button
							type="button"
							onclick={() => triggerPrompt(item)}
							class="vapor-mono group flex cursor-pointer items-center gap-2 rounded-xs border px-3.5 py-2.5 text-left text-xs transition-all sm:text-[13px] {activePrompt?.id ===
							item.id
								? 'border-pink-400/60 bg-[#1a2830]/95 text-white shadow-[0_0_15px_rgba(236,72,153,0.2)]'
								: 'border-[#2b3c44]/85 bg-[#121c22]/90 text-slate-200/90 hover:border-purple-300/50 hover:bg-[#18262e] hover:text-white'}"
						>
							<span class="text-purple-300/70 transition-transform group-hover:translate-x-0.5">↳</span>
							<span class="truncate">{item.question}</span>
						</button>
					{/each}
				</div>
			</div>

			{#if activePrompt}
				<div
					transition:slide={{ duration: 220 }}
					class="mt-3 rounded-xs border border-purple-400/25 bg-[#0d0614]/90 p-3.5 text-left sm:p-4"
				>
					<div class="flex items-center justify-between gap-2 border-b border-purple-300/15 pb-2">
						<div class="vapor-mono flex items-center gap-2 text-xs text-pink-300/90">
							<Sparkles class="h-3.5 w-3.5 shrink-0 text-pink-400" />
							<span>mark@agent:~$ query "{activeQuestionLabel}"</span>
							{#if conversationMode}
								<Volume2 class="h-3.5 w-3.5 animate-pulse text-cyan-300" />
							{/if}
						</div>
						<button
							type="button"
							onclick={clearResponse}
							aria-label="Close answer"
							class="cursor-pointer rounded p-1 text-purple-200/60 transition-colors hover:bg-white/10 hover:text-white"
						>
							<X class="h-3.5 w-3.5" />
						</button>
					</div>

					<p
						class="vapor-mono mt-2.5 text-xs leading-relaxed text-purple-100/95 select-text sm:text-[13.5px]"
					>
						{typedAnswer}{#if isTyping}<span
								class="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-pink-400 align-middle"
							></span>{/if}
					</p>

					{#if activePrompt.links && activePrompt.links.length > 0 && !isTyping}
						<div in:fade={{ duration: 180 }} class="mt-3 flex flex-wrap items-center gap-2 pt-1">
							{#each activePrompt.links as link}
								{#if link.action}
									<button
										type="button"
										onclick={link.action}
										class="vapor-mono cursor-pointer rounded-xs border border-pink-400/40 bg-pink-500/15 px-2.5 py-1 text-[11px] font-medium text-pink-200 transition-colors hover:bg-pink-500/30 hover:text-white"
									>
										{link.label}
									</button>
								{:else}
									<a
										href={link.href}
										target={link.external ? '_blank' : undefined}
										rel={link.external ? 'noopener noreferrer' : undefined}
										class="vapor-mono rounded-xs border border-purple-300/30 bg-purple-500/15 px-2.5 py-1 text-[11px] font-medium text-purple-200 transition-colors hover:border-pink-400/50 hover:bg-purple-500/30 hover:text-white"
									>
										{link.label}
									</a>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
			{/if}

			<form onsubmit={handleQuerySubmit} class="mt-3 flex items-center gap-3 pt-1 sm:mt-3.5">
				<span class="grid shrink-0 grid-cols-2 gap-[3px] pl-1 opacity-60" aria-hidden="true">
					{#each Array(6) as _}
						<span class="h-[3px] w-[3px] rounded-full bg-purple-200"></span>
					{/each}
				</span>

				<input
					type="text"
					bind:value={userQuery}
					placeholder="Ask about Mark"
					aria-label="Ask about Mark"
					class="vapor-mono w-full bg-transparent text-xs text-purple-100 placeholder-purple-200/55 focus:outline-none sm:text-sm"
				/>

				{#if userQuery.trim().length > 0}
					<button
						type="submit"
						aria-label="Submit question"
						class="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-xs border border-pink-400/40 bg-pink-500/20 text-pink-200 transition-all hover:bg-pink-500/35 hover:text-white"
					>
						<Send class="h-3.5 w-3.5" />
					</button>
				{/if}

				<button
					type="button"
					onclick={handleVoiceInput}
					aria-label="Voice input"
					title="Ask with voice or pick a random topic"
					class="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-xs border transition-all {isListening
						? 'animate-pulse border-pink-400 bg-pink-500/30 text-white'
						: 'border-[#3a4850]/80 bg-[#1c262b]/90 text-purple-100/80 hover:border-purple-300/50 hover:text-white'}"
				>
					<Mic class="h-4 w-4" />
				</button>
			</form>
		</div>

		<div class="mt-3 flex items-center gap-3">
			<span
				class="vapor-mono text-[10px] tracking-[0.22em] text-purple-200/55 uppercase sm:text-[11px]"
			>
				CONVERSATION MODE
			</span>
			<button
				type="button"
				role="switch"
				aria-checked={conversationMode}
				aria-label="Toggle Conversation Mode"
				onclick={toggleConversationMode}
				class="relative flex h-5 w-10 cursor-pointer items-center rounded-xs border border-purple-300/30 bg-[#121a1e] p-0.5 transition-colors"
			>
				<span
					class="h-3.5 w-3.5 rounded-[1px] transition-transform duration-200 {conversationMode
						? 'translate-x-4 bg-pink-400 shadow-[0_0_8px_#f472b6]'
						: 'translate-x-0 bg-purple-100/90'}"
				></span>
			</button>
			<span
				class="vapor-mono text-[10px] tracking-[0.2em] text-purple-200/55 uppercase sm:text-[11px]"
			>
				{conversationMode ? 'ON' : 'OFF'}
			</span>
		</div>
	</div>
</section>

{#if showDictModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		use:portal
		class="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-8"
		style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100vw; height: 100dvh;"
		onclick={() => (showDictModal = false)}
		onkeydown={(e) => e.key === 'Escape' && (showDictModal = false)}
		tabindex="-1"
		role="dialog"
		aria-modal="true"
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="animate-in fade-in zoom-in-95 relative flex w-full max-w-2xl flex-col items-center duration-300"
			onclick={(e) => e.stopPropagation()}
		>
			<button
				onclick={() => (showDictModal = false)}
				class="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20"
				aria-label="Close modal"
			>
				<X class="h-6 w-6" />
			</button>

			<img
				src={dictBadge}
				alt="DICT Cybersecurity Badge"
				loading="lazy"
				decoding="async"
				class="h-auto max-h-[75vh] w-full rounded-lg object-contain shadow-2xl"
			/>

			<div class="mt-6 w-full text-center">
				<h3 class="mb-2 text-2xl font-bold text-white">DICT Cybersecurity Recognition</h3>
				<p class="font-medium text-white/70">How to Verify</p>

				<div
					class="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-white/60 sm:text-sm"
				>
					<span>Download QR</span>
					<ChevronRight class="h-3.5 w-3.5 opacity-50" />
					<span>Go to Portal</span>
					<ChevronRight class="h-3.5 w-3.5 opacity-50" />
					<span>Upload QR</span>
				</div>

				<div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
					<a
						href={dictQrCode}
						download="dict-cyberpro-qr.png"
						class="flex items-center justify-center gap-2 rounded-xl bg-indigo-500/90 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
					>
						<Download class="h-4 w-4" />
						Download QR
					</a>
					<a
						href="https://cyberpro.dict.gov.ph/verify"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20"
					>
						Verify on Portal
						<ExternalLink
							class="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
						/>
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.vapor-stage {
		background-color: var(--bg-base, #140a1d);
	}

	.vapor-title {
		font-family: 'Orbitron', 'Inter', sans-serif;
		letter-spacing: 0.08em;
	}

	.vapor-mono {
		font-family: 'Share Tech Mono', 'JetBrains Mono', monospace;
	}
</style>
