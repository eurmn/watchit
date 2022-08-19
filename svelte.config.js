import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const dev = process.env.VITE_MODE === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		paths: {
			base: dev ? '' : '/watchit',
		},
	},
};

console.log(config.kit.paths)

export default config;
