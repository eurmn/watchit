<script lang="ts">
	import type { MovieData } from '../types/types';
	export let currentMovie: MovieData;
</script>

<div
	class="bg-gradient-to-tr from-slate-100 to-white flex align-center
      self-center p-2 w-full sm:w-1/2 outline outline-1 outline-slate-300
      drop-shadow-sm relative pb-5 rounded"
>
  <span class="absolute top-0 right-2 text-slate-400 cursor-pointer">
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
