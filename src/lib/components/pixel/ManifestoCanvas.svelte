<script lang="ts">
	import PixelCanvas from './PixelCanvas.svelte';
	import { drawCharacter, drawFloatingHearts, PALETTE } from '$lib/utils/pixel';

	const WIDTH = 64;
	const HEIGHT = 48;

	function draw(ctx: CanvasRenderingContext2D, frame: number) {
		drawCharacter(ctx, 28, 14, frame);
		ctx.globalAlpha = 0.5;
		drawFloatingHearts(ctx, frame, WIDTH, HEIGHT, 4);
		ctx.globalAlpha = 1;
	}
</script>

<div class="manifesto-canvas">
	<PixelCanvas width={WIDTH} height={HEIGHT} {draw} fps={8} />
</div>

<style>
	.manifesto-canvas {
		width: 96px;
		height: 72px;
		flex-shrink: 0;
		border: 1px solid var(--border);
	}

	.manifesto-canvas :global(.pixel-canvas) {
		height: 72px;
	}
</style>
