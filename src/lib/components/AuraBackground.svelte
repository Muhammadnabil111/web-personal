<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	// Coords spring for smooth inertial motion
	const coords = spring({ x: 0, y: 0 }, {
		stiffness: 0.04,
		damping: 0.28
	});

	let isVisible = $state(false);
	let mouseMoved = $state(false);

	function handleMouseMove(event: MouseEvent) {
		coords.set({ x: event.clientX, y: event.clientY });
		if (!mouseMoved) {
			mouseMoved = true;
			isVisible = true;
		}
	}

	function handleMouseEnter() {
		isVisible = true;
	}

	function handleMouseLeave() {
		isVisible = false;
	}

	onMount(() => {
		// Set initial position to center of viewport
		coords.set({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
		
		window.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseenter', handleMouseEnter);
		document.addEventListener('mouseleave', handleMouseLeave);
		
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseenter', handleMouseEnter);
			document.removeEventListener('mouseleave', handleMouseLeave);
		};
	});
</script>

<div class="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-bg-dark">
	<!-- Background grid pattern -->
	<div class="absolute inset-0 geo-grid opacity-75"></div>
	
	<!-- Topographic contour lines -->
	<div class="absolute inset-0 topo-lines opacity-60"></div>

	<!-- Coordinates dot pattern -->
	<div class="absolute inset-0 geo-dots opacity-80"></div>

	<!-- Subtle tech data overlays at the screen corners -->
	<div class="absolute top-6 left-6 font-mono text-[9px] text-neutral-500/30 tracking-[0.25em] uppercase hidden md:block">
		SYS_REF: 48N_WGS84 // LAT: 01°17'50.4"N LNG: 103°51'11.2"E
	</div>
	<div class="absolute bottom-6 left-6 font-mono text-[9px] text-neutral-500/30 tracking-[0.25em] uppercase hidden md:block">
		SPATIAL_INDEX: ACTIVE [GRID_RES: 50M]
	</div>
	<div class="absolute top-6 right-6 font-mono text-[9px] text-neutral-500/30 tracking-[0.25em] uppercase hidden md:block">
		UI_FRAMEWORK: SVELTE_5_RUNES
	</div>
	<div class="absolute bottom-6 right-6 font-mono text-[9px] text-neutral-500/30 tracking-[0.25em] uppercase hidden md:block">
		© 2026 MN.PORTFOLIO // STATIC_DEPL_PAGE
	</div>

	<!-- The Mouse-Following Radial Aura -->
	<div 
		class="absolute w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-screen pointer-events-none transition-opacity duration-700 ease-out"
		style="
			left: {$coords.x - 250}px; 
			top: {$coords.y - 250}px;
			opacity: {isVisible ? 0.35 : 0};
			background: radial-gradient(circle, rgba(0, 245, 255, 0.16) 0%, rgba(0, 255, 136, 0.08) 45%, rgba(3, 3, 5, 0) 70%);
		"
	></div>
	
	<!-- Static ambient atmospheric lights to ensure depth on load and touch screens -->
	<div class="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-accent-cyan/4 blur-[130px] pointer-events-none"></div>
	<div class="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] rounded-full bg-accent-emerald/4 blur-[130px] pointer-events-none"></div>
</div>
