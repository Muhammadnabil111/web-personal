<script lang="ts">
	import { onMount } from "svelte";

	let universe: HTMLDivElement;

	onMount(() => {
		const starCount = 400;
		const maxTime = 40;

		const width = window.innerWidth;
		const height = window.innerHeight;

		for (let i = 0; i < starCount; ++i) {
			const ypos = Math.round(Math.random() * height);
			const star = document.createElement("div");
			const speed = 1000 * (Math.random() * maxTime + 1);
			star.setAttribute(
				"class",
				"star" + (3 - Math.floor(speed / 1000 / 8)),
			);
			star.style.backgroundColor = "white";

			universe.appendChild(star);
			star.animate(
				[
					{
						transform:
							"translate3d(" + width + "px, " + ypos + "px, 0)",
					},
					{
						transform:
							"translate3d(-" +
							Math.random() * 256 +
							"px, " +
							ypos +
							"px, 0)",
					},
				],
				{
					delay: Math.random() * -speed,
					duration: speed,
					iterations: Infinity,
				},
			);
		}

		return () => {
			if (universe) {
				universe.innerHTML = "";
			}
		};
	});
</script>

<div class="fixed inset-0 pointer-events-none z-0 bg-bg-dark overflow-hidden">
	<!-- Cahaya linear warna Pandora di sisi kanan full atas ke bawah -->
	<div
		class="absolute inset-0 opacity-50 mix-blend-screen"
		style="background: linear-gradient(to right, transparent 40%, #001155 75%, #0077ff 92%, #00f5ff 100%);"
	></div>

	<div bind:this={universe} class="absolute inset-0 overflow-hidden"></div>

	<!-- Dark Overlay (Opsi 4) lebih transparan (40%) -->
	<div class="absolute inset-0 bg-[#0a0a0c]/40"></div>
</div>

<style>
	:global(.star0) {
		height: 1px;
		width: 1px;
		opacity: 1;
		position: absolute;
	}

	:global(.star1) {
		height: 2px;
		width: 2px;
		border-radius: 50%;
		opacity: 1;
		position: absolute;
	}

	:global(.star2) {
		height: 3px;
		width: 3px;
		border-radius: 50%;
		opacity: 1;
		position: absolute;
	}

	:global(.star3) {
		height: 4px;
		width: 4px;
		border-radius: 50%;
		opacity: 1;
		position: absolute;
	}
</style>
