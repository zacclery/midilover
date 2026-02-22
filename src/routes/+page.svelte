<script lang="ts">
	import HeroScene from '$lib/components/pixel/HeroScene.svelte';
	import ProductCardCanvas from '$lib/components/pixel/ProductCardCanvas.svelte';
	import ManifestoCanvas from '$lib/components/pixel/ManifestoCanvas.svelte';
	import PixelButton from '$lib/components/ui/PixelButton.svelte';
	import PixelBorder from '$lib/components/ui/PixelBorder.svelte';

	const products = [
		{
			name: 'pixel synth',
			type: 'web tool',
			description: 'browser-based synthesizer with a retro pixel interface',
			price: '$12',
			canvas: 'synth' as const,
			gumroadUrl: 'https://midilover.gumroad.com/l/pixel-synth'
		},
		{
			name: 'midi mapper',
			type: 'download',
			description: 'map any midi controller to any parameter — drag, drop, done',
			price: '$8',
			canvas: 'mapper' as const,
			gumroadUrl: 'https://midilover.gumroad.com/l/midi-mapper'
		},
		{
			name: 'beat grid',
			type: 'web tool',
			description: 'step sequencer that thinks in pixels — 16 steps, infinite layers',
			price: '$15',
			canvas: 'grid' as const,
			gumroadUrl: 'https://midilover.gumroad.com/l/beat-grid'
		},
		{
			name: 'chord lab',
			type: 'download',
			description: 'explore chord voicings with visual feedback and midi output',
			price: '$10',
			canvas: 'chord' as const,
			gumroadUrl: 'https://midilover.gumroad.com/l/chord-lab'
		}
	];

	let hoveredCard = $state(-1);
</script>

<svelte:head>
	<title>midi lover — virtual instruments for pixel people</title>
	<meta name="description" content="Lo-fi MIDI tools and virtual instruments. Downloads and browser-based tools for music makers." />
</svelte:head>

<div class="landing">
	<!-- hero -->
	<section class="hero container">
		<div class="hero-text">
			<h1 class="hero-title">virtual instruments<br />for pixel people</h1>
			<p class="hero-sub">
				midi tools built with love — downloads and browser-based instruments
				for producers who like their interfaces lo-fi
			</p>
			<div class="hero-actions">
				<PixelButton href="/shop">browse shop</PixelButton>
				<PixelButton variant="secondary" href="/tools">try tools</PixelButton>
			</div>
		</div>
		<HeroScene />
	</section>

	<!-- featured products -->
	<section class="products container">
		<div class="section-header">
			<span class="label">featured</span>
			<h2>our tools</h2>
		</div>
		<div class="product-grid">
			{#each products as product, i}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="product-card"
					onmouseenter={() => hoveredCard = i}
					onmouseleave={() => hoveredCard = -1}
				>
					<PixelBorder hover>
						<div class="card-inner">
							<ProductCardCanvas product={product.canvas} active={hoveredCard === i} />
							<div class="card-header">
								<span class="product-type label">{product.type}</span>
								<span class="product-price">{product.price}</span>
							</div>
							<h3 class="product-name">{product.name}</h3>
							<p class="product-desc">{product.description}</p>
							<PixelButton variant="secondary" href={product.gumroadUrl} target="_blank" rel="noopener">get it</PixelButton>
						</div>
					</PixelBorder>
				</div>
			{/each}
		</div>
	</section>

	<!-- manifesto -->
	<section class="manifesto container">
		<PixelBorder>
			<div class="manifesto-inner">
				<span class="label">our philosophy</span>
				<h2>tools should feel like instruments</h2>
				<div class="manifesto-content">
					<div class="manifesto-text">
						<p>
							we build midi tools that prioritize feel over features. every knob,
							every pixel, every interaction is intentional. no bloat, no subscription
							fatigue — just tools that work.
						</p>
						<p>
							buy once, own forever. or use our browser tools with a simple license.
							we believe music software should be accessible, beautiful, and fun.
						</p>
					</div>
					<ManifestoCanvas />
				</div>
				<div class="manifesto-values">
					<div class="value">
						<span class="value-icon">&#9829;</span>
						<span>pixel-perfect</span>
					</div>
					<div class="value">
						<span class="value-icon">&#9829;</span>
						<span>own your tools</span>
					</div>
					<div class="value">
						<span class="value-icon">&#9829;</span>
						<span>no subscriptions</span>
					</div>
					<div class="value">
						<span class="value-icon">&#9829;</span>
						<span>built with love</span>
					</div>
				</div>
			</div>
		</PixelBorder>
	</section>
</div>

<style>
	.landing {
		padding-top: var(--space-12);
		display: flex;
		flex-direction: column;
		gap: var(--space-24);
	}

	/* hero */
	.hero {
		display: flex;
		flex-direction: column;
		gap: var(--space-10);
	}

	.hero-text {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		max-width: 600px;
	}

	.hero-title {
		font-size: var(--text-3xl);
		color: var(--fg);
	}

	.hero-sub {
		font-size: var(--text-sm);
		color: var(--fg-muted);
		line-height: var(--leading-loose);
		max-width: 480px;
	}

	.hero-actions {
		display: flex;
		gap: var(--space-4);
		margin-top: var(--space-2);
	}

	/* products */
	.section-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		margin-bottom: var(--space-8);
	}

	.section-header h2 {
		font-size: var(--text-xl);
	}

	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: var(--space-4);
	}

	.card-inner {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.product-price {
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--fg);
	}

	.product-name {
		font-size: var(--text-lg);
	}

	.product-desc {
		font-size: var(--text-xs);
		color: var(--fg-muted);
		line-height: var(--leading-loose);
	}

	/* manifesto */
	.manifesto-inner {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-4);
	}

	.manifesto-inner h2 {
		font-size: var(--text-xl);
		max-width: 480px;
	}

	.manifesto-content {
		display: flex;
		gap: var(--space-6);
		align-items: flex-start;
	}

	.manifesto-text {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		max-width: 560px;
		flex: 1;
	}

	.manifesto-text p {
		font-size: var(--text-sm);
		color: var(--fg-muted);
		line-height: var(--leading-loose);
	}

	.manifesto-values {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-6);
		margin-top: var(--space-2);
	}

	.value {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--text-sm);
		color: var(--fg);
		letter-spacing: var(--tracking-wide);
		text-transform: lowercase;
	}

	.value-icon {
		font-size: var(--text-xs);
		color: var(--accent);
	}

	/* responsive */
	@media (max-width: 640px) {
		.hero-title {
			font-size: var(--text-2xl);
		}

		.hero-actions {
			flex-direction: column;
		}

		.product-grid {
			grid-template-columns: 1fr;
		}

		.manifesto-content {
			flex-direction: column;
		}

		.manifesto-values {
			flex-direction: column;
			gap: var(--space-3);
		}
	}
</style>
