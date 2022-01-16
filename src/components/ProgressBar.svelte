<script lang="ts">
	import type { MovieData } from '../types/types';
	import type { Instance as TorrentClient } from 'webtorrent';
	import { onMount } from 'svelte';
	import streamSaver from 'streamsaver';
	import WebTorrent from 'webtorrent/webtorrent.min';

	export let currentMovie: MovieData;
	export let onCancel: () => void;

	let collectingMetadata = true;
	let progressElement: HTMLSpanElement;
	let cancelDownload: () => void;
	streamSaver.mitm = './mitm.html';

	function publishCancelEvent(): void {
		if (onCancel) onCancel();
		if (cancelDownload) cancelDownload();
	}

	onMount(() => {
		let client: TorrentClient = new WebTorrent();
		let torrent = client.add(currentMovie.hashes[0], {
			announce: ['wss://tracker.openwebtorrent.com', 'wss://tracker.btorrent.xyz']
		});

		window.addEventListener('unload', () => torrent.destroy());

		torrent.on('ready', () => {
			torrent.files.forEach((file) => {
				if (file.name.endsWith('.mp4') || file.name.endsWith('.mkv')) {
					let fileStream = streamSaver.createWriteStream(file.name, { size: file.length });
					let writer = fileStream.getWriter();

					window.onunload = cancelDownload = () => {
						fileStream.abort();
            writer.abort();
					};

					window.onbeforeunload = (evt) => {
						if (file.downloaded !== file.length) {
							evt.returnValue =
								'Are you sure you want to cancel the download?';
						}
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
				let progress = Math.round(torrent.progress * 10000) / 100;
				console.log(`${progress}%`);
				progressElement.style.width = `${progress}%`;
			});
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
		src={currentMovie.cover}
		alt="{currentMovie.title} Cover"
	/>
	<span class="flex flex-col h-full">
		<span class="font-extrabold text-lg">{currentMovie.title} <br /></span>
		<span class="flex flex-col justify-self-end mt-1">
			<span class="text-sm">Year: {currentMovie.year}</span>
			<span class="text-sm">Rating: {currentMovie.rating}/10</span>
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
