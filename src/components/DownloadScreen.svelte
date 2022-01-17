<script lang="ts">
	import type { MovieData } from '../utils/types';
	import type { Instance, Torrent } from 'webtorrent';
	import { CurrentMovie, TorrentClient } from '../utils/stores';
	import { onMount } from 'svelte';
	import { assets } from '$app/paths';
	import streamSaver from 'streamsaver';

	let client: Instance;
	let movie: MovieData;
	CurrentMovie.subscribe((m) => (movie = m));
	TorrentClient.subscribe((c) => (client = c));

	let collectingMetadata = true;
	let progressElement: HTMLSpanElement;
	let torrents = new Array<Torrent>();
	let cancelDownload: () => void;
	streamSaver.mitm = assets + '/mitm.html';

	function publishCancelEvent(): void {
    movie.selectedHash = null;
    CurrentMovie.set(movie);
		if (cancelDownload) cancelDownload();
	}

	onMount(() => {
    let torrent = client.torrents.find(t => t.infoHash === movie.selectedHash);
    client.torrents.filter(t => t !== torrent).forEach(t => {
      t.removeAllListeners();
      t.destroy();
    });

		torrent.files.forEach((file) => {
			if (file.name.endsWith('.mp4') || file.name.endsWith('.mkv')) {
				let fileStream = streamSaver.createWriteStream(file.name, { size: file.length });
				let writer = fileStream.getWriter();

				cancelDownload = window.onunload = () => {
					writer.abort();
          torrent.removeAllListeners();
          torrent.destroy();
				};

				file
					.createReadStream()
					.on('data', (data) => {
						writer.write(data);
					})
					.on('end', () => writer.close());

				return;
			}
		});

		collectingMetadata = false;

		torrent.on('download', () => {
			if (progressElement) {
				let progress = Math.round(torrent.progress * 10000) / 100;
				progressElement.style.width = `${progress}%`;
			}
		});
	});
</script>

<div
	class="bg-gradient-to-tr from-slate-100 to-white flex align-center
      self-center p-2 w-full sm:w-1/2 outline outline-1 outline-slate-300
      drop-shadow-sm relative pb-3 rounded"
>
	<span class="absolute top-0 right-2 text-slate-400 cursor-pointer" on:click={publishCancelEvent}>
		<svg class="icon icon-close">
			<symbol id="icon-close" viewBox="0 0 22 28">
				<path
					d="M20.281 20.656c0 0.391-0.156 0.781-0.438 1.062l-2.125 2.125c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-4.594-4.594-4.594 4.594c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-2.125-2.125c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l4.594-4.594-4.594-4.594c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l2.125-2.125c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l4.594 4.594 4.594-4.594c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l2.125 2.125c0.281 0.281 0.438 0.672 0.438 1.062s-0.156 0.781-0.438 1.062l-4.594 4.594 4.594 4.594c0.281 0.281 0.438 0.672 0.438 1.062z"
				/>
			</symbol>
			<use xlink:href="#icon-close" />
		</svg>
	</span>
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
	{#if collectingMetadata}
		<span class="bg-blue-500 left-0 bottom-0 absolute w-full h-1 animate-pulse" />
	{:else}
		<span
			class="absolute left-0 bottom-0 w-full h-1 bg-slate-200 rounded-b
      overflow-hidden"
		/>
		<span bind:this={progressElement} class="absolute left-0 bottom-0 h-1 overflow-hidden">
			<span
				class="absolute left-0 bottom-0 h-1
        w-full bg-gradient-to-tr from-green-400 to-green-600"
			/>
		</span>
	{/if}
</div>

<style>
	.icon {
		display: inline-block;
		width: 1em;
		height: 1em;
		stroke-width: 0;
		stroke: currentColor;
		fill: currentColor;
	}
	.icon-close {
		width: 0.7861328125em;
	}
</style>
