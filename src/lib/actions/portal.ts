/**
 * Svelte action that teleports an element to document.body.
 * This escapes any ancestor stacking contexts, transforms, or
 * will-change properties that break position:fixed.
 */
export function portal(node: HTMLElement) {
	document.body.appendChild(node);

	return {
		destroy() {
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}
	};
}
