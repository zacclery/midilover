<script lang="ts">
	import ProductCardCanvas from '$lib/components/pixel/ProductCardCanvas.svelte';
	import PixelButton from '$lib/components/ui/PixelButton.svelte';
	import PixelBorder from '$lib/components/ui/PixelBorder.svelte';

	const products = [
		{
			name: 'pixel synth',
			type: 'web tool',
			description: 'browser-based synthesizer with a retro pixel interface. 8-bit waveforms, built-in sequencer, and a pixel-perfect ui that makes sound design feel like art.',
			price: '$12',
			canvas: 'synth' as const,
			gumroadUrl: 'https://midilover.gumroad.com/l/pixel-synth'
		},
		{
			name: 'midi mapper',
			type: 'download',
			description: 'map any midi controller to any parameter — drag, drop, done. works standalone or as a plugin. mac and windows.',
			price: '$8',
			canvas: 'mapper' as const,
			gumroadUrl: 'https://midilover.gumroad.com/l/midi-mapper'
		},
		{
			name: 'beat grid',
			type: 'web tool',
			description: 'step sequencer that thinks in pixels — 16 steps, infinite layers. build drum patterns, melodies, and automations in the browser.',
			price: '$15',
			canvas: 'grid' as const,
			gumroadUrl: 'https://midilover.gumroad.com/l/beat-grid'
		},
		{
			name: 'chord lab',
			type: 'download',
			description: 'explore chord voicings with visual feedback and midi output. learn theory by seeing and hearing it. mac and windows.',
			price: '$10',
			canvas: 'chord' as const,
			gumroadUrl: 'https://midilover.gumroad.com/l/chord-lab'
		}
	];

	let hoveredCard = $state(-1);
</script>

<svelte:head>
	<title>shop — midi lover</title>
	<meta name="description" content="Lo-fi MIDI tools and virtual instruments. Buy once, own forever." />
</svelte:head>

<div class="shop container">
	<div class="shop-header">
		<span class="label">all products</span>
		<h1>shop</h1>
		<p class="shop-sub">buy once, own forever. no subscriptions, no accounts needed.</p>
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
						<h2 class="product-name">{product.name}</h2>
						<p class="product-desc">{product.description}</p>
						<PixelButton href={product.gumroadUrl} target="_blank" rel="noopener">
							get it
						</PixelButton>
					</div>
				</PixelBorder>
			</div>
		{/each}
	</div>
</div>

<style>
	.shop {
		padding-top: var(--space-12);
		padding-bottom: var(--space-12);
	}

	.shop-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		margin-bottom: var(--space-10);
	}

	.shop-header h1 {
		font-size: var(--text-2xl);
	}

	.shop-sub {
		font-size: var(--text-sm);
		color: var(--fg-muted);
		line-height: var(--leading-loose);
	}

	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: var(--space-6);
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

	@media (max-width: 640px) {
		.product-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
