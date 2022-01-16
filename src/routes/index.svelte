<script lang="ts">
  import type { Instance } from 'webtorrent';
  import WebTorrent from 'webtorrent/webtorrent.min';
  import axios from 'axios';

	let client: Instance = new WebTorrent();

  let searchTimeout: ReturnType<typeof setTimeout>;
  let searching = false;

  let movies = new Array<{
    title: string,
    cover: string,
    year: number,
    rating: number,
    hashes: string[]
  }>();

  function searchTorrent(event: Event & {
    currentTarget: EventTarget & HTMLInputElement
  })
  {
    let query = event.currentTarget.value;
    if (query === '')
    {
      movies = [];
      return;
    }
    if (searchTimeout) clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${query}&sort_by=seeds`)
        .then(response => {
          let list: Array<any> = response.data.data.movies;
          movies = list.map(movie => {
            return {
              title: movie.title,
              cover: movie.medium_cover_image,
              rating: movie.rating,
              year: movie.year,
              hashes: movie.torrents
                .sort(({ seedsA }: { seedsA: number }, { seedsB }: { seedsB: number}): number => {
                  return seedsB - seedsA;
                })
            }
          }).sort((a, b) => { return b.rating - a.rating; });
          console.log(movies[0].hashes[0]);
        }).catch(console.log);
    }, 1000);
  }
</script>

<svelte:head>
  <title>watch a movie</title>
</svelte:head>

<main class="p-5 w-full h-full bg-slate-200 text-slate-900 flex justify-center">
  <div
    class="focus-within:translate-y-0 transition-transform duration-500
      w-full flex flex-col items-center translate-y-1/3 ease-out">
    <input autocomplete="off"
      type="text" name="search" id="search"
      class="outline outline-1 outline-slate-300 focus:outline-sky-600
        focus:outline-2 p-2 drop-shadow-sm h-10 w-full sm:w-1/2 rounded
        bg-gradient-to-tr from-slate-100 to-white"
      on:input={searchTorrent}
      on:focusout={() => searching = false}
      on:focus={() => searching = true} />
    {#if searching}
      <div class="rounded-b-md w-100 sm:w-1/2 overflow-y-scroll text-slate-900">
        {#each movies as movie, i}
          <div class="py-4 px-2 w-100 bg-white hover:bg-gray-100 cursor-pointer" data-index={i}>
            <img class="mr-2 w-24 h-24 aspect-square object-cover float-left inline-block rounded" src="{movie.cover}" alt="{movie.title} Cover" />
            <span>
              <span class="font-extrabold text-xl">{movie.title} <br /></span>
              <span>Year: {movie.year} <br /></span>
              <span>Rating: {movie.rating}/10</span>
            </span>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</main>