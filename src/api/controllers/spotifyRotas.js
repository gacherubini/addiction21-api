class SpotifyController {
    constructor(spotifyService) {
        this.spotifyService = spotifyService;
    }

    async getPlaylistTracks(req, res) {
        try {
            const playlistId = '54RA0urFikxwWAUmIHFiy1'; // Pode ser obtido de req.params ou req.query se necessário
            const tracks = await this.spotifyService.fetchPlaylistTracks(playlistId);
            res.status(200).json(tracks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = SpotifyController;
