<script lang="ts">
	interface Props {
		src: string;
		frameWidth: number;
		frameHeight: number;
		frameCount: number;
		fps?: number;
		scale?: number;
		alt?: string;
	}

	let { src, frameWidth, frameHeight, frameCount, fps = 8, scale = 2, alt = '' }: Props = $props();

	let displayWidth = $derived(frameWidth * scale);
	let displayHeight = $derived(frameHeight * scale);
	let sheetWidth = $derived(frameWidth * frameCount * scale);
	let duration = $derived(frameCount / fps);
</script>

<div
	class="sprite pixel-render"
	role="img"
	aria-label={alt}
	style:width="{displayWidth}px"
	style:height="{displayHeight}px"
	style:background-image="url({src})"
	style:background-size="{sheetWidth}px {displayHeight}px"
	style:animation-duration="{duration}s"
	style:--frame-count={frameCount}
></div>

<style>
	.sprite {
		background-repeat: no-repeat;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
		animation: sprite-play var(--duration, 1s) steps(var(--frame-count, 1)) infinite;
	}

	@keyframes sprite-play {
		to {
			background-position: -100% 0;
		}
	}
</style>
