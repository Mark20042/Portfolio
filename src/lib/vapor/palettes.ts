export type RGB = [number, number, number];

export type VaporPalette = {
	id: 'vapor' | 'cyber' | 'matrix' | 'ember';
	label: string;
	dotColor: string;
	bgBase: string;
	bgGlow: string;
	titleShadow: string;
	subtitleColor: string;
	accentHex: string;
	/** Portrait gradient: shadows → midtones → highlights */
	shadowRGB: RGB;
	midRGB: RGB;
	highRGB: RGB;
	/** Animated background colors */
	bgRGB: RGB;
	rayRGB: RGB;
	gridRGB: RGB;
	accentRGB: RGB;
	starRGB: RGB;
};

export const PALETTES: VaporPalette[] = [
	{
		id: 'vapor',
		label: 'VAPOR',
		dotColor: '#e879f9',
		bgBase: '#22132b',
		bgGlow: 'rgba(138, 80, 160, 0.25)',
		titleShadow:
			'0 2px 0 #f5d0fe, 0 5px 0 #9333ea, 0 0 18px rgba(232, 121, 249, 0.8), 0 8px 32px rgba(168, 85, 247, 0.7)',
		subtitleColor: '#e9d5ff',
		accentHex: '#c084fc',
		shadowRGB: [74, 34, 98],
		midRGB: [182, 112, 218],
		highRGB: [252, 234, 255],
		bgRGB: [34, 19, 43],
		rayRGB: [152, 98, 172],
		gridRGB: [132, 80, 152],
		accentRGB: [158, 94, 178],
		starRGB: [240, 215, 248]
	},
	{
		id: 'cyber',
		label: 'CYBER',
		dotColor: '#22d3ee',
		bgBase: '#07111e',
		bgGlow: 'rgba(34, 211, 238, 0.22)',
		titleShadow:
			'0 2px 0 #cffafe, 0 5px 0 #0284c7, 0 0 18px rgba(34, 211, 238, 0.85), 0 8px 32px rgba(56, 189, 248, 0.75)',
		subtitleColor: '#67e8f9',
		accentHex: '#22d3ee',
		shadowRGB: [18, 64, 108],
		midRGB: [64, 190, 236],
		highRGB: [232, 252, 255],
		bgRGB: [7, 17, 30],
		rayRGB: [103, 232, 249],
		gridRGB: [34, 211, 238],
		accentRGB: [34, 211, 238],
		starRGB: [220, 250, 255]
	},
	{
		id: 'matrix',
		label: 'MATRIX',
		dotColor: '#34d399',
		bgBase: '#071611',
		bgGlow: 'rgba(16, 185, 129, 0.22)',
		titleShadow:
			'0 2px 0 #d1fae5, 0 5px 0 #059669, 0 0 18px rgba(52, 211, 153, 0.85), 0 8px 32px rgba(16, 185, 129, 0.75)',
		subtitleColor: '#6ee7b7',
		accentHex: '#10b981',
		shadowRGB: [16, 74, 52],
		midRGB: [62, 204, 144],
		highRGB: [232, 255, 244],
		bgRGB: [7, 22, 17],
		rayRGB: [110, 231, 183],
		gridRGB: [16, 185, 129],
		accentRGB: [52, 211, 153],
		starRGB: [220, 255, 236]
	},
	{
		id: 'ember',
		label: 'SYNTH',
		dotColor: '#fb7185',
		bgBase: '#190811',
		bgGlow: 'rgba(244, 63, 94, 0.24)',
		titleShadow:
			'0 2px 0 #ffe4e6, 0 5px 0 #be123c, 0 0 18px rgba(251, 113, 133, 0.85), 0 8px 32px rgba(244, 63, 94, 0.75)',
		subtitleColor: '#fda4af',
		accentHex: '#f43f5e',
		shadowRGB: [96, 26, 56],
		midRGB: [232, 104, 144],
		highRGB: [255, 238, 242],
		bgRGB: [25, 8, 17],
		rayRGB: [253, 164, 175],
		gridRGB: [244, 63, 94],
		accentRGB: [251, 113, 133],
		starRGB: [255, 228, 232]
	}
];

export function mixGradient(t: number, p: VaporPalette): RGB {
	const [sr, sg, sb] = p.shadowRGB;
	const [mr, mg, mb] = p.midRGB;
	const [hr, hg, hb] = p.highRGB;
	if (t < 0.5) {
		const k = t * 2;
		return [sr + (mr - sr) * k, sg + (mg - sg) * k, sb + (mb - sb) * k];
	}
	const k = (t - 0.5) * 2;
	return [mr + (hr - mr) * k, mg + (hg - mg) * k, mb + (hb - mb) * k];
}

