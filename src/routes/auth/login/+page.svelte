<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import PixelBorder from '$lib/components/ui/PixelBorder.svelte';
	import PixelButton from '$lib/components/ui/PixelButton.svelte';
	import PixelLoader from '$lib/components/ui/PixelLoader.svelte';

	let mode: 'login' | 'register' = $state('login');
	let email = $state('');
	let password = $state('');
	let name = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		loading = true;

		try {
			if (mode === 'register') {
				const res = await fetch('/auth/register', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password, name })
				});

				const data = await res.json();
				if (!res.ok) {
					error = data.error;
					loading = false;
					return;
				}
			}

			await signIn('credentials', { email, password, redirectTo: '/dashboard' });
		} catch {
			error = 'Something went wrong. Please try again.';
			loading = false;
		}
	}

	function toggleMode() {
		mode = mode === 'login' ? 'register' : 'login';
		error = '';
	}
</script>

<svelte:head>
	<title>{mode === 'login' ? 'sign in' : 'create account'} - midi-lover</title>
</svelte:head>

<div class="auth-page">
	<div class="auth-container">
		<PixelBorder>
			<div class="auth-content">
				<h1>{mode === 'login' ? 'sign in' : 'create account'}</h1>

				<button class="google-btn" onclick={() => signIn('google', { redirectTo: '/dashboard' })}>
					<svg viewBox="0 0 24 24" width="18" height="18">
						<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
						<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
						<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
						<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
					</svg>
					continue with google
				</button>

				<div class="divider">
					<span>or</span>
				</div>

				<form onsubmit={handleSubmit}>
					{#if mode === 'register'}
						<label class="field">
							<span class="label">name</span>
							<input type="text" bind:value={name} placeholder="your name" />
						</label>
					{/if}

					<label class="field">
						<span class="label">email</span>
						<input type="email" bind:value={email} placeholder="you@example.com" required />
					</label>

					<label class="field">
						<span class="label">password</span>
						<input type="password" bind:value={password} placeholder="min 8 characters" required minlength="8" />
					</label>

					{#if error}
						<p class="error">{error}</p>
					{/if}

					<PixelButton variant="primary" type="submit" disabled={loading}>
						{#if loading}
							<PixelLoader size={14} />
						{:else}
							{mode === 'login' ? 'sign in' : 'create account'}
						{/if}
					</PixelButton>
				</form>

				<p class="toggle">
					{mode === 'login' ? "don't have an account?" : 'already have an account?'}
					<button class="toggle-btn" onclick={toggleMode}>
						{mode === 'login' ? 'create one' : 'sign in'}
					</button>
				</p>
			</div>
		</PixelBorder>
	</div>
</div>

<style>
	.auth-page {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: calc(100vh - var(--header-height) - 200px);
		padding: var(--space-8) var(--space-6);
	}

	.auth-container {
		width: 100%;
		max-width: 400px;
	}

	.auth-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	h1 {
		font-size: var(--text-xl);
		text-align: center;
	}

	.google-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-3);
		width: 100%;
		padding: var(--space-3) var(--space-4);
		background: var(--bg-surface);
		border: var(--pixel-border);
		box-shadow: var(--pixel-shadow);
		color: var(--fg);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		font-weight: 500;
		letter-spacing: var(--tracking-wide);
		text-transform: lowercase;
		cursor: pointer;
		transition: transform var(--transition-fast), box-shadow var(--transition-fast);
	}

	.google-btn:hover {
		transform: translate(-1px, -1px);
		box-shadow: var(--pixel-shadow-hover);
		background: var(--bg-hover);
	}

	.google-btn:active {
		transform: translate(2px, 2px);
		box-shadow: none;
	}

	.divider {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		color: var(--fg-dim);
		font-size: var(--text-xs);
		text-transform: lowercase;
		letter-spacing: var(--tracking-wider);
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid var(--border);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	input {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		padding: var(--space-2) var(--space-3);
		background: var(--bg);
		color: var(--fg);
		border: var(--pixel-border);
		outline: none;
		transition: border-color var(--transition-fast);
	}

	input:focus {
		border-color: var(--accent);
	}

	input::placeholder {
		color: var(--fg-dim);
	}

	.error {
		font-size: var(--text-xs);
		color: var(--accent-bright);
	}

	.toggle {
		text-align: center;
		font-size: var(--text-xs);
		color: var(--fg-muted);
	}

	.toggle-btn {
		background: none;
		border: none;
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		cursor: pointer;
		text-decoration: underline;
		padding: 0;
	}

	.toggle-btn:hover {
		color: var(--accent-bright);
	}
</style>
