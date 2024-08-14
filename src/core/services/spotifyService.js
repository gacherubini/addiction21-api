const axios = require('axios');
const SpotifyAuth = require('../auth/spotifyAuth');

const client_id = "37ccb4c596924858864983b108beffca";
const client_secret = "6b6d053e033d4d93ad2904a17239bc95";

class SpotifyService {
    constructor() {
        this.auth = new SpotifyAuth(client_id, client_secret);
    }

    async fetchPlaylistTracks(playlistId) {
        const token = await this.auth.getValidToken();

        try {
            const spotifyEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

            const response = await axios.get(spotifyEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data.items.map(item => {
                const track = item.track;

                return {
                    id: track.id,
                    artwork_url: track.album.images[0]?.url,
                    title: track.name,
                    permalink_url: track.external_urls.spotify,
                };
            });
        } catch (error) {
            console.error('Error fetching playlist tracks:', error.response ? error.response.data : error.message);
            throw new Error('Failed to fetch playlist tracks');
        }
    }
}

module.exports = new SpotifyService();
