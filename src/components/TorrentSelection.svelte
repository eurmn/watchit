<script lang="ts">
  import type { Instance, Torrent } from 'webtorrent';
  import type { MovieData } from 'src/utils/types';
  import { TorrentClient, CurrentMovie } from '../utils/stores';
  import { onMount } from 'svelte';
  import btsz from 'byte-size';

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
    client.torrents.filter(t => t.infoHash != movie.selectedHash).forEach(t => {
      t.removeAllListeners();
      t.destroy();
    });
    TorrentClient.set(client);
    CurrentMovie.set(movie);
  }

  onMount(async () => {
    movie.allHashes.forEach(hash => {
      let torrent = client.add(hash, {
				announce: ['wss://tracker.openwebtorrent.com', 'wss://tracker.btorrent.xyz']
			});
      torrent.once('metadata', () => {
        loadedTorrents = [...loadedTorrents, torrent];
        torrent.pause();
      });
      TorrentClient.set(client);
    });

    setTimeout(() => message = 'This is taking too long, the selected movie most likely has no active webseeders.', 60 * 2 * 1000);

    // DEAD LINK
    /* let response = await axios.get(
				'https://add-cors-header.herokuapp.com/' +
					encodeURI(`https://apibay.org/q.php?q=${movie.imdb}&cat=200`)
			);
    let eligibleTorrents = response.data.filter((torrent) => parseInt(torrent.seeders) >= 1);
    let newHashes: string[] = eligibleTorrents.map((torrent) => torrent.info_hash);
    newHashes.forEach((hash: string) => {
      if (movie.allHashes.includes(hash)) return;
      let torrent = client.add(hash, {
				announce: ['wss://tracker.openwebtorrent.com', 'wss://tracker.btorrent.xyz']
			});
      TorrentClient.set(client);
      torrent.once('metadata', () => {
        loadedTorrents = [...loadedTorrents, torrent];
        torrent.pause();
      });
    }); */
  });
</script>

{#if loadedTorrents.length >= 1}
<div class="h-10 w-full sm:w-1/2 justify-self-center self-center ">
  <select class="h-full w-full p-1 rounded outline outline-1 outline-slate-300 bg-gradient-to-tr from-slate-100 to-white
    text-center" on:change={selectHash}>
    <option value="">Select an option</option>
    {#each loadedTorrents as torrent, i}
      <option value="{torrent.infoHash}">{torrent.name} ({btsz(torrent.length)})</option>
    {/each}
  </select>
  <div class="w-full text-center text-slate-600 text-sm">
    {movie.allHashes.length - loadedTorrents.length} more option{movie.allHashes.length - loadedTorrents.length == 1 ? '' : 's'} awaiting validation
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