<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		width?: number;
		height?: number;
		draw: (ctx: CanvasRenderingContext2D, frame: number) => void;
		fps?: number;
		active?: boolean;
	}

	let { width = 320, height = 180, draw, fps = 12, active = true }: Props = $props();

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d')!;
		ctx.imageSmoothingEnabled = false;

		let frame = 0;
		let lastTime = 0;
		const interval = 1000 / fps;
		let raf: number;

		function loop(time: number) {
			raf = requestAnimationFrame(loop);
			if (!active) return;
			const delta = time - lastTime;
			if (delta < interval) return;
			lastTime = time - (delta % interval);

			ctx.clearRect(0, 0, width, height);
			draw(ctx, frame);
			frame++;
		}

		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	});
</script>

<canvas
	bind:this={canvas}
	{width}
	{height}
	data-pixel
	class="pixel-canvas"
></canvas>

<style>
	.pixel-canvas {
		width: 100%;
		height: auto;
		display: block;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
	}
</style>
