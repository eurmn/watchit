<script lang="ts">
  import type { Instance, Torrent } from "webtorrent";
  import type { MovieData } from "src/utils/types";
  import { TorrentClient, CurrentMovie } from "../utils/stores";
  import { onMount } from "svelte";
  import btsz from "byte-size";
  import axios from "axios";

  let client: Instance;
  let movie: MovieData;
  CurrentMovie.subscribe((m) => (movie = m));
  TorrentClient.subscribe((c) => (client = c));

  let loadedTorrents = new Array<Torrent>();
  let message = "";

  function selectHash(
    event: Event & {
      currentTarget: EventTarget & HTMLSelectElement;
    }
  ) {
    movie.selectedHash = event.currentTarget.value;
    CurrentMovie.set(movie);
  }

  let hashAmount = movie.allHashes.length;
  onMount(() => {
    let timeout = setTimeout(() => {
      message =
        "This is taking too long, the selected movie most likely has no active webseeders.";
      clearTimeout(timeout);
    }, 60 * 2 * 1000);

    const handleHash = (hash: string) => {
      let torrent = client.add(hash, {
        announce: 
        // ["ws://34.139.224.29:1211"]
        [
          "wss://tracker.fastcast.nz",
          "wss://tracker.openwebtorrent.com",
          "wss://tracker.btorrent.xyz",
          "wss://webtorrent-tracker.onrender.com",
        ],
      });

      torrent.once("metadata", () => {
        loadedTorrents = [...loadedTorrents, torrent];
        torrent.removeAllListeners();
        torrent.destroy();
      });
      TorrentClient.set(client);
    };

    movie.allHashes.forEach(handleHash);
    // fetch piratebay (proxied by a serverless function).
    axios
      .get(
        `https://us-central1-watchit-814ae.cloudfunctions.net/torrents?q=${movie.imdb}`
      )
      .then((response) => {
        console.log(response.data);
        let newHashes: string[] = response.data.filter(
          (hash) => !movie.allHashes.includes(hash)
        );
        newHashes.forEach(handleHash);
        hashAmount += newHashes.length;
      });
  });

  function clearAll() {
    window.location.reload();
  }
</script>

<div
  class="absolute top-2 left-2 text-indigo-6 flex items-center text-3xl cursor-pointer active:scale-90 transition-transform"
  on:click={(e) => clearAll()}
>
  <div class="i-gg:arrow-left float-left" />
  <span class="text-xl">back</span>
</div>
{#if loadedTorrents.length >= 1}
  <div class="h-10 w-full sm:w-1/2 justify-self-center self-center ">
    <select
      class="h-full w-full p-1 rounded outline outline-1 outline-slate-300 bg-gradient-to-tr from-slate-100 to-white
      text-center border-0"
      on:change={selectHash}
    >
      <option value="">Select an option</option>
      {#each loadedTorrents as torrent}
        <option value={torrent.infoHash}
          >{torrent.name} ({btsz(torrent.length)})</option
        >
      {/each}
    </select>
    <div class="w-full text-center text-slate-600 text-sm">
      {hashAmount - loadedTorrents.length} more option{hashAmount -
        loadedTorrents.length ==
      1
        ? ""
        : "s"} awaiting validation
    </div>
  </div>
{:else}
  <div class="justify-self-center self-center">
    <div
      class="i-gg:spinner text-indigo-6 text-3xl animate-spin animate-duration-700 mx-auto mb-5"
    />
    {#if message}
      <div
        class="w-full text-center rounded bg-indigo text-white p-2 drop-shadow shadow-black/20"
      >
        <div class="i-gg:bell text-xl float-left" />
        {message}
      </div>
    {/if}
  </div>
{/if}
