// Todo: host in a platform that supports server functions
import axios from 'axios';
import type { RequestEvent, EndpointOutput } from '@sveltejs/kit';

export async function get({ url }: RequestEvent): Promise<EndpointOutput>
{
  let query = url.searchParams.get('q');
  if (query)
  {
    let bayTorrents = await axios.get(`https://apibay.org/q.php?q=${query}&cat=200`);
    let eligibleTorrents = bayTorrents.data.filter(t => t.seeders >= 5).map((t) => t.info_hash);
    return {
      status: 200,
      body: eligibleTorrents
    };
  }
  return {
    status: 400
  };
}