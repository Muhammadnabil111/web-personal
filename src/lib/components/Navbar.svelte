<script lang="ts">
	import { Home, Briefcase, LayoutGrid, Mail } from "lucide-svelte";

	let scrollY = $state(0);

	// When scrolled down more than 50px, we apply higher contrast styling
	let isScrolled = $derived(scrollY > 50);
</script>

<svelte:window bind:scrollY />

<nav
	class="fixed bottom-0 sm:bottom-auto sm:top-6 left-0 sm:left-1/2 translate-x-0 sm:-translate-x-1/2 z-50 fade-in-on-load transition-all duration-300 w-full sm:w-auto max-w-3xl"
>
	<div
		class="flex items-center justify-between sm:justify-center gap-1 sm:gap-2 px-4 sm:px-3 py-2 sm:py-2 rounded-none sm:rounded-2xl border-t sm:border transition-all duration-500 shadow-2xl sm:shadow-xl w-full max-w-6xl mx-auto bg-[#030305]/95 {isScrolled
			? 'sm:bg-[#030305]/95 border-white/20 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.8)] sm:shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
			: 'sm:bg-[#030305]/40 border-white/5 backdrop-blur-md shadow-black/20'}"
	>
		<a
			href="#"
			class="group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:px-5 sm:py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
			title="Home"
			aria-label="Home"
		>
			<Home class="w-5 h-5" />
			<span class="text-[10px] sm:text-sm font-medium tracking-wide"
				>Home</span
			>
		</a>

		<div
			class="w-px h-5 bg-white/10 mx-1 hidden sm:block"
		></div>

		<a
			href="#expertise"
			class="group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:px-5 sm:py-2.5 rounded-xl text-neutral-400 hover:text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
			title="Expertise"
			aria-label="Expertise"
		>
			<Briefcase class="w-5 h-5" />
			<span
				class="text-[10px] sm:text-sm font-medium tracking-wide group-hover:text-accent-cyan transition-colors"
				>Expertise</span
			>
		</a>

		<div
			class="w-px h-5 bg-white/10 mx-1 hidden sm:block"
		></div>

		<a
			href="#projects"
			class="group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:px-5 sm:py-2.5 rounded-xl text-neutral-400 hover:text-accent-emerald hover:bg-accent-emerald/10 transition-colors"
			title="Projects"
			aria-label="Projects"
		>
			<LayoutGrid class="w-5 h-5" />
			<span
				class="text-[10px] sm:text-sm font-medium tracking-wide group-hover:text-accent-emerald transition-colors"
				>Works</span
			>
		</a>

		<div
			class="w-px h-5 bg-white/10 mx-1 hidden sm:block"
		></div>

		<a
			href="#contact"
			class="group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:px-5 sm:py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
			title="Contact"
			aria-label="Contact"
		>
			<Mail class="w-5 h-5" />
			<span class="text-[10px] sm:text-sm font-medium tracking-wide"
				>Contact</span
			>
		</a>
	</div>
</nav>
