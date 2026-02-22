<script lang="ts">
	import PixelCanvas from './PixelCanvas.svelte';
	import { drawMiniWaveform, drawPixelHeart, drawPulsingHeart, PALETTE } from '$lib/utils/pixel';

	interface Props {
		product: 'synth' | 'mapper' | 'grid' | 'chord';
		active?: boolean;
	}

	let { product, active = false }: Props = $props();

	const WIDTH = 80;
	const HEIGHT = 48;

	function draw(ctx: CanvasRenderingContext2D, frame: number) {
		// background bar
		ctx.fillStyle = PALETTE.border;
		ctx.fillRect(0, HEIGHT - 1, WIDTH, 1);

		if (product === 'synth') {
			drawMiniWaveform(ctx, 4, 16, 40, frame, PALETTE.grey6);
			drawPulsingHeart(ctx, 60, 24, frame, PALETTE.accent);
		} else if (product === 'mapper') {
			// grid of dots connected by lines
			for (let i = 0; i < 5; i++) {
				ctx.fillStyle = PALETTE.grey4;
				ctx.fillRect(8 + i * 14, 20, 2, 2);
			}
			drawMiniWaveform(ctx, 4, 30, 72, frame, PALETTE.grey6);
			drawPixelHeart(ctx, 64, 8, 1, PALETTE.accent);
		} else if (product === 'grid') {
			// step sequencer mini grid
			for (let r = 0; r < 3; r++) {
				for (let c = 0; c < 8; c++) {
					const on = ((c + r + frame) % 4) === 0;
					ctx.fillStyle = on ? PALETTE.accent : PALETTE.border;
					ctx.fillRect(4 + c * 9, 8 + r * 12, 7, 8);
				}
			}
		} else {
			// chord — stacked notes
			for (let i = 0; i < 3; i++) {
				const y = 10 + i * 12;
				ctx.fillStyle = PALETTE.grey4;
				ctx.fillRect(10, y, 20, 2);
				ctx.fillStyle = i === 1 ? PALETTE.accent : PALETTE.grey6;
				ctx.fillRect(10 + ((frame + i * 5) % 20), y - 1, 4, 4);
			}
			drawPixelHeart(ctx, 60, 20, 1, PALETTE.accentDim);
		}
	}
</script>

<div class="product-canvas">
	<PixelCanvas width={WIDTH} height={HEIGHT} {draw} fps={8} {active} />
</div>

<style>
	.product-canvas {
		width: 100%;
		height: 48px;
		margin-bottom: var(--space-2);
	}

	.product-canvas :global(.pixel-canvas) {
		height: 48px;
	}
</style>
