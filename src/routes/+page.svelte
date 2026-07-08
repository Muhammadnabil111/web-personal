<script lang="ts">
	import { base } from "$app/paths";
	import StarBackground from "$lib/components/StarBackground.svelte";

	import Navbar from "$lib/components/Navbar.svelte";
	import Marquee from "$lib/components/Marquee.svelte";
	import { fade } from "svelte/transition";
	import {
		ArrowUpRight,
		Mail,
		PenTool,
		LayoutGrid,
		Map,
		Globe,
		MapPin,
		X,
	} from "lucide-svelte";

	let tools = [
		{
			name: "Figma",
			icon: "fa-brands fa-figma",
			color: "#a259ff",
			subtitle: "UI/UX Design Tool",
		},
		{
			name: "JavaScript",
			icon: "fa-brands fa-js",
			color: "#F7DF1E",
			subtitle: "Programming Language",
		},
		{
			name: "SvelteKit",
			icon: "fa-brands fa-svelte",
			color: "#FF3E00",
			subtitle: "Web Framework",
		},
		{
			name: "TailwindCSS",
			icon: "fa-brands fa-tailwind-css",
			color: "#06B6D4",
			subtitle: "Utility-first CSS",
		},
		{
			name: "Git",
			icon: "fa-brands fa-git-alt",
			color: "#F05032", // Diperbaiki ke oranye/merah resmi Git
			subtitle: "Version Control System", // Diperbaiki dari "Desktop GIS Software"
		},
		{
			name: "ArcGIS",
			icon: "fa-solid fa-map-location-dot",
			color: "#0079C1",
			subtitle: "Enterprise GIS Platform",
		},
		{
			name: "PostgreSQL",
			icon: "fa-brands fa-postgresql fa-xl",
			color: "#336791",
			subtitle: "Relational Database",
		},
		{
			name: "PHP",
			icon: "fa-brands fa-php",
			color: "#777BB4", // Diperbaiki ke ungu/biru resmi PHP
			subtitle: "Server-side Scripting",
		},
		{
			name: "OpenAI",
			icon: "fa-brands fa-openai",
			color: "#FFFFFF", // Diperbaiki dari typo "#fffffff" (cocok untuk dark mode)
			subtitle: "AI Assistant",
		},
		{
			name: "Claude",
			icon: "fa-brands fa-claude",
			color: "#D97757",
			subtitle: "AI Assistant",
		},
		{
			name: "Visual Studio Code",
			icon: "fa-solid fa-code",
			color: "#007ACC",
			subtitle: "Code Editor",
		},
		{
			name: "GitHub",
			icon: "fa-brands fa-github",
			color: "#FFFFFF", // Putih standar untuk dark mode UI
			subtitle: "Code Repository",
		},
		{
			name: "Node.js", // Diperjelas menjadi Node.js
			icon: "fa-brands fa-node",
			color: "#339933", // Diperbaiki ke hijau resmi Node.js
			subtitle: "JavaScript Runtime", // Diperbaiki dari "Code Editor"
		},
		{
			name: "HTML5",
			icon: "fa-brands fa-html5",
			color: "#E34F26", // Diperbaiki ke oranye resmi HTML5
			subtitle: "Markup Language", // Diperbaiki dari "Code Repository"
		},
	];

	let filterCategory = $state("All");
	let categories = ["All", "Mobile Design", "Desktop / PC Design"];

	let selectedProject = $state<any>(null);

	let projects = [
		{
			title: "GeoPortal Dashboard Design System",
			category: "Mobile Design",
			role: "UX/UI Designer",
			img: "/images/project/Group2362.png",
			description:
				"This project was created to address the complex data visualization needs of urban planners, providing a streamlined mobile interface for geospatial data analysis.",
			designThinking:
				"The design process began with extensive user research, followed by wireframing and iterative prototyping. We focused on clear typography, accessible color palettes for maps, and intuitive navigation gestures.",
		},
		{
			title: "Uber Eats App Redesign",
			category: "Mobile Design",
			role: "GIS Developer",
			img: "/images/project/Group2357.png",
			description:
				"A conceptual redesign of the Uber Eats app focusing on improved mapping features, order tracking precision, and a cleaner user interface.",
			designThinking:
				"I analyzed the current app's pain points, created user journey maps, and designed a more seamless flow from restaurant selection to delivery tracking, incorporating better spatial visualization.",
		},
		{
			title: "To-Do App",
			category: "Mobile Design",
			role: "Product Designer",
			img: "/images/project/group.png",
			description:
				"A minimalist task management application designed for focus and productivity, reducing cognitive load through a clean aesthetic.",
			designThinking:
				"The approach centered around minimalism. I stripped away non-essential features, focusing on quick task entry, satisfying completion animations, and a calm color palette to reduce stress.",
		},
		{
			title: "Ferarri Web Redesign",
			category: "Desktop / PC Design",
			role: "Geospatial Analyst",
			img: "/images/project/group1.png",
			description:
				"A dynamic web experience for Ferrari, highlighting performance and luxury through high-quality imagery and smooth interactions.",
			designThinking:
				"The design emphasizes motion and elegance. I used a dark theme to make the red colors pop, incorporated subtle scroll animations, and ensured the layout reflected the premium nature of the brand.",
		},
		{
			title: "The Batman Web App",
			category: "Desktop / PC Design",
			role: "UI Designer",
			img: "/images/project/group2.png",
			description:
				"An immersive promotional web application for 'The Batman', featuring interactive elements and deep lore integration.",
			designThinking:
				"I adopted a dark, gritty aesthetic to match the film's tone. The UI uses sharp angles, stark contrasts, and interactive 'clues' that users can discover, gamifying the browsing experience.",
		},
		{
			title: "Steam Web Redesign",
			category: "Desktop / PC Design",
			role: "GIS Analyst",
			img: "/images/project/group3.png",
			description:
				"A modernized interface for the Steam web storefront, improving discoverability, game presentation, and community features.",
			designThinking:
				"The goal was to declutter the storefront. I implemented a card-based layout for better readability, improved the search and filtering UX, and gave more prominence to community reviews and gameplay media.",
		},
	];

	let filteredProjects = $derived(
		filterCategory === "All"
			? projects
			: projects.filter((p) => p.category === filterCategory),
	);

	let contentVisible = $state(false);

	// Action untuk animasi fade up saat scroll
	function fadeUp(node: HTMLElement) {
		node.classList.add(
			"opacity-0",
			"translate-y-12",
			"transition-all",
			"duration-[1000ms]",
			"ease-out",
		);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						node.classList.remove("opacity-0", "translate-y-12");
						node.classList.add("opacity-100", "translate-y-0");
						observer.unobserve(node);
					}
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			},
		};
	}
