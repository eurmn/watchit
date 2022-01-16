<script lang="ts">
  import type { MovieData } from '../types/types';
	import SearchBar from '../components/SearchBar.svelte';
	import ProgressBar from '../components/ProgressBar.svelte';

	let currentMovie: MovieData | null = null;

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
		<ProgressBar currentMovie={currentMovie} onCancel={() => currentMovie = null} />
	{:else}
		<SearchBar onMovieSelected={handleMovieSelected} />
	{/if}
</main>
