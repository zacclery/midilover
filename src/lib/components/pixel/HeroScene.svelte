<script lang="ts">
	import PixelCanvas from './PixelCanvas.svelte';
	import {
		drawSynth,
		drawWaveform,
		drawCharacter,
		drawNotes,
		drawGrid,
		drawFloatingHearts,
		drawPixelHeart,
		drawPixelText,
		PALETTE
	} from '$lib/utils/pixel';

	const WIDTH = 320;
	const HEIGHT = 180;

	function draw(ctx: CanvasRenderingContext2D, frame: number) {
		// background grid
		drawGrid(ctx, WIDTH, HEIGHT);

		// subtle floating hearts in background
		ctx.globalAlpha = 0.25;
		drawFloatingHearts(ctx, frame, WIDTH, HEIGHT, 5);
		ctx.globalAlpha = 1;

		// floating notes
		drawNotes(ctx, frame, WIDTH);

		// waveform
		drawWaveform(ctx, 40, 130, frame);

		// synth
		drawSynth(ctx, 144, 90, frame);

		// character with headphones
		drawCharacter(ctx, 200, 80, frame);

		// larger heart near character
		const heartBob = Math.sin(frame * 0.15) * 3;
		drawPixelHeart(ctx, 220, Math.floor(70 + heartBob), 2, PALETTE.accent);

		// brand text
		ctx.fillStyle = PALETTE.fg;
		ctx.fillRect(110, 150, 100, 1); // underline

		// "midi lover" pixel text
		drawPixelText(ctx, 'midi lover', 112, 158, PALETTE.accent);
	}
</script>

<div class="hero-scene">
	<PixelCanvas width={WIDTH} height={HEIGHT} {draw} fps={10} />
</div>

<style>
	.hero-scene {
		width: 100%;
		max-width: 960px;
		margin-inline: auto;
		border: var(--pixel-border);
		box-shadow: var(--pixel-shadow);
		background: var(--bg);
	}
</style>
