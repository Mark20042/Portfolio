import { type VaporPalette } from './palettes';

/**
 * Exact `preview.png` ASCII Symbol Portrait Engine.
 *
 * - Exact 150 x 116 grid, crop, and S-curve tone mapping from `scratch/preview.png`.
 * - Pure symbols (no photo underlay).
 * - Selective emitters on only a few spots along the sides (not totally surrounding Mark).
 */

export const PORTRAIT = {
	cols: 150,
	rows: 116,
	cellW: 4.0,
	cellH: 4.8,
	/** CSS px of the portrait above the horizon (150 * 4.0 = 600, 116 * 4.8 = 556) */
	W: 600,
	MAIN_H: 556,
	/** CSS px of the floor reflection below the horizon */
	REFL_H: 144,
	TOTAL_H: 700
} as const;

/** Fraction of the canvas height at which the horizon sits. */
export const HORIZON_RATIO = PORTRAIT.MAIN_H / PORTRAIT.TOTAL_H;

/** Exact glyph ramp from `scratch/preview.png` */
export const GLYPH_RAMP = ' .:-=+*xX#%@';

export type EdgeEmitter = {
	x: number;
	y: number;
	nx: number;
	ny: number;
	tone: number;
};

export type PortraitField = {
	cols: number;
	rows: number;
	/** Tone per cell, 0..1 */
	b: Float32Array;
	/** Subject coverage per cell, 0..1 (0 = studio backdrop) */
	a: Float32Array;
	edgeDist: Float32Array;
	cellHash: Float32Array;
	/** Selective side emitters for subtle dispersion in a few spots around Mark */
	emitters: EdgeEmitter[];
	hiW: number;
	hiH: number;
	hiTone: Float32Array;
	hiAlpha: Float32Array;
};

const SS = 3; // 3x supersampling (450 x 348)

function getBustPortraitCrop(iw: number, ih: number) {
	const targetAspect = PORTRAIT.W / PORTRAIT.MAIN_H;
	let sh = Math.round(ih * 0.95);
	let sw = Math.round(sh * targetAspect);
	if (sw > Math.round(iw * 0.98)) {
		sw = Math.round(iw * 0.98);
		sh = Math.round(sw / targetAspect);
	}
	const sx = Math.round((iw - sw) * 0.5);
	const sy = Math.round(ih * 0.02);
	return { sx, sy, sw, sh };
}

