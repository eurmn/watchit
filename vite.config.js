import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from 'unocss/vite';
import { presetIcons, presetUno, extractorSvelte } from 'unocss';
import { defineConfig, loadEnv } from 'vite';

/** @type {import('vite').UserConfig} */
export default ({ mode }) => {
	process.env = {...process.env, ...loadEnv(mode, process.cwd())};

	return defineConfig({
		plugins: [
			sveltekit(),
			UnoCSS({
				presets: [
					presetUno(),
					presetIcons()
				],
				extractors: [extractorSvelte],
			})
		],
	});
};
