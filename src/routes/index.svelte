<script lang="ts">
	import type { Instance } from 'webtorrent';
	import type { MovieData } from '../types/types';
	import WebTorrent from 'webtorrent/webtorrent.min';
	import SearchBar from '../components/SearchBar.svelte';
	import ProgressBar from '../components/ProgressBar.svelte';

	let client: Instance = new WebTorrent();
	let currentMovie: MovieData;

	function handleMovieSelected(movie: MovieData): void {
		console.log('Movie Selected: ', movie.title);
		currentMovie = movie;
	}
</script>

<svelte:head>
	<title>watchit</title>
</svelte:head>

<main class="p-5 w-full h-full bg-slate-200 text-slate-900 flex justify-center">
	{#if currentMovie}
		<ProgressBar currentMovie={currentMovie} />
	{:else}
		<SearchBar onMovieSelected={handleMovieSelected} />
	{/if}
</main>
