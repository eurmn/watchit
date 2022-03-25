<script lang="ts">
  import type { Instance, Torrent } from 'webtorrent';
  import type { MovieData } from 'src/utils/types';
  import { TorrentClient, CurrentMovie } from '../utils/stores';
  import { onMount } from 'svelte';
	import { assets } from '$app/paths';
  import btsz from 'byte-size';
  import axios from 'axios';

  let client: Instance;
  let movie: MovieData;
  CurrentMovie.subscribe(m => movie = m);
  TorrentClient.subscribe(c => client = c);

  let loadedTorrents = new Array<Torrent>();
  let message = '';

  function selectHash(event: Event & {
    currentTarget: EventTarget & HTMLSelectElement;
  }) {
    movie.selectedHash = event.currentTarget.value;
    CurrentMovie.set(movie);
  }

  let hashAmount = movie.allHashes.length;
  onMount(() => {
    setTimeout(() => message = 'This is taking too long, the selected movie most likely has no active webseeders.', 60 * 2 * 1000);

    const handleHash = (hash: string) =>
    {
      let torrent = client.add(hash, {
        announce: ['wss://tracker.openwebtorrent.com', 'wss://tracker.btorrent.xyz'],
      });

      torrent.once('metadata', () => {
        loadedTorrents = [...loadedTorrents, torrent];
        torrent.removeAllListeners();
        torrent.destroy();
      });
      TorrentClient.set(client);
    };
    
    movie.allHashes.forEach(handleHash);
    axios.get(`${assets}/torrents?q=${movie.imdb}`).then(response => {
      let newHashes: string[] = response.data.filter(hash => !movie.allHashes.includes(hash));
      newHashes.forEach(handleHash);
      hashAmount += newHashes.length;
    });
  });
</script>

{#if loadedTorrents.length >= 1}
<div class="h-10 w-full sm:w-1/2 justify-self-center self-center ">
  <select class="h-full w-full p-1 rounded outline outline-1 outline-slate-300 bg-gradient-to-tr from-slate-100 to-white
    text-center" on:change={selectHash}>
    <option value="">Select an option</option>
    {#each loadedTorrents as torrent}
      <option value="{torrent.infoHash}">{torrent.name} ({btsz(torrent.length)})</option>
    {/each}
  </select>
  <div class="w-full text-center text-slate-600 text-sm">
    {hashAmount - loadedTorrents.length} more option{hashAmount - loadedTorrents.length == 1 ? '' : 's'} awaiting validation
  </div>
</div>
{:else}
<div class="justify-self-center self-center text-slate-600">
  <svg class="animate-spin icon icon-spinner9">
    <symbol id="icon-spinner9" viewBox="0 0 32 32">
      <path
      d="M16 0c-8.711 0-15.796 6.961-15.995 15.624 0.185-7.558 5.932-13.624 12.995-13.624 7.18 0 13 6.268 13 14 0 1.657 1.343 3 3 3s3-1.343 3-3c0-8.837-7.163-16-16-16zM16 32c8.711 0 15.796-6.961 15.995-15.624-0.185 7.558-5.932 13.624-12.995 13.624-7.18 0-13-6.268-13-14 0-1.657-1.343-3-3-3s-3 1.343-3 3c0 8.837 7.163 16 16 16z"
      />
    </symbol>
    <use xlink:href="#icon-spinner9" />
  </svg> {message}
</div>
{/if}

<style>
  .icon {
		display: inline-block;
		width: 1em;
		height: 1em;
		stroke-width: 0;
		stroke: currentColor;
		fill: currentColor;
	}
</style>