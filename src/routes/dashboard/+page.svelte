<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/state';
	import PixelBorder from '$lib/components/ui/PixelBorder.svelte';
	import PixelButton from '$lib/components/ui/PixelButton.svelte';

	const session = $derived(page.data.session);
</script>

<svelte:head>
	<title>account - midi-lover</title>
</svelte:head>

<div class="dashboard">
	<div class="container">
		<h1>account</h1>

		{#if session?.user}
			<PixelBorder>
				<div class="profile">
					{#if session.user.image}
						<img src={session.user.image} alt="avatar" class="avatar" />
					{:else}
						<div class="avatar-placeholder">
							{(session.user.name?.[0] || session.user.email?.[0] || '?').toUpperCase()}
						</div>
					{/if}

					<div class="info">
						{#if session.user.name}
							<p class="name">{session.user.name}</p>
						{/if}
						{#if session.user.email}
							<p class="email">{session.user.email}</p>
						{/if}
					</div>

					<div class="actions">
						<PixelButton variant="secondary" onclick={() => signOut({ redirectTo: '/' })}>
							sign out
						</PixelButton>
					</div>
				</div>
			</PixelBorder>
		{/if}
	</div>
</div>

<style>
	.dashboard {
		padding: var(--space-12) 0;
	}

	h1 {
		font-size: var(--text-2xl);
		margin-bottom: var(--space-8);
	}

	.profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-6);
		text-align: center;
	}

	.avatar {
		width: 64px;
		height: 64px;
		border: var(--pixel-border);
		image-rendering: pixelated;
	}

	.avatar-placeholder {
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--accent-dim);
		border: var(--pixel-border);
		color: var(--fg);
		font-size: var(--text-xl);
		font-weight: 700;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.name {
		font-size: var(--text-lg);
		font-weight: 700;
		letter-spacing: var(--tracking-wide);
		text-transform: lowercase;
	}

	.email {
		font-size: var(--text-sm);
		color: var(--fg-muted);
	}

	.actions {
		margin-top: var(--space-4);
	}
</style>
