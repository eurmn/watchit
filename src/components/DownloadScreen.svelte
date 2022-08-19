<script lang="ts">
  import type { MovieData } from "../utils/types";
  import type { Instance } from "webtorrent";
  import { CurrentMovie, TorrentClient } from "../utils/stores";
  import { onMount } from "svelte";
  import { assets } from "$app/paths";
  import streamSaver from "streamsaver";

  let client: Instance;
  let movie: MovieData;
  CurrentMovie.subscribe((m) => (movie = m));
  TorrentClient.subscribe((c) => (client = c));

  let collectingMetadata = true;
  let progressElement: HTMLSpanElement;
  let cancelDownload: () => void;
  streamSaver.mitm = assets + "/mitm.html";

  function publishCancelEvent(): void {
    CurrentMovie.set(null);
    if (cancelDownload) cancelDownload();
    window.location.reload();
  }

  onMount(() => {
    let torrent = client.add(movie.selectedHash, {
      announce:
      // ["ws://34.139.224.29:443"]
      [
          "wss://tracker.fastcast.nz",
          "wss://tracker.openwebtorrent.com",
          "wss://tracker.btorrent.xyz",
          "wss://webtorrent-tracker.onrender.com",
        ],
    });

    torrent.once("metadata", () => {
      torrent.files.forEach((file) => {
        if (file.name.endsWith(".mp4") || file.name.endsWith(".mkv")) {
          let fileStream = streamSaver.createWriteStream(file.name, {
            size: file.length,
          });
          let writer = fileStream.getWriter();

          cancelDownload = window.onunload = () => {
            writer.abort();
            torrent.removeAllListeners();
            torrent.destroy();
          };

          file
            .createReadStream()
            .on("data", (data) => {
              writer.write(data);
            })
            .on("end", () => writer.close());

          return;
        }
        file.deselect();
      });

      collectingMetadata = false;

      torrent.on("download", () => {
        if (progressElement) {
          let progress = Math.round(torrent.progress * 10000) / 100;
          progressElement.style.width = `${progress}%`;
        }
      });
    });
  });
</script>

<div class="mx-5 self-center w-full sm:w-1/2">
  <div
    class="bg-gradient-to-tr from-slate-100 to-white flex align-center
        p-2 w-full outline outline-1 outline-slate-300
        drop-shadow-sm pb-3 rounded box-border"
  >
    <span
      class="absolute top-.5 right-.5 text-slate-400 cursor-pointer"
      on:click={publishCancelEvent}
    >
      <div class="i-gg:close text-indigo-6 font-bold" />
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
      <span
        class="bg-indigo-6 left-0 bottom-0 absolute w-full h-1 animate-pulse"
      />
    {:else}
      <span
        class="absolute left-0 bottom-0 w-full h-1 bg-slate-200 rounded-b
        overflow-hidden"
      />
      <span
        bind:this={progressElement}
        class="absolute left-0 bottom-0 h-1 overflow-hidden"
      >
        <span
          class="absolute left-0 bottom-0 h-1
          w-full bg-gradient-to-tr from-green-400 to-green-600"
        />
      </span>
    {/if}
  </div>
  <div class="pt-1 w-full text-center text-slate-400 text-sm">
    changing tabs might slow down the download speed
  </div>
</div>
