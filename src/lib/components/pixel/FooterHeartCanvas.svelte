<script lang="ts">
	import PixelCanvas from './PixelCanvas.svelte';
	import { drawPulsingHeart, PALETTE } from '$lib/utils/pixel';

	const WIDTH = 20;
	const HEIGHT = 20;

	function draw(ctx: CanvasRenderingContext2D, frame: number) {
		drawPulsingHeart(ctx, 10, 10, frame, PALETTE.accent);
	}
</script>

<div class="footer-heart">
	<PixelCanvas width={WIDTH} height={HEIGHT} {draw} fps={6} />
</div>

<style>
	.footer-heart {
		width: 20px;
		height: 20px;
		flex-shrink: 0;
	}
</style>
