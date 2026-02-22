<script lang="ts">
	import PixelCanvas from './PixelCanvas.svelte';
	import { drawFloatingHearts } from '$lib/utils/pixel';

	const WIDTH = 160;
	const HEIGHT = 200;
	const COUNT = 7;

	function draw(ctx: CanvasRenderingContext2D, frame: number) {
		ctx.globalAlpha = 0.3;
		drawFloatingHearts(ctx, frame, WIDTH, HEIGHT, COUNT);
		ctx.globalAlpha = 1;
	}
</script>

<div class="floating-hearts">
	<PixelCanvas width={WIDTH} height={HEIGHT} {draw} fps={8} />
</div>

<style>
	.floating-hearts {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.floating-hearts :global(.pixel-canvas) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
