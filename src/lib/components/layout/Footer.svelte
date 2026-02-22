<script lang="ts">
	import FooterHeartCanvas from '$lib/components/pixel/FooterHeartCanvas.svelte';
</script>

<footer class="footer">
	<div class="footer-inner container">
		<div class="footer-brand">
			<div class="brand-row">
				<FooterHeartCanvas />
				<span class="brand">midi-lover</span>
				<FooterHeartCanvas />
			</div>
			<span class="tagline">virtual instruments for pixel people</span>
		</div>

		<nav class="footer-links">
			<a href="/shop">shop</a>
			<a href="/tools">tools</a>
			<a href="/about">about</a>
		</nav>

		<div class="footer-copy">
			<span class="label">&copy; {new Date().getFullYear()} midi-lover</span>
		</div>
	</div>
</footer>

<style>
	.footer {
		border-top: var(--pixel-border);
		padding: var(--space-10) 0;
		margin-top: var(--space-20);
	}

	.footer-inner {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		align-items: center;
		text-align: center;
	}

	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		align-items: center;
	}

	.brand-row {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.brand {
		font-size: var(--text-base);
		font-weight: 700;
		letter-spacing: var(--tracking-wide);
		text-transform: lowercase;
		color: var(--fg);
	}

	.tagline {
		font-size: var(--text-xs);
		color: var(--fg-muted);
		letter-spacing: var(--tracking-wider);
		text-transform: lowercase;
	}

	.footer-links {
		display: flex;
		gap: var(--space-6);
	}

	.footer-links a {
		font-size: var(--text-sm);
		color: var(--fg-muted);
		text-decoration: none;
		letter-spacing: var(--tracking-wide);
		text-transform: lowercase;
	}

	.footer-links a:hover {
		color: var(--accent);
	}

	.footer-copy {
		color: var(--fg-dim);
	}
</style>
