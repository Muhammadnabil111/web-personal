<script lang="ts">
	// Accept an array of objects to show in the marquee
	let { items = [] }: { items: {name: string, icon: string}[] } = $props();
</script>

<div class="relative flex overflow-hidden group mask-horizontal">
	<div class="animate-marquee flex flex-row items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
		{#each [...items, ...items] as item, i (i)}
			<div class="mx-4 flex items-center gap-3 px-5 py-2.5 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm text-neutral-300 font-medium tracking-wide shadow-sm transition-colors hover:border-accent-cyan/30 hover:bg-accent-cyan/5">
				<i class="{item.icon} text-lg text-neutral-400"></i>
				{item.name}
			</div>
		{/each}
	</div>
</div>

<style>
	/* Mask the edges for a fade-in/fade-out effect */
	.mask-horizontal {
		mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
	}
</style>
