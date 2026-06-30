import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Menjaga instruksi bawaan Antigravity untuk mode Runes
		runes: true
	},
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			// Memberi tahu SvelteKit bahwa web akan hidup di /web-personal
			base: process.argv.includes('dev') ? '' : '/web-personal'
		}
	}
};

export default config;