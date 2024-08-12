const express = require('express');
const axios = require('axios');
const Addicast = require('../models/addicast');

const router = express.Router();


const client_id="37ccb4c596924858864983b108beffca"
const client_secret="6b6d053e033d4d93ad2904a17239bc95"

async function obtainAccessToken() {
    try {
        const data = `grant_type=client_credentials&client_id=${encodeURIComponent(client_id)}&client_secret=${encodeURIComponent(client_secret)}`;

        const response = await axios.post("https://accounts.spotify.com/api/token", data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const oauthTokenResponse = response.data;
        console.log('Access token obtained:', oauthTokenResponse.access_token);
        return oauthTokenResponse.access_token;
    } catch (error) {
        console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
    }
}


router.get('/', async (req, res) => {
    try {
        const playlistId = '54RA0urFikxwWAUmIHFiy1';
        const accessToken = await obtainAccessToken();
        const spotifyEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

        const response = await axios.get(spotifyEndpoint, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const transformedData = response.data.items.map(item => {
            const track = item.track;

            return {
                id: track.id,
                artwork_url: track.album.images[0]?.url,
                title: track.name,
                permalink_url: track.external_urls.spotify,
            };
        });

        res.status(200).json(transformedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve Spotify data' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const accessToken = await obtainAccessToken();
        const spotifyEndpoint = `https://api.spotify.com/v1/tracks/${id}`;

        const response = await axios.get(spotifyEndpoint, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const track = response.data;

        const transformedData = {
            id: track.id,
            artwork_url: track.album.images[0]?.url,
            title: track.name,
            permalink_url: track.external_urls.spotify,
            genre: track.album.genres ? track.album.genres.join(', ') : 'Unknown',
            description: track.album.name,
            user: {
                username: track.artists.map(artist => artist.name).join(', '),
                city: 'N/A'
            },
            created_at: track.album.release_date
        };

        res.status(200).json(transformedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve Spotify data' });
    }
});


// router.get('/:id', async (req, res) => {
//   try {
//      const accessToken = obtainAccessToken()
//      const soundCloudEndpoint = `/tracks/${req.params.id}`;
//
//      // Make the Axios request to SoundCloud API
//      const response = await axios.get(soundCloudEndpoint, {
//        headers: {
//          'accept': 'application/json; charset=utf-8',
//          'Authorization': `OAuth ${accessToken}`
//        }
//      });
//
//      const soundCloudData = await response.data;
//
//      res.status(200).json(soundCloudData)
//
//   } catch (error) {
//      console.error(error);
//      res.status(500).json({ error: 'Failed to retrieve SoundCloud data' });
//   }
//  });


module.exports = router;
