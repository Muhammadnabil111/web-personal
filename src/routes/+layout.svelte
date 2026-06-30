<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Muhammad Nabil — UI/UX Designer & Geospatial Analyst</title>
	<meta name="description" content="Portfolio of Muhammad Nabil. A unique hybrid of UI/Web Designer & Geospatial Analyst crafting intuitive spatial interfaces and data-driven digital experiences." />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
</svelte:head>

<main class="min-h-screen bg-bg-dark font-sans text-neutral-200 antialiased selection:bg-accent-cyan/30 selection:text-white relative overflow-x-hidden">
	{@render children()}
</main>