</script>

<StarBackground onWarpEnd={() => (contentVisible = true)} />

{#if contentVisible}
	<div in:fade={{ duration: 1500, delay: 200 }}>
		<Navbar />

		<div
			class="relative z-10 w-full max-w-6xl mx-auto px-6 pt-8 sm:pt-32 pb-32 sm:pb-24 flex flex-col gap-32"
		>
			<!-- Hero Section -->
			<header
				use:fadeUp
				class="flex flex-col items-center text-center gap-6 fade-in-on-load pt-4 sm:pt-8"
			>
				<div
					class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4"
				>
					<span
						class="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"
					></span>
					<span
						class="text-sm font-medium tracking-wide text-neutral-300"
						>Available for freelance opportunities</span
					>
				</div>

				<h1
					class="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neutral-500"
				>
					Crafting Intuitive Interfaces.<br />
					<span
						class="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-emerald"
						>Mapping Complex Realities.</span
					>
				</h1>

				<p
					class="text-lg md:text-xl text-neutral-400 max-w-2xl mt-4 leading-relaxed font-[500]"
				>
					Hi, I'm <strong class="text-white font-semibold"
						>Muhammad Nabil</strong
					>. A hybrid UI/Web Designer & Geospatial Analyst building
					high-performance, data-driven digital experiences.
				</p>

				<div
					class="flex flex-wrap items-center justify-center gap-4 mt-8"
				>
					<a
						href="/pdf/Presentation.pdf"
						download="Presentation.pdf"
						class="px-8 py-4 rounded-full bg-white text-bg-dark font-semibold transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
					>
						<i class="fa-brands fa-behance"></i> Project Presentation
					</a>
				</div>
			</header>

			<!-- Core Stack & Technologies -->
			<section
				use:fadeUp
				class="flex flex-col gap-8 md:gap-12 pt-10"
				id="tech-stack"
			>
				<div class="flex flex-col gap-4">
					<h2
						class="text-3xl md:text-[64px] font-semibold tracking-tight leading-none text-white"
					>
						Core Stack & Tech
					</h2>
				</div>
				<!-- Desktop Grid -->
				<ul class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{#each tools as tool}
						<li
							class="flex items-center justify-start gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/20 group"
							title={tool.name}
						>
							<div
								class="w-12 h-12 shrink-0 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all"
							>
								<i
									class="{tool.icon} text-2xl group-hover:scale-110 transition-transform duration-300"
									style="color: {tool.color || '#ffffff'}"
								></i>
							</div>
							<div class="flex flex-col">
								<span
									class="text-base font-bold text-white/90 group-hover:text-white transition-colors"
									>{tool.name}</span
								>
								<span
									class="text-xs text-neutral-400 font-medium group-hover:text-neutral-300 transition-colors"
									>{tool.subtitle}</span
								>
							</div>
						</li>
					{/each}
				</ul>

				<!-- Mobile Marquee -->
				<div class="flex flex-col gap-4 sm:hidden -mx-6">
					<Marquee items={tools.slice(0, 5)} reverse={true} />
					<Marquee items={tools.slice(5, 10)} reverse={false} />
					<Marquee items={tools.slice(10, 14)} reverse={true} />
				</div>
			</section>

			<!-- Expertise / Services (Bento Grid) -->
			<section use:fadeUp class="flex flex-col gap-12" id="expertise">
				<div class="flex flex-col gap-4">
					<h2
						class="text-3xl md:text-[64px] font-semibold tracking-tight leading-none text-white"
					>
						Expertise & Services
					</h2>
					<p class="text-neutral-400 font-[600] text-lg">
						Bridging the gap between spatial data and human-centric
						design.
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
					<!-- Card 1 -->
					<div
						class="group relative p-8 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col gap-4 transition-all duration-500 hover:border-white/20 hover:from-white/[0.09] hover:to-white/[0.04] hover:-translate-y-2 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.9),0_0_40px_-10px_rgba(6,182,212,0.2),inset_0_1px_1px_rgba(255,255,255,0.15)]"
					>
						<!-- Nebula Glow -->
						<div
							class="absolute -top-24 -right-24 w-64 h-64 bg-accent-cyan/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
						></div>

						<div
							class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-cyan via-accent-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
						></div>

						<div
							class="relative z-10 w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-accent-cyan mb-2 group-hover:scale-110 group-hover:bg-accent-cyan/10 group-hover:border-accent-cyan/30 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
						>
							<PenTool size={26} strokeWidth={1.5} />
						</div>
						<h3
							class="relative z-10 text-2xl font-bold text-white/80 group-hover:text-white transition-colors duration-300"
						>
							UI/UX Design
						</h3>
						<p
							class="relative z-10 text-neutral-400 text-sm leading-relaxed font-[500] group-hover:text-neutral-300 transition-colors duration-300"
						>
							Crafting beautiful, accessible wireframes,
							high-fidelity prototypes, and comprehensive design
							systems focusing on user experience.
						</p>
					</div>

					<!-- Card 2 -->
					<div
						class="group relative p-8 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col gap-4 transition-all duration-500 hover:border-white/20 hover:from-white/[0.09] hover:to-white/[0.04] hover:-translate-y-2 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.9),0_0_40px_-10px_rgba(16,185,129,0.2),inset_0_1px_1px_rgba(255,255,255,0.15)]"
					>
						<!-- Nebula Glow -->
						<div
							class="absolute -bottom-24 -left-24 w-64 h-64 bg-accent-emerald/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
						></div>

						<div
							class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-emerald via-accent-emerald/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
						></div>

						<div
							class="relative z-10 w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-accent-emerald mb-2 group-hover:scale-110 group-hover:bg-accent-emerald/10 group-hover:border-accent-emerald/30 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
						>
							<LayoutGrid size={26} strokeWidth={1.5} />
						</div>
						<h3
							class="relative z-10 text-2xl font-bold text-white/80 group-hover:text-white transition-colors duration-300"
						>
							Web Development
						</h3>
						<p
							class="relative z-10 text-neutral-400 text-sm leading-relaxed font-[500] group-hover:text-neutral-300 transition-colors duration-300"
						>
							Building fast, responsive, and fully optimized
							modern web applications using tools like SvelteKit,
							Tailwind CSS, and Vite.
						</p>
					</div>

					<!-- Card 3 -->
					<div
						class="group relative p-8 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col gap-4 transition-all duration-500 hover:border-white/20 hover:from-white/[0.09] hover:to-white/[0.04] hover:-translate-y-2 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.9),0_0_40px_-10px_rgba(168,85,247,0.2),inset_0_1px_1px_rgba(255,255,255,0.15)]"
					>
						<!-- Nebula Glow -->
						<div
							class="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
						></div>

						<div
							class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
						></div>

						<div
							class="relative z-10 w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-purple-400 mb-2 group-hover:scale-110 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
						>
							<Globe size={26} strokeWidth={1.5} />
						</div>
						<h3
							class="relative z-10 text-2xl font-bold text-white/80 group-hover:text-white transition-colors duration-300"
						>
							Geospatial Analysis
						</h3>
						<p
							class="relative z-10 text-neutral-400 text-sm leading-relaxed font-[500] group-hover:text-neutral-300 transition-colors duration-300"
						>
							Translating complex spatial data into actionable
							insights using QGIS, ArcGIS, Spatial Data
							Visualization, and WebGIS architectures.
						</p>
					</div>
				</div>
			</section>

			<!-- Projects Showcase -->
			<section use:fadeUp class="flex flex-col gap-12" id="projects">
				<div
					class="flex flex-col md:flex-row md:items-end justify-between gap-6"
				>
					<div class="flex flex-col gap-4">
						<h2
							class="text-3xl md:text-[64px] font-semibold tracking-tight leading-none text-white"
						>
							Selected Works
						</h2>
						<p class="text-neutral-400 font-[600] text-lg">
							A showcase of user interfaces and design systems.
						</p>
					</div>

					<!-- Filter Pills -->
					<div
						class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar"
					>
						{#each categories as category}
							<button
								onclick={() => (filterCategory = category)}
								class="px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border
							{filterCategory === category
									? 'bg-white text-bg-dark border-transparent shadow-[0_0_15px_rgba(255,255,255,0.15)]'
									: 'bg-white/5 text-neutral-400 border-white/10 hover:bg-white/10 hover:text-white'}"
							>
								{category}
							</button>
						{/each}
					</div>
				</div>

				<!-- Masonry/Grid -->
				<div
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{#each filteredProjects as project (project.title)}
						<button
							class="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-[4/3] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-accent-cyan w-full h-full"
							onclick={() => (selectedProject = project)}
						>
							<!-- Image -->
							<img
								src="{base}{project.img}"
								alt={project.title}
								class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>

							<!-- Overlay -->
							<div
								class="absolute inset-0 bg-gradient-to-t from-[#030305]/90 via-[#030305]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
							>
								<div
									class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
								>
									<div
										class="flex items-center justify-between mb-2"
									>
										<span
											class="text-xs font-mono tracking-wider text-accent-cyan px-2 py-1 bg-accent-cyan/10 rounded-md border border-accent-cyan/20"
										>
											{project.category}
										</span>
										<ArrowUpRight
											size={20}
											class="text-white opacity-50 group-hover:opacity-100 transition-opacity"
										/>
									</div>
									<h4
										class="text-xl font-bold text-white mb-1"
									>
										{project.title}
									</h4>
									<p
										class="text-neutral-400 text-sm flex items-center gap-2"
									>
										<span
											class="w-1 h-1 rounded-full bg-accent-emerald"
										></span>
										{project.role}
									</p>
								</div>
							</div>
						</button>
					{/each}
				</div>
			</section>

			<!-- Footer / Contact -->
			<footer
				use:fadeUp
				class="mt-12 mb-8 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
				id="contact"
			>
				<div class="flex flex-col items-center md:items-start gap-6">
					<h2
						class="text-3xl md:text-[64px] font-semibold tracking-tight leading-none text-white text-center md:text-left"
					>
						Let's work together.
					</h2>
					<p
						class="text-neutral-400 text-center md:text-left max-w-sm font-[600]"
					>
						Open for new opportunities and collaborations. Feel free
						to reach out.
					</p>
					<a
						href="mailto:ngastag@gmail.com"
						class="inline-flex items-center gap-2 mt-2 px-6 py-3 rounded-xl bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 font-medium hover:bg-accent-cyan hover:text-bg-dark transition-colors duration-300"
					>
						<Mail size={18} />
						ngastag@gmail.com
					</a>
				</div>

				<div class="flex gap-4">
					<a
						href="https://www.linkedin.com/in/muhammad-nabiel/"
						target="_blank"
						class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path
								d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
							/><rect width="4" height="12" x="2" y="9" /><circle
								cx="4"
								cy="4"
								r="2"
							/></svg
						>
					</a>
					<a
						href="https://github.com/Muhammadnabil111"
						target="_blank"
						class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path
								d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
							/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
						>
					</a>
					<a
						href="https://dribbble.com/elinestudio"
						target="_blank"
						class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><circle cx="12" cy="12" r="10" /><path
								d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"
							/><path
								d="M21.75 12.84c-6.6.28-11.85-2.48-14.88-6.19"
							/><path d="M16 22c-1.39-4.53-4-8.8-8-11.45" /><path
								d="M8.25 15.68c3.21 2.2 5.58 5.63 6.35 9.13"
							/></svg
						>
					</a>
				</div>
			</footer>
		</div>
	</div>
{/if}

<!-- Project Modal View -->
{#if selectedProject}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 fade-in-on-load"
	>
		<!-- Backdrop -->
		<div
			class="absolute inset-0 bg-[#030305]/80 backdrop-blur-md"
			onclick={() => (selectedProject = null)}
			aria-hidden="true"
		></div>

		<!-- Modal Content -->
		<div
			class="relative w-full max-w-3xl bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
		>
			<!-- Close button -->
			<button
				class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/80 backdrop-blur-md transition-colors"
				onclick={() => (selectedProject = null)}
			>
				<X size={20} />
			</button>

			<div class="overflow-y-auto hide-scrollbar flex-1">
				<!-- Image Header -->
				<div class="w-full relative bg-black/50">
					<img
						src="{base}{selectedProject.img}"
						alt={selectedProject.title}
						class="w-full h-auto object-contain block"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/90 via-transparent to-transparent pointer-events-none"
					></div>
				</div>

				<!-- Content Body -->
				<div class="p-6 sm:p-10 relative z-10">
					<div class="flex items-center gap-3 mb-4">
						<span
							class="text-xs font-mono tracking-wider text-accent-cyan px-2.5 py-1 bg-accent-cyan/10 rounded-md border border-accent-cyan/20"
						>
							{selectedProject.category}
						</span>
						<span
							class="text-sm text-neutral-400 flex items-center gap-2"
						>
							<span class="w-1 h-1 rounded-full bg-accent-emerald"
							></span>
							{selectedProject.role}
						</span>
					</div>

					<h3 class="text-3xl sm:text-4xl font-bold mb-8 text-white">
						{selectedProject.title}
					</h3>

					<div class="flex flex-col gap-8">
						<div class="flex flex-col gap-3">
							<h4
								class="text-xl font-semibold text-white/90 border-b border-white/10 pb-2"
							>
								Project Overview
							</h4>
							<p
								class="text-neutral-300 leading-relaxed font-[390]"
							>
								{selectedProject.description}
							</p>
						</div>

						<div class="flex flex-col gap-3">
							<h4
								class="text-xl font-semibold text-white/90 border-b border-white/10 pb-2"
							>
								Design Thinking Process
							</h4>
							<p
								class="text-neutral-300 leading-relaxed font-[390]"
							>
								{selectedProject.designThinking}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