export function analyzePortrait(
	img: HTMLImageElement,
	cols: number = PORTRAIT.cols,
	rows: number = PORTRAIT.rows
): PortraitField {
	const iw = img.naturalWidth || img.width;
	const ih = img.naturalHeight || img.height;
	const { sx, sy, sw, sh } = getBustPortraitCrop(iw, ih);

	const hiW = cols * SS;
	const hiH = rows * SS;
	const hi = document.createElement('canvas');
	hi.width = hiW;
	hi.height = hiH;
	const hctx = hi.getContext('2d', { willReadFrequently: true })!;
	hctx.imageSmoothingEnabled = true;
	hctx.imageSmoothingQuality = 'high';
	hctx.drawImage(img, sx, sy, sw, sh, 0, 0, hiW, hiH);
	const px = hctx.getImageData(0, 0, hiW, hiH).data;

	const hiLum = new Float32Array(hiW * hiH);
	const hiWarmth = new Float32Array(hiW * hiH);
	const isBg = new Uint8Array(hiW * hiH);

	const isStudioBackdrop = (i: number) => {
		const r = px[i * 4];
		const g = px[i * 4 + 1];
		const b = px[i * 4 + 2];
		const alpha = px[i * 4 + 3];
		if (alpha < 40) return true;
		const sat = Math.max(r, g, b) - Math.min(r, g, b);
		const lum = 0.299 * r + 0.587 * g + 0.114 * b;
		return sat < 25 && lum > 182;
	};

	for (let i = 0; i < hiW * hiH; i++) {
		const r = px[i * 4];
		const g = px[i * 4 + 1];
		const b = px[i * 4 + 2];
		hiLum[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		hiWarmth[i] = Math.max(0, (r - b) / 255);
	}

	// 1. BFS Flood-fill studio background from top, left, and right borders
	const queue = new Int32Array(hiW * hiH);
	let qt = 0;
	const seed = (i: number) => {
		if (!isBg[i] && isStudioBackdrop(i)) {
			isBg[i] = 1;
			queue[qt++] = i;
		}
	};
	for (let x = 0; x < hiW; x++) seed(x);
	for (let y = 0; y < hiH; y++) {
		seed(y * hiW);
		seed(y * hiW + hiW - 1);
	}
	for (let qh = 0; qh < qt; qh++) {
		const c = queue[qh];
		const x = c % hiW;
		if (x > 0) seed(c - 1);
		if (x < hiW - 1) seed(c + 1);
		if (c >= hiW) seed(c - hiW);
		if (c < hiW * (hiH - 1)) seed(c + hiW);
	}

	const INF = 1e6;
	const distBg = new Float32Array(hiW * hiH);
	for (let i = 0; i < hiW * hiH; i++) distBg[i] = isBg[i] ? 0 : INF;
	for (let y = 0; y < hiH; y++) {
		for (let x = 0; x < hiW; x++) {
			const i = y * hiW + x;
			if (x > 0) distBg[i] = Math.min(distBg[i], distBg[i - 1] + 1);
			if (y > 0) distBg[i] = Math.min(distBg[i], distBg[i - hiW] + 1);
		}
	}
	for (let y = hiH - 1; y >= 0; y--) {
		for (let x = hiW - 1; x >= 0; x--) {
			const i = y * hiW + x;
			if (x < hiW - 1) distBg[i] = Math.min(distBg[i], distBg[i + 1] + 1);
			if (y < hiH - 1) distBg[i] = Math.min(distBg[i], distBg[i + hiW] + 1);
		}
	}

	// 2. Exact `preview.png` S-curve tone mapping at high resolution
	const hiTone = new Float32Array(hiW * hiH);
	const hiAlpha = new Float32Array(hiW * hiH);

	for (let y = 0; y < hiH; y++) {
		const ny = y / hiH;
		for (let x = 0; x < hiW; x++) {
			const i = y * hiW + x;
			if (isBg[i]) continue;

			const nx = (x / hiW - 0.5) * 2; // -1..1
			let shoulderFade = 1;
			if (ny > 0.62) {
				const excessX = Math.max(0, Math.abs(nx) - 0.78) / 0.22;
				shoulderFade = Math.max(0, 1 - excessX * excessX * 1.25);
			}
			if (shoulderFade <= 0.02) continue;

			const l = hiLum[i];
			const w = hiWarmth[i];

			let sum = 0;
			let cnt = 0;
			for (let dy = -2; dy <= 2; dy += 2) {
				const sy2 = y + dy;
				if (sy2 < 0 || sy2 >= hiH) continue;
				for (let dx = -2; dx <= 2; dx += 2) {
					const sx2 = x + dx;
					if (sx2 < 0 || sx2 >= hiW) continue;
					const j = sy2 * hiW + sx2;
					if (!isBg[j]) {
						sum += hiLum[j];
						cnt++;
					}
				}
			}
			const localAvg = cnt > 0 ? sum / cnt : l;
			const detail = l - localAvg;

			let tone = 0;
			if (l > 0.74 && w < 0.1) {
				// Crisp white collared dress shirt
				tone = 0.8 + (l - 0.74) * 0.75 + detail * 0.7;
			} else if (w > 0.08 || (l > 0.2 && ny < 0.72)) {
				// Skin & facial features: exact `preview.png` S-curve
				const norm = Math.max(0, Math.min(1, (l - 0.14) / 0.68));
				const sCurve = norm * norm * (3 - 2 * norm);
				tone = 0.16 + sCurve * 0.76 + detail * 1.35;
			} else {
				// Dark hair & suit jacket: exact `preview.png` shading
				const lapelEdge = Math.abs(detail) * 2.2;
				const suitContour = ny > 0.62 ? 0.18 + Math.abs(nx) * 0.14 : 0.13;
				tone = suitContour + l * 0.7 + lapelEdge;
			}

			hiTone[i] = Math.max(0.07, Math.min(1, tone));
			hiAlpha[i] = shoulderFade;
		}
	}

	// 3. Downsample high-res tone & coverage to the ASCII character grid
	const n = cols * rows;
	const a = new Float32Array(n);
	const b = new Float32Array(n);
	const edgeDist = new Float32Array(n);
	const cellHash = new Float32Array(n);
	const emitters: EdgeEmitter[] = [];

	for (let y = 0; y < rows; y++) {
		const ny = y / rows;
		for (let x = 0; x < cols; x++) {
			const nx = (x / cols - 0.5) * 2;
			let sumA = 0;
			let sumT = 0;
			let minDist = INF;
			for (let dy = 0; dy < SS; dy++) {
				for (let dx = 0; dx < SS; dx++) {
					const hiIdx = (y * SS + dy) * hiW + (x * SS + dx);
					if (distBg[hiIdx] < minDist) minDist = distBg[hiIdx];
					const al = hiAlpha[hiIdx];
					if (al > 0) {
						sumA += al;
						sumT += hiTone[hiIdx] * al;
					}
				}
			}
			const idx = y * cols + x;
			const cov = sumA / (SS * SS);
			a[idx] = cov;
			edgeDist[idx] = minDist === INF ? 0 : minDist / SS;
			cellHash[idx] = Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
			b[idx] = sumA > 0 ? sumT / sumA : 0;

			// Dispersion emitters focused at the BOTTOM part of Mark (ny >= 0.72 across lower suit, collar & shoulders)
			// plus a couple of subtle localized side spots (not totally around his upper head)
			const inBottomPart = ny >= 0.72 && cov > 0.12 && (edgeDist[idx] <= 3.5 || ny >= 0.88);
			const inSelectiveSideSpot =
				((nx > 0.15 && ny >= 0.34 && ny <= 0.52) || (nx < -0.15 && ny >= 0.42 && ny <= 0.58)) &&
				cov > 0.1 &&
				edgeDist[idx] > 0 &&
				edgeDist[idx] <= 2.0;

			if (inBottomPart || inSelectiveSideSpot) {
				const len = Math.hypot(nx, ny - 0.5) || 1;
				emitters.push({
					x,
					y,
					nx: inBottomPart ? nx * 0.65 + (cellHash[idx] - 0.5) * 0.6 : nx / len,
					ny: inBottomPart ? 0.35 + cellHash[idx] * 0.55 : (ny - 0.5) / len - 0.1,
					tone: Math.max(0.58, b[idx])
				});
			}
		}
	}

	return { cols, rows, b, a, edgeDist, cellHash, emitters, hiW, hiH, hiTone, hiAlpha, hiLum };
}

export function buildHologramUnderlay(
	_field: PortraitField,
	_palette: VaporPalette
): HTMLCanvasElement {
	const c = document.createElement('canvas');
	c.width = 1;
	c.height = 1;
	return c;
}

export function glyphFor(tone: number): string {
	const idx = Math.min(GLYPH_RAMP.length - 1, Math.max(1, Math.floor(tone * GLYPH_RAMP.length)));
	return GLYPH_RAMP[idx];
}
