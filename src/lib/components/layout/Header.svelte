<script lang="ts">
	import { page } from '$app/state';
	import HeartLogoCanvas from '$lib/components/pixel/HeartLogoCanvas.svelte';

	const session = $derived(page.data.session);
</script>

<header class="header">
	<div class="header-inner container">
		<a href="/" class="logo">
			<HeartLogoCanvas />
			<span class="logo-text">midi-lover</span>
		</a>

		<nav class="nav">
			<a href="/shop" class:active={page.url.pathname.startsWith('/shop')}>shop</a>
			<a href="/tools" class:active={page.url.pathname.startsWith('/tools')}>tools</a>
			{#if session?.user}
				<a href="/dashboard" class:active={page.url.pathname.startsWith('/dashboard')}>
					{session.user.name || 'account'}
				</a>
			{:else}
				<a href="/auth/login" class:active={page.url.pathname.startsWith('/auth')}>sign in</a>
			{/if}
		</nav>
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 100;
		height: var(--header-height);
		background: var(--bg);
		border-bottom: var(--pixel-border);
	}

	.header-inner {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		text-decoration: none;
		color: var(--fg);
	}

	.logo:hover {
		color: var(--accent);
	}

	.logo-text {
		font-size: var(--text-base);
		font-weight: 700;
		letter-spacing: var(--tracking-wide);
		text-transform: lowercase;
	}

	.nav {
		display: flex;
		gap: var(--space-6);
	}

	.nav a {
		font-size: var(--text-sm);
		font-weight: 500;
		letter-spacing: var(--tracking-wide);
		text-transform: lowercase;
		color: var(--fg-muted);
		text-decoration: none;
		padding: var(--space-1) 0;
		border-bottom: 2px solid transparent;
		transition: color var(--transition-fast), border-color var(--transition-fast);
	}

	.nav a:hover,
	.nav a.active {
		color: var(--fg);
		border-bottom-color: var(--accent);
	}
</style>
