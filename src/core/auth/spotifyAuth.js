const axios = require('axios');

class SpotifyAuth {
    constructor(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.token = null;
        this.tokenExpiration = null; // Adiciona o campo para armazenar a expiração do token
    }

    async obtainAccessToken() {
        try {
            const data = `grant_type=client_credentials&client_id=${encodeURIComponent(this.clientId)}&client_secret=${encodeURIComponent(this.clientSecret)}`;

            const response = await axios.post("https://accounts.spotify.com/api/token", data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const oauthTokenResponse = response.data;
            this.token = oauthTokenResponse.access_token;
            console.log('Token expiration:', oauthTokenResponse.expires_in);

            this.tokenExpiration = Date.now() + oauthTokenResponse.expires_in * 1000;
            console.log('Access token obtained:', this.token);
            return this.token;
        } catch (error) {
            console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
            throw new Error('Failed to obtain Spotify access token');
        }
    }

    isTokenExpired() {
        if (!this.token || !this.tokenExpiration) {
            return true;
        }
        return Date.now() >= this.tokenExpiration;
    }

    async getValidToken() {
        if (this.isTokenExpired()) {
            await this.obtainAccessToken();
        }
        return this.token;
    }
}

module.exports = SpotifyAuth;
