import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import inject from '@rollup/plugin-inject';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({})],

	kit: {
		adapter: adapter({
      fallback: 'index.html'
    }),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
    vite: {
      external: [
        'fs'
      ],
      plugins: [
        nodeResolve({ browser: true, preferBuiltins: false }),
        inject({
          Buffer: ['buffer-es6', 'Buffer']
        }),
        nodePolyfills(),
        commonjs(),
      ],
      define: {
        fs: {},
      }
    },
	},
};

export default config;
