<script lang="ts">
	import { onMount } from 'svelte';
	import type { VaporPalette } from './palettes';

	let {
		palette,
		horizonY = 0
	}: {
		palette: VaporPalette;
		/** Horizon Y in stage pixels (measured from top of the hero section). */
		horizonY?: number;
	} = $props();

	let canvas = $state<HTMLCanvasElement | null>(null);

	type Star = {
		x: number;
		y: number;
		r: number;
		base: number;
		speed: number;
		phase: number;
		vx: number;
		vy: number;
		tinted: boolean;
	};

	type BgSymbol = {
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		baseAlpha: number;
		phase: number;
		speed: number;
		char: string;
		accent: boolean;
	};

	const BG_SYMBOL_CHARS = ['=', '@', '-', '+', '*', '#', '%', ':'];
	const NUM_BG_SYMBOLS = 56;
	const NUM_STARS = 110;
	// 95 fine perspective slopes + 28 horizontal lines = small, crisp grid boxes matching reference
	const DENSE_SLOPES = Array.from({ length: 95 }, (_, idx) => (idx - 47) * 0.075);
	const NUM_CEIL_H_LINES = 28;
	const NUM_FLOOR_H_LINES = 28;

	onMount(() => {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const stars: Star[] = Array.from({ length: NUM_STARS }, () => ({
			x: Math.random(),
			y: Math.random() * 0.95,
			r: 0.65 + Math.random() * 1.35,
			base: 0.28 + Math.random() * 0.6,
			speed: 1.4 + Math.random() * 2.4,
			phase: Math.random() * Math.PI * 2,
			vx: (Math.random() - 0.5) * 0.01,
			vy: -0.006 - Math.random() * 0.012,
			tinted: Math.random() < 0.55
		}));

		const bgSymbols: BgSymbol[] = Array.from({ length: NUM_BG_SYMBOLS }, (_, idx) => ({
			x: Math.random(),
			y: Math.random(),
			vx: (Math.random() - 0.5) * 0.018,
			vy: -0.012 - Math.random() * 0.022,
			size: 9 + (idx % 4) * 2,
			baseAlpha: 0.18 + Math.random() * 0.34,
			phase: Math.random() * Math.PI * 2,
			speed: 1.2 + Math.random() * 1.8,
			char: BG_SYMBOL_CHARS[idx % BG_SYMBOL_CHARS.length],
			accent: idx % 3 === 0
		}));

		let mouseNormX = 0; // -1..1
		let smoothMouseX = 0;

		const handleWindowMouseMove = (e: MouseEvent) => {
			mouseNormX = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
		};
		window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });

		let raf = 0;
		let lastT = performance.now();

		function frame(now: number) {
			if (!canvas || !ctx) return;
			const dt = Math.min(0.1, (now - lastT) / 1000);
			lastT = now;
			const t = now / 1000;

			smoothMouseX += (mouseNormX - smoothMouseX) * Math.min(1, dt * 5);

			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const w = canvas.clientWidth || window.innerWidth;
			const h = canvas.clientHeight || window.innerHeight;
			if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
				canvas.width = Math.round(w * dpr);
				canvas.height = Math.round(h * dpr);
			}

			const hy = horizonY > 80 && horizonY < h - 40 ? horizonY : h * 0.72;
			const vx = w * 0.5 + smoothMouseX * 26 + Math.sin(t * 0.5) * 12;

			const pal = palette;
			const [br, bg, bb] = pal.bgRGB;
			const [gr, gg, gb] = pal.gridRGB;
			const [ar, ag, ab] = pal.accentRGB;
			const [sr, sg, sb] = pal.starRGB;

			ctx.save();
			ctx.scale(dpr, dpr);

			// 1. Base fill + soft warm dusty-plum radial glow behind the portrait (matching reference)
			ctx.fillStyle = `rgb(${br}, ${bg}, ${bb})`;
			ctx.fillRect(0, 0, w, h);

			const breath = 1 + Math.sin(t * 1.25) * 0.06;
			const glowR = Math.max(w, h) * 0.48 * breath;
			const skyGlow = ctx.createRadialGradient(vx, hy * 0.56, 10, vx, hy * 0.56, glowR);
			skyGlow.addColorStop(0, `rgba(${gr}, ${gg}, ${gb}, 0.20)`);
			skyGlow.addColorStop(0.55, `rgba(${ar}, ${ag}, ${ab}, 0.08)`);
			skyGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
			ctx.fillStyle = skyGlow;
			ctx.fillRect(0, 0, w, hy);

			// 2. Wide 3D Perspective Ceiling Grid behind Mark (0..ceilH)
			//    Extends down to 88% of the upper stage behind Mark while keeping a clean gap above the floor (ceilH..hy)
			const ceilH = hy * 0.88;
			ctx.save();
			ctx.beginPath();
			ctx.rect(0, 0, w, ceilH);
			ctx.clip();

			// Fine, small grid boxes: 95 perspective slope lines batched in a single stroke
			const ceilSlopeGrad = ctx.createLinearGradient(0, 0, 0, ceilH);
			ceilSlopeGrad.addColorStop(0, `rgba(${gr}, ${gg}, ${gb}, 0.36)`);
			ceilSlopeGrad.addColorStop(0.76, `rgba(${gr}, ${gg}, ${gb}, 0.24)`);
			ceilSlopeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
			ctx.lineWidth = 0.75;
			ctx.strokeStyle = ceilSlopeGrad;
			ctx.beginPath();
			for (const s of DENSE_SLOPES) {
				const outerX = vx + s * w * 0.68;
				const innerX = vx + s * w * 0.15;
				ctx.moveTo(outerX, 0);
				ctx.lineTo(innerX, ceilH);
			}
			ctx.stroke();

			// Fast-scrolling dense horizontal ceiling lines (28 lines = small boxes)
			const ceilPhase = (t * 2.85) % 1;
			ctx.lineWidth = 0.75;
			for (let i = 0; i < NUM_CEIL_H_LINES; i++) {
				const u = (i + ceilPhase) / NUM_CEIL_H_LINES; // 0 = bottom of ceiling (ceilH), 1 = top of screen (y = 0)
				const depth = Math.pow(u, 1.75);
				const y = ceilH - depth * ceilH;
				// Smoothly fade near ceilH so the ceiling never meets or crowds the floor
				const fadeNearGap = Math.min(1, u * 3.5);
				const alpha = (0.10 + u * 0.28) * fadeNearGap;
				ctx.strokeStyle = `rgba(${gr}, ${gg}, ${gb}, ${alpha})`;
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(w, y);
				ctx.stroke();
			}

			ctx.restore();

			// 3. Open Starfield & Floating Background Symbols (= @ - + * # %) behind Mark
			ctx.save();
			ctx.beginPath();
			ctx.rect(0, 0, w, hy);
			ctx.clip();

			for (const s of stars) {
				s.x = (s.x + s.vx * dt + 1) % 1;
				s.y += s.vy * dt;
				if (s.y < 0) {
					s.y = 0.95;
					s.x = Math.random();
				}
				const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
				const alpha = s.base * twinkle;
				ctx.fillStyle = s.tinted
					? `rgba(${sr}, ${sg}, ${sb}, ${alpha})`
					: `rgba(255, 255, 255, ${alpha})`;
				ctx.beginPath();
				ctx.arc(s.x * w, (s.y / 0.95) * hy, s.r, 0, Math.PI * 2);
				ctx.fill();
			}

			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			for (let i = 0; i < bgSymbols.length; i++) {
				const sym = bgSymbols[i];
				sym.x = (sym.x + sym.vx * dt + 1) % 1;
				sym.y += sym.vy * dt;
				if (sym.y < -0.04) {
					sym.y = 1.02;
					sym.x = Math.random();
					sym.char = BG_SYMBOL_CHARS[Math.floor(Math.random() * BG_SYMBOL_CHARS.length)];
				}
				const pulse = 0.55 + 0.45 * Math.sin(t * sym.speed + sym.phase);
				const alpha = sym.baseAlpha * pulse;
				const sx = sym.x * w + Math.sin(t * 1.2 + sym.phase) * 9 - smoothMouseX * 14;
				const sy = sym.y * hy;
				ctx.font = `700 ${sym.size}px "JetBrains Mono", "Share Tech Mono", monospace`;
				ctx.fillStyle = sym.accent
					? `rgba(${ar}, ${ag}, ${ab}, ${alpha})`
					: `rgba(${sr}, ${sg}, ${sb}, ${alpha})`;
				ctx.fillText(sym.char, sx, sy);
			}

			ctx.restore();

			// 4. Bottom 3D Perspective Floor below the horizon (small, dense boxes & fast scrolling!)
			const floorH = Math.max(1, h - hy);
			const floorGrad = ctx.createLinearGradient(0, hy, 0, h);
			floorGrad.addColorStop(0, `rgba(${gr}, ${gg}, ${gb}, 0.14)`);
			floorGrad.addColorStop(0.28, `rgba(${br}, ${bg}, ${bb}, 0.92)`);
			floorGrad.addColorStop(1, `rgb(${Math.max(0, br - 8)}, ${Math.max(0, bg - 5)}, ${Math.max(0, bb - 10)})`);
			ctx.fillStyle = floorGrad;
			ctx.fillRect(0, hy, w, floorH);

			ctx.save();
			ctx.beginPath();
			ctx.rect(0, hy, w, floorH);
			ctx.clip();

			// 95 dense perspective slope lines batched in a single stroke for small grid boxes
			const floorSlopeGrad = ctx.createLinearGradient(0, hy, 0, h);
			floorSlopeGrad.addColorStop(0, `rgba(${gr}, ${gg}, ${gb}, 0.22)`);
			floorSlopeGrad.addColorStop(0.35, `rgba(${gr}, ${gg}, ${gb}, 0.34)`);
			floorSlopeGrad.addColorStop(1, `rgba(${gr}, ${gg}, ${gb}, 0.38)`);
			ctx.lineWidth = 0.75;
			ctx.strokeStyle = floorSlopeGrad;
			ctx.beginPath();
			for (const s of DENSE_SLOPES) {
				const topX = vx + s * w * 0.16;
				const botX = vx + s * w * 0.68;
				ctx.moveTo(topX, hy);
				ctx.lineTo(botX, h);
			}
			ctx.stroke();

			// 28 fast-scrolling horizontal floor lines (small boxes throughout)
			const floorPhase = (t * 2.65) % 1;
			for (let i = 0; i < NUM_FLOOR_H_LINES; i++) {
				const u = (i + floorPhase) / NUM_FLOOR_H_LINES;
				const depth = Math.pow(u, 1.85);
				const y = hy + depth * floorH;
				const alpha = Math.min(0.42, 0.14 + u * 0.28);
				ctx.lineWidth = 0.75 + u * 0.35;
				ctx.strokeStyle = `rgba(${gr}, ${gg}, ${gb}, ${alpha})`;
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(w, y);
				ctx.stroke();
			}
			ctx.restore();

			ctx.restore();
			raf = requestAnimationFrame(frame);
		}

		raf = requestAnimationFrame(frame);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('mousemove', handleWindowMouseMove);
		};
	});
</script>

<canvas
	bind:this={canvas}
	aria-hidden="true"
	class="pointer-events-none absolute inset-0 z-0 h-full w-full"
></canvas>
