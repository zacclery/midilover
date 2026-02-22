<script lang="ts">
	import PixelCanvas from './PixelCanvas.svelte';
	import { drawPulsingHeart, PALETTE } from '$lib/utils/pixel';

	const WIDTH = 32;
	const HEIGHT = 20;

	function draw(ctx: CanvasRenderingContext2D, frame: number) {
		drawPulsingHeart(ctx, 16, 10, frame, PALETTE.accent);
	}
</script>

<div class="heart-logo">
	<PixelCanvas width={WIDTH} height={HEIGHT} {draw} fps={6} />
</div>

<style>
	.heart-logo {
		width: 32px;
		height: 20px;
		flex-shrink: 0;
	}
</style>
