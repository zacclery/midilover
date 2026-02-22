<script lang="ts">
	interface Props {
		size?: number;
	}

	let { size = 16 }: Props = $props();
</script>

<div class="loader" style:width="{size}px" style:height="{size}px"></div>

<style>
	.loader {
		display: inline-block;
		position: relative;
	}

	.loader::before,
	.loader::after {
		content: '';
		position: absolute;
		background: var(--accent);
	}

	.loader::before {
		width: 40%;
		height: 40%;
		top: 0;
		left: 0;
		animation: pixel-load 0.8s steps(4) infinite;
	}

	.loader::after {
		width: 40%;
		height: 40%;
		bottom: 0;
		right: 0;
		animation: pixel-load 0.8s steps(4) infinite reverse;
	}

	@keyframes pixel-load {
		0% { transform: translate(0, 0); }
		25% { transform: translate(150%, 0); }
		50% { transform: translate(150%, 150%); }
		75% { transform: translate(0, 150%); }
		100% { transform: translate(0, 0); }
	}
</style>
