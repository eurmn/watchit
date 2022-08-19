<h1 align="center"> watchit </h1>

An attempt to create a very simple web app to download movies. It uses [webtorrent](https://github.com/webtorrent/webtorrent/) and [StreamSaver.js](https://github.com/jimmywarting/StreamSaver.js) to download the .mp4/.mkv files and [yts.mx](https://yts.mx/)'s + [ThePirateBay](https://thepiratebay.org/index.html)'s API to find the hashes, titles and cover images.

[Access Live Website](https://euromoon.github.io/watchit)
## Note:
Although the app grabs torrents from both yts.mx and thepiratebay, most movies will not work because of the lack of webseeders. For testing, my sugestion is to always search the most popular recent movies (as of 08/19/22, "Minions: The Rise of Gru" has a working webtorrent).