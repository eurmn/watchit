<script lang="ts">
	import type { MovieData } from '../utils/types';
  	import { CurrentMovie } from '../utils/stores';
	import axios from 'axios';

	let searchTimeout: ReturnType<typeof setTimeout>;
	let searching = false;

	let movies = new Array<MovieData>();

	function searchTorrent(
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		let query = encodeURI(event.currentTarget.value);
		if (query === '') {
			movies = [];
			return;
		}
		if (searchTimeout) clearTimeout(searchTimeout);

		searchTimeout = setTimeout(() => {
			axios
				.get('https://yts.mx/api/v2/list_movies.json?query_term=' +
          query + '&sort_by=seeds')
				.then((response) => {
					let list: Array<any> = response.data.data.movies;
					movies = list.map((movie) => {
            let torrents = movie.torrents.sort(({ seedsA }: { seedsA: number }, { seedsB }: { seedsB: number }): number => {
              return seedsB - seedsA;
            });
            let hashes: string[] = torrents.map(({ hash }: { hash: string }) => hash);
            return {
              title: movie.title,
              cover: movie.medium_cover_image,
              rating: movie.rating,
              year: movie.year,
              imdb: movie.imdb_code,
              allHashes: hashes,
            };
            }).sort((a, b) => (b.rating - a.rating));
				})
				.catch(console.log);
		}, 1000);
	}

	function selectMovie(
		event: Event & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	) {
		// i just learned js can access indexes using strings and
		// i just can't stop crying
		let movie = movies[event.currentTarget.dataset.index];
    CurrentMovie.set(movie);
	}
</script>

<div
	class="mx-5 transition-transform duration-500
    w-full flex flex-col items-center translate-y-1/3 ease-out
    {movies.length > 0 ? 'translate-y-0' : 'translate-y-1/3'}"
  on:focusin={() => (searching = true)}
  on:blur={() => (searching = false)}
>
	<input
    placeholder="Search a movie ❤"
		autocomplete="off"
		type="text"
		class="outline outline-1 outline-slate-300 focus:outline-indigo-600
      focus:outline-2 px-2 drop-shadow-sm h-10 w-full sm:w-1/2 rounded
      bg-gradient-to-tr from-slate-100 to-white border-0 text-lg placeholder:text-slate-400"
		on:input={searchTorrent}
	/>
	{#if movies.length > 0 && searching}
		<div
			class="py-2 bg-white w-full rounded-b-md sm:w-1/2 overflow-y-scroll text-slate-900"
		>
			{#each movies as movie, i}
				<div
					class="flex align-center w-full p-2 h-25 bg-white hover:bg-gray-100
          cursor-pointer"
					data-index={i}
					on:click={selectMovie}
				>
					<img
						class="h-24 mr-2 aspect-square object-cover rounded"
						src={movie.cover}
						alt="{movie.title} Cover"
					/>
					<span class="flex flex-col h-full">
						<span class="font-extrabold text-lg">{movie.title} <br /></span>
						<span class="flex flex-col justify-self-end mt-1">
							<span class="text-sm">Year: {movie.year}</span>
							<span class="text-sm">Rating: {movie.rating}/10</span>
						</span>
					</span>
				</div>
			{/each}
		</div>
	{/if}
</div>
