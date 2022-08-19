import axios from 'axios';
import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
interface Torrent {
    id: string;
    name: string;
    info_hash: string;
    leechers: string;
    seeders: string;
    num_files: string;
    size: string;
    username: string;
    added: string;
    status: string;
    category: string;
    imdb: string;
}

// disable CORS for this function
export const torrents = functions.https.onRequest(async (request, response) => {
    let query = request.query;

    try {
        let json: Torrent[] = (await axios.get(`https://apibay.org/q.php?q=${query.q}&cat=200`)).data;
        let torrentHashes = json
            .filter(
                (t) => Number.parseInt(t.seeders) >= 5).map((t) => t.info_hash
            );
        response.set('Access-Control-Allow-Origin', '*').json(torrentHashes);
    } catch (e) {
        response.status(500).send('Interval Server Error');
    }
});
