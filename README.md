<h1 align="center"> watchit </h1>

An attempt to create a very simple web app to download movies. It uses [webtorrent](https://github.com/webtorrent/webtorrent/) and [StreamSaver.js](https://github.com/jimmywarting/StreamSaver.js) to download the .mp4/.mkv files and [yts.mx](https://yts.mx/)'s API to find the hashes, titles and cover images.

[Access Live Website](https://euromoon.github.io/watchit/)

## Note:
Because it currently only gets the torrent hashes from yts.mx, most movies will fail to start downloading, as the torrents found usually have little to no webseeders. This could be fixed by searching hashes in more indexers, but the only other JSON based torrent indexer API I know - thepiratebay - limits cross-origin requests.