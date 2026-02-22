<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import FloatingHeartsCanvas from '$lib/components/pixel/FloatingHeartsCanvas.svelte';

	let { children } = $props();
</script>

<FloatingHeartsCanvas />

<div class="app">
	<Header />
	<main class="main">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 1;
	}

	.main {
		flex: 1;
	}
</style>
