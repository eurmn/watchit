<h1 align="center"> watchit </h1>

An attempt to create a very simple web app to download movies. It uses [webtorrent](https://github.com/webtorrent/webtorrent/) and [StreamSaver.js](https://github.com/jimmywarting/StreamSaver.js) to download the .mp4/.mkv files and [yts.mx](https://yts.mx/)'s API to find the hashes, titles and cover images.

[Access Live Website](https://euromoon.github.io/watchit/)

## Important note:
There are two main problems I am looking to solve in the future regarding this app. The lack of webseeders - and the lack of torrent indexers.

The first one - lack of webseeders - is most certanly the worst problem in this app. While it finds the title/cover - and even the torrents - for most movies, ~50% of the torrents are stuck in collecting metadata (flashing blue bar). This happens because webtorrent can't connect to most seeders, as it is forced to use only websocket - and not udp, the major torrent seeding protocol.

The best solution to this could be simply to try more torrent hashes, and stick with the one which finds webseeders. And that's where the second problem - the lack of torrent indexers - comes in. While yts.mx's API is a great indexer, it is kind of the only one (I've found so far) with a good JSON API.

While [The Pirate Bay](https://thepiratebay.org/index.html) also has a good JSON API, it is blocked by [CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS), which means it is not accessible by client-only apps.
