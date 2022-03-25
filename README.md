<h1 align="center"> watchit </h1>

An attempt to create a very simple web app to download movies. It uses [webtorrent](https://github.com/webtorrent/webtorrent/) and [StreamSaver.js](https://github.com/jimmywarting/StreamSaver.js) to download the .mp4/.mkv files and [yts.mx](https://yts.mx/)'s + [ThePirateBay](https://thepiratebay.org/index.html)'s API to find the hashes, titles and cover images.

[Access Live Website](https://euromoon.github.io/watchit/)

## Note:
Although the app grabs torrents from both yts.mx and thepiratebay, it still fails to get a working torrent for some movies due to the lack of websocket seeders.