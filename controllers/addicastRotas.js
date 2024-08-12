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
    const spotfyEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}`;

    // Make the Axios request to SoundCloud API
    const response = await axios.get(spotfyEndpoint, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const spotfityData = await response.data;

     console.log("Spotify data:", spotfityData);
    res.status(200).json(spotfityData)
 } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve SoundCloud data' });
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
