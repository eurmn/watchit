import { writable } from 'svelte/store';
import type { Instance } from 'webtorrent';
import WebTorrent from 'webtorrent/webtorrent.min';
import type { MovieData } from './types';

export const TorrentClient = writable<Instance>(new WebTorrent());
export let CurrentMovie = writable<MovieData | null>();
