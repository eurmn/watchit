<script lang="ts">
	import type { MovieData } from '../utils/types';
	import { CurrentMovie } from '../utils/stores';
	import SearchBar from '../components/SearchBar.svelte';
	import DownloadScreen from '../components/DownloadScreen.svelte';
	import SelectTorrent from '../components/TorrentSelection.svelte';
	import 'uno.css';

	let currentMovie: MovieData;
  CurrentMovie.subscribe(m => currentMovie = m);
</script>

<svelte:head>
	<title>watchit</title>
</svelte:head>

<main class="p-5 w-full h-full bg-slate-200 text-slate-900 flex justify-center">
	{#if currentMovie}
		{#if currentMovie.selectedHash}
			<DownloadScreen />
		{:else}
      <SelectTorrent />
    {/if}
	{:else}
		<SearchBar />
	{/if}
</main>
