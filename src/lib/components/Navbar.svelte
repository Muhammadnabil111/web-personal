<script lang="ts">
	import { Home, Briefcase, LayoutGrid, Mail } from "lucide-svelte";

	let scrollY = $state(0);

	// When scrolled down more than 50px, we apply higher contrast styling
	let isScrolled = $derived(scrollY > 50);
</script>

<svelte:window bind:scrollY />

<nav
	class="fixed bottom-6 sm:bottom-auto sm:top-6 left-1/2 -translate-x-1/2 z-50 fade-in-on-load transition-all duration-300 w-[calc(100%-3rem)] sm:w-auto max-w-3xl"
>
	<div
		class="flex items-center justify-between sm:justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-2xl border transition-all duration-500 shadow-xl {isScrolled
			? 'bg-[#030305]/95 border-white/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
			: 'bg-[#030305]/40 border-white/5 backdrop-blur-md shadow-black/20'}"
	>
		<a
			href="#"
			class="group flex items-center gap-1.5 sm:gap-2 p-2.5 sm:px-5 sm:py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
			title="Home"
			aria-label="Home"
		>
			<Home class="w-4 h-4 sm:w-5 sm:h-5" />
			<span class="hidden sm:inline text-[11px] sm:text-sm font-medium tracking-wide"
				>Home</span
			>
		</a>

		<div
			class="w-px h-5 bg-white/10 mx-1 hidden sm:block"
		></div>

		<a
			href="#expertise"
			class="group flex items-center gap-1.5 sm:gap-2 p-2.5 sm:px-5 sm:py-2.5 rounded-xl text-neutral-400 hover:text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
			title="Expertise"
			aria-label="Expertise"
		>
			<Briefcase class="w-4 h-4 sm:w-5 sm:h-5" />
			<span
				class="hidden sm:inline text-[11px] sm:text-sm font-medium tracking-wide group-hover:text-accent-cyan transition-colors"
				>Expertise</span
			>
		</a>

		<div
			class="w-px h-5 bg-white/10 mx-1 hidden sm:block"
		></div>

		<a
			href="#projects"
			class="group flex items-center gap-1.5 sm:gap-2 p-2.5 sm:px-5 sm:py-2.5 rounded-xl text-neutral-400 hover:text-accent-emerald hover:bg-accent-emerald/10 transition-colors"
			title="Projects"
			aria-label="Projects"
		>
			<LayoutGrid class="w-4 h-4 sm:w-5 sm:h-5" />
			<span
				class="hidden sm:inline text-[11px] sm:text-sm font-medium tracking-wide group-hover:text-accent-emerald transition-colors"
				>Works</span
			>
		</a>

		<div
			class="w-px h-5 bg-white/10 mx-1 hidden sm:block"
		></div>

		<a
			href="#contact"
			class="group flex items-center gap-1.5 sm:gap-2 p-2.5 sm:px-5 sm:py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
			title="Contact"
			aria-label="Contact"
		>
			<Mail class="w-4 h-4 sm:w-5 sm:h-5" />
			<span class="hidden sm:inline text-[11px] sm:text-sm font-medium tracking-wide"
				>Contact</span
			>
		</a>
	</div>
</nav>
