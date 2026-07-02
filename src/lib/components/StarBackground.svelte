<script lang="ts">
	import { onMount } from "svelte";

	let { onWarpEnd = () => {} } = $props();

	let universe: HTMLDivElement;

	onMount(() => {
		const starCount = 400;
		const maxTime = 40;

		const width = window.innerWidth;
		const height = window.innerHeight;

		const animations: Animation[] = [];

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
			const anim = star.animate(
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
			anim.playbackRate = 15;
			animations.push(anim);
		}

		universe.classList.add("warping");

		setTimeout(() => {
			if (universe) universe.classList.remove("warping");

			// Set playback rate to normal instantly to avoid lag.
			// The CSS transition on width and box-shadow will create a smooth visual deceleration effect.
			animations.forEach((anim) => {
				anim.playbackRate = 1;
			});

			// Wait for the CSS deceleration transition to finish before showing content
			setTimeout(() => {
				onWarpEnd();
			}, 1500); // matches the 1.5s CSS transition duration
		}, 1500);

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
	:global(.warping .star0),
	:global(.warping .star1),
	:global(.warping .star2),
	:global(.warping .star3) {
		width: 150px !important;
		border-radius: 0 !important;
		background-color: rgba(255, 255, 255, 0.9) !important;
		box-shadow: 0 0 15px rgba(0, 245, 255, 0.9) !important;
	}

	:global(.star0),
	:global(.star1),
	:global(.star2),
	:global(.star3) {
		transition:
			width 1.5s ease-out,
			background-color 1.5s ease-out,
			box-shadow 1.5s ease-out,
			border-radius 1.5s ease-out;
	}

	:global(.star0) {
		height: 1px;
		width: 5px;
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
