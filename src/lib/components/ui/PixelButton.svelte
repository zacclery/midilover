<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'ghost';
		href?: string;
		children: Snippet;
		[key: string]: unknown;
	}

	let { variant = 'primary', href, children, ...rest }: Props = $props();
</script>

{#if href}
	<a {href} class="pixel-btn {variant}" {...rest}>
		{@render children()}
	</a>
{:else}
	<button class="pixel-btn {variant}" {...rest}>
		{@render children()}
	</button>
{/if}

<style>
	.pixel-btn {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		font-weight: 500;
		text-transform: lowercase;
		letter-spacing: var(--tracking-wide);
		padding: var(--space-2) var(--space-4);
		border: var(--pixel-border);
		box-shadow: var(--pixel-shadow);
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		transition: transform var(--transition-fast),
			box-shadow var(--transition-fast);
		text-decoration: none;
	}

	.pixel-btn:hover {
		transform: translate(-1px, -1px);
		box-shadow: var(--pixel-shadow-hover);
	}

	.pixel-btn:active {
		transform: translate(2px, 2px);
		box-shadow: none;
	}

	.primary {
		background: var(--accent);
		color: var(--bg);
		border-color: var(--accent);
	}

	.primary:hover {
		background: var(--accent-bright);
	}

	.secondary {
		background: var(--bg-surface);
		color: var(--fg);
		border-color: var(--border);
	}

	.secondary:hover {
		background: var(--bg-hover);
		border-color: var(--border-hover);
	}

	.ghost {
		background: transparent;
		color: var(--fg-muted);
		border-color: transparent;
		box-shadow: none;
	}

	.ghost:hover {
		color: var(--fg);
		border-color: var(--border);
		box-shadow: var(--pixel-shadow);
	}
</style>
