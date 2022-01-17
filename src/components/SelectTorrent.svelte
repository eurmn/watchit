<script lang="ts">
	import { onMount } from 'svelte';
	import type { Instance, Torrent } from 'webtorrent';
	import type { MovieData } from '../utils/types';
	import { TorrentClient, CurrentMovie } from '../utils/stores';
	import axios from 'axios';
	import byteSize from 'byte-size';

	let torrents = new Array<Torrent | 'empty'>();
	let client: Instance;
	let movie: MovieData;

	CurrentMovie.subscribe((m) => (movie = m));
	TorrentClient.subscribe((c) => (client = c));

	onMount(async () => {
		if (!movie.bayInjected) {
			let response = await axios.get(
				'https://add-cors-header.herokuapp.com/' +
					encodeURI(`https://apibay.org/q.php?q=${movie.imdb}&cat=200`)
			);
			let eligibleTorrents = response.data.filter((torrent) => parseInt(torrent.seeders) >= 1);
			let newHashes = eligibleTorrents.map((torrent) => torrent.info_hash);
      
			movie.allHashes = movie.allHashes.concat(newHashes);
			movie.bayInjected = true;
			CurrentMovie.set(movie);
    }

		for (let i = 0; i < movie.allHashes.length; i++) {
			torrents = [...torrents, 'empty'];
		}

		movie.allHashes.forEach((movie) => {
			let torrent = client.add(movie, {
				announce: ['wss://tracker.openwebtorrent.com', 'wss://tracker.btorrent.xyz']
			});

			torrent.once('metadata', () => {
				let i = torrents.findIndex((t) => t === 'empty');
				torrents[i] = torrent;
				torrent.pause();
			});
		});
	});

	function publishSelectEvent(
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	): void {
		let torrent = torrents.at(parseInt(event.currentTarget.dataset.index));
    if (torrent === 'empty') return;
    let hash = torrent.infoHash;
		movie.selectedHash = hash;
		CurrentMovie.set(movie);
	}
</script>

<span class="w-full sm:w-1/2 h-auto rounded overflow-y-scroll p-2 outline outline-1
  outline-slate-200 bg-white grid">
	{#each torrents as torrent, i}
    <div data-index={i} on:click={publishSelectEvent}
      class="p-2 relative cursor-pointer hover:bg-slate-100" >
      {#if torrent !== 'empty'}
        {torrent.name} <br />
        {torrent.numPeers} peer(s) - {byteSize(torrent.length)}
      {:else}
        <svg class="animate-spin icon icon-spinner9 absolute top-1/2 left-1/2
          origin-center">
          <symbol id="icon-spinner9" viewBox="0 0 32 32">
            <path
            d="M16 0c-8.711 0-15.796 6.961-15.995 15.624 0.185-7.558 5.932-13.624 12.995-13.624 7.18 0 13 6.268 13 14 0 1.657 1.343 3 3 3s3-1.343 3-3c0-8.837-7.163-16-16-16zM16 32c8.711 0 15.796-6.961 15.995-15.624-0.185 7.558-5.932 13.624-12.995 13.624-7.18 0-13-6.268-13-14 0-1.657-1.343-3-3-3s-3 1.343-3 3c0 8.837 7.163 16 16 16z"
            />
          </symbol>
          <use xlink:href="#icon-spinner9" />
        </svg>
      {/if}
    </div>
	{/each}
</span>

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
