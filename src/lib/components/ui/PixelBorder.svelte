<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		accent?: string;
		hover?: boolean;
		children: Snippet;
	}

	let { accent, hover = false, children }: Props = $props();
</script>

<div
	class="pixel-border"
	class:hoverable={hover}
	style:--accent={accent}
>
	{@render children()}
</div>

<style>
	.pixel-border {
		border: var(--pixel-border);
		box-shadow: var(--pixel-shadow);
		background: var(--bg-raised);
		padding: var(--space-4);
	}

	.pixel-border[style*='--accent'] {
		border-color: var(--accent);
		box-shadow: 2px 2px 0 var(--accent);
	}

	.hoverable {
		transition: transform var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.hoverable:hover {
		transform: translate(-1px, -1px);
		box-shadow: var(--pixel-shadow-hover);
	}
</style>
